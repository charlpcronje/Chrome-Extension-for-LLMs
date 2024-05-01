# api/tests/test_user_routes.py
import unittest
from app import app, db
from models import User

class UserRoutesTestCase(unittest.TestCase):
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

    def test_create_user(self):
        user_data = {'username': 'testuser', 'password': 'password', 'email': 'test@example.com'}
        response = self.client.post('/api/users', json=user_data)
        self.assertEqual(response.status_code, 201)
        response_data = response.get_json()
        self.assertEqual(response_data, {'message': 'User created successfully'})

    def test_login_user(self):
        user = User(username='testuser', password='password', email='test@example.com')
        with app.app_context():
            db.session.add(user)
            db.session.commit()

        login_data = {'username': 'testuser', 'password': 'password'}
        response = self.client.post('/api/users/login', json=login_data)
        self.assertEqual(response.status_code, 200)
        response_data = response.get_json()
        self.assertIn('token', response_data)

    def test_update_user(self):
        user = User(username='testuser', password='password', email='test@example.com')
        with app.app_context():
            db.session.add(user)
            db.session.commit()

        update_data = {'username': 'updateduser', 'password': 'newpassword', 'email': 'updated@example.com'}
        response = self.client.put(f'/api/users/{user.user_id}', json=update_data)
        self.assertEqual(response.status_code, 200)
        response_data = response.get_json()
        self.assertEqual(response_data, {'message': 'User updated successfully'})

if __name__ == '__main__':
    unittest.main()
