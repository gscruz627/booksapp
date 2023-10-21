from ..app import db
class User(db.Model):
    __tablename__ = "users"
    username = db.Column(db.String(), required=True)
    password = db.Column(db.String(), required=True)
    role = db.Column(db.String(), required=True)
    books = db.relationship("Book")

    def __init__(self, username, password, role):
        self.username = username
        self.password = password
        self.role = role

    def to_dict(self):
        return {
            "username" : self.username,
            "password" : self.password,
            "role" : self.role,
            "books" : dict(self.books)
        }