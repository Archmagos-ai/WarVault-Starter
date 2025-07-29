from flask import Flask, jsonify
from yield_engine import get_yield_data

app = Flask(__name__)

@app.route('/')
def home():
    return jsonify({"message": "WarVault AI Backend is live!"})

@app.route('/yields')
def yields():
    data = get_yield_data()
    return jsonify(data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
