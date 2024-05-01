# api/routes/folder_routes.py
from flask import Blueprint, request, jsonify
from models import Folder, User
from utils.db import db
from utils.validation import validate_folder_data
from utils.logging import logger

folder_bp = Blueprint('folder', __name__, url_prefix='/api/folders')

@folder_bp.route('', methods=['POST'])
def create_folder():
    try:
        data = request.get_json()
        errors = validate_folder_data(data)
        if errors:
            return jsonify({'errors': errors}), 400

        folder_name = data['folder_name']
        parent_folder_id = data.get('parent_folder_id')
        user_id = data['user_id']

        user = User.query.get(user_id)
        if not user:
            return jsonify({'message': 'User not found'}), 404

        new_folder = Folder(folder_name=folder_name, parent_folder_id=parent_folder_id, user_id=user_id)
        db.session.add(new_folder)
        db.session.commit()

        logger.info(f'Folder created: {new_folder}')
        return jsonify({'message': 'Folder created successfully'}), 201

    except Exception as e:
        logger.error(f'Error creating folder: {str(e)}')
        return jsonify({'message': 'An error occurred'}), 500

@folder_bp.route('/<int:folder_id>', methods=['GET'])
def get_folder(folder_id):
    try:
        folder = Folder.query.get(folder_id)
        if not folder:
            return jsonify({'message': 'Folder not found'}), 404

        folder_data = {
            'folder_id': folder.folder_id,
            'folder_name': folder.folder_name,
            'parent_folder_id': folder.parent_folder_id,
            'user_id': folder.user_id
        }
        return jsonify(folder_data), 200

    except Exception as e:
        logger.error(f'Error retrieving folder: {str(e)}')
        return jsonify({'message': 'An error occurred'}), 500

@folder_bp.route('/<int:folder_id>', methods=['PUT'])
def update_folder(folder_id):
    try:
        data = request.get_json()
        errors = validate_folder_data(data)
        if errors:
            return jsonify({'errors': errors}), 400

        folder = Folder.query.get(folder_id)
        if not folder:
            return jsonify({'message': 'Folder not found'}), 404

        folder.folder_name = data['folder_name']
        folder.parent_folder_id = data.get('parent_folder_id')
        db.session.commit()

        logger.info(f'Folder updated: {folder}')
        return jsonify({'message': 'Folder updated successfully'}), 200

    except Exception as e:
        logger.error(f'Error updating folder: {str(e)}')
        return jsonify({'message': 'An error occurred'}), 500

@folder_bp.route('/<int:folder_id>', methods=['DELETE'])
def delete_folder(folder_id):
    try:
        folder = Folder.query.get(folder_id)
        if not folder:
            return jsonify({'message': 'Folder not found'}), 404

        db.session.delete(folder)
        db.session.commit()

        logger.info(f'Folder deleted: {folder}')
        return jsonify({'message': 'Folder deleted successfully'}), 200

    except Exception as e:
        logger.error(f'Error deleting folder: {str(e)}')
        return jsonify({'message': 'An error occurred'}), 500