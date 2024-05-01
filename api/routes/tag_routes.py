# api/routes/tag_routes.py
from flask import Blueprint, request, jsonify
from models import Tag, User
from utils.db import db
from utils.validation import validate_tag_data
from utils.logging import logger

tag_bp = Blueprint('tag', __name__, url_prefix='/api/tags')

@tag_bp.route('', methods=['POST'])
def create_tag():
    try:
        data = request.get_json()
        errors = validate_tag_data(data)
        if errors:
            return jsonify({'errors': errors}), 400

        tag_name = data['tag_name']
        user_id = data['user_id']

        user = User.query.get(user_id)
        if not user:
            return jsonify({'message': 'User not found'}), 404

        new_tag = Tag(tag_name=tag_name, user_id=user_id)
        db.session.add(new_tag)
        db.session.commit()

        logger.info(f'Tag created: {new_tag}')
        return jsonify({'message': 'Tag created successfully'}), 201

    except Exception as e:
        logger.error(f'Error creating tag: {str(e)}')
        return jsonify({'message': 'An error occurred'}), 500

@tag_bp.route('/<int:tag_id>', methods=['GET'])
def get_tag(tag_id):
    try:
        tag = Tag.query.get(tag_id)
        if not tag:
            return jsonify({'message': 'Tag not found'}), 404

        tag_data = {
            'tag_id': tag.tag_id,
            'tag_name': tag.tag_name,
            'user_id': tag.user_id
        }
        return jsonify(tag_data), 200

    except Exception as e:
        logger.error(f'Error retrieving tag: {str(e)}')
        return jsonify({'message': 'An error occurred'}), 500

@tag_bp.route('/<int:tag_id>', methods=['PUT'])
def update_tag(tag_id):
    try:
        data = request.get_json()
        errors = validate_tag_data(data)
        if errors:
            return jsonify({'errors': errors}), 400

        tag = Tag.query.get(tag_id)
        if not tag:
            return jsonify({'message': 'Tag not found'}), 404

        tag.tag_name = data['tag_name']
        db.session.commit()

        logger.info(f'Tag updated: {tag}')
        return jsonify({'message': 'Tag updated successfully'}), 200

    except Exception as e:
        logger.error(f'Error updating tag: {str(e)}')
        return jsonify({'message': 'An error occurred'}), 500

@tag_bp.route('/<int:tag_id>', methods=['DELETE'])
def delete_tag(tag_id):
    try:
        tag = Tag.query.get(tag_id)
        if not tag:
            return jsonify({'message': 'Tag not found'}), 404

        db.session.delete(tag)
        db.session.commit()

        logger.info(f'Tag deleted: {tag}')
        return jsonify({'message': 'Tag deleted successfully'}), 200

    except Exception as e:
        logger.error(f'Error deleting tag: {str(e)}')
        return jsonify({'message': 'An error occurred'}), 500