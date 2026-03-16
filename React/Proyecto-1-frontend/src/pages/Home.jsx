
import "./Home.css";
import { Link } from "react-router-dom";
function Home() {
    return (
        <section className="home-container">
            <h1>Bienvenido a PawStore </h1>
            <p className="text">“Somos una tienda dedicada a ofrecer productos de calidad para tus mascotas.”</p>
            <p className="text">“Explora nuestro catálogo para encontrar camas, juguetes, accesorios y más.”</p>
            <Link to="/catalog" className="btn">
                Ver Productos
            </Link>
            <p className="info-text">“Esta es la página principal de la aplicación. Más adelante aquí se podrán mostrar productos destacados.”</p>
        </section>
    );
}

export default Home;