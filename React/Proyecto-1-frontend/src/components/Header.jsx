
import "./Header.css";
import logo from "../img/icons/lucide-PawPrint-Outlined.svg";
function Header({ goTo, role, setRole }) {
    const logout = () => {
        localStorage.clear();
        setRole(null);
        goTo("home");
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
                <a className="nav-link" onClick={() => goTo("home")}>Inicio</a>
                <a className="nav-link" onClick={() => goTo("catalog")}>Catálogo</a>
                {role === "admin" && (
                    <a className="nav-link" onClick={() => goTo("admin")}>Administración</a>
                )}
                <a className="nav-link" onClick={() => goTo("contact")}>Contacto</a>
                {role ? (
                    <a className="nav-link" onClick={logout}>Cerrar Sesión</a>
                ) : (
                    <a className="nav-link" onClick={() => goTo("login")}>Iniciar Sesión</a>
                )}
            </nav>
        </header>
    );
}


export default Header;