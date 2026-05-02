import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api";
import ProductCard from "../components/ProductCard";
import "./Home.css";

const SORT_OPTIONS = [
  { value: "", label: "Featured" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "rating", label: "Top Rated" },
  { value: "name", label: "Name A–Z" },
];

export default function Home() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const search = searchParams.get("search") || "";

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = { sort };
      if (category !== "All") params.category = category;
      if (search) params.search = search;
      const { data } = await api.get("/api/products", { params });
      setProducts(data.products);
      setTotalCount(data.total);
    } finally {
      setLoading(false);
    }
  }, [category, sort, search]);

  useEffect(() => {
    api.get("/api/products/categories").then(({ data }) => setCategories(data));
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="home">
      {/* Hero */}
      {!search && (
        <section className="hero">
          <div className="hero-bg">
            <div className="hero-orb hero-orb1" />
            <div className="hero-orb hero-orb2" />
            <div className="hero-orb hero-orb3" />
            <div className="hero-grid" />
          </div>
          <div className="container hero-content">
            <div className="hero-badge">
              <span>⚡</span> New drops every week
            </div>
            <h1 className="hero-title">
              The Future of<br />
              <span>Tech Shopping</span>
            </h1>
            <p className="hero-sub">
              Discover premium electronics, cutting-edge gadgets,<br />
              and tomorrow's tech — curated for you.
            </p>
            <div className="hero-actions">
              <a href="#products" className="btn btn-primary" style={{ fontSize: 16, padding: "14px 32px" }}>
                Shop Now →
              </a>
              <a href="#products" className="btn btn-ghost" style={{ fontSize: 16, padding: "14px 32px" }}>
                View Deals
              </a>
            </div>
            <div className="hero-stats">
              <div className="hero-stat"><span>8K+</span><label>Products</label></div>
              <div className="hero-stat"><span>99%</span><label>Satisfaction</label></div>
              <div className="hero-stat"><span>Free</span><label>Shipping</label></div>
            </div>
          </div>
        </section>
      )}

      {/* Products section */}
      <section className="products-section" id="products">
        <div className="container">
          {/* Header */}
          <div className="products-header">
            <div>
              <h2 className="section-title">
                {search ? <>Results for <span>"{search}"</span></> : <>Our <span>Collection</span></>}
              </h2>
              <p className="products-count">{totalCount} products</p>
            </div>
            <select className="input sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {/* Categories */}
          <div className="categories-bar">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`cat-pill ${category === cat ? "active" : ""}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          {loading ? (
            <div className="products-grid">
              {Array(8).fill(0).map((_, i) => (
                <div key={i} className="product-skeleton">
                  <div className="skeleton" style={{ aspectRatio: "1", marginBottom: 16 }} />
                  <div className="skeleton" style={{ height: 14, marginBottom: 8, width: "60%" }} />
                  <div className="skeleton" style={{ height: 18, marginBottom: 8 }} />
                  <div className="skeleton" style={{ height: 14, width: "40%" }} />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="no-results">
              <span>🔍</span>
              <p>No products found</p>
              <button className="btn btn-secondary" onClick={() => { setCategory("All"); }}>Clear filters</button>
            </div>
          ) : (
            <div className="products-grid">
              {products.map((p, i) => (
                <div key={p.id} style={{ animationDelay: `${i * 0.05}s` }} className="animate-fadeUp">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
