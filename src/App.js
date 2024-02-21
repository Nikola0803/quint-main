import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import LandingPage from "./pages/LandingPage/LandingPage";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import SingleProductPage from "./pages/SingleProductPage/SingleProductPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import CartPage from "./pages/CartPage/CartPage";


function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/product/:productId" element={<SingleProductPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/cart" element={<CartPage />} />
        

        {/* Add more routes if needed */}

        {/* 404 Not Found Page */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
