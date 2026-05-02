import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./ProductCard.css";

const BADGE_CLASS = {
  "Best Seller": "badge-accent",
  New: "badge-purple",
  Hot: "badge-red",
  Sale: "badge-green",
  Deal: "badge-amber",
  Popular: "badge-amber",
};

function Stars({ rating }) {
  return (
    <span className="stars">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ opacity: s <= Math.round(rating) ? 1 : 0.25 }}>★</span>
      ))}
    </span>
  );
}

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const wishlisted = isWishlisted(product.id);

  const handleAdd = async (e) => {
    e.preventDefault();
    setAdding(true);
    await addToCart(product.id);
    setAdding(false);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(product.id);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      {/* Image */}
      <div className="pc-image-wrap">
        <img src={product.images[0]} alt={product.name} className="pc-image" loading="lazy" />
        <div className="pc-overlay">
          <button className={`pc-add-btn ${added ? "added" : ""}`} onClick={handleAdd} disabled={adding}>
            {adding ? <span className="spinner" /> : added ? "✓ Added" : "+ Add to Cart"}
          </button>
        </div>
        {product.badge && (
          <span className={`badge ${BADGE_CLASS[product.badge] || "badge-accent"} pc-badge`}>
            {product.badge}
          </span>
        )}
        {discount > 0 && (
          <span className="badge badge-green pc-discount">-{discount}%</span>
        )}
        <button className={`pc-wishlist ${wishlisted ? "active" : ""}`} onClick={handleWishlist} title="Wishlist">
          <svg width="16" height="16" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
        {product.stock <= 5 && (
          <span className="pc-low-stock">Only {product.stock} left!</span>
        )}
      </div>

      {/* Info */}
      <div className="pc-info">
        <div className="pc-category">{product.category}</div>
        <h3 className="pc-name">{product.name}</h3>
        <div className="pc-rating">
          <Stars rating={product.rating} />
          <span className="pc-reviews">({product.reviews.toLocaleString()})</span>
        </div>
        <div className="pc-pricing">
          <span className="price">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="price price-original">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
