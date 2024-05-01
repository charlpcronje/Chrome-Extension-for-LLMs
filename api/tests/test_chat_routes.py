# api/tests/test_chat_routes.py
import unittest
from app import app, db
from models import User, Folder, Chat

class ChatRoutesTestCase(unittest.TestCase):
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

    def test_create_chat(self):
        user = User(username='testuser', password='password', email='test@example.com')
        folder = Folder(folder_name='Test Folder', user_id=user.user_id)
        with app.app_context():
            db.session.add(user)
            db.session.add(folder)
            db.session.commit()

        chat_data = {
            'content': 'Test Chat Content',
            'folder_id': folder.folder_id
        }
        response = self.client.post('/api/chats', json=chat_data)
        self.assertEqual(response.status_code, 201)
        response_data = response.get_json()
        self.assertEqual(response_data, {'message': 'Chat created successfully'})

    def test_get_chat(self):
        user = User(username='testuser', password='password', email='test@example.com')
        folder = Folder(folder_name='Test Folder', user_id=user.user_id)
        chat = Chat(content='Test Chat Content', folder_id=folder.folder_id)
        with app.app_context():
            db.session.add(user)
            db.session.add(folder)
            db.session.add(chat)
            db.session.commit()

        response = self.client.get(f'/api/chats/{chat.chat_id}')
        self.assertEqual(response.status_code, 200)
        response_data = response.get_json()
        self.assertEqual(response_data['content'], 'Test Chat Content')

    def test_update_chat(self):
        user = User(username='testuser', password='password', email='test@example.com')
        folder = Folder(folder_name='Test Folder', user_id=user.user_id)
        chat = Chat(content='Test Chat Content', folder_id=folder.folder_id)
        with app.app_context():
            db.session.add(user)
            db.session.add(folder)
            db.session.add(chat)
            db.session.commit()

        update_data = {'content': 'Updated Chat Content'}
        response = self.client.put(f'/api/chats/{chat.chat_id}', json=update_data)
        self.assertEqual(response.status_code, 200)
        response_data = response.get_json()
        self.assertEqual(response_data, {'message': 'Chat updated successfully'})

    def test_delete_chat(self):
        user = User(username='testuser', password='password', email='test@example.com')
        folder = Folder(folder_name='Test Folder', user_id=user.user_id)
        chat = Chat(content='Test Chat Content', folder_id=folder.folder_id)
        with app.app_context():
            db.session.add(user)
            db.session.add(folder)
            db.session.add(chat)
            db.session.commit()

        response = self.client.delete(f'/api/chats/{chat.chat_id}')
        self.assertEqual(response.status_code, 200)
        response_data = response.get_json()
        self.assertEqual(response_data, {'message': 'Chat deleted successfully'})

if __name__ == '__main__':
    unittest.main()
