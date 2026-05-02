// OrderSuccess.js
import React from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import "./OrderSuccess.css";

export function OrderSuccess() {
  const location = useLocation();
  const { id } = useParams();
  const order = location.state?.order;

  return (
    <div className="os-page container">
      <div className="os-card animate-fadeUp">
        <div className="os-icon">🎉</div>
        <h1 className="os-title">Order Confirmed!</h1>
        <p className="os-sub">Thank you for your order. We'll send a confirmation to your email shortly.</p>
        <div className="os-id">
          <span>Order ID</span>
          <strong>#{id}</strong>
        </div>
        {order && (
          <div className="os-details">
            <div className="os-detail-row"><span>Items</span><strong>{order.items.length}</strong></div>
            <div className="os-detail-row"><span>Total</span><strong>${order.total.toFixed(2)}</strong></div>
            <div className="os-detail-row"><span>Payment</span><strong style={{ textTransform: "capitalize" }}>{order.paymentMethod}</strong></div>
            <div className="os-detail-row">
              <span>Est. Delivery</span>
              <strong>{new Date(order.estimatedDelivery).toLocaleDateString("en-IN", { day: "numeric", month: "long" })}</strong>
            </div>
          </div>
        )}
        <div className="os-actions">
          <Link to="/orders" className="btn btn-secondary">View Orders</Link>
          <Link to="/" className="btn btn-primary">Continue Shopping →</Link>
        </div>
      </div>
    </div>
  );
}
