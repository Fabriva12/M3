from flask import Flask
from endpoints.user_endpoint_proyect import user_bp
from endpoints.product_endpoint_proyect import product_bp
from flask_cors import CORS
from endpoints.cart_endpoint_proyect import cart_bp
from flask_mail import Mail
import os
from dotenv import load_dotenv


app = Flask(__name__)
app.register_blueprint(user_bp, url_prefix='/user')
app.register_blueprint(product_bp, url_prefix='/product')
app.register_blueprint(cart_bp, url_prefix='/cart')
CORS(app)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})


mail = Mail()
load_dotenv()
app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER')
app.config['MAIL_PORT'] = (os.getenv('MAIL_PORT'))
app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS') == 'True'
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')

mail.init_app(app)


if __name__ == "__main__":
    app.run(debug=True)