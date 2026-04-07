
import "./Home.css";
import { Link } from "react-router-dom";
function Home({ products }) {
    const featuredProducts = [...products]
        .sort((a, b) => b.stock - a.stock)
        .slice(0, 6);
    return (
        <section className="home-container">
            <h1>Bienvenido a PawStore </h1>
            <p className="text">“Somos una tienda dedicada a ofrecer productos de calidad para tus mascotas.”</p>
            <p className="text">“Explora nuestro catálogo para encontrar camas, juguetes, accesorios y más.”</p>
            <Link to="/catalog" className="btn">
                Ver Productos
            </Link>
            <h2 className="featured-title">Productos Destacados</h2>

            <div className="featured-grid">
                {featuredProducts.map((product) => (
                    <div key={product.ID} className="product-card">

                        <img src={product.imagen} alt={product.nombre} />

                        <h3>{product.nombre}</h3>

                        <p className="price">₡{product.precio}</p>

                        <Link to={`/detail/${product.id}`} className="btn-small">
                            Ver detalles
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );

}

export default Home;