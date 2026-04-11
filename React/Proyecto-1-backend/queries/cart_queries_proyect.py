from sqlalchemy import insert, select, update, func 
from create_tables_proyect import engine, product_table, carts_table, cart_items_table, facture_table, facture_items_table
from flask import jsonify, Response

class Cart_DB:
    def __init__(self):
        self.engine = engine
        
    def get_or_create_cart(self, user_id):
        with self.engine.begin() as conn:

            stmt = select(carts_table).where(carts_table.c.user_id == user_id,carts_table.c.estado == "activo")
            result = conn.execute(stmt).mappings().first()

            if result:
                return result 

            stmt = insert(carts_table).values(user_id=user_id,estado="activo").returning(carts_table)
            new_cart = conn.execute(stmt).mappings().first()
            return new_cart
    
    def add_item(self, cart_id, producto_id, cantidad):
        with self.engine.begin() as conn:

            stmt = select(cart_items_table).where(cart_items_table.c.cart_id == cart_id,cart_items_table.c.producto_id == producto_id)
            existing = conn.execute(stmt).mappings().first()

            if existing:
                stmt = cart_items_table.update().where(
                    cart_items_table.c.id == existing["id"]
                ).values(
                    cantidad=existing["cantidad"] + cantidad
                )
                conn.execute(stmt)
            else:
                stmt = insert(cart_items_table).values(
                    cart_id=cart_id,
                    producto_id=producto_id,
                    cantidad=cantidad,
                )
                conn.execute(stmt)

            return True

    def get_cart_items(self, cart_id):
        with self.engine.begin() as conn:
            stmt = (
                    select(
                        cart_items_table.c.id.label("cart_item_id"),
                        cart_items_table.c.cart_id,
                        cart_items_table.c.producto_id,
                        cart_items_table.c.cantidad,
                        product_table.c.nombre,
                        product_table.c.precio,
                        product_table.c.imagen,
                        (cart_items_table.c.cantidad * product_table.c.precio).label("subtotal")
                    )
                    .join(
                        product_table,
                        cart_items_table.c.producto_id == product_table.c.ID
                    )
                    .where(
                        cart_items_table.c.cart_id == cart_id
                    )
                )
            result = conn.execute(stmt).mappings().all()
            items = [
                        {
                            "id": row["cart_item_id"],
                            "cart_id": row["cart_id"],
                            "producto_id": row["producto_id"],
                            "cantidad": row["cantidad"],
                            "nombre": row["nombre"],
                            "precio": row["precio"],
                            "imagen": row["imagen"],
                            "subtotal": row["subtotal"]
                        }
                    for row in result
                    ]
            total_stmt = (
            select(
                func.sum(
                    cart_items_table.c.cantidad * product_table.c.precio
                ).label("total")
            )
            .join(
                product_table,
                cart_items_table.c.producto_id == product_table.c.ID
            )
            .where(
                cart_items_table.c.cart_id == cart_id
            )
        )

            total = conn.execute(total_stmt).scalar() or 0

            cantidad_stmt = select(
                func.sum(cart_items_table.c.cantidad)
            ).where(
                cart_items_table.c.cart_id == cart_id
            )

            cantidad_items = conn.execute(cantidad_stmt).scalar() or 0

            return {
                "items": items,
                "total": float(total),
                "cantidad_items": int(cantidad_items)
            }


    def delete_cart_items(self, producto_id, cart_id):
        with self.engine.begin() as conn:
            delete_stmt = cart_items_table.delete().where((cart_items_table.c.producto_id == producto_id) & (cart_items_table.c.cart_id == cart_id))
            conn.execute(delete_stmt)
            return True

    def update_cart_item(self, cart_id, producto_id, new_cantidad):
        with self.engine.begin() as conn:
            stmt = (
                update(cart_items_table)
                .where((cart_items_table.c.cart_id == cart_id) & (cart_items_table.c.producto_id == producto_id))
                .values(cantidad=new_cantidad)
            )
            conn.execute(stmt)
            return True
    

    
    def create_facture(self, buyer, items, total, user_id, cart_id):
        try:
            with self.engine.begin() as conn:
                for item in items:
                    product_id = item.get("producto_id")  # 👈 IMPORTANTE

                    stmt = select(product_table).where(product_table.c.ID == product_id)
                    result = conn.execute(stmt).mappings().first()

                    if not result:
                        raise Exception(f"El producto con ID {product_id} no existe")

                    product = dict(result)

                    if product["stock"] < item.get("cantidad"):
                        return {
                "success": False,
                "error": f"Stock insuficiente para {product['nombre']}",
                "stock": product["stock"],
                "requested": item["cantidad"]
            }



                result = conn.execute(
                    insert(facture_table).values(
                        cart_id=cart_id,
                        user_id=user_id,
                        buyer_name=buyer.get("buyerName"),
                        buyer_email=buyer.get("buyerEmail"),
                        direction=buyer.get("buyerDirection"),
                        total=total
                    )
                )

                facture_id = result.inserted_primary_key[0]

                for item in items:
                    product_id = item.get("producto_id")

                    conn.execute(
                        insert(facture_items_table).values(
                            facture_id=facture_id,
                            product_id=product_id,
                            product_name=item.get("nombre"),
                            price=item.get("precio"),
                            quantity=item.get("cantidad"),
                            subtotal=item.get("subtotal"),
                        )
                    )

                    conn.execute(
                        update(product_table)
                        .where(product_table.c.ID == product_id)
                        .values(
                            stock=product_table.c.stock - item.get("cantidad")
                        )
                    )

                conn.execute(
                    update(carts_table)
                    .where(carts_table.c.id == cart_id)
                    .values(estado="completado")
)

                return facture_id

        except Exception as e:
            raise e