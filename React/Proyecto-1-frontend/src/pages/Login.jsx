
import axios from "axios";
import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/contexts/Auth.jsx";

function Login({ setLoading }) {

    const { login } = useAuth();
    const [user, setUser] = useState({
        userEmail: "",
        userPassword: ""
    });

    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const loginData = {
            correo: user.userEmail,
            contraseña: user.userPassword
        };
        try {
            const response = await axios.post("http://127.0.0.1:5000/user/login", loginData);
            if (response.data.success) {
                const { token } = response.data;
                const role = response.data.user.role;
                const nombre = response.data.user.nombre;

                console.log("Login successful:", response.data);
                login(token, role, nombre);

                navigate("/");
            }
            else {
                setMessage("Credenciales incorrectas. Inténtalo de nuevo.");
            }
        }
        catch (error) {
            setMessage("Error al iniciar sesión");
            console.log("Login error:", error);
        }
        finally {
            setLoading(false);
        }
    };

    return (

        <div className="body-login">
            <div className="container-login">
                <h2>Iniciar Sesión</h2>

                {message && <p className="error-message">{message}</p>}

                <form className="login-form" onSubmit={handleSubmit}>
                    <label>Correo Electrónico:</label>
                    <input type="email" name="userEmail" value={user.userEmail} onChange={handleChange} required />

                    <label>Contraseña:</label>
                    <input type="password" name="userPassword" value={user.userPassword} onChange={handleChange} required />

                    <button className="btn-login" type="submit">
                        Iniciar Sesión
                    </button>

                    <button className="btn-register" type="button" onClick={() => navigate("/createUser")}>
                        Regístrate aquí
                    </button>
                </form>
            </div>
        </div>
    )

}

export default Login;