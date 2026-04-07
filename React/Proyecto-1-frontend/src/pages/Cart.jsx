import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../components/contexts/Auth.jsx";
import { useNavigate } from "react-router-dom";
import { useProductCart } from "../components/contexts/Product_cart.jsx";
import "./Cart.css";

function Cart({ setLoading }) {
    const navigate = useNavigate()
    const { role, token } = useAuth();
    const { cartItems, setCartItems } = useProductCart();

    useEffect(() => {
        async function fetchCart() {
            setLoading(true);

            try {
                const response = await axios.get(
                    "http://127.0.0.1:5000/cart/see_items",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setCartItems(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }

        }

        if (token) {
            fetchCart();
        }
    }, [token]);

    if (role === null) {
        return <h2>Inicia sesión para ver tu carrito</h2>;
    }
    if (!cartItems) {
        return null;
    }

    const updateQuantity = async (productId, newQuantity) => {
        console.log("Updating product", productId, "to quantity", newQuantity);
        if (newQuantity < 1) return;
        try {
            const response = await axios.put(
                "http://127.0.0.1:5000/cart/update_item",
                {
                    producto_id: productId,
                    cantidad: newQuantity
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setCartItems(response.data);

        } catch (error) {
            console.error(error);
        }
    };

    const removeItem = async (productId) => {
        console.log("Removing product", productId);

        try {
            const response = await axios.delete(
                `http://127.0.0.1:5000/cart/no_items/${productId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setCartItems(response.data);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className="cart">
            <h1 className="cart-title">Carrito de compras</h1>

            <div className="cart-layout">

                {/* LISTA DE PRODUCTOS */}
                <div className="cart-items">
                    {cartItems?.items?.length > 0 &&
                        [...cartItems.items]
                            .sort((a, b) => a.id - b.id)
                            .map((item) => (
                                <div key={item.id} className="cart-item">

                                    <img
                                        src={item.imagen}
                                        alt={item.nombre}
                                        className="image"
                                    />

                                    <div className="item-info">
                                        <h2 className="text">{item.nombre}</h2>
                                        <p className="price">Precio: ₡{item.precio}</p>
                                    </div>

                                    <div className="quantity">
                                        <button onClick={() => updateQuantity(item.producto_id, item.cantidad - 1)}>-</button>
                                        <span>{item.cantidad}</span>
                                        <button onClick={() => updateQuantity(item.producto_id, item.cantidad + 1)}>+</button>
                                    </div>

                                    <div className="subtotal">
                                        <p>Subtotal:</p>
                                        <strong>₡{item.subtotal}</strong>
                                    </div>

                                    <button className="remove" onClick={() => removeItem(item.producto_id)}>
                                        Eliminar
                                    </button>

                                </div>
                            ))}
                </div>

                {/* RESUMEN */}
                <div className="cart-summary">
                    <h2>Total: ₡{cartItems.total}</h2>
                    <button className="checkout" onClick={() => navigate("/check")}>Continuar al checkout</button>
                </div>

            </div>
        </section>
    );
}

export default Cart;