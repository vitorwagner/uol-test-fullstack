from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_expects_json import expects_json
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
    

schema = {
    "type": "object",
    "properties": {
        "name": {"type": "string"},
        "email": {"type": "string"},
        "CPF": {"type": "string", "pattern": "^([0-9]){3}\.([0-9]){3}\.([0-9]){3}-([0-9]){2}$"},
        "phone": {"type": "string", "pattern": "^\([1-9]{2}\) (?:[2-8]|9[0-9])[0-9]{3}\-[0-9]{4}$"},
        "status": {"type": "string"},
    },
    "required": ["name", "email", "CPF", "phone", "status"],
}


@app.route("/api/users", methods=["GET"])
def get_users():
    users = db.session.execute(db.select(User)).scalars()
    return jsonify([user.serialize() for user in users])


@app.route("/api/users", methods=["POST"])
@expects_json(schema)
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

@app.route("/api/users/delete/<int:id>", methods=["DELETE"])
def delete_user(id):
    user = db.session.get(User, id)
    if user is None:
        return "User not found", 404
    db.session.delete(user)
    db.session.commit()
    return jsonify(user.serialize()), 200

@app.route("/api/users/update/<int:id>", methods=["PUT"])
@expects_json(schema)
def update_user(id):
    user = db.session.get(User, id)
    if user is None:
        return "User not found", 404
    data = request.get_json()
    user.name = data["name"]
    user.email = data["email"]
    user.CPF = data["CPF"]
    user.phone = data["phone"]
    user.status = data["status"]
    db.session.commit()
    return jsonify(user.serialize()), 200

@app.route("/api/users/<int:id>", methods=["GET"])
def get_user(id):
    user = db.session.get(User, id)
    if user is None:
        return "User not found", 404
    return jsonify(user.serialize())


if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True, port=8080)
