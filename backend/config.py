import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/agrivision")
JWT_SECRET = os.getenv("JWT_SECRET", "super_secret_jwt_key")

client = MongoClient(MONGO_URI)
db = client.get_database('agrivision')