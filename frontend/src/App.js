import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import { OrderSuccess } from "./pages/OrderSuccess";
import { Orders } from "./pages/Orders";
import Wishlist from "./pages/Wishlist";

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar onCartOpen={() => setCartOpen(true)} />
        <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success/:id" element={<OrderSuccess />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
        <Footer />
      </CartProvider>
    </BrowserRouter>
  );
}
