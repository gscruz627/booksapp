from flask import request, jsonify
from functools import wraps
import jwt
from os import getenv
JWT_KEY = getenv("JWT_KEY")
def verifyToken(func):
    @wraps(func)
    def decorated(*args, **kwargs):
        token = None
        if "Authentication" in request.headers:
            token = request.headers["Authentication"]
        if not token:
            return jsonify({"Message" : "Token not found"}, 401)
        try:
            data = jwt.decode(token, JWT_KEY, algorithms="HS256")
        except:
            return jsonify({"Message" : "Token is invalid, authentication error"}, 401)
    return func
