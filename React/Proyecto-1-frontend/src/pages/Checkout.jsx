import { useProductCart } from "../components/contexts/Product_cart";
import { useState } from "react"
import "./Checkout.css"
import { useAuth } from "../components/contexts/Auth.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Checkout() {
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const [lastPurchase, setLastPurchase] = useState(null);
    const [success, setSuccess] = useState(false);
    const { token } = useAuth()
    const { cartItems, setCartItems } = useProductCart()
    const [buyer, setBuyer] = useState({
        buyerName: "",
        buyerEmail: "",
        buyerDirection: "",
        buyerPhone: ""
    });
    const handleChange = (event) => {
        setBuyer({
            ...buyer,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!buyer.buyerName || !buyer.buyerEmail || !buyer.buyerDirection || !buyer.buyerPhone) {
            setErrorMessage("Por favor, completa toda la información de compra.");
            return;
        }

        try {
            const response = await axios.post(
                "http://127.0.0.1:5000/cart/facture",
                {
                    buyer,
                    items: cartItems.items,
                    total: cartItems.total,
                    cart_id: cartItems.cart_id
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setLastPurchase(cartItems);
            setCartItems({ items: [], total: 0 });
            setSuccess(true);
            setErrorMessage(""); // limpia error

        } catch (error) {
            console.error(error);

            if (error.response && error.response.data) {
                setErrorMessage(error.response.data.error);
            } else {
                setErrorMessage("Ocurrió un error inesperado");
            }
        }
    };

    if (success) {
        return (
            <div className="success-container">
                <div className="success-card">

                    <div className="success-icon">✔</div>

                    <h2>Compra realizada con éxito</h2>
                    <p>Tu pedido ha sido procesado correctamente.</p>

                    <div className="summary-box">
                        {lastPurchase?.items?.map((item) => (
                            <div key={item.id} className="summary-item">
                                <div>
                                    <p>{item.nombre}</p>
                                    <small>{item.cantidad} x ₡{item.precio}</small>
                                </div>
                                <strong>₡{item.subtotal}</strong>
                            </div>
                        ))}

                        <div className="total">
                            <span>Total:</span>
                            <span>₡{lastPurchase?.total}</span>
                        </div>
                    </div>

                    <div className="success-buttons">
                        <button className="btn-primary" onClick={() => navigate("/catalog")}>Volver al catálogo</button>
                        <button className="btn-secondary" onClick={() => navigate("/")}>Ir al inicio</button>
                    </div>

                </div>
            </div>
        );
    }
    return (
        <div className="checkout-container">

            {/* IZQUIERDA */}
            <div className="checkout-form">
                <h2>Información de compra</h2>

                <form onSubmit={handleSubmit}>
                    <label>Nombre completo</label>
                    <input type="text" name="buyerName" value={buyer.buyerName} onChange={handleChange} />

                    <label>Correo electrónico</label>
                    <input type="email" name="buyerEmail" value={buyer.buyerEmail} onChange={handleChange} />

                    <label>Dirección</label>
                    <input type="text" name="buyerDirection" value={buyer.buyerDirection} onChange={handleChange} />

                    <label>Teléfono</label>
                    <input type="tel" name="buyerPhone" value={buyer.buyerPhone} onChange={handleChange} />
                </form>
            </div>

            {/* DERECHA */}
            <div className="checkout-summary">
                <h2>Resumen del pedido</h2>

                {cartItems?.items?.map((item) => (
                    <div key={item.id} className="summary-item">
                        <div>
                            <p>{item.nombre}</p>
                            <small>{item.cantidad} x ₡{item.precio}</small>
                        </div>
                        <strong>₡{item.subtotal}</strong>
                    </div>
                ))}

                <div className="total">
                    <h3>Total:</h3>
                    <h3>₡{cartItems?.total}</h3>
                </div>

                <button className="confirm" onClick={handleSubmit}>Confirmar compra</button>
                <button className="cancel" onClick={() => navigate("/cart")}>
                    Cancelar
                </button>
            </div>
            {errorMessage && (
                <div className="alert-error">
                    ⚠️ {errorMessage}
                </div>
            )}
        </div>
    );
}

export default Checkout;