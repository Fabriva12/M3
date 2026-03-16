
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ProductCartProvider } from "./components/contexts/Product_cart.jsx";
import { AuthProvider } from "./components/contexts/Auth.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider>
            <ProductCartProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ProductCartProvider>
        </AuthProvider>
    </StrictMode>
);
