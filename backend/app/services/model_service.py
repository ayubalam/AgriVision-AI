import io
import os
import numpy as np
from PIL import Image
import tensorflow as tf

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODELS_DIR = os.path.join(BASE_DIR, "models")

def get_model_path():
    for name in ["plant_disease_model.keras", "plant_disease_model.h5"]:
        path = os.path.join(MODELS_DIR, name)
        if os.path.exists(path):
            return path
    raise FileNotFoundError(f"No valid model file found in {MODELS_DIR}")

DISEASE_MAP = {
    0: {
        "crop": "Pepper",
        "disease": "Pepper Bell Bacterial Spot",
        "isHealthy": False,
        "description": "Caused by Xanthomonas bacteria, resulting in dark, water-soaked leaf spots.",
        "treatment": {
            "chemical": ["Apply copper-based bactericides early in infection."],
            "organic": ["Prune heavily infected areas and discard."],
            "prevention": ["Avoid overhead watering and rotate crops yearly."]
        }
    },
    1: {
        "crop": "Pepper",
        "disease": "Healthy Pepper Bell",
        "isHealthy": True,
        "description": "Foliage exhibits vibrant green leaves with no signs of lesion or discoloration.",
        "treatment": {
            "chemical": [],
            "organic": [],
            "prevention": ["Maintain balanced watering and optimal soil nutrients."]
        }
    },
    2: {
        "crop": "Potato",
        "disease": "Potato Early Blight",
        "isHealthy": False,
        "description": "Fungal infection causing dark concentric target-like rings on mature leaves.",
        "treatment": {
            "chemical": ["Spray Mancozeb or Chlorothalonil every 7-10 days."],
            "organic": ["Apply neem oil or copper spray."],
            "prevention": ["Mulch around base to block soil splash."]
        }
    },
    3: {
        "crop": "Potato",
        "disease": "Potato Late Blight",
        "isHealthy": False,
        "description": "Serious water mold disease causing rapid leaf rotting with white mold under leaves.",
        "treatment": {
            "chemical": ["Apply systemic fungicides like Ridomil Gold."],
            "organic": ["Remove and burn all infected foliage immediately."],
            "prevention": ["Plant resistant varieties and maintain low humidity."]
        }
    },
    4: {
        "crop": "Tomato",
        "disease": "Tomato Early Blight",
        "isHealthy": False,
        "description": "Early blight is caused by the fungus Alternaria solani. It produces target-like dark spots with concentric rings.",
        "treatment": {
            "chemical": ["Apply copper-based fungicides at first sign of spots."],
            "organic": ["Spray neem oil solution directly on affected leaves."],
            "prevention": ["Rotate crops with non-solanaceous plants every 2-3 years."]
        }
    },
    5: {
        "crop": "Tomato",
        "disease": "Healthy Tomato",
        "isHealthy": True,
        "description": "No signs of pathogen activity detected.",
        "treatment": {
            "chemical": [],
            "organic": [],
            "prevention": ["Continue regular pruning and deep root watering."]
        }
    }
}

_model = None

def get_model():
    global _model
    if _model is None:
        model_path = get_model_path()
        _model = tf.keras.models.load_model(model_path, compile=False)
    return _model

def predict_leaf(image_bytes: bytes) -> dict:
    model = get_model()
    
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = img.resize((224, 224))
    
    # Send raw [0, 255] float arrays (model handles internal scaling)
    img_array = np.expand_dims(np.array(img, dtype=np.float32), axis=0)

    predictions = model.predict(img_array, verbose=0)[0]
    
    print("\n--- MODEL INFERENCE LOG ---")
    print("Probabilities [Pepper_Spot, Pepper_H, Potato_EB, Potato_LB, Tomato_EB, Tomato_H]:")
    print(f"{np.round(predictions, 4)}")
    print(f"Argmax Class: {np.argmax(predictions)}")
    print("---------------------------\n")

    class_idx = int(np.argmax(predictions))
    confidence = float(np.max(predictions)) * 100

    info = DISEASE_MAP.get(class_idx, {
        "crop": "Unknown",
        "disease": "Unclassified Leaf Condition",
        "isHealthy": False,
        "description": "The AI could not confidently identify the leaf condition.",
        "treatment": {"chemical": [], "organic": [], "prevention": []}
    })

    return {
        "crop": info["crop"],
        "disease": info["disease"],
        "isHealthy": info["isHealthy"],
        "confidence": round(confidence, 1),
        "description": info["description"],
        "treatment": info["treatment"]
    }