import { useContext } from "react";
import { ProductCartContext } from "../components/contexts/Product_cart.jsx";
import { Link } from "react-router-dom";
import "./Cart.css";
import { useAuth } from "../components/contexts/Auth.jsx";

function Cart({ }) {
    const { role } = useAuth();
    if (role === null) {
        return <h2>Inicia sesión para ver tu carrito</h2>;
    }

    const { cartItems, setCartItems } = useContext(ProductCartContext);

    return (
        < div className="cart-page" >
            <h1>Carrito de Compras</h1>
            <section className="cart-container">
                {cartItems.map((data) => (
                    <div key={data.id} className="card">
                        <img src={data.imagen} alt={data.nombre} />
                        <h2>{data.nombre}</h2>
                        <h3>${data.precio}</h3>
                        <p>{data.categoria}</p>
                        <Link to={`/detail/${data.id}`} className="btn">
                            Ver Detalles
                        </Link>
                    </div>
                ))}
            </section>
        </div >
    );
}



export default Cart;