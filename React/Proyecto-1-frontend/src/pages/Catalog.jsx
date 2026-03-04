
import "./Catalog.css";

function Catalog({ goTo, products }) {
    return (
        <div className="catalog-page">
            <h1>Catálogo de productos</h1>
            <section className="catalog-container">
                {products.map((product) => (
                    <div key={product.id} className="card">
                        <img src={product.imagen} alt={product.nombre} />
                        <h2>{product.nombre}</h2>
                        <h3>${product.precio}</h3>
                        <p>{product.categoria}</p>
                        <p className="product-des">{product.descripcion}</p>
                        <button className="btn" onClick={() => goTo("detail", product.id)}>
                            Ver Detalles
                        </button>
                    </div>
                ))}
            </section>
        </div>
    );
}

export default Catalog