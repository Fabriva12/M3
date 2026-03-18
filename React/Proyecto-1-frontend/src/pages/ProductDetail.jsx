
import "./ProductDetail.css";
import { Link, useParams } from "react-router-dom";
import { useProductCart } from "../components/contexts/Product_cart.jsx";
import { useAuth } from "../components/contexts/Auth.jsx";

function ProductDetail({ products }) {
    const { id } = useParams();
    const { token } = useAuth();
    const product = products.find(p => p.id === Number(id));
    const { addItem } = useProductCart();
    function addToCart(product) {
        addItem(product);
    }

    if (!product) {
        return <h2>Producto no encontrado</h2>;
    }

    return (
        <div className="detail-page">
            <div className="detail-container-img">
                <img
                    src={product.imagen}
                    alt={product.nombre}
                />
            </div>

            <div className="detail-container">
                <h1>{product.nombre}</h1>
                <h2>${product.precio}</h2>
                <p>{product.categoria}</p>
                <h3>{product.descripcion}</h3>

                <Link to="/catalog" className="btn">
                    Volver al Catálogo
                </Link>

                {token ? (
                    <button className="btn" onClick={() => { addToCart(product); }}>
                        Añadir al Carrito
                    </button>
                ) : (
                    <p>Inicia sesión para añadir al carrito</p>
                )}
            </div>
        </div>
    );
}

export default ProductDetail;