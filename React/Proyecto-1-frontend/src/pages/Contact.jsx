import "./Contact.css";

const Contact = () => {
    return (
        <div className="contact-container">
            <div className="contact-card">
                <h1 className="contact-title">Contacto</h1>
                <p className="contact-subtitle">
                    ¿Tienes alguna duda o sugerencia? ¡Nos encantaría ayudarte!
                </p>

                <div className="contact-info">
                    <p><strong>📧 Email:</strong> contacto@pawstore.com</p>
                    <p><strong>📞 Teléfono:</strong> +34 600 123 456</p>
                    <p><strong>📍 Dirección:</strong> Del palo del aguacate 300 metros a la derecha</p>
                    <p><strong>🕒 Horario:</strong> Lunes a Viernes, 9:00 - 18:00</p>
                </div>

                <form className="contact-form">
                    <input type="text" placeholder="Tu nombre" className="contact-input" />
                    <input type="email" placeholder="Tu email" className="contact-input" />
                    <textarea placeholder="Tu mensaje" className="contact-textarea"></textarea>

                    <button className="contact-button">Enviar mensaje</button>
                </form>
            </div>
        </div>
    );
};

export default Contact;