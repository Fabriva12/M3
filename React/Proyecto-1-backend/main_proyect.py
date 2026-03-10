from flask import Flask
from endpoints.user_endpoint_proyect import user_bp
from endpoints.product_endpoint_proyect import product_bp
from flask_cors import CORS

app = Flask(__name__)
app.register_blueprint(user_bp, url_prefix='/user')
app.register_blueprint(product_bp, url_prefix='/product')
CORS(app)

if __name__ == "__main__":
    app.run(debug=True)