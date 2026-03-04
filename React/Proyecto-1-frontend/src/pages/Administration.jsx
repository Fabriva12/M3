
import { useState } from "react";
import "./Administration.css";


function ProductTable({ goTo, products, setProducts }) {

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
                                                const updatedProducts = products.filter(
                                                    (p) => p.id !== product.id
                                                );

                                                setProducts(updatedProducts);
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

function CreateP({ goTo, products, setProducts }) {

    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        categoria: "",
        urlImagen: "",
        stock: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newId =
            products.length > 0
                ? Math.max(...products.map(p => p.id)) + 1
                : 1;

        const newProduct = {
            id: newId,
            nombre: formData.nombre,
            descripcion: formData.descripcion,
            precio: Number(formData.precio),
            categoria: formData.categoria,

            stock: Number(formData.stock)
        };

        setProducts([...products, newProduct]);

        goTo("admin");
    };

    return (
        <div className="create-container">
            <form onSubmit={handleSubmit}>
                <h2 className="form-title">Agregar nuevo Producto</h2>
                <div className="form-group">
                    <label className="form-label" htmlFor="nombre">Nombre:</label><br />
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre del producto"
                        value={formData.nombre}
                        onChange={handleChange}
                    /><br /><br />

                    <label className="form-label" htmlFor="descripcion">Descripción:</label><br />
                    <textarea
                        name="descripcion"
                        placeholder="Descripción detallada del producto"
                        value={formData.descripcion}
                        onChange={handleChange}
                    /><br /><br />

                    <label className="form-label" htmlFor="precio">Precio:</label><br />
                    <input
                        type="number"
                        name="precio"
                        placeholder="0.00"
                        value={formData.precio}
                        onChange={handleChange}
                    /><br /><br />

                    <label className="form-label" htmlFor="categoria">Categoría:</label><br />
                    <input
                        type="text"
                        name="categoria"
                        placeholder="Categoría del producto"
                        value={formData.categoria}
                        onChange={handleChange}
                    /><br /><br />

                    <label className="form-label" htmlFor="URL">URL imagen:</label><br />
                    <input
                        type="text"
                        name="urlImagen"
                        placeholder="/ruta/imagen.jpg"
                        value={formData.urlImagen}
                        onChange={handleChange}
                    /><br /><br />

                    <label className="form-label" htmlFor="stock">Stock:</label><br />
                    <input
                        type="number"
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


