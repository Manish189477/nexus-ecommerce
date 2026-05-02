import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import "./Orders.css";

export function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/orders").then(({ data }) => { setOrders(data); setLoading(false); });
  }, []);

  if (loading) return <div className="list-page container"><div className="skeleton" style={{ height: 200, borderRadius: 16 }} /></div>;

  return (
    <div className="list-page container">
      <h1 className="section-title" style={{ marginBottom: 32 }}>My <span>Orders</span></h1>
      {orders.length === 0 ? (
        <div className="list-empty">
          <span>📦</span>
          <p>No orders yet</p>
          <Link to="/" className="btn btn-primary">Start Shopping</Link>
        </div>
      ) : (
        <div className="orders-list">
          {[...orders].reverse().map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-head">
                <div>
                  <div className="order-id">Order #{order.id}</div>
                  <div className="order-date">{new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</div>
                </div>
                <div className="order-status">
                  <span className="badge badge-green">{order.status}</span>
                  <div className="order-total price">${order.total.toFixed(2)}</div>
                </div>
              </div>
              <div className="order-items">
                {order.items.map((item) => (
                  <div key={item.id} className="order-item">
                    <img src={item.image} alt={item.name} />
                    <span>{item.name}</span>
                    <span className="oi-qty">×{item.quantity}</span>
                    <span className="oi-price">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="order-footer">
                <span className="order-delivery">Est. Delivery: {new Date(order.estimatedDelivery).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                <span className="badge badge-purple">{order.paymentMethod?.toUpperCase()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
