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
import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";


function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/product/see_product"
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  return (
    <>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} /><Route path="/catalog" element={<Catalog products={products} />} />
          <Route path="/detail/:id" element={<ProductDetail products={products} />} />
          <Route path="/admin" element={<><ProductTable products={products} setProducts={setProducts} setLoading={setLoading} />
            <CreateP products={products} setProducts={setProducts} setLoading={setLoading} /></>} />
          <Route path="/edit/:id" element={<Edit products={products} setProducts={setProducts} setLoading={setLoading} />} />
          <Route path="/createUser" element={<CreateUser setLoading={setLoading} />} />
          <Route path="/login" element={<Login setLoading={setLoading} />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>

      {loading && <Loading />}

      <Footer />
    </>
  );
}

export default App;