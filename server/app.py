from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route('/api/users', methods=['GET'])
def get_users():
    users = [
        {'id': 1, 'name': 'John', 'email': 'john@john.com', 'CPF': '123.456.789-00', 'phone': '1234567890', 'status': 'active'},
        {'id': 2, 'name': 'Jane', 'email': 'jane@jane.com', 'CPF': '123.456.789-00', 'phone': '1234567890', 'status': 'active'},
    ]
    return jsonify(users)

if __name__ == '__main__':
    app.run(debug=True, port=8080)