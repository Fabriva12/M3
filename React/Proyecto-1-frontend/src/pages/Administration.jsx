
import { useState } from "react";
import "./Administration.css";
import axios from "axios";
import { data } from "react-router-dom";

function ProductTable({ goTo, products, setProducts, setLoading, }) {
    const token = localStorage.getItem("token");
    if (localStorage.getItem("role") !== "admin") {
        return <p>No tienes permiso para acceder a esta página.</p>;
    }
    const deleteProduct = async (id) => {
        setLoading(true);

        try {
            await axios.delete(`http://127.0.0.1:5000/product/no_product/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const updatedProducts = products.filter(p => p.id !== id);
            setProducts(updatedProducts);

        } catch (error) {
            console.error("Error deleting product:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="edit-container">
            <h1 className="title">Administración de productos</h1>

            <table className="products-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Categoría</th>
                        <th>Stock</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.nombre}</td>
                            <td>${product.precio}</td>
                            <td>{product.categoria}</td>
                            <td>{product.stock}</td>
                            <td>
                                <div className="actions">
                                    <button
                                        className="btn-edit"
                                        onClick={() => goTo("edit", product.id)}
                                    >
                                        Editar
                                    </button>

                                    <button
                                        className="btn-edit"
                                        onClick={() => {
                                            if (window.confirm("¿Seguro que quieres eliminar este producto?")) {
                                                deleteProduct(product.id);
                                            }
                                        }}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    );
}

function CreateP({ goTo, products, setProducts, setLoading, }) {
    const token = localStorage.getItem("token");

    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        categoria: "",
        imagen: "",
        stock: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newProduct = {
            nombre: formData.nombre,
            descripcion: formData.descripcion,
            precio: Number(formData.precio),
            categoria: formData.categoria,
            imagen: formData.urlImagen,
            stock: Number(formData.stock)
        };
        setLoading(true);
        try {
            const response = await axios.post("http://127.0.0.1:5000/product/new_product", newProduct, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setProducts([...products, response.data]);
            goTo("admin");
        } catch (error) {
            console.error("Error adding product:", error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="create-container">
            <form onSubmit={handleSubmit}>
                <h2 className="form-title">Agregar nuevo Producto</h2>
                <div className="form-group">
                    <label className="form-label" htmlFor="nombre">Nombre:</label><br />
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        placeholder="Nombre del producto"
                        value={formData.nombre}
                        onChange={handleChange}
                    /><br /><br />

                    <label className="form-label" htmlFor="descripcion">Descripción:</label><br />
                    <textarea
                        type="text"
                        id="descripcion"
                        name="descripcion"
                        placeholder="Descripción detallada del producto"
                        value={formData.descripcion}
                        onChange={handleChange}
                    /><br /><br />

                    <label className="form-label" htmlFor="precio">Precio:</label><br />
                    <input
                        type="number"
                        id="precio"
                        name="precio"
                        placeholder="0.00"
                        value={formData.precio}
                        onChange={handleChange}
                    /><br /><br />

                    <label className="form-label" htmlFor="categoria">Categoría:</label><br />
                    <input
                        type="text"
                        id="categoria"
                        name="categoria"
                        placeholder="Categoría del producto"
                        value={formData.categoria}
                        onChange={handleChange}
                    /><br /><br />

                    <label className="form-label" htmlFor="URL">URL imagen:</label><br />
                    <input
                        type="text"
                        id="imagen"
                        name="imagen"
                        placeholder="/ruta/imagen.jpg"
                        value={formData.imagen}
                        onChange={handleChange}
                    /><br /><br />

                    <label className="form-label" htmlFor="stock">Stock:</label><br />
                    <input
                        type="number"
                        id="stock"
                        name="stock"
                        placeholder="0"
                        value={formData.stock}
                        onChange={handleChange}
                    /><br /><br />

                    <button className="btn-add" type="submit">Agregar Producto</button>
                </div>
            </form>
        </div>
    );
}

export { CreateP, ProductTable };


