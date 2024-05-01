# api/utils/auth.py
import jwt
from datetime import datetime, timedelta, timezone
from flask import current_app, request, jsonify, g
from functools import wraps

def generate_token(user_id):
    try:
        payload = {
            'user_id': user_id,
            'exp': datetime.now(timezone.utc) + timedelta(days=1)
        }
        token = jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm='HS256')
        return token
    except Exception as e:
        raise e

def authenticate(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Authentication token is required'}), 401

        try:
            token = token.split(' ')[1]  # Remove "Bearer " prefix
            payload = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=['HS256'])
            g.user_id = payload.get('user_id')
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token'}), 401

        return f(*args, **kwargs)
    
    return decorated_function
