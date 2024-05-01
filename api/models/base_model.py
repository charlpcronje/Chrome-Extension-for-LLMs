# api/models/base_model.py
from utils.db import db
from datetime import datetime
from sqlalchemy import event
from sqlalchemy.orm import relationship

class BaseModel(db.Model):
    __abstract__ = True

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    created_by = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=True)
    updated_by = db.Column(db.Integer, db.ForeignKey('users.user_id'), nullable=True)

def before_update(mapper, connection, target):
    target.updated_at = datetime.utcnow()

# Register the before_update event for the BaseModel
event.listen(BaseModel, 'before_update', before_update)
