# api/tests/test_tag_routes.py
import unittest
from app import app, db
from models import User, Tag

class TagRoutesTestCase(unittest.TestCase):
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

    def test_create_tag(self):
        user = User(username='testuser', password='password', email='test@example.com')
        with app.app_context():
            db.session.add(user)
            db.session.commit()

        tag_data = {
            'tag_name': 'Test Tag',
            'user_id': user.user_id
        }
        response = self.client.post('/api/tags', json=tag_data)
        self.assertEqual(response.status_code, 201)
        response_data = response.get_json()
        self.assertEqual(response_data, {'message': 'Tag created successfully'})

    def test_get_tag(self):
        user = User(username='testuser', password='password', email='test@example.com')
        tag = Tag(tag_name='Test Tag', user_id=user.user_id)
        with app.app_context():
            db.session.add(user)
            db.session.add(tag)
            db.session.commit()

        response = self.client.get(f'/api/tags/{tag.tag_id}')
        self.assertEqual(response.status_code, 200)
        response_data = response.get_json()
        self.assertEqual(response_data['tag_name'], 'Test Tag')

    def test_update_tag(self):
        user = User(username='testuser', password='password', email='test@example.com')
        tag = Tag(tag_name='Test Tag', user_id=user.user_id)
        with app.app_context():
            db.session.add(user)
            db.session.add(tag)
            db.session.commit()

        update_data = {'tag_name': 'Updated Tag'}
        response = self.client.put(f'/api/tags/{tag.tag_id}', json=update_data)
        self.assertEqual(response.status_code, 200)
        response_data = response.get_json()
        self.assertEqual(response_data, {'message': 'Tag updated successfully'})

    def test_delete_tag(self):
        user = User(username='testuser', password='password', email='test@example.com')
        tag = Tag(tag_name='Test Tag', user_id=user.user_id)
        with app.app_context():
            db.session.add(user)
            db.session.commit()

        response = self.client.delete(f'/api/tags/{tag.tag_id}')
        self.assertEqual(response.status_code, 200)
        response_data = response.get_json()
        self.assertEqual(response_data, {'message': 'Tag deleted successfully'})

if __name__ == '__main__':
    unittest.main()
