from unittest import result

from sqlalchemy import insert, select, update 
from create_tables_proyect import engine, product_table, carts_table, cart_items_table


# con esta clase manejamos las consultas de productos a la base de datos
class Product_DB:
    def __init__(self):
        self.engine = engine
        
    def insert_product(self,nombre,categoria,descripcion,precio,imagen,stock):
        with self.engine.begin() as conn:
            new_product= insert(product_table)
            values= [
                {"nombre":nombre, "categoria":categoria, "descripcion":descripcion, "precio":precio, "imagen":imagen, "stock":stock}
            ]
            result = conn.execute(new_product, values)

        return result.inserted_primary_key[0]


    def get_product(self, ):
        stmt= select(product_table)
        with self.engine.begin() as conn:
            result = conn.execute(stmt).mappings().all()
            products =[]
            for row in result:
                product = {
                    "id": row["ID"],
                    "nombre": row["nombre"],
                    "categoria": row["categoria"],
                    "descripcion": row["descripcion"],
                    "precio": row["precio"],
                    "imagen": row["imagen"],
                    "stock": row["stock"]
                }
                products.append(product)
        return products

    def get_product_by_id(self, product_id):
        with self.engine.begin() as conn:
            stmt = select(product_table).where(product_table.c.ID == product_id)
            result = conn.execute(stmt).mappings().first()
        return dict(result) 


    def delete_product(self, product_ID):
        with self.engine.begin() as conn:
            delete_product= product_table.delete().where(product_table.c.ID == product_ID)
            conn.execute(delete_product) 


    def update_product(self,product_ID,update_data):
        allowed_fields = {"nombre", "precio","categoria","descripcion","imagen", "stock"}
        new_data = {k: v for k, v in update_data.items() if k in allowed_fields}

        if not new_data:
            return False
        try:
            with self.engine.begin() as conn:
                stmt = (
                    update(product_table)
                    .where(product_table.c.ID == product_ID)
                    .values(**new_data)
                )
                conn.execute(stmt)
        except Exception as e:
            return False
        


    def get_create_cart(self, user_id):
        with self.engine.begin() as conn:
            stmt = select(carts_table).where(carts_table.c.user_id == user_id, carts_table.c.estado == "activo")
            result = conn.execute(stmt).mappings().first()
            if not result:
                stmt = insert(carts_table).values(user_id=user_id)
                result = conn.execute(stmt)
            cart_id = result.scalar()
        return cart_id
        
    
    def add_item_to_cart(self, cart_id, producto_id, cantidad,precio):
        with self.engine.begin() as conn:
            stmt = insert(cart_items_table).values(cart_id=cart_id, producto_id=producto_id, cantidad=cantidad, precio=precio)
            conn.execute(stmt)
        return True

    def get_cart_items(self, cart_id):
        with self.engine.begin() as conn:
            stmt = select(cart_items_table).where(cart_items_table.c.cart_id == cart_id)
            result = conn.execute(stmt).mappings().all()
            items = []
            for row in result:
                item = {
                    "id": row["id"],
                    "cart_id": row["cart_id"],
                    "producto_id": row["producto_id"],
                    "cantidad": row["cantidad"],
                    "precio": row["precio"]
                }
                items.append(item)
        return items