# api/tests/test_folder_routes.py
import unittest
from app import app, db
from models import User, Folder

class FolderRoutesTestCase(unittest.TestCase):
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

    def test_create_folder(self):
        user = User(username='testuser', password='password', email='test@example.com')
        with app.app_context():
            db.session.add(user)
            db.session.commit()

        folder_data = {
            'folder_name': 'Test Folder',
            'user_id': user.user_id
        }
        response = self.client.post('/api/folders', json=folder_data)
        self.assertEqual(response.status_code, 201)
        response_data = response.get_json()
        self.assertEqual(response_data, {'message': 'Folder created successfully'})

    def test_get_folder(self):
        user = User(username='testuser', password='password', email='test@example.com')
        folder = Folder(folder_name='Test Folder', user_id=user.user_id)
        with app.app_context():
            db.session.add(user)
            db.session.add(folder)
            db.session.commit()

        response = self.client.get(f'/api/folders/{folder.folder_id}')
        self.assertEqual(response.status_code, 200)
        response_data = response.get_json()
        self.assertEqual(response_data['folder_name'], 'Test Folder')

    def test_update_folder(self):
        user = User(username='testuser', password='password', email='test@example.com')
        folder = Folder(folder_name='Test Folder', user_id=user.user_id)
        with app.app_context():
            db.session.add(user)
            db.session.add(folder)
            db.session.commit()

        update_data = {'folder_name': 'Updated Folder'}
        response = self.client.put(f'/api/folders/{folder.folder_id}', json=update_data)
        self.assertEqual(response.status_code, 200)
        response_data = response.get_json()
        self.assertEqual(response_data, {'message': 'Folder updated successfully'})

    def test_delete_folder(self):
        user = User(username='testuser', password='password', email='test@example.com')
        folder = Folder(folder_name='Test Folder', user_id=user.user_id)
        with app.app_context():
            db.session.add(user)
            db.session.add(folder)
            db.session.commit()

        response = self.client.delete(f'/api/folders/{folder.folder_id}')
        self.assertEqual(response.status_code, 200)
        response_data = response.get_json()
        self.assertEqual(response_data, {'message': 'Folder deleted successfully'})

if __name__ == '__main__':
    unittest.main()
