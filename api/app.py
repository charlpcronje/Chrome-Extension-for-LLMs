# api/app.py
import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Import routes
from routes.user_routes import user_bp
from routes.folder_routes import folder_bp
from routes.tag_routes import tag_bp
from routes.chat_routes import chat_bp
from routes.sync_routes import sync_bp

# Register blueprints
app.register_blueprint(user_bp)
app.register_blueprint(folder_bp)
app.register_blueprint(tag_bp)
app.register_blueprint(chat_bp)
app.register_blueprint(sync_bp)

if __name__ == '__main__':
    host = os.getenv('HOST',"0.0.0.0")
    port = int(os.getenv('PORT',8122))
    debug = os.getenv('DEBUG') == 'True'
    app.run(host=host, port=port, debug=debug)