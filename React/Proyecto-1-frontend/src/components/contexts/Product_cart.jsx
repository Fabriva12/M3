
import React from "react";
import axios from "axios";
import { useAuth } from "./Auth.jsx";
const ProductCartContext = React.createContext();

function ProductCartProvider({ children }) {
    const [cartItems, setCartItems] = React.useState([]);
    const { token } = useAuth();

    const addItem = async (product) => {
        try {
            const response = await axios.post("http://127.0.0.1:5000/cart/items", {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                product
            });

            setCartItems(response.data);

        } catch (error) {
            console.error("Error adding item to cart:", error);
        }
    };

    return (
        <ProductCartContext.Provider value={{ cartItems, setCartItems, addItem }}>
            {children}
        </ProductCartContext.Provider>
    );
}

export { ProductCartContext, ProductCartProvider };

export const useProductCart = () => {
    return React.useContext(ProductCartContext);
};