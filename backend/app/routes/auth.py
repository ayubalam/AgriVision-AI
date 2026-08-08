from datetime import datetime, timedelta
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel, EmailStr
import jwt
from passlib.context import CryptContext
from bson import ObjectId
from app.config.settings import settings
from app.config.database import db

router = APIRouter(prefix="/auth", tags=["Authentication"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_PREFIX}/auth/login", auto_error=False)

SECRET_KEY = getattr(settings, "JWT_SECRET_KEY", getattr(settings, "SECRET_KEY", "agrivision_secret_key_change_in_production"))
ALGORITHM = getattr(settings, "JWT_ALGORITHM", "HS256")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=getattr(settings, "ACCESS_TOKEN_EXPIRE_MINUTES", 1440))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

async def get_current_user(token: Optional[str] = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    if not token or token in ["undefined", "null", ""]:
        print("❌ Auth Error: Missing or undefined Bearer token in headers.")
        raise credentials_exception

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if not user_id:
            print("❌ Auth Error: 'sub' missing from token payload.")
            raise credentials_exception
    except Exception as e:
        print(f"❌ Auth Error: JWT decode failed - {str(e)}")
        raise credentials_exception

    user = None
    try:
        if ObjectId.is_valid(user_id):
            user = await db.users.find_one({"_id": ObjectId(user_id)})
    except Exception:
        pass

    if not user:
        user = await db.users.find_one({"email": user_id})

    if not user:
        print(f"❌ Auth Error: User '{user_id}' not found in MongoDB.")
        raise credentials_exception

    return user

class RegisterSchema(BaseModel):
    name: str
    email: EmailStr
    password: str

class LoginSchema(BaseModel):
    email: EmailStr
    password: str

@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register_user(user_data: RegisterSchema):
    existing_user = await db.users.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists"
        )

    new_user = {
        "name": user_data.name,
        "email": user_data.email,
        "passwordHash": hash_password(user_data.password),
        "created_at": datetime.utcnow().isoformat()
    }
    
    result = await db.users.insert_one(new_user)
    user_id_str = str(result.inserted_id)
    access_token = create_access_token(data={"sub": user_id_str})

    return {
        "access_token": access_token,
        "token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user_id_str,
            "name": user_data.name,
            "email": user_data.email
        }
    }

@router.post("/login")
async def login_user(credentials: LoginSchema):
    user = await db.users.find_one({"email": credentials.email})
    if not user or not verify_password(credentials.password, user.get("passwordHash", "")):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    user_id_str = str(user["_id"])
    access_token = create_access_token(data={"sub": user_id_str})

    return {
        "access_token": access_token,
        "token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user_id_str,
            "name": user.get("name", ""),
            "email": user.get("email", "")
        }
    }

@router.get("/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    return {
        "id": str(current_user["_id"]),
        "name": current_user.get("name", ""),
        "email": current_user.get("email", "")
    }