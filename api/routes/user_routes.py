# api/routes/user_routes.py
from flask import Blueprint, request, jsonify, g
from models import User
from utils.db import db
from utils.auth import generate_token, authenticate
from utils.validation import validate_user_data
from utils.logging import logger

user_bp = Blueprint('user', __name__, url_prefix='/api/users')

@user_bp.route('', methods=['POST'])
@authenticate
def create_user():
    try:
        data = request.get_json()
        errors = validate_user_data(data)
        if errors:
            return jsonify({'errors': errors}), 400

        username = data['username']
        password = data['password']
        email = data['email']

        existing_user = User.query.filter((User.username == username) | (User.email == email)).first()
        if existing_user:
            return jsonify({'message': 'User already exists'}), 409

        new_user = User(username=username, password=password, email=email)
        db.session.add(new_user)
        db.session.commit()

        logger.info(f'User created: {new_user}')
        return jsonify({'message': 'User created successfully'}), 201

    except Exception as e:
        logger.error(f'Error creating user: {str(e)}')
        return jsonify({'message': 'An error occurred'}), 500

@user_bp.route('/login', methods=['POST'])
def login_user():
    try:
        data = request.get_json()
        username = data['username']
        password = data['password']

        user = User.query.filter_by(username=username).first()
        if not user or user.password != password:
            return jsonify({'message': 'Invalid credentials'}), 401

        token = generate_token(user.user_id)
        logger.info(f'User logged in: {user}')
        return jsonify({'token': token}), 200

    except Exception as e:
        logger.error(f'Error logging in user: {str(e)}')
        return jsonify({'message': 'An error occurred'}), 500

@user_bp.route('/<int:user_id>', methods=['PUT'])
@authenticate
def update_user(user_id):
    try:
        data = request.get_json()
        errors = validate_user_data(data)
        if errors:
            return jsonify({'errors': errors}), 400

        user = User.query.get(user_id)
        if not user:
            return jsonify({'message': 'User not found'}), 404

        user.username = data['username']
        user.password = data['password']
        user.email = data['email']
        db.session.commit()

        logger.info(f'User updated: {user}')
        return jsonify({'message': 'User updated successfully'}), 200

    except Exception as e:
        logger.error(f'Error updating user: {str(e)}')
        return jsonify({'message': 'An error occurred'}), 500