import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import ProductCard from "../components/ProductCard";
import "./Orders.css";

export default function Wishlist() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadWishlist = async () => {
    setLoading(true);
    try {
      const { data: ids } = await api.get("/api/wishlist");
      if (ids.length === 0) { setProducts([]); setLoading(false); return; }
      const { data } = await api.get("/api/products");
      setProducts(data.products.filter((p) => ids.includes(p.id)));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadWishlist(); }, []);

  return (
    <div className="list-page container">
      <h1 className="section-title" style={{ marginBottom: 32 }}>My <span>Wishlist</span></h1>
      {loading ? (
        <div className="products-grid">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="product-skeleton">
              <div className="skeleton" style={{ aspectRatio: "1", marginBottom: 16 }} />
              <div className="skeleton" style={{ height: 14, marginBottom: 8, width: "60%" }} />
              <div className="skeleton" style={{ height: 18 }} />
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="list-empty">
          <span>💝</span>
          <p>Your wishlist is empty</p>
          <Link to="/" className="btn btn-primary">Discover Products</Link>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
