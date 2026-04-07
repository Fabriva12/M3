import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [role, setRole] = useState(localStorage.getItem("role"));
    const [nombre, setNombre] = useState(localStorage.getItem("nombre"));

    const login = (token, role, nombre) => {
        setToken(token);
        setRole(role);
        setNombre(nombre);

        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("nombre", nombre);
    };

    const logout = () => {
        setToken(null);
        setRole(null);
        setNombre(null);

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("nombre");
    };

    return (
        <AuthContext.Provider value={{ token, role, nombre, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider };

export const useAuth = () => {
    return useContext(AuthContext);
};