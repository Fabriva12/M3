from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String, ForeignKey, text, Date, func

# creamos la conexion a la base de datos
DB = 'postgresql://postgres:postgres@localhost:5433/postgres'
engine = create_engine(DB, echo=True,pool_size=10,max_overflow=5,pool_recycle=180)
metadata_obj = MetaData(schema= 'tienda_mascotas')

# con la siguiente funcion creamos las tablas para nuestra base de danos en postgres si no existen
def create_tables(): 
    try: 
        with engine.begin() as conn:
            conn.execute(text("CREATE SCHEMA IF NOT EXISTS tienda_mascotas "))

            for tabla in [product_table, user_table, carts_table, cart_items_table]:
                if not engine.dialect.has_table(conn,tabla.name, schema='tienda_mascotas' ):
                    print(f"Creando tabla: {tabla.name}")
                    tabla.create(conn)
                    
                else:
                    print(f"La tabla {tabla.name} ya existe, no se crea.")

    except Exception as e:
        print("Connection failed:", e)



product_table = Table(
    "product_table",
    metadata_obj,
    Column("ID", Integer, primary_key=True),
    Column("nombre",String(25) ),
    Column("descripcion",String(300)),
    Column("precio",Integer),
    Column("categoria",String(25)),
    Column("imagen",String(300)),
    Column("stock",Integer)
)

user_table = Table(
    "user_table",
    metadata_obj,
    Column("ID", Integer, primary_key=True),
    Column("nombre",String(25)),
    Column("correo",String(30), unique=True),
    Column("contraseña",String(25)),
    Column("role",String(25))
)

carts_table = Table(
    "carts_table",
    metadata_obj,
    Column("id", Integer, primary_key=True, autoincrement=True),
    Column("user_id", Integer, ForeignKey("user_table.ID"), nullable=False),
    Column("estado", String(25), default="activo"),
    Column("fecha", Date, default=func.current_timestamp())
)

cart_items_table = Table(
    "cart_items_table",
    metadata_obj,
    Column("id", Integer, primary_key=True, autoincrement=True),
    Column("cart_id", Integer, ForeignKey("carts_table.id"), nullable=False),
    Column("producto_id", Integer, ForeignKey("product_table.ID"), nullable=False),
    Column("cantidad", Integer, nullable=False)

)


create_tables()