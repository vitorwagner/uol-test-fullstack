from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.sqlite"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    CPF = db.Column(db.String(11), unique=True, nullable=False)
    phone = db.Column(db.String(11), unique=True, nullable=False)
    status = db.Column(db.String(80), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "CPF": self.CPF,
            "phone": self.phone,
            "status": self.status,
        }

    def __repr__(self):
        return "<User %r>" % self.name


@app.route("/api/users", methods=["GET"])
def get_users():
    users = User.query.all()
    return jsonify([user.serialize() for user in users])


@app.route("/api/users", methods=["POST"])
def create_user():
    data = request.get_json()
    new_user = User(
        name=data["name"],
        email=data["email"],
        CPF=data["CPF"],
        phone=data["phone"],
        status=data["status"],
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.serialize()), 201


if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True, port=8080)
