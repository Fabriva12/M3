import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import ProductDetail from "./pages/ProductDetail";

function App() {
  const [page, setPage] = useState("home");
  const [productId, setProductId] = useState(null);

  const goTo = (newPage, id = null) => {
    setPage(newPage);
    if (id !== null) {
      setProductId(id);
    }
  };

  const renderPage = () => {
    if (page === "home") return <Home goTo={goTo} />;
    if (page === "catalog") return <Catalog goTo={goTo} />;
    if (page === "detail") return <ProductDetail goTo={goTo} productId={productId} />;
  };

  return (
    <>
      <Header goTo={goTo} />
      <main>{renderPage()}</main>
      <Footer />
    </>
  );
}

export default App;