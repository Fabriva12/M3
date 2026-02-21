PawStore
========

Descripción:
------------
PawStore es una aplicación web desarrollada en React que simula una tienda de productos para mascotas. Permite navegar entre páginas usando una arquitectura SPA (Single Page Application).

Funcionalidades:
----------------
- Página principal (Home) con bienvenida y botón para ir al catálogo.
- Catálogo de productos cargados desde un archivo JSON con:
  - Imagen
  - Nombre
  - Precio
  - Categoría
  - Descripción
  - Botón "Ver Detalles"
- Detalle de producto mostrando toda la información del producto seleccionado.
- Navegación SPA entre Home, Catálogo y ProductDetail sin recargar la página.

Tecnologías utilizadas:
-----------------------
- React
- JavaScript (ES6+)
- CSS
- JSON (para simular base de datos local)

Estructura del proyecto:
------------------------
src/
│
├── components/
│   ├── Header.jsx
│   └── Footer.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── Catalog.jsx
│   └── ProductDetail.jsx
│
├── data/
│   └── products.json
│
├── style/
│   ├── Home.css
│   ├── Catalog.css
    ├──Footer.css
    ├──Header.css
│   └── ProductDetail.css
│
└── App.jsx


Cómo ejecutar el proyecto:
--------------------------
1. Clonar el repositorio:
   git clone <URL_DEL_REPOSITORIO>

2. Instalar dependencias:
   npm install

3. Ejecutar el servidor:
   npm start
   o
   npm run dev