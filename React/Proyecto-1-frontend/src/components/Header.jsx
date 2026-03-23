
import "./Header.css";
import logo from "../img/icons/lucide-PawPrint-Outlined.svg";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../components/contexts/Auth.jsx";
import carrito from "../img/icons/carrito.png";


function Header() {
    const { logout, role, nombre } = useAuth();
    console.log("Role in Header:", nombre, role);
    const navigate = useNavigate();

    const logoutHandler = () => {
        logout()
        navigate("/login");
    };
    return (
        <header className="container">
            <div className="logo-group">
                <div className="logo-box">
                    <img src={logo} alt="Paw logo" />
                </div>
                <h1 id="storename">PawStore</h1>
            </div>
            <nav>
                <Link to="/" className="nav-link">
                    Inicio
                </Link>
                <Link to="/catalog" className="nav-link">
                    Catálogo
                </Link>
                <Link to="/contact" className="nav-link">
                    Contacto
                </Link>
                {role === "user" && (
                    <>
                        <p className="nav-link rol">Usuario: {nombre}</p>
                        <Link to="/cart" className="nav-link cart-link">
                            <img src={carrito} alt="Cart icon" />
                        </Link>
                    </>
                )}
                {role === "admin" && (
                    <>
                        <Link to="/admin" className="nav-link">
                            Administración
                        </Link>
                        <p className="nav-link rol">Administrador: {nombre}</p>
                    </>
                )}

                {role ? (
                    <Link to="/login" className="nav-link logout-btn" onClick={logoutHandler}>
                        Cerrar Sesión
                    </Link>

                ) : (
                    <Link to="/login" className="nav-link login-btn">
                        Iniciar Sesión
                    </Link>
                )}
            </nav>
        </header>
    );
}


export default Header;