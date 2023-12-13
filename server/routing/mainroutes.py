from flask import Blueprint, request, jsonify, Response
from flask_cors import cross_origin
from db import db
from models import User,Book,Category
from verifyToken import verifyToken
from os import getenv
from datetime import datetime
from urllib.parse import unquote

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
    spinecolor = request.json["spinecolor"]
    spinetext = request.json["spinetext"]
    dateread = None
    datebegan = None
    if readingstatus not in ["Read", "Want to Read", "Reading"]:
        return jsonify({"message" : "Error: Wrong.formatting"}, 400)
    if readingstatus in ["Read", "Reading"]:
        if readingstatus == "Read":
            dateread = datetime.strptime(request.json["dateread"], '%Y-%m-%d')
        datebegan = datetime.strptime(request.json["datebegan"], '%Y-%m-%d')
    book = Book(title=title, book_author=author, isbn=isbn, picture_url=image, rate=rate, readingstatus=readingstatus, dateread=dateread, datebegan=datebegan, year=year, category=category, author_id=author_id, spinecolor=spinecolor, spinetext=spinetext)
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
def returnBooks(userId):
    if request.args.get('category'):
        books = Book.query.filter_by(author_id=userId, textcategory=request.args.get('category'))
    else:
        books = Book.query.filter_by(author_id=userId)
    return jsonify({"books" : list(map(lambda book: book.to_dict(), books))}, 200)

@main.route("/editbook/<int:id>", methods=["POST"])
@verifyToken
@cross_origin(origins=CLIENT_URL, supports_credentials=True)
def editBook(id):
    userId = request.json["userId"]
    book = Book.query.filter_by(id=id).first()
    if book.author_id != userId:
        return jsonify({"message" : "Authentication Error"}, 401)
    editinfo = request.json["info"]
    editinfo = dict(editinfo)
    for k,v in editinfo.items():
        setattr(book,k,v)
    db.session.commit()
    book = Book.query.filter_by(id=id).first()
    return jsonify({"book" : book.to_dict()}, 200)

@main.route("/deletebook/<int:id>", methods=["DELETE"])
@cross_origin(origins=CLIENT_URL, supports_credentials=True)
@verifyToken
def deleteBook(id):
    userId = request.json["userId"]
    currentCategory = request.json["category"]
    book = Book.query.filter_by(id=id).first()
    if book.author_id != userId:
        return jsonify({"message" : "Authentication Error"}, 401)
    db.session.delete(book)
    db.session.commit()
    if currentCategory:        
        books = Book.query.filter_by(author_id=userId, textcategory=currentCategory)
    else:
        books = Book.query.filter_by(author_id=userId)
    return jsonify({"books" : list(map(lambda book: book.to_dict(), books))}, 200)

@main.route("/newcategory", methods=["POST"])
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

@main.route("/editcategory/<int:id>", methods=["POST"])
@cross_origin(origins=CLIENT_URL, supports_credentials=True)
@verifyToken
def editCategory(id):
    category = Category.query.filter_by(id=id).first()
    userId = request.json["userId"]
    newname = request.json["newname"]
    if category.author_id != userId:
        return jsonify({"message" : "Authentication Error"}, 403)
    category.name = newname
    db.session.commit()
    category = Category.query.filter_by(id=id).first()
    return jsonify({"category": category.to_dict()}, 200)

@main.route("/deletecategory/<int:id>", methods=["DELETE"])
@cross_origin(origins=CLIENT_URL, supports_credentials=True)
@verifyToken
def deleteCategory(id):
    userId = request.json["userId"]
    category = Category.query.filter_by(id=id).first()
    if category.author_id != userId:
        return jsonify({"message" : "Authentication Error"}, 401)
    db.session.delete(category)
    db.session.commit()
    categories = Category.query.filter_by(author_id=userId)
    return jsonify({"categories" : list(map(lambda category: category.to_dict(), categories))}, 200)

@main.route("/categories/<int:user_id>")
@cross_origin(origins=CLIENT_URL, supports_credentials=True)
@verifyToken
def categories(user_id):
    categories = Category.query.filter_by(author_id=user_id)
    if not categories:
        return []
    return jsonify({"categories" : list(map(lambda category: category.to_dict(), categories))}, 200)

@main.route("/addcols", methods=["POST"])
@cross_origin(origins=CLIENT_URL, supports_credentials=True)
@verifyToken
def addCols():
    id = request.json["id"]
    category = Category.query.filter_by(id=id).first()
    category.columns += 1
    db.session.commit()
    print(category)
    return jsonify({"category": category.to_dict()}, 200)

@main.route("/delcols", methods=["POST"])
@cross_origin(origins=CLIENT_URL, supports_credentials=True)
@verifyToken
def delCols():
    id = request.json["id"]
    category = Category.query.filter_by(id=id).first()
    category.columns -= 1
    db.session.commit()
    return jsonify({"category": category.to_dict()}, 200)

@main.route("/addrows", methods=["POST"])
@cross_origin(origins=CLIENT_URL, supports_credentials=True)
@verifyToken
def addRows():
    id = request.json["id"]
    category = Category.query.filter_by(id=id).first()
    category.rows += 1
    db.session.commit()
    return jsonify({"category": category.to_dict()}, 200)

@main.route("/delrows", methods=["POST"])
@cross_origin(origins=CLIENT_URL, supports_credentials=True)
@verifyToken
def delRows():
    id = request.json["id"]
    category = Category.query.filter_by(id=id).first()
    category.rows -= 1
    db.session.commit()
    return jsonify({"category": category.to_dict()}, 200)