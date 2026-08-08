from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import ConnectionFailure
from app.config.settings import settings

# Support both MONGODB_URI and MONGODB_URL setting names
mongo_uri = getattr(settings, "MONGODB_URI", None) or getattr(settings, "MONGODB_URL", "mongodb://localhost:27017")

# Initialize Motor Async Client and Database instance
client = AsyncIOMotorClient(mongo_uri, serverSelectionTimeoutMS=5000)
db = client[settings.DATABASE_NAME]

def connect_to_mongo():
    try:
        print(f"Connected successfully to MongoDB database: {settings.DATABASE_NAME}")
    except ConnectionFailure as e:
        print(f"MongoDB connection failed: {e}")

def close_mongo_connection():
    if client:
        client.close()
        print("MongoDB connection closed.")

def get_database():
    return db