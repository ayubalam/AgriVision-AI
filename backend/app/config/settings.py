import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "AgriVision AI API"
    API_V1_PREFIX: str = "/api"
    ENV: str = "development"
    
    # Security
    JWT_SECRET: str = "super-secret-jwt-key-agrivision-2026-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 Hours
    
    # MongoDB Configuration
    MONGODB_URI: str = "mongodb://localhost:27017"
    DATABASE_NAME: str = "agrivision_db"
    
    # CORS Settings
    ALLOWED_ORIGINS: list = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ]
    
    # Storage Paths
    UPLOAD_DIR: str = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "uploads")
    
    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()