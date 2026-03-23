from flask import request, jsonify, Response,Blueprint
from queries.product_queries_proyect import Product_DB
from jwt_manager_proyect import JWT_Manager
from token_valid import token_required
import traceback


cart_bp = Blueprint('cart', __name__)
db_manager= Product_DB()
jwt_manager= JWT_Manager()

@cart_bp.route('/items', methods=['POST'])
@token_required()
def add_item(decoded):
    try:
        user_id = decoded.get('id')
        data = request.get_json()

        product_id = data.get('product_id')
        product = db_manager.get_product_by_id(product_id)

        cantidad = int(1)
        imagen = product.get('imagen')
        precio = product.get('precio')

        if not product_id:
            return jsonify({'message': 'Datos incompletos'}), 400

        cart = db_manager.get_or_create_cart(user_id)

        db_manager.add_item(cart['id'], product_id, cantidad)

        return jsonify({
            'cart_id': cart['id'],
            'product_id': product_id,
            'cantidad': cantidad,
            'precio': precio,
            'imagen': imagen
        }), 201

    except Exception as e:
        print(e)
        return Response("Error interno", status=500)
    

@cart_bp.route('/see_items', methods=['GET'])
@token_required()
def get_cart(decoded):
    try:
        user_id = decoded.get('id')
        cart = db_manager.get_or_create_cart(user_id)

        items = db_manager.get_cart_items(cart['id'])

        return jsonify(items), 200

    except Exception as e:
        print(e)
        return Response("Error interno", status=500)
    

@cart_bp.route('/no_items', methods=['DELETE'])
@token_required()
def clear_item(decoded):
    try:
        user_id = decoded.get('id')
        cart = db_manager.get_or_create_cart(user_id)
        producto_id = request.args.get('product_id')
        db_manager.delete_cart_items(producto_id)

        return jsonify({'message': 'Producto eliminado del carrito'}), 200

    except Exception as e:
        print(e)
        return Response("Error interno", status=500)