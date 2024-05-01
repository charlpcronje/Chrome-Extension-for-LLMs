# api/models/chat.py
from utils.db import db
from sqlalchemy.orm import relationship
from .base_model import BaseModel

class Chat(BaseModel):
    __tablename__ = 'chats'

    chat_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    content = db.Column(db.Text, nullable=False)
    folder_id = db.Column(db.Integer, db.ForeignKey('folders.folder_id'), nullable=True)

    folder = relationship('Folder', back_populates='chats')
    tags = relationship('Tag', secondary='chat_tags', back_populates='chats')

    def __init__(self, chat_id=None, content=None, folder_id=None):
        if chat_id:
            chat = Chat.query.get(chat_id)
            if chat:
                self.__dict__.update(chat.__dict__)
        else:
            self.content = content
            self.folder_id = folder_id

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return f'<Chat {self.chat_id}>'
