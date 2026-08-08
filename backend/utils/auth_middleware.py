import jwt
from functools import wraps
from flask import request, jsonify
from config import JWT_SECRET, db
from bson.objectid import ObjectId

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            if auth_header.startswith('Bearer '):
                token = auth_header.split(' ')[1]

        if not token:
            return jsonify({'error': 'Token is missing'}), 401

        try:
            data = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
            current_user = db.users.find_one({'_id': ObjectId(data['user_id'])})
            if not current_user:
                return jsonify({'error': 'User not found'}), 401
        except Exception:
            return jsonify({'error': 'Token is invalid or expired'}), 401

        return f(current_user, *args, **kwargs)

    return decorated