from unittest import result

from flask import request, jsonify, Response,Blueprint
from queries.product_queries_proyect import Product_DB
from queries.cart_queries_proyect import Cart_DB
from jwt_manager_proyect import JWT_Manager
from token_valid import token_required
from mail_proyect import send_purchase_email


cart_bp = Blueprint('cart', __name__)
product_manager= Product_DB()
cart_manager = Cart_DB()
jwt_manager= JWT_Manager()
send_email = send_purchase_email

@cart_bp.route('/items', methods=['POST'])
@token_required()
def add_item(decoded):
    try:
        user_id = decoded.get('id')
        data = request.get_json()

        product_id = data.get('product_id')
        product = product_manager.get_product_by_id(product_id)

        cantidad = int(1)
        imagen = product.get('imagen')
        precio = product.get('precio')

        if not product_id:
            return jsonify({'message': 'Datos incompletos'}), 400

        cart = cart_manager.get_or_create_cart(user_id)

        cart_manager.add_item(cart['id'], product_id, cantidad)

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
        cart = cart_manager.get_or_create_cart(user_id)

        cart_data = cart_manager.get_cart_items(cart['id'])

        return jsonify(cart_data), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@cart_bp.route('/no_items/<int:producto_id>', methods=['DELETE'])
@token_required()
def clear_item(decoded, producto_id):
    try:
        user_id = decoded.get('id')
        cart = cart_manager.get_or_create_cart(user_id)
        result = cart_manager.delete_cart_items(producto_id, cart['id'])
        
        if result is True:
            data = cart_manager.get_cart_items(cart['id'])
            return jsonify(data), 200
        else:
            return jsonify({'message': 'No se pudo eliminar el producto del carrito'}), 500
    except Exception as e:
        print(e)
        return Response("Error interno", status=500)
    
    
@cart_bp.route('/update_item', methods=['PUT'])
@token_required()
def update_item(decoded):
    try:
        user_id = decoded.get('id')
        cart = cart_manager.get_or_create_cart(user_id)
        data = request.get_json()

        producto_id = data.get('producto_id')
        cantidad = data.get('cantidad')

        if not producto_id or cantidad is None:
            return jsonify({'message': 'Datos incompletos'}), 400

        result =cart_manager.update_cart_item(cart['id'], producto_id, cantidad)
        if result is True:
            data = cart_manager.get_cart_items(cart['id'])
            return jsonify(data), 200
        else:
            return jsonify({'message': 'No se pudo actualizar el carrito'}), 500

    except Exception as e:
        print(e)
        return Response("Error interno", status=500)
    


@cart_bp.route("/facture", methods=["POST"])
@token_required()
def create_facture(decoded):
    try:
        data = request.get_json()
        
        buyer = data.get("buyer")
        total = data.get("total")

        user_id = decoded.get("id")

        cart = cart_manager.get_or_create_cart(user_id)
        cart_id = cart["id"]


        cart_data = cart_manager.get_cart_items(cart_id)
        items = cart_data["items"]
        print ("tenemos items:", items)
        if not buyer:
            return jsonify({"error": "Datos del comprador incompletos"}), 400
        
        email = buyer.get("buyerEmail")  

        if not items:
            return jsonify({"error": "El carrito está vacío"}), 400


        facture_id = cart_manager.create_facture(
            buyer=buyer,
            items=items,
            total=total,
            user_id=user_id,
            cart_id=cart_id
        )
        if not result["success"]:
            return jsonify({
            "error": result["error"],
            "stock": result["stock"],
            "requested": result["requested"]
            }),
        try: 
            send_email(email,buyer, items, total)
        except Exception as e:
            print("Error async email:", e)
        return jsonify({
            "message": "Compra realizada correctamente",
            "facture_id": facture_id
        }), 201

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 400