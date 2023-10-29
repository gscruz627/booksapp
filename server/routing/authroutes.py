from flask import request, Blueprint, jsonify
from ..models.User import User
from ..app import db
from werkzeug.security import generate_password_hash, check_password_hash, gen_salt
import jwt
from os import getenv

auth = Blueprint(__name__)

jwtkey = getenv("JWT_KEY")

@auth.route("/register")
def register():
    username = request.form["username"]
    password = request.form["password"]
    hashedPassword = generate_password_hash(password, method="sha512", salt_length=256)
    user = User(username=username, password=hashedPassword)
    return jsonify({"message" : "OK"}, 201)

@auth.route("/login")
def login():
    username = request.form["username"]
    password = request.form["password"]
    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({"message" : "Authentication Error"}, 400)
    isPasswordAuth = check_password_hash(user.password, password)
    if not isPasswordAuth:
        return jsonify({"message" : "Authentication Error"}, 400)
    token = jwt.encode({user: user}, key=jwtkey, algorithm=["HS256"])

    return jsonify({"user" : user.to_dict()}, 201)
    
    