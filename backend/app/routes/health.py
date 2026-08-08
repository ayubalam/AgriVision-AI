from fastapi import APIRouter

router = APIRouter(tags=["Health"])

@router.get("/health")
def health_check():
    return {
        "status": "online",
        "service": "AgriVision AI API",
        "version": "1.0.0"
    }