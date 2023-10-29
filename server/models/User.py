from ..app import db
class User(db.Model):
    __tablename__ = "users"
    username = db.Column(db.String(), required=True)
    password = db.Column(db.String(), required=True)
    books = db.relationship("Book", backref="author", lazy=True)

    def __init__(self, username, password, role):
        self.username = username
        self.password = password

    def to_dict(self):
        return {
            "username" : self.username,
            "password" : self.password,
            "books" : dict(self.books)
        }