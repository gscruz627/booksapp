from flask import Flask
from flask_sqlalchemy import SQLAlchemy
app = Flask(__name__)

#NEED CONNECTION URL
#ALSO TEST USING POSTMAN
# DEAl with connection stuff
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres:Sisnacrack40$@5432/books"
db = SQLAlchemy(app)

@app.route("/")
def home():
    return "hello world"
app.run(port=8000, debug=True)