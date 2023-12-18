from flask import Flask
from flask_cors import CORS
from db import db
app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://mnuihgeo:7HmG4WxWR5U8E2TPH12NhwwxfTeOUPGM@berry.db.elephantsql.com/mnuihgeo"
db.init_app(app)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

from routing.authroutes import auth as auth_blueprint
from routing.mainroutes import main as main_blueprint
app.register_blueprint(auth_blueprint)
app.register_blueprint(main_blueprint)

from models import Book,User
with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(port=8000, debug=True)