from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    CPF = db.Column(db.String(11), unique=True, nullable=False)
    phone = db.Column(db.String(11), unique=True, nullable=False)
    status = db.Column(db.String(80), nullable=False)

    def __repr__(self):
        return "<User %r>" % self.name


@app.route('/api/users', methods=['GET'])
def get_users():
    users = User.query.all()
    return jsonify([user.serialize() for user in users])

if __name__ == '__main__':
    with app.app_context():
        db.create_all()

    app.run(debug=True, port=8080)