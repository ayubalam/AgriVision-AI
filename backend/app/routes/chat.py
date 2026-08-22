from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from app.routes.auth import get_current_user
from app.services.chat_service import generate_chat_response

router = APIRouter(prefix="/chat", tags=["Chat"])

class ChatRequest(BaseModel):
    crop: str
    disease: str
    message: str

@router.post("/")
@router.post("")
async def chat_with_assistant(
    payload: ChatRequest,
    current_user: dict = Depends(get_current_user)
):
    if not payload.message.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Message cannot be empty."
        )

    reply = generate_chat_response(
        crop=payload.crop,
        disease=payload.disease,
        user_message=payload.message
    )

    return {"reply": reply}