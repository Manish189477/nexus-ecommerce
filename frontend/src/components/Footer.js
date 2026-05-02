import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <span>⬡</span> NEXUS
            </div>
            <p>The future of tech shopping. Premium electronics, curated for you.</p>
            <div className="footer-socials">
              {["𝕏", "in", "ig", "yt"].map((s) => (
                <a key={s} href="#!" className="social-btn">{s}</a>
              ))}
            </div>
          </div>
          <div className="footer-col">
            <h4>Store</h4>
            <Link to="/">All Products</Link>
            <Link to="/?category=Electronics">Electronics</Link>
            <Link to="/?category=Computers">Computers</Link>
            <Link to="/wishlist">Wishlist</Link>
          </div>
          <div className="footer-col">
            <h4>Account</h4>
            <Link to="/orders">My Orders</Link>
            <Link to="/checkout">Checkout</Link>
          </div>
          <div className="footer-col">
            <h4>Support</h4>
            <a href="#!">Help Center</a>
            <a href="#!">Returns</a>
            <a href="#!">Track Order</a>
            <a href="#!">Contact Us</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 NEXUS. All rights reserved.</p>
          <div className="footer-payments">
            {["VISA", "MC", "AMEX", "UPI"].map((p) => (
              <span key={p} className="payment-badge">{p}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
