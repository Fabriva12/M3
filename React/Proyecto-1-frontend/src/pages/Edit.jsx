import { useState } from "react";
import "./Edit.css";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../components/contexts/Auth.jsx";

function Edit({ products, setProducts, setLoading, }) {
    const { id } = useParams();
    const product = products.find(p => p.id === Number(id));
    const { token } = useAuth();
    const navigate = useNavigate();

    if (!product) {

        return <h2>Producto no encontrado</h2>;

    }

    const [formData, setFormData] = useState({
        nombre: product.nombre,
        precio: product.precio,
        categoria: product.categoria,
        descripcion: product.descripcion,
        imagen: product.imagen,
        stock: product.stock
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.put(`http://127.0.0.1:5000/product/upgrade_product/${id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const updatedProducts = products.map(p => p.id === Number(id) ? response.data : p);
            setProducts(updatedProducts);
            navigate("/admin");
        } catch (error) {
            console.error("Error updating product:", error);
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="edit-page">
            <h2>Editar Producto</h2>
            <div className="edit-container">
                <form className="edit-form" onSubmit={handleSubmit}>

                    <label htmlFor="nombre">Nombre:</label><br />
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                    /><br /><br />

                    <label htmlFor="precio">Precio:</label><br />
                    <input
                        type="number"
                        name="precio"
                        value={formData.precio}
                        onChange={handleChange}
                    /><br /><br />

                    <label htmlFor="categoria">Categoría:</label><br />
                    <input
                        type="text"
                        name="categoria"
                        value={formData.categoria}
                        onChange={handleChange}
                    /><br /><br />

                    <label htmlFor="descripcion">Descripción:</label><br />
                    <textarea
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                    /><br /><br />

                    <label htmlFor="imagen">URL de la Imagen:</label><br />
                    <input
                        type="text"
                        name="imagen"
                        value={formData.imagen}
                        onChange={handleChange}
                    /><br /><br />

                    <label htmlFor="stock">Stock:</label><br />
                    <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                    /><br /><br />

                    <div className="btn-group">
                        <button className="save-btn" type="submit">Guardar Cambios</button>

                        <button className="cancel-btn" type="button">
                            <Link to="/admin">Admin</Link>
                        </button>
                    </div>
                </form>
            </div >
        </div >
    );
}

export default Edit;
