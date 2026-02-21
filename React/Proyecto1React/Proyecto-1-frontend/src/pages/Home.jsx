
import "../style/Home.css";
function Home({ goTo }) {
    return (
        <section className="home-container">
            <h1>Bienvenido a PawStore </h1>
            <p className="text">“Somos una tienda dedicada a ofrecer productos de calidad para tus mascotas.”</p>
            <p className="text">“Explora nuestro catálogo para encontrar camas, juguetes, accesorios y más.”</p>
            <button
                className="btn"
                onClick={() => goTo("catalog")}
            >
                Ver Productos
            </button>
            <p className="info-text">“Esta es la página principal de la aplicación. Más adelante aquí se podrán mostrar productos destacados.”</p>
        </section>
    );
}

export default Home;