from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
from app.config.settings import settings

class Database:
    client: MongoClient = None
    db = None

db_instance = Database()

def connect_to_mongo():
    try:
        db_instance.client = MongoClient(settings.MONGODB_URI, serverSelectionTimeoutMS=5000)
        db_instance.db = db_instance.client[settings.DATABASE_NAME]
        # Quick server ping to confirm connection
        db_instance.client.admin.command('ping')
        print(f"Connected successfully to MongoDB database: {settings.DATABASE_NAME}")
    except ConnectionFailure as e:
        print(f"MongoDB connection failed: {e}")

def close_mongo_connection():
    if db_instance.client:
        db_instance.client.close()
        print("MongoDB connection closed.")

def get_database():
    return db_instance.db