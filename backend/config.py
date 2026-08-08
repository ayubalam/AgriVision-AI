import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/agrivision")
JWT_SECRET = os.getenv("JWT_SECRET", "agrivision-dev-secret-key-2026")