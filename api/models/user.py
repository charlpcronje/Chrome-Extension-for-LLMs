# api/models/user.py
from utils.db import db
from sqlalchemy.orm import relationship
from .base_model import BaseModel

class User(BaseModel):
    __tablename__ = 'users'

    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)

    folders = relationship('Folder', back_populates='user')
    tags = relationship('Tag', back_populates='user')

    def __init__(self, user_id=None, username=None, password=None, email=None):
        if user_id:
            user = User.query.get(user_id)
            if user:
                self.__dict__.update(user.__dict__)
        else:
            self.username = username
            self.password = password
            self.email = email

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return f'<User {self.username}>'
