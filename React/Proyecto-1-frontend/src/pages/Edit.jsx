import { useState } from "react";
import "./Edit.css";
function Edit({ goTo, productId, products, setProducts }) {
    const product = products.find(p => p.id === Number(productId));

    if (!product) {
        return <h2>Producto no encontrado</h2>;
    }

    const [formData, setFormData] = useState({
        nombre: product.nombre,
        precio: product.precio,
        categoria: product.categoria,
        descripcion: product.descripcion
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedProducts = products.map(p => {
            if (p.id === Number(productId)) {
                return {
                    ...p,
                    nombre: formData.nombre,
                    precio: Number(formData.precio),
                    categoria: formData.categoria,
                    descripcion: formData.descripcion
                };
            }
            return p;
        });

        console.log("Producto actualizado:", updatedProducts);

        setProducts(updatedProducts);

        goTo("admin");

        setProducts(
            products.map(p =>
                p.id === Number(productId)
                    ? { ...p, ...formData }
                    : p
            )
        );

        goTo("admin");
    };

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
                    <div className="btn-group">
                        <button className="save-btn" type="submit">Guardar Cambios</button>

                        <button className="cancel-btn" type="button" onClick={() => goTo("admin")}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div >
        </div >
    );
}

export default Edit;