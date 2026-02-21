
import data from "../data/products.json";
import "../style/ProductDetail.css";
function ProductDetail({ productId, goTo }) {

    const product = data.find(p => p.id === productId);

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

                <button className="btn" onClick={() => goTo("catalog")}>
                    Volver al Catálogo
                </button>
            </div>
        </div>
    );
}

export default ProductDetail;