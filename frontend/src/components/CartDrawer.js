import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./CartDrawer.css";

export default function CartDrawer({ isOpen, onClose }) {
  const { cart, updateQty, removeItem, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <div className="overlay" onClick={onClose} />
      <div className="cart-drawer animate-slideIn">
        {/* Header */}
        <div className="cd-header">
          <div className="cd-title">
            <span className="cd-icon">🛒</span>
            <h2>Your Cart</h2>
            {cart.count > 0 && <span className="badge badge-accent">{cart.count} items</span>}
          </div>
          <button className="cd-close" onClick={onClose}>✕</button>
        </div>

        {/* Items */}
        <div className="cd-items">
          {cart.items.length === 0 ? (
            <div className="cd-empty">
              <div className="cd-empty-icon">🛍️</div>
              <p>Your cart is empty</p>
              <button className="btn btn-primary" onClick={onClose} style={{ marginTop: 16 }}>
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.items.map((item) => (
              <div className="cd-item" key={item.id}>
                <img src={item.image} alt={item.name} className="cd-item-img" />
                <div className="cd-item-info">
                  <div className="cd-item-name">{item.name}</div>
                  <div className="cd-item-price">${item.price.toFixed(2)}</div>
                  <div className="cd-item-controls">
                    <div className="qty-control">
                      <button className="qty-btn" onClick={() => updateQty(item.id, item.quantity - 1)}>−</button>
                      <span className="qty-val">{item.quantity}</span>
                      <button className="qty-btn" onClick={() => updateQty(item.id, item.quantity + 1)} disabled={item.quantity >= item.stock}>+</button>
                    </div>
                    <button className="cd-remove" onClick={() => removeItem(item.id)} title="Remove">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                    </button>
                  </div>
                </div>
                <div className="cd-item-total">${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.items.length > 0 && (
          <div className="cd-footer">
            <div className="cd-subtotal">
              <div className="cd-subtotal-row">
                <span>Subtotal</span><span>${cart.total.toFixed(2)}</span>
              </div>
              <div className="cd-subtotal-row">
                <span>Shipping</span><span className="price-sale">FREE</span>
              </div>
              <div className="cd-subtotal-row cd-total">
                <span>Total</span><span className="price">${cart.total.toFixed(2)}</span>
              </div>
            </div>
            <Link to="/checkout" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={onClose}>
              Checkout →
            </Link>
            <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "center", marginTop: 8 }} onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
