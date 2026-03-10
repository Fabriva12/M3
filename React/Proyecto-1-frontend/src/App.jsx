import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import ProductDetail from "./pages/ProductDetail";
import { CreateP, ProductTable } from "./pages/Administration";
import Edit from "./pages/Edit";
import CreateUser from "./pages/CreateUser";
import Login from "./pages/Login";
import Loading from "./components/Loading";
import axios from "axios";

function App() {
  const [page, setPage] = useState("home");
  const [productId, setProductId] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [role, setRole] = useState(localStorage.getItem("role"))
  const [token, setToken] = useState(localStorage.getItem("token"));

  const goTo = (newPage, id = null) => {
    setPage(newPage);
    if (id !== null) {
      setProductId(id);
    }
  };

  console.log("App cargando");

  useEffect(() => {
    console.log("useEffect ejecutado");
    getProducts();
  }, []);

  async function getProducts() {
    try {
      const response = await axios.get("http://127.0.0.1:5000/product/see_product");
      console.log("Products fetched:", response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
  const renderPage = () => {
    if (page === "home") return <Home goTo={goTo} />;
    if (page === "catalog") return <Catalog goTo={goTo} products={products} />;
    if (page === "detail") return <ProductDetail goTo={goTo} productId={productId} products={products} />;
    if (page === "admin") return (<><ProductTable goTo={goTo} products={products} setProducts={setProducts} setLoading={setLoading} /> <CreateP goTo={goTo} products={products} setProducts={setProducts} setLoading={setLoading} role={role} token={token} /></>);
    if (page === "edit") return <Edit goTo={goTo} productId={productId} products={products} setProducts={setProducts} setLoading={setLoading} />;
    if (page === "createUser") return <CreateUser goTo={goTo} setLoading={setLoading} />;
    if (page === "login") return <Login goTo={goTo} setLoading={setLoading} setRole={setRole} setToken={setToken} />;
  };
  console.log(page);
  return (
    <>
      {loading && <Loading />}
      <Header goTo={goTo} role={role} setRole={setRole} />
      <main>{renderPage()}</main>
      <Footer />
    </>
  );
}

export default App;