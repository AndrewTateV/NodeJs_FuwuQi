import express from "express";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
const port = 4567;
app.use(bodyParser.json());

app.get("/user", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post("/user", async (req, res) => {
  const { name, age, email, address } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: { name, age, email, address },
    });
    res.json(newUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/user/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(400).send("Invalid request");
  }
});
app.get('/users/search', async (req, res) => {
  const { name, email, age, address } = req.query;
  console.log(name, email, age, address);
  let queryConditions = {};
  if (name) {
    queryConditions.name = name;
  }
  if (email) {
    queryConditions.email = email;
  }
  if (age) {
    queryConditions.age = parseInt(age);
  }
  if (address) {
    queryConditions.address = address;
  }

  const users = await prisma.user.findMany({
    where: queryConditions,
  });

  if (users.length > 0) {
    res.json(users);
  } else {
    res.status(404).send('No users found matching the criteria');
  }
});

app.listen(port, () => {
  console.log(`running on ${port}`);
});

