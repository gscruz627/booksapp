from db import db

class Book(db.Model):
    __tablename__ = "books"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    picture_url = db.Column(db.String())
    isbn = db.Column(db.Integer())
    book_author = db.Column(db.String())
    year = db.Column(db.String())
    rate = db.Column(db.Integer, default=0)
    dateread = db.Column(db.Date) #pass it as a datetime object, build with mydate = date(YYYY,MM,DD)
    datebegan = db.Column(db.Date) #same
    readingstatus = db.Column(db.String)
    category = db.Column(db.String)
    author_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    

    def __init__(self, title, picture_url, isbn, book_author, year, dateread, datebegan, rate, readingstatus, category):
        self.title = title
        self.picture_url = picture_url
        self.isbn = isbn
        self.book_author = book_author
        self.year = year
        self.dateread = dateread
        self.datebegan = datebegan
        self.readingstatus = readingstatus
        self.rate = rate
        self.category = category

    def to_dict(self):
        return {
            "id" : self.id,
            "title" : self.title,
            "picture_url" : self.picture_url,
            "isbn" : self.isbn,
            "book_author" : self.book_author,
            "year" : self.year,
            "dateread" : self.dateread,
            "datebegan" : self.datebegan,
            "readingstatus" : self.readingstatus,
            "rate" : self.rate,
            "category" : self.category
        }
    
class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String())
    password = db.Column(db.String())
    books = db.relationship("Book", backref="author", lazy="dynamic")

    def __init__(self, username, password):
        self.username = username
        self.password = password

    def to_dict(self):
        return {
            "id" : self.id,
            "username" : self.username,
            "password" : self.password,
        }