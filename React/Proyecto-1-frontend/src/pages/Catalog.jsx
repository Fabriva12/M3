
import "./Catalog.css";
import { Link } from "react-router-dom";

function Catalog({ products }) {


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
                        <Link to={`/detail/${data.id}`} className="btn">
                            Ver Detalles
                        </Link>
                    </div>
                ))}
            </section>
        </div>
    );
}

export default Catalog