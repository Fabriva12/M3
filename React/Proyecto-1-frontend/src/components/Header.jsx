
import "./Header.css";
import logo from "../img/icons/lucide-PawPrint-Outlined.svg";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../components/contexts/Auth.jsx";

function Header() {
    const { logout, role } = useAuth();
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
                {role === "admin" && (
                    <Link to="/admin" className="nav-link">
                        Administración
                    </Link>

                )}
                <Link to="/contact" className="nav-link">
                    Contacto
                </Link>
                {role ? (
                    <>
                        <Link to="/login" className="nav-link" onClick={logoutHandler}>
                            Cerrar Sesión
                        </Link>
                        <Link to="/cart" className="nav-link">
                            <img src="../img/icons/carrito.png" alt="Cart icon" />
                        </Link>
                    </>
                ) : (
                    <Link to="/login" className="nav-link">
                        Iniciar Sesión
                    </Link>
                )}
            </nav>
        </header>
    );
}


export default Header;