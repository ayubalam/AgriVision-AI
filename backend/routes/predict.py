from flask import Blueprint, request, jsonify
from utils.auth_middleware import token_required
from models.disease_model import predict_image
from config import db, JWT_SECRET
import jwt

predict_bp = Blueprint('predict', __name__)

@predict_bp.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    file = request.files['image']
    image_bytes = file.read()

    try:
        result = predict_image(image_bytes)
    except Exception as e:
        return jsonify({'error': f'Model inference failed: {str(e)}'}), 500

    auth_header = request.headers.get('Authorization')
    if auth_header and auth_header.startswith('Bearer '):
        try:
            token = auth_header.split(' ')[1]
            decoded = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
            db.scans.insert_one({
                'user_id': decoded['user_id'],
                'class_name': result['class_name'],
                'confidence': result['confidence'],
                'severity': result['severity'],
                'created_at': db.Timestamp()
            })
        except Exception as e:
            print("Failed to log scan history:", e)

    return jsonify({'success': True, 'data': result}), 200

@predict_bp.route('/scans/stats', methods=['GET'])
@token_required
def get_scan_stats(current_user):
    user_id = str(current_user['_id'])
    
    scans = list(db.scans.find({'user_id': user_id}))
    
    total_scans = len(scans)
    if total_scans == 0:
        return jsonify({
            'success': True,
            'data': {
                'total_scans': 0,
                'high_severity': 0,
                'medium_severity': 0,
                'low_severity': 0,
                'top_disease': 'N/A'
            }
        }), 200

    high_count = sum(1 for s in scans if s.get('severity') == 'High')
    medium_count = sum(1 for s in scans if s.get('severity') == 'Medium')
    low_count = sum(1 for s in scans if s.get('severity') == 'Low')

    disease_counts = {}
    for s in scans:
        disease = s.get('class_name', 'Unknown')
        disease_counts[disease] = disease_counts.get(disease, 0) + 1
        
    top_disease = max(disease_counts, key=disease_counts.get) if disease_counts else 'N/A'

    return jsonify({
        'success': True,
        'data': {
            'total_scans': total_scans,
            'high_severity': high_count,
            'medium_severity': medium_count,
            'low_severity': low_count,
            'top_disease': top_disease
        }
    }), 200