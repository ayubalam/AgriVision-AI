from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from pymongo import MongoClient
from config import MONGO_URI
from utils.jwt_helper import generate_token

auth_bp = Blueprint('auth', __name__)
client = MongoClient(MONGO_URI)

# Get default database from MONGO_URI or fallback to 'agrivision'
try:
    db = client.get_default_database()
    if db is None:
        db = client['agrivision']
except Exception:
    db = client['agrivision']

users_col = db['users']
users_col = db['users']

@auth_bp.route('/auth/register', methods=['POST'])
def register():
    data = request.get_json() or {}
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    if users_col.find_one({'email': email}):
        return jsonify({'error': 'User with this email already exists'}), 400

    hashed_password = generate_password_hash(password)
    user_id = users_col.insert_one({
        'name': name,
        'email': email,
        'password': hashed_password
    }).inserted_id

    token = generate_token(user_id)
    return jsonify({
        'success': True,
        'token': token,
        'user': {'id': str(user_id), 'name': name, 'email': email}
    }), 201

@auth_bp.route('/auth/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    email = data.get('email')
    password = data.get('password')

    user = users_col.find_one({'email': email})
    if not user or not check_password_hash(user['password'], password):
        return jsonify({'error': 'Invalid email or password'}), 401

    token = generate_token(user['_id'])
    return jsonify({
        'success': True,
        'token': token,
        'user': {'id': str(user['_id']), 'name': user.get('name'), 'email': user['email']}
    }), 200