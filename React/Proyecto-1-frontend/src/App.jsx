import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import ProductDetail from "./pages/ProductDetail";
import { CreateP, ProductTable } from "./pages/Administration";
import Edit from "./pages/Edit";
import data from "./data/products.json";
import CreateUser from "./pages/CreateUser";
import Login from "./pages/Login";
import Loading from "./components/Loading";

function App() {
  const [page, setPage] = useState("home");
  const [productId, setProductId] = useState(null);
  const [products, setProducts] = useState(data);
  const [loading, setLoading] = useState(false);

  const goTo = (newPage, id = null) => {
    setPage(newPage);
    if (id !== null) {
      setProductId(id);
    }
  };

  const renderPage = () => {
    if (page === "home") return <Home goTo={goTo} />;
    if (page === "catalog") return <Catalog goTo={goTo} products={products} />;
    if (page === "detail") return <ProductDetail goTo={goTo} productId={productId} products={products} />;
    if (page === "admin") return (<><ProductTable goTo={goTo} products={products} setProducts={setProducts} /> <CreateP goTo={goTo} products={products} setProducts={setProducts} /></>);
    if (page === "edit") return <Edit goTo={goTo} productId={productId} products={products} setProducts={setProducts} />;
    if (page === "createUser") return <CreateUser goTo={goTo} setLoading={setLoading} />;
    if (page === "login") return <Login goTo={goTo} setLoading={setLoading} />;
  };
  console.log(page);
  return (
    <>
      {loading && <Loading />}
      <Header goTo={goTo} />
      <main>{renderPage()}</main>
      <Footer />
    </>
  );
}

export default App;