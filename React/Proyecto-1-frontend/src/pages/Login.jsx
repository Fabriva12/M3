
import axios from "axios";
import { useState } from "react";
import "./Login.css";

function Login({ goTo, setLoading, setRole, setToken }) {
    const [user, setUser] = useState({
        userEmail: "",
        userPassword: ""
    });
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
                const { token, user } = response.data;

                localStorage.setItem("token", token);
                localStorage.setItem("role", user.role);
                setRole(user.role);
                setToken(token);
                setMessage("Inicio de sesión exitoso");


                goTo("home");
            }
            else
                setMessage("Correo electrónico o contraseña incorrectos");
        }
        catch (error) {
            setMessage("Error al iniciar sesión");
        }
        finally {
            setLoading(false);
        }
    };

    return (

        <div className="body-login">
            <div className="container-login">
                <h2>Iniciar Sesión</h2>

                {message && <p>{message}</p>}

                <form className="login-form" onSubmit={handleSubmit}>
                    <label>Correo Electrónico:</label>
                    <input type="email" name="userEmail" value={user.userEmail} onChange={handleChange} required />

                    <label>Contraseña:</label>
                    <input type="password" name="userPassword" value={user.userPassword} onChange={handleChange} required />

                    <button className="btn-login" type="submit">
                        Iniciar Sesión
                    </button>

                    <button className="btn-register" type="button" onClick={() => goTo("createUser")}>
                        Regístrate aquí
                    </button>
                </form>
            </div>
        </div>
    )

}

export default Login;