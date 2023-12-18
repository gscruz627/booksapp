from db import db

class Book(db.Model):
    __tablename__ = "books"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    picture_url = db.Column(db.String(), nullable=True)
    isbn = db.Column(db.String(), nullable=True)
    book_author = db.Column(db.String(), nullable=True)
    year = db.Column(db.String(), nullable=True)
    rate = db.Column(db.Integer, nullable=True)
    dateread = db.Column(db.Date, nullable=True) #pass it as a datetime object, build with mydate = date(YYYY,MM,DD)
    datebegan = db.Column(db.Date, nullable=True) #same
    readingstatus = db.Column(db.String, nullable=True)
    ownercategory_id = db.Column(db.Integer, db.ForeignKey("categories.id"), nullable=True)
    author_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    spinecolor = db.Column(db.String(), default="FFFFFF")
    spinetext = db.Column(db.String(), default="000000")
    textcategory = db.Column(db.String())

    def __init__(self, title, picture_url, isbn, book_author, year, dateread, datebegan, rate, readingstatus, category, author_id, spinecolor, spinetext):
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
        self.author_id = author_id
        self.textcategory = category
        self.spinecolor =  spinecolor,
        self.spinetext = spinetext

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
            "category" : self.textcategory,
            "spinecolor": self.spinecolor,
            "spinetext":self.spinetext
        }
    
class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String())
    password = db.Column(db.String())
    books = db.relationship("Book", backref="author", lazy="dynamic")
    categories = db.relationship("Category", backref="author", lazy="dynamic")

    def __init__(self, username, password):
        self.username = username
        self.password = password

    def to_dict(self):
        return {
            "id" : self.id,
            "username" : self.username,
            "password" : self.password,
        }
    
class Category(db.Model):
    __tablename__ = "categories"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    books = db.relationship("Book", backref="ownercategory", lazy="dynamic")

    def __init__(self, name, author_id):
        self.name = name,
        self.author_id = author_id

    def to_dict(self):
        return {
            "id" : self.id,
            "name" : self.name,
        }