import os
import uuid
import traceback
from datetime import datetime
from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from app.config.database import db
from app.config.settings import settings
from app.routes.auth import get_current_user
from app.services.model_service import predict_leaf

router = APIRouter(prefix="/predict", tags=["Prediction"])

@router.post("/")
@router.post("")
async def predict_leaf_disease(
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user)
):
    try:
        if not file.content_type.startswith("image/"):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Uploaded file must be an image (JPG, PNG, WEBP)."
            )

        content = await file.read()

        os.makedirs(settings.UPLOAD_DIR, exist_ok=True)

        file_extension = os.path.splitext(file.filename)[1] or ".jpg"
        unique_filename = f"{uuid.uuid4().hex}{file_extension}"
        file_path = os.path.join(settings.UPLOAD_DIR, unique_filename)

        with open(file_path, "wb") as buffer:
            buffer.write(content)

        image_url = f"/uploads/{unique_filename}"
        diagnosis = predict_leaf(content)

        scan_record = {
            "user_id": str(current_user["_id"]),
            "image_url": image_url,
            "crop": diagnosis["crop"],
            "disease": diagnosis["disease"],
            "isHealthy": diagnosis["isHealthy"],
            "confidence": diagnosis["confidence"],
            "description": diagnosis["description"],
            "treatment": diagnosis["treatment"],
            "created_at": datetime.utcnow().isoformat()
        }

        try:
            result = await db.scans.insert_one(scan_record)
            scan_id = str(result.inserted_id)
        except Exception:
            scan_id = uuid.uuid4().hex

        return {
            "id": scan_id,
            "imageUrl": image_url,
            **diagnosis
        }

    except HTTPException:
        raise
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred during leaf analysis: {str(e)}"
        )

@router.get("/history")
async def get_prediction_history(
    current_user: dict = Depends(get_current_user)
):
    try:
        cursor = db.scans.find({"user_id": str(current_user["_id"])}).sort("created_at", -1)
        scans = await cursor.to_list(length=100)

        history = []
        for scan in scans:
            history.append({
                "id": str(scan["_id"]),
                "imageUrl": scan.get("image_url", ""),
                "crop": scan.get("crop", "Unknown"),
                "disease": scan.get("disease", "Unknown"),
                "isHealthy": scan.get("isHealthy", False),
                "confidence": scan.get("confidence", 0),
                "description": scan.get("description", ""),
                "treatment": scan.get("treatment", {}),
                "createdAt": scan.get("created_at")
            })

        return history
    except Exception:
        return []

@router.get("/analytics")
async def get_analytics(
    current_user: dict = Depends(get_current_user)
):
    try:
        user_id = str(current_user["_id"])

        total_scans = await db.scans.count_documents({"user_id": user_id})
        healthy_scans = await db.scans.count_documents({"user_id": user_id, "isHealthy": True})
        infected_scans = await db.scans.count_documents({"user_id": user_id, "isHealthy": False})

        pipeline = [
            {"$match": {"user_id": user_id, "isHealthy": False}},
            {"$group": {"_id": "$disease", "count": {"$sum": 1}}},
            {"$sort": {"count": -1}},
            {"$limit": 5}
        ]
        top_diseases_cursor = db.scans.aggregate(pipeline)
        top_diseases = [
            {"disease": doc["_id"], "count": doc["count"]}
            async for doc in top_diseases_cursor
        ]

        return {
            "totalScans": total_scans,
            "healthyScans": healthy_scans,
            "infectedScans": infected_scans,
            "topDiseases": top_diseases
        }
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch analytics metrics: {str(e)}"
        )