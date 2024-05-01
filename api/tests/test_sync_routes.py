# api/tests/test_sync_routes.py
import unittest
from app import app, db
from models import User, Folder, Tag, Chat

class SyncRoutesTestCase(unittest.TestCase):
    def setUp(self):
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
        self.client = app.test_client()
        with app.app_context():
            db.create_all()

    def tearDown(self):
        with app.app_context():
            db.session.remove()
            db.drop_all()

    def test_sync_data(self):
        user = User(username='testuser', password='password', email='test@example.com')
        folder = Folder(folder_name='Test Folder', user_id=user.user_id)
        tag = Tag(tag_name='Test Tag', user_id=user.user_id)
        chat = Chat(content='Test Chat Content', folder_id=folder.folder_id)
        with app.app_context():
            db.session.add(user)
            db.session.add(folder)
            db.session.add(tag)
            db.session.add(chat)
            db.session.commit()

        response = self.client.get(f'/api/sync/{user.user_id}')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, {
            'folders': ['Test Folder'],
            'tags': ['Test Tag'],
            'chats': ['Test Chat Content']
        })

if __name__ == '__main__':
    unittest.main()