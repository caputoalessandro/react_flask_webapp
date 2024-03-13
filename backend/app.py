from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from config import DB_PASSWORD
import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql://postgres:{DB_PASSWORD}@localhost/book_shop"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Order matters: Initialize SQLAlchemy before Marshmallow
db = SQLAlchemy(app)
ma = Marshmallow(app)


class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150))
    author = db.Column(db.String(50))
    pubblication = db.Column(db.DateTime, default=datetime.datetime.now().strftime("%x"))
    price = db.Column(db.Float(1))

    def __init__(self, title, author, price):
        self.title = title
        self.author = author
        self.price = price


class BookSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Book
        include_fk = True


# with app.app_context():
#     db.create_all()

book_schema = BookSchema(many=True)


@app.route('/get', methods=['GET'])
def get_all_articles():
    all_articles = Book.query.all()
    return book_schema.dump(all_articles)


@app.route('/get/<id>/', methods=['GET'])
def get_id(id):
    result = Book.query.get(id)
    return book_schema.jsonify([result])


@app.route('/update/<id>/', methods=['PUT'])
def update_article(id):
    article = Book.query.get(id)

    title = request.json["title"]
    author = request.json["author"]

    article.title = title
    article.author = author

    db.session.commit()
    return book_schema.jsonify([article])


@app.route('/delete/<id>/', methods=['DELETE'])
def delete_article(id):
    article = Book.query.get(id)

    db.session.delete(article)
    db.session.commit()

    return book_schema.jsonify([article])


@app.route('/add', methods=['POST'])
def add_article():
    title = request.json["title"]
    author = request.json["author"]
    price = request.json["price"]

    books = Book(title, author, price)
    db.session.add(books)
    db.session.commit()

    return book_schema.dump(books)


if __name__ == "__main__":
    app.run(debug=True)