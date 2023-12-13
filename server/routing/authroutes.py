from flask import request, Blueprint, jsonify
from flask_cors import cross_origin
from models import User
from db import db
from werkzeug.security import generate_password_hash, check_password_hash, gen_salt
import jwt
from os import getenv

auth = Blueprint("auth", __name__)

jwtkey = getenv("JWT_KEY")
CLIENT_URL = getenv("CLIENT_URL")

@auth.route("/register", methods=["POST"])
@cross_origin(origins=CLIENT_URL, supports_credentials=True)
def register():
    username = request.json["username"]
    password = request.json["password"]
    hashedPassword = generate_password_hash(password, method="sha512", salt_length=256)
    user = User(username=username, password=hashedPassword)
    db.session.add(user)
    db.session.commit()
    return jsonify({"message" : "OK"}, 201)

@auth.route("/login", methods=["POST"])
@cross_origin(origins=CLIENT_URL, supports_credentials=True)
def login():
    username = request.json["username"]
    password = request.json["password"]
    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({"message" : "Authentication error"}, 400)
    isPasswordAuth = check_password_hash(user.password, password)
    if not isPasswordAuth:
        return jsonify({"message" : "Authentication Error"}, 400)
    token = jwt.encode({"user": user.to_dict()}, key=jwtkey, algorithm="HS256")

    return jsonify({"user" : user.to_dict(), "token" : token}, 201)   
    