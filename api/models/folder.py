# api/models/folder.py
from utils.db import db
from sqlalchemy.orm import relationship
from .base_model import BaseModel

class Folder(BaseModel):
    __tablename__ = 'folders'

    folder_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    folder_name = db.Column(db.String(255), nullable=False)
    parent_folder_id = db.Column(db.Integer, db.ForeignKey('folders.folder_id'), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=False)

    parent_folder = relationship('Folder', remote_side=[folder_id], back_populates='subfolders')
    subfolders = relationship('Folder', back_populates='parent_folder')
    user = relationship('User', back_populates='folders')
    chats = relationship('Chat', back_populates='folder')

    def __init__(self, folder_id=None, folder_name=None, parent_folder_id=None, user_id=None):
        if folder_id:
            folder = Folder.query.get(folder_id)
            if folder:
                self.__dict__.update(folder.__dict__)
        else:
            self.folder_name = folder_name
            self.parent_folder_id = parent_folder_id
            self.user_id = user_id

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return f'<Folder {self.folder_name}>'
