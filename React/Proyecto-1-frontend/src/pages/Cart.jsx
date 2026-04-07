import { useContext } from "react";
import { ProductCartContext } from "../components/contexts/Product_cart.jsx";
import { Link } from "react-router-dom";
import "./Cart.css";
import { useAuth } from "../components/contexts/Auth.jsx";

function Cart({ products }) {
    const { role } = useAuth();
    if (role === null) {
        return <h2>Inicia sesión para ver tu carrito</h2>;
    }
    const { cartItems, setCartItems } = useContext(ProductCartContext);

    return (
        <section className="cart-container">
            {cartItems.map((item) => {
                const product = products.find(p => p.id === item.id);

                if (!product) return null;

                return (
                    <div key={item.id} className="card">
                        <img src={product.imagen} alt={product.nombre} />
                        <h2>{product.nombre}</h2>
                        <h3>${product.precio}</h3>
                        <p>{product.categoria}</p>

                        <p>Cantidad: {item.cantidad}</p>
                        <p>Total: ${product.precio * item.cantidad}</p>

                        <Link to={`/detail/${item.id}`} className="btn">
                            Ver Detalles
                        </Link>
                    </div>
                );
            })}
        </section>
    );
}


export default Cart;