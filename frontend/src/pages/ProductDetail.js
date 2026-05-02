import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api";
import { useCart } from "../context/CartContext";
import "./ProductDetail.css";

function Stars({ rating }) {
  return (
    <span className="stars">
      {[1,2,3,4,5].map(s => <span key={s} style={{ opacity: s <= Math.round(rating) ? 1 : 0.25 }}>★</span>)}
    </span>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get(`/api/products/${id}`)
      .then(({ data }) => { setProduct(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  const handleAdd = async () => {
    setAdding(true);
    await addToCart(product.id, qty);
    setAdding(false);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="pd-loading container">
        <div className="pd-skeleton-img skeleton" />
        <div className="pd-skeleton-info">
          {[80, 50, 100, 40, 60].map((w, i) => (
            <div key={i} className="skeleton" style={{ height: 20, width: `${w}%`, marginBottom: 16 }} />
          ))}
        </div>
      </div>
    );
  }

  if (!product) return (
    <div className="container" style={{ padding: "120px 0", textAlign: "center" }}>
      <p style={{ color: "var(--text2)", fontSize: 18 }}>Product not found</p>
      <Link to="/" className="btn btn-primary" style={{ marginTop: 24 }}>← Back to Store</Link>
    </div>
  );

  const wishlisted = isWishlisted(product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="pd-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="pd-breadcrumb">
          <Link to="/">Store</Link>
          <span>›</span>
          <span>{product.category}</span>
          <span>›</span>
          <span className="current">{product.name}</span>
        </nav>

        <div className="pd-grid">
          {/* Images */}
          <div className="pd-images">
            <div className="pd-main-img-wrap">
              <img src={product.images[activeImg]} alt={product.name} className="pd-main-img" />
              {product.badge && (
                <span className="badge badge-accent pd-badge">{product.badge}</span>
              )}
              {discount > 0 && (
                <span className="badge badge-green" style={{ position: "absolute", top: 16, right: 16 }}>
                  -{discount}% OFF
                </span>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="pd-thumbnails">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    className={`pd-thumb ${activeImg === i ? "active" : ""}`}
                    onClick={() => setActiveImg(i)}
                  >
                    <img src={img} alt={`View ${i + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="pd-info animate-fadeUp">
            <div className="pd-category">{product.category}</div>
            <h1 className="pd-name">{product.name}</h1>

            <div className="pd-rating-row">
              <Stars rating={product.rating} />
              <span className="pd-rating-val">{product.rating}</span>
              <span className="pd-reviews">({product.reviews.toLocaleString()} reviews)</span>
            </div>

            <div className="pd-pricing">
              <span className="price pd-price">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="price price-original pd-orig">${product.originalPrice.toFixed(2)}</span>
              )}
              {discount > 0 && (
                <span className="badge badge-green">Save ${(product.originalPrice - product.price).toFixed(2)}</span>
              )}
            </div>

            <p className="pd-description">{product.description}</p>

            {/* Specs */}
            <div className="pd-specs">
              <h3>Specifications</h3>
              <div className="pd-specs-grid">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="pd-spec-item">
                    <span className="pd-spec-key">{key}</span>
                    <span className="pd-spec-val">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stock */}
            <div className="pd-stock">
              {product.stock > 10 ? (
                <span className="stock-ok">✓ In Stock</span>
              ) : product.stock > 0 ? (
                <span className="stock-low">⚠ Only {product.stock} left</span>
              ) : (
                <span className="stock-out">✕ Out of Stock</span>
              )}
            </div>

            {/* Add to cart */}
            <div className="pd-actions">
              <div className="qty-control pd-qty">
                <button className="qty-btn" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                <span className="qty-val">{qty}</span>
                <button className="qty-btn" onClick={() => setQty(Math.min(product.stock, qty + 1))}>+</button>
              </div>
              <button
                className={`btn btn-primary pd-add-btn ${added ? "added" : ""}`}
                onClick={handleAdd}
                disabled={adding || product.stock === 0}
              >
                {adding ? "Adding…" : added ? "✓ Added to Cart!" : "Add to Cart"}
              </button>
              <button
                className={`btn pd-wishlist-btn ${wishlisted ? "wishlisted" : "btn-ghost"}`}
                onClick={() => toggleWishlist(product.id)}
                title="Wishlist"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </button>
            </div>

            {/* Tags */}
            <div className="pd-tags">
              {product.tags.map((t) => (
                <span key={t} className="pd-tag">#{t}</span>
              ))}
            </div>

            {/* Guarantees */}
            <div className="pd-guarantees">
              <div className="pd-guarantee"><span>🚚</span> Free Shipping</div>
              <div className="pd-guarantee"><span>↩️</span> 30-Day Returns</div>
              <div className="pd-guarantee"><span>🔒</span> Secure Payment</div>
              <div className="pd-guarantee"><span>✅</span> 2-Year Warranty</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
