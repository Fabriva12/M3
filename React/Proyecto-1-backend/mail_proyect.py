from flask_mail import Message
from flask_mail import Mail

mail = Mail()

def send_purchase_email(email, buyer, items, total):
    msg = Message(
        subject="Confirmación de compra",
        sender="tu_correo@gmail.com",
        recipients=[email]
    )

    items_text = "\n".join([
    f"{item['nombre']} - {item['cantidad']}"
    for item in items
])

    msg.body = f"""
Hola {buyer.get('name', '')},

Gracias por tu compra.

Detalles:
{items_text}

Total: {total}

¡Gracias por confiar en nosotros!
"""

    try:
        mail.send(msg)
        print("Correo de compra enviado a:", email)
    except Exception as e:
        print("Error enviando correo:", e)