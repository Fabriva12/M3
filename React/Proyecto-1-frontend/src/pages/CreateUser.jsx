import axios from "axios";
import { useState } from "react";
import "./CreateUser.css";


function CreateUser({ goTo, setLoading }) {
    const [message, setMessage] = useState("");
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const password = event.target.password.value;
        const confirmPassword = event.target.confpassword.value;

        if (password !== confirmPassword) {
            setMessage("Las contraseñas no coinciden ❌");
            setLoading(false);
            return;
        }
        const user = {
            userName: event.target.user.value,
            userEmail: event.target.email.value,
            userPassword: password,
            role: "user",
        }
        try {
            const response = await axios.post('', user);
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
                {message && <p>{message}</p>}
                <form className="create-form" onSubmit={handleSubmit}>
                    <label htmlFor="user">Nombre:</label>
                    <input type="text" id="user" name="user" required />

                    <label htmlFor="email">Correo Electrónico:</label>
                    <input type="email" id="email" name="email" required />

                    <label htmlFor="password">Contraseña:</label>
                    <input type="password" id="password" name="password" required />

                    <label htmlFor="confpassword">Confirmar Contraseña:</label>
                    <input type="password" id="confpassword" name="confpassword" required />

                    <button className="btn-create" type="submit">Registrarse</button>
                    <button className="btn-2" type="button" onClick={() => goTo("login")}>Ya tengo cuenta</button>
                </form>
            </div>
        </div>
    )
}
export default CreateUser;