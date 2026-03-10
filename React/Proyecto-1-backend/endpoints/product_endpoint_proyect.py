from flask import request, jsonify, Response,Blueprint
from queries.product_queries_proyect import Product_DB
from token_valid import token_required
import traceback

product_bp = Blueprint('product', __name__)
db_manager= Product_DB()




# Con la siguiente funcion creamos un endpoint para registrar productos
@product_bp.route('/new_product', methods=['POST'])
@token_required()
def new_product(decoded):
    try:
        if decoded['role'] != 'admin':
            return Response("No autorizado", status=403)
    
        data = request.get_json()
        if data is None:
            return jsonify({'message':'Invalid JSON'}),400
        nombre= data.get('nombre')
        categoria= data.get('categoria')
        descripcion= data.get('descripcion')
        price=data.get('precio')
        imagen=data.get('imagen')
        stock=data.get('stock')

        if not nombre or not categoria or not descripcion or not price or not imagen or not stock:
            return jsonify({'message':'All fields are required'}),400
        else:
            product_id =db_manager.insert_product(nombre, categoria, descripcion, price, imagen, stock)
            return jsonify({
            "id":product_id,
            "nombre": nombre,
            "categoria": categoria,
            "descripcion": descripcion,
            "precio": price,
            "urlImagen": imagen,
            "stock": stock
        }),201 
    except Exception as e:
        print("Error en /new_product:", e)
        traceback.print_exc()
        return Response("Error interno", status=500)

# Con esta funcion permite ver productos y los almacena en la cache
@product_bp.route('/see_product', methods=['GET'])
def product():
    try:
        product = db_manager.get_product()
        if product is None:
            return Response("Producto no encontrado", status=404)
        return jsonify(product), 200
    except Exception as e:
        import traceback
        print("Error en /see_product:", e)
        traceback.print_exc()
        return Response("Error interno", status=500)

# Esta funcion elimina un producto de la base de datos y tambien de la cache
@product_bp.route('/no_product/<int:id>', methods=['DELETE'])
@token_required()
def delete_product(decoded, id):
    try:
        if decoded.get("role") != "admin":
            return Response("No autorizado", status=403)

        db_manager.delete_product(id)
        return jsonify({"success": True, "message": "Producto eliminado correctamente"}), 200
    except Exception as e:
        print("Error en /delete_product:", e)
        traceback.print_exc()
        return Response("Error interno", status=500)
    

# Con la siguiente funcion creamos un endpoint para actualizar productos y los eliminados de la cache
@product_bp.route('/upgrade_product', methods=['PUT'])
@token_required()
def upgrade_product(decoded):
    try:
        if decoded.get("role") != "admin":
            return Response("No autorizado", status=403)
        data = request.get_json()
        
        if data is None or "id" not in data:
            return jsonify({'message':'ID es requerido'}),400

        product_ID = data.get('id')
        update_data = {
            k: v for k, v in data.items()
            if k in {"nombre", "categoria", "descripcion", "precio", "imagen", "stock"} and v is not None
        }

        if not update_data:
            return jsonify({"message": "No se proporcionaron campos válidos para actualizar"}), 400
        db_manager.update_product(product_ID, update_data)
        return jsonify({"success": True, "message": "Producto actualizado correctamente"}), 200
    except Exception as e:
        print("Error en /upgrade_product:", e)
        traceback.print_exc()
        return Response("Error interno", status=500) 