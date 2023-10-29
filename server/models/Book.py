from ..app import db

class Book(db.Model):
    __tablename__ = "books"
    title = db.Column(db.String(), required=True)
    picture_url = db.Column(db.String(), required=False)
    isbn = db.Column(db.Integer(), required=False)
    book_author = db.Column(db.String(), required=False)
    year = db.Column(db.String(), required=False)
    rate = db.Column(db.Integer, max=5, min=1, default=0)
    dateread = db.Column(db.Date, required=False) #pass it as a datetime object, build with mydate = date(YYYY,MM,DD)
    datebegan = db.Column(db.Date, required=False) #same
    readingstatus = db.Column(db.String, required=True)
    author_id = db.Integer(db.Integer, db.ForeignKey("user.id"))
    

    def __init__(self, title, picture_url, isbn, book_author, year, dateread, datebegan, rate, readingstatus):
        self.title = title
        self.picture_url = picture_url
        self.isbn = isbn
        self.book_author = book_author
        self.year = year
        self.dateread = dateread
        self.datebegan = datebegan
        self.readingstatus = readingstatus
        self.rate = rate

    def to_dict(self):
        return {
            "title" : self.title,
            "picture_url" : self.picture_url,
            "isbn" : self.isbn,
            "book_author" : self.book_author,
            "year" : self.year,
            "dateread" : self.dateread,
            "datebegan" : self.datebegan,
            "readingstatus" : self.readingstatus,
            "rate" : self.rate
        }