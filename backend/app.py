from flask import Flask
from flask_cors import CORS
from routes.predict import predict_bp
from routes.auth import auth_bp

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

app.register_blueprint(predict_bp, url_prefix='/api')
app.register_blueprint(auth_bp, url_prefix='/api')

@app.route('/health', methods=['GET'])
def health_check():
    return {"status": "AgriVision-AI API running successfully"}, 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)