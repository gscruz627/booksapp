from flask import Flask
from flask_cors import CORS
from db import db
from routing.authroutes import auth as auth_blueprint
from routing.mainroutes import main as main_blueprint
from models import Book, User
from os import getenv

postgreslink = getenv("POSTGRES_LINK")

def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = str(postgreslink)
    db.init_app(app)
    app.config['CORS_HEADERS'] = 'Content-Type'
    app.register_blueprint(auth_blueprint)
    cors = CORS(app)
    app.register_blueprint(main_blueprint)
    with app.app_context():
        db.create_all()
    return app
