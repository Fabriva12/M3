
import "./Catalog.css";

function Catalog({ goTo, products }) {


    return (
        <div className="catalog-page">
            <h1>Catálogo de productos</h1>
            <section className="catalog-container">
                {products.map((data) => (
                    <div key={data.id} className="card">
                        <img src={data.imagen} alt={data.nombre} />
                        <h2>{data.nombre}</h2>
                        <h3>${data.precio}</h3>
                        <p>{data.categoria}</p>
                        <button className="btn" onClick={() => goTo("detail", data.id, products)}>
                            Ver Detalles
                        </button>
                    </div>
                ))}
            </section>
        </div>
    );
}

export default Catalog