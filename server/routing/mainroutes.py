from flask import Blueprint, request, jsonify, Response
from flask_cors import cross_origin
from db import db
from models import User,Book,Category
from verifyToken import verifyToken
from os import getenv
from datetime import datetime

main = Blueprint("main", __name__)
CLIENT_URL = getenv("CLIENT_URL")


@main.route("/create", methods=["POST"])
@cross_origin(origins=CLIENT_URL, supports_credentials=True)
@verifyToken
def createBook():
    author_id = request.json["id"]
    title = request.json["title"]
    author = request.json["author"]
    isbn = request.json["isbn"]
    image = request.json["image"]
    rate = request.json["rate"]
    readingstatus = request.json["readingstatus"]
    year = request.json["year"]
    category = request.json["category"]
    dateread = None
    datebegan = None
    if readingstatus not in ["Read", "Want to Read", "Reading"]:
        return jsonify({"message" : "Error: Wrong.formatting"}, 400)
    if readingstatus in ["Read", "Reading"]:
        dateread = request.json["dateread"]
        datebegan = request.json["datebegan"]
    book = Book(title=title, book_author=author, isbn=isbn, picture_url=image, rate=rate, readingstatus=readingstatus, dateread=datetime.strptime(dateread, '%Y-%m-%d'), datebegan=datetime.strptime(datebegan, '%Y-%m-%d'), year=year, category=category, author_id=author_id)
    db.session.add(book)
    db.session.commit()
    return jsonify({"message" : "OK"}, 201)

@main.route("/book/<int:id>")
@cross_origin(origins=CLIENT_URL, supports_credentials=True)
@verifyToken
def returnBook(id):
    book = Book.query.filter_by(id=id).first()
    if not book:
        return jsonify({"Message": "Book not found"}, 404)
    return jsonify({"book" : book.to_dict()}, 200)

@main.route("/books/<int:userId>")
@cross_origin(origins=CLIENT_URL, supports_credentials=True)
@verifyToken
def returnAllBooks(userId):
    books = Book.query.filter_by(author_id=userId)
    return jsonify({"books" : list(map(lambda book: book.to_dict(), books))}, 200)

@main.route("/editbook/<int:id>", methods=["POST"])
@verifyToken
@cross_origin(origins=CLIENT_URL, supports_credentials=True)
def editBook(id, userId):
    userId = request.json["userId"]
    book = Book.query.filter_by(id=id).first()
    if book.author_id != userId:
        return jsonify({"message" : "Authentication Error"}, 401)
    editinfo = request.json["info"]
    editinfo = dict(editinfo)
    for k,v in editinfo.items():
        book[k] = v
    db.commit()
    return jsonify({"book" : book.to_dict()}, 200)

@main.route("/deletebook/<int:id>", methods=["DELETE"])
@cross_origin(origins=CLIENT_URL, supports_credentials=True)
@verifyToken
def deleteBook(id, userId):
    userId = request.json["userId"]
    book = Book.query.filter_by(id=id).first()
    if book.author_id != userId:
        return jsonify({"message" : "Authentication Error"}, 401)
    book.delete()
    db.commit()
    return jsonify({"message" : "OK"}, 200)

@main.route("/createcategory", methods=["POST"])
@cross_origin(origins=CLIENT_URL, supports_credentials=True)
@verifyToken
def createCategory():
    name = request.json["name"]
    user_id = request.json["user_id"]
    category = Category(name=name, author_id=user_id)
    db.session.add(category)
    db.session.commit()
    categories = Category.query.filter_by(author_id=user_id)
    return jsonify({"categories": list(map(lambda category: category.to_dict(), categories))}, 201)
# register
# login
# create a book
# return i.jsonation of book
#EDIT
# edit rate
# edit title
# edit image
# edit author
# edit isbn
# edit dates
# edit read status
# delete a book
# search results
# wrap everything in try except