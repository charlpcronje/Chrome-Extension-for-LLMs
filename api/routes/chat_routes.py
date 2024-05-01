# api/routes/chat_routes.py
from flask import Blueprint, request, jsonify
from models import Chat, Folder
from utils.db import db
from utils.validation import validate_chat_data
from utils.logging import logger

chat_bp = Blueprint('chat', __name__, url_prefix='/api/chats')

@chat_bp.route('', methods=['POST'])
def create_chat():
    try:
        data = request.get_json()
        errors = validate_chat_data(data)
        if errors:
            return jsonify({'errors': errors}), 400

        content = data['content']
        folder_id = data.get('folder_id')

        if folder_id:
            folder = Folder.query.get(folder_id)
            if not folder:
                return jsonify({'message': 'Folder not found'}), 404

        new_chat = Chat(content=content, folder_id=folder_id)
        db.session.add(new_chat)
        db.session.commit()

        logger.info(f'Chat created: {new_chat}')
        return jsonify({'message': 'Chat created successfully'}), 201

    except Exception as e:
        logger.error(f'Error creating chat: {str(e)}')
        return jsonify({'message': 'An error occurred'}), 500

@chat_bp.route('/<int:chat_id>', methods=['GET'])
def get_chat(chat_id):
    try:
        chat = Chat.query.get(chat_id)
        if not chat:
            return jsonify({'message': 'Chat not found'}), 404

        chat_data = {
            'chat_id': chat.chat_id,
            'content': chat.content,
            'folder_id': chat.folder_id
        }
        return jsonify(chat_data), 200

    except Exception as e:
        logger.error(f'Error retrieving chat: {str(e)}')
        return jsonify({'message': 'An error occurred'}), 500

@chat_bp.route('/<int:chat_id>', methods=['PUT'])
def update_chat(chat_id):
    try:
        data = request.get_json()
        errors = validate_chat_data(data)
        if errors:
            return jsonify({'errors': errors}), 400

        chat = Chat.query.get(chat_id)
        if not chat:
            return jsonify({'message': 'Chat not found'}), 404

        chat.content = data['content']
        chat.folder_id = data.get('folder_id')
        db.session.commit()

        logger.info(f'Chat updated: {chat}')
        return jsonify({'message': 'Chat updated successfully'}), 200

    except Exception as e:
        logger.error(f'Error updating chat: {str(e)}')
        return jsonify({'message': 'An error occurred'}), 500

@chat_bp.route('/<int:chat_id>', methods=['DELETE'])
def delete_chat(chat_id):
    try:
        chat = Chat.query.get(chat_id)
        if not chat:
            return jsonify({'message': 'Chat not found'}), 404

        db.session.delete(chat)
        db.session.commit()

        logger.info(f'Chat deleted: {chat}')
        return jsonify({'message': 'Chat deleted successfully'}), 200

    except Exception as e:
        logger.error(f'Error deleting chat: {str(e)}')
        return jsonify({'message': 'An error occurred'}), 500