import axios from "axios";
import { useState } from "react";
import "./CreateUser.css";
import { useNavigate } from "react-router-dom";

function CreateUser({ goTo, setLoading }) {

    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const password = event.target.password.value;
        const confirmPassword = event.target.confpassword.value;
        const email = event.target.email.value;
        const nombre = event.target.user.value;

        if (!nombre || !email || !password || !confirmPassword) {
            setMessage("Porfavor, completa todos los campos correctamente");
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setMessage("Las contraseñas no coinciden ❌");
            setLoading(false);
            return;
        }
        const user = {
            nombre: event.target.user.value,
            correo: event.target.email.value,
            contraseña: password,
            role: "admin",
        }
        try {
            const response = await axios.post('http://127.0.0.1:5000/user/register', user);
            console.log('User created:', response.data);
            setMessage("Usuario creado correctamente ✅");
            event.target.reset();

            setTimeout(() => {
                goTo("login");
            }, 2000);
        } catch (error) {
            console.error('Error creating user:', error);
            setMessage("Error al crear usuario ❌");
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="body-create">
            <div className="container-create-form">
                <h2>Crear Usuario</h2>

                <form className="create-form" onSubmit={handleSubmit}>
                    <label htmlFor="user">Nombre:</label>
                    <input type="text" id="user" name="user" />

                    <label htmlFor="email">Correo Electrónico:</label>
                    <input type="email" id="email" name="email" />

                    <label htmlFor="password">Contraseña:</label>
                    <input type="password" id="password" name="password" />

                    <label htmlFor="confpassword">Confirmar Contraseña:</label>
                    <input type="password" id="confpassword" name="confpassword" />

                    {message && <p className="form-message">{message}</p>}

                    <button className="btn-create" type="submit">Registrarse</button>
                    <button className="btn-2" type="button" onClick={() => navigate("/login")}>Ya tengo cuenta</button>

                </form>
            </div>
        </div>
    )
}
export default CreateUser;