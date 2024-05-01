# api/models/tag.py
from utils.db import db
from sqlalchemy.orm import relationship
from .base_model import BaseModel

class Tag(BaseModel):
    __tablename__ = 'tags'

    tag_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    tag_name = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)

    user = relationship('User', back_populates='tags')
    chats = relationship('Chat', secondary='chat_tags', back_populates='tags')

    def __init__(self, tag_id=None, tag_name=None, user_id=None):
        if tag_id:
            tag = Tag.query.get(tag_id)
            if tag:
                self.__dict__.update(tag.__dict__)
        else:
            self.tag_name = tag_name
            self.user_id = user_id

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return f'<Tag {self.tag_name}>'
