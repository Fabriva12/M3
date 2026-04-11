from unittest import result

from sqlalchemy import insert, select, update, func 
from create_tables_proyect import engine, product_table, carts_table, cart_items_table, facture_table, facture_items_table


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
        

