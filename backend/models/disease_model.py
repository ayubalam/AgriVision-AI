import io
import torch
import torchvision.transforms as transforms
from torchvision import models
from PIL import Image

CLASSES = [
    'Apple - Apple Scab',
    'Apple - Black Rot',
    'Apple - Healthy',
    'Corn - Common Rust',
    'Corn - Healthy',
    'Potato - Early Blight',
    'Potato - Late Blight',
    'Potato - Healthy',
    'Tomato - Early Blight',
    'Tomato - Late Blight',
    'Tomato - Healthy'
]

DISEASE_INFO = {
    'Tomato - Early Blight': {
        'severity': 'High',
        'recommendation': 'Apply copper-based fungicide and remove infected lower leaves.'
    },
    'Potato - Late Blight': {
        'severity': 'High',
        'recommendation': 'Apply systemic fungicide immediately and eliminate infected plants.'
    },
    'Apple - Apple Scab': {
        'severity': 'Medium',
        'recommendation': 'Apply sulfur fungicides and prune crowded branches for better airflow.'
    },
    'Apple - Black Rot': {
        'severity': 'High',
        'recommendation': 'Remove mummified fruit, prune infected cankers, and apply fungicide.'
    },
    'Corn - Common Rust': {
        'severity': 'Medium',
        'recommendation': 'Plant resistant hybrids and apply approved foliar fungicides.'
    },
    'Potato - Early Blight': {
        'severity': 'Medium',
        'recommendation': 'Ensure proper nitrogen balance and spray protective fungicides.'
    }
}

model = models.mobilenet_v2(weights=models.MobileNet_V2_Weights.DEFAULT)
model.classifier[1] = torch.nn.Linear(model.last_channel, len(CLASSES))
model.eval()

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

def predict_image(image_bytes):
    image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    tensor = transform(image).unsqueeze(0)
    
    with torch.no_grad():
        outputs = model(tensor)
        probabilities = torch.nn.functional.softmax(outputs[0], dim=0)
        confidence, class_idx = torch.max(probabilities, 0)

    class_name = CLASSES[class_idx.item()]
    info = DISEASE_INFO.get(class_name, {
        'severity': 'Low',
        'recommendation': 'No critical disease detected. Maintain optimal watering and nutrient levels.'
    })

    return {
        'class_name': class_name,
        'confidence': round(confidence.item(), 2),
        'severity': info['severity'],
        'recommendation': info['recommendation']
    }