import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "AgriVision AI"
    API_V1_PREFIX: str = "/api"
    MONGODB_URL: str = "mongodb://localhost:27017"
    MONGODB_URI: str = "mongodb://localhost:27017"
    DATABASE_NAME: str = "agrivision_db"
    JWT_SECRET_KEY: str = "agrivision_secret_key_change_in_production"
    SECRET_KEY: str = "agrivision_secret_key_change_in_production"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440
    UPLOAD_DIR: str = "uploads"

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()