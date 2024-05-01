# api/routes/sync_routes.py
from flask import Blueprint, jsonify
from models import User, Folder, Tag, Chat
from utils.logging import logger

sync_bp = Blueprint('sync', __name__, url_prefix='/api/sync')

@sync_bp.route('/<int:user_id>', methods=['GET'])
def sync_data(user_id):
    try:
        user = User.query.get(user_id)
        if not user:
            return jsonify({'message': 'User not found'}), 404

        folders = Folder.query.filter_by(user_id=user_id).all()
        tags = Tag.query.filter_by(user_id=user_id).all()
        chats = Chat.query.join(Folder).filter(Folder.user_id == user_id).all()

        sync_data = {
            'folders': [folder.folder_name for folder in folders],
            'tags': [tag.tag_name for tag in tags],
            'chats': [chat.content for chat in chats]
        }

        logger.info(f'Data synced for user: {user}')
        return jsonify(sync_data), 200

    except Exception as e:
        logger.error(f'Error syncing data: {str(e)}')
        return jsonify({'message': 'An error occurred'}), 500