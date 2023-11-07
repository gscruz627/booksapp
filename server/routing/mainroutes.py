from flask import Blueprint, request, jsonify
from db import db
from models import User,Book
from verifyToken import verifyToken

main = Blueprint("main", __name__)

@main.route("/create", methods=["POST"])
@verifyToken
def createBook():
    title = request.form["title"]
    author = request.form["author"]
    isbn = request.form["isbn"]
    image = request.form["image"]
    rate = request.form["rate"]
    readingstatus = request.form["readingstatus"]
    if readingstatus not in ["Read", "Want to read", "Reading"]:
        return jsonify({"message" : "Error: Wrong formatting"}, 400)
    if readingstatus in ["Read", "Reading"]:
        dateread = request.form["dateread"]
        datebegan = request.form["datebegan"]
    book = Book(title=title, author=author, isbn=isbn, picture_url=image, rate=rate, readingstatus=readingstatus, dateread=dateread, datebegan=datebegan)
    db.session.add(book)
    db.commit()
    return jsonify({"message" : "OK"}, 201)

@main.route("/book/<int:id>")
@verifyToken
def returnBook(id):
    book = Book.query.filter_by(id=id).first()
    if not book:
        return jsonify({"Message": "Book not found"}, 404)
    return jsonify({"book" : book.to_dict()}, 200)

@main.route("/books/<int:userId>")
@verifyToken
def returnAllBooks(userId):
    books = Book.query.filter_by(author_id=userId)
    return jsonify({"books" : map(lambda obj: obj.to_dict(), books)}, 200)

@main.route("/editbook/<int:id>", methods=["POST"])
@verifyToken
def editBook(id, userId):
    userId = request.form["userId"]
    book = Book.query.filter_by(id=id).first()
    if book.author_id != userId:
        return jsonify({"message" : "Authentication Error"}, 401)
    editinfo = request.form["info"]
    editinfo = dict(editinfo)
    for k,v in editinfo.items():
        book[k] = v
    db.commit()
    return jsonify({"book" : book.to_dict()}, 200)

@main.route("/deletebook/<int:id>", methods=["DELETE"])
@verifyToken
def deleteBook(id, userId):
    userId = request.form["userId"]
    book = Book.query.filter_by(id=id).first()
    if book.author_id != userId:
        return jsonify({"message" : "Authentication Error"}, 401)
    book.delete()
    db.commit()
    return jsonify({"message" : "OK"}, 200)

# register
# login
# create a book
# return information of book
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