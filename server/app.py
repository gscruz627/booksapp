from flask import Flask
from flask_sqlalchemy import SQLAlchemy
app = Flask(__name__)

#NEED CONNECTION URL
#NEED TODICT FUNCTIONS ON USER AND BOOK
#TOMORROW WE DO BASIC ROUTING USING BLUEPRINTS, AUTH AND MAIN
#ALSO TEST USING POSTMAN
db = SQLAlchemy(app)

@app.route("/")
def home():
    return "hello world"
app.run(port=8000, debug=True)