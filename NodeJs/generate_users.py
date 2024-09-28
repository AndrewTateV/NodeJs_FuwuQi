import sys
import json
from faker import Faker
import random

def generate_fake_users(number_of_users=1):
    """ 生成假用户数据 """
    fake = Faker()
    users = []

    for _ in range(number_of_users):
        user = {
            'name': fake.name(),
            'age': random.randint(18, 80),  # 随机生成年龄在 18 到 80 之间
            'email': fake.email(),
            'address': fake.address()
        }
        users.append(user)

    return users

def write_users_to_json_file(users, filename):
    """ 将用户数据写入 JSON 文件 """
    with open(filename, 'w') as file:
        json.dump(users, file, indent=4)

# 从命令行参数中获取用户数量，如果没有提供则默认为 1
num_users = int(sys.argv[1]) if len(sys.argv) > 1 else 1

# 生成假用户
fake_users = generate_fake_users(num_users)

# 将生成的用户数据写入 JSON 文件
write_users_to_json_file(fake_users, './data/users.json')

print(f"{num_users} users written to users.json")