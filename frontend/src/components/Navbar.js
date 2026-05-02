import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Navbar.css";

export default function Navbar({ onCartOpen }) {
  const { cart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/?search=${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container nav-inner">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <span className="logo-icon">⬡</span>
          <span className="logo-text">NEXUS</span>
        </Link>

        {/* Nav links */}
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="/" className={location.pathname === "/" ? "active" : ""} onClick={() => setMenuOpen(false)}>Store</Link>
          <Link to="/wishlist" className={location.pathname === "/wishlist" ? "active" : ""} onClick={() => setMenuOpen(false)}>Wishlist</Link>
          <Link to="/orders" className={location.pathname === "/orders" ? "active" : ""} onClick={() => setMenuOpen(false)}>Orders</Link>
        </div>

        {/* Search */}
        <form className="nav-search" onSubmit={handleSearch}>
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </form>

        {/* Actions */}
        <div className="nav-actions">
          <Link to="/wishlist" className="nav-icon-btn" title="Wishlist">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </Link>
          <button className="nav-icon-btn cart-btn" onClick={onCartOpen} title="Cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            {cart.count > 0 && <span className="cart-count">{cart.count}</span>}
          </button>
          <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span /><span /><span />
          </button>
        </div>
      </div>
    </nav>
  );
}
