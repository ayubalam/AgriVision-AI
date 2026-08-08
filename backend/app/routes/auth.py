from datetime import datetime, timezone
from fastapi import APIRouter, HTTPException, status, Depends
from app.config.database import get_database
from app.models.user_schema import UserRegister, UserLogin, UserResponse, TokenResponse
from app.utils.security import hash_password, verify_password, create_access_token, get_current_user_email

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
def register_user(user_data: UserRegister):
    db = get_database()
    if db is None:
        raise HTTPException(status_code=500, detail="Database connection unavailable.")
    
    users_collection = db["users"]
    
    # Check if email exists
    if users_collection.find_one({"email": user_data.email}):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A user with this email address already exists."
        )
    
    # Create new user document
    now = datetime.now(timezone.utc)
    user_doc = {
        "name": user_data.name,
        "email": user_data.email,
        "passwordHash": hash_password(user_data.password),
        "createdAt": now,
        "updatedAt": now
    }
    
    result = users_collection.insert_one(user_doc)
    user_id = str(result.inserted_id)
    
    # Generate token
    token = create_access_token({"sub": user_data.email, "id": user_id})
    
    user_resp = UserResponse(
        id=user_id,
        name=user_data.name,
        email=user_data.email,
        createdAt=now
    )
    
    return TokenResponse(access_token=token, user=user_resp)

@router.post("/login", response_model=TokenResponse)
def login_user(credentials: UserLogin):
    db = get_database()
    if db is None:
        raise HTTPException(status_code=500, detail="Database connection unavailable.")
    
    users_collection = db["users"]
    user = users_collection.find_one({"email": credentials.email})
    
    if not user or not verify_password(credentials.password, user["passwordHash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password credentials."
        )
    
    user_id = str(user["_id"])
    token = create_access_token({"sub": user["email"], "id": user_id})
    
    user_resp = UserResponse(
        id=user_id,
        name=user["name"],
        email=user["email"],
        createdAt=user.get("createdAt", datetime.now(timezone.utc))
    )
    
    return TokenResponse(access_token=token, user=user_resp)

@router.get("/me", response_model=UserResponse)
def get_current_user_profile(email: str = Depends(get_current_user_email)):
    db = get_database()
    if db is None:
        raise HTTPException(status_code=500, detail="Database connection unavailable.")
    
    user = db["users"].find_one({"email": email})
    if not user:
        raise HTTPException(status_code=404, detail="User profile not found.")
    
    return UserResponse(
        id=str(user["_id"]),
        name=user["name"],
        email=user["email"],
        createdAt=user.get("createdAt", datetime.now(timezone.utc))
    )