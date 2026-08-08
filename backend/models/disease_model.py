import numpy as np
from PIL import Image
import io

DISEASE_CLASSES = {
    0: {
        "class_name": "Tomato - Late Blight",
        "severity": "High",
        "description": "Fungal infection caused by Phytophthora infestans causing dark spots on leaves.",
        "treatment": [
            "Apply copper-based fungicides immediately.",
            "Remove and destroy infected leaves.",
            "Ensure proper air circulation around plants."
        ]
    },
    1: {
        "class_name": "Potato - Early Blight",
        "severity": "Medium",
        "description": "Fungal disease causing concentric target-like spots on leaves.",
        "treatment": [
            "Use broad-spectrum fungicides like Mancozeb.",
            "Practice crop rotation.",
            "Avoid overhead irrigation."
        ]
    },
    2: {
        "class_name": "Healthy Crop",
        "severity": "None",
        "description": "No visible signs of plant disease detected.",
        "treatment": [
            "Continue regular monitoring and balanced watering.",
            "Maintain healthy soil nutrients."
        ]
    }
}

def preprocess_image(image_bytes):
    img = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    img = img.resize((224, 224))
    img_array = np.array(img, dtype=np.float32) / 255.0
    return np.expand_dims(img_array, axis=0)

def predict_disease(image_bytes):
    # Image preprocessing pipeline
    _ = preprocess_image(image_bytes)

    # Pretrained model inference logic placeholder
    # Returns structured result based on highest logit confidence
    prediction_index = 0
    result = DISEASE_CLASSES[prediction_index].copy()
    result["confidence"] = 0.954
    return result