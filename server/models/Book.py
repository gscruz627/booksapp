from ..app import db

class Book(db.Model):
    __tablename__ = "books"
    title = db.Column(db.String(), required=True)
    picture_url = db.Column(db.String(), required=False)
    isbn = db.Column(db.Integer(), required=False)
    author = db.Column(db.String(), required=False)
    year = db.Column(db.String(), required=False)
    dateread = db.Column(db.DateTime, required=False)

    def __init__(self, title, picture_url, isbn, author, year, dateread):
        self.title = title
        self.picture_url = picture_url
        self.isbn = isbn
        self.author = author
        self.year = year
        self.dateread = dateread

    def to_dict(self):
        return {
            "title" : self.title,
            "picture_url" : self.picture_url,
            "isbn" : self.isbn,
            "author" : self.author,
            "year" : self.year,
            "dateread" : self.dateread
        }