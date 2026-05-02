import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import api from "../api";
import "./Checkout.css";

const STEPS = ["Cart Review", "Shipping", "Payment", "Confirm"];

export default function Checkout() {
  const { cart, fetchCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [placing, setPlacing] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", address: "", city: "", zip: "", country: "India",
    cardName: "", cardNum: "", expiry: "", cvv: "", payMethod: "card",
  });

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const placeOrder = async () => {
    setPlacing(true);
    try {
      const { data } = await api.post("/api/orders", {
        shippingInfo: { name: form.name, email: form.email, address: form.address, city: form.city, zip: form.zip, country: form.country },
        paymentMethod: form.payMethod,
      });
      await fetchCart();
      navigate(`/order-success/${data.id}`, { state: { order: data } });
    } catch (e) {
      alert("Order failed. Please try again.");
    } finally {
      setPlacing(false);
    }
  };

  if (cart.items.length === 0 && step === 0) {
    return (
      <div className="checkout-empty container">
        <div className="ce-icon">🛒</div>
        <h2>Your cart is empty</h2>
        <Link to="/" className="btn btn-primary">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="checkout-header">
          <h1 className="section-title">Checkout</h1>
          <div className="checkout-steps">
            {STEPS.map((s, i) => (
              <div key={s} className={`cs-step ${i === step ? "active" : ""} ${i < step ? "done" : ""}`}>
                <span className="cs-num">{i < step ? "✓" : i + 1}</span>
                <span className="cs-label">{s}</span>
                {i < STEPS.length - 1 && <span className="cs-line" />}
              </div>
            ))}
          </div>
        </div>

        <div className="checkout-body">
          {/* Left: form */}
          <div className="checkout-form-area">
            {step === 0 && (
              <div className="co-section animate-fadeUp">
                <h2 className="co-section-title">Review Cart</h2>
                {cart.items.map((item) => (
                  <div key={item.id} className="co-item">
                    <img src={item.image} alt={item.name} />
                    <div className="co-item-info">
                      <div className="co-item-name">{item.name}</div>
                      <div className="co-item-qty">Qty: {item.quantity}</div>
                    </div>
                    <div className="co-item-price">${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
                <button className="btn btn-primary co-next" onClick={() => setStep(1)}>Continue to Shipping →</button>
              </div>
            )}

            {step === 1 && (
              <div className="co-section animate-fadeUp">
                <h2 className="co-section-title">Shipping Information</h2>
                <div className="co-form-grid">
                  <label className="co-label">Full Name<input className="input" value={form.name} onChange={set("name")} placeholder="John Doe" /></label>
                  <label className="co-label">Email<input className="input" type="email" value={form.email} onChange={set("email")} placeholder="john@example.com" /></label>
                  <label className="co-label" style={{ gridColumn: "1/-1" }}>Address<input className="input" value={form.address} onChange={set("address")} placeholder="123 Main Street, Apt 4B" /></label>
                  <label className="co-label">City<input className="input" value={form.city} onChange={set("city")} placeholder="Mumbai" /></label>
                  <label className="co-label">ZIP / Postal Code<input className="input" value={form.zip} onChange={set("zip")} placeholder="400001" /></label>
                  <label className="co-label" style={{ gridColumn: "1/-1" }}>Country
                    <select className="input" value={form.country} onChange={set("country")}>
                      {["India","USA","UK","Canada","Australia","Germany","Japan"].map(c => <option key={c}>{c}</option>)}
                    </select>
                  </label>
                </div>
                <div className="co-btns">
                  <button className="btn btn-ghost" onClick={() => setStep(0)}>← Back</button>
                  <button className="btn btn-primary co-next" onClick={() => setStep(2)} disabled={!form.name || !form.email || !form.address}>Continue to Payment →</button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="co-section animate-fadeUp">
                <h2 className="co-section-title">Payment Method</h2>
                <div className="co-pay-methods">
                  {[["card","💳 Credit / Debit Card"],["upi","📱 UPI"],["cod","🏠 Cash on Delivery"]].map(([val, label]) => (
                    <label key={val} className={`co-pay-option ${form.payMethod === val ? "selected" : ""}`}>
                      <input type="radio" name="payMethod" value={val} checked={form.payMethod === val} onChange={set("payMethod")} />
                      {label}
                    </label>
                  ))}
                </div>
                {form.payMethod === "card" && (
                  <div className="co-form-grid co-card-form">
                    <label className="co-label" style={{ gridColumn: "1/-1" }}>Card Number<input className="input" value={form.cardNum} onChange={set("cardNum")} placeholder="4242 4242 4242 4242" maxLength={19} /></label>
                    <label className="co-label" style={{ gridColumn: "1/-1" }}>Name on Card<input className="input" value={form.cardName} onChange={set("cardName")} placeholder="John Doe" /></label>
                    <label className="co-label">Expiry<input className="input" value={form.expiry} onChange={set("expiry")} placeholder="MM/YY" maxLength={5} /></label>
                    <label className="co-label">CVV<input className="input" value={form.cvv} onChange={set("cvv")} placeholder="123" maxLength={4} type="password" /></label>
                  </div>
                )}
                {form.payMethod === "upi" && (
                  <div style={{ marginTop: 16 }}>
                    <label className="co-label">UPI ID<input className="input" placeholder="yourname@upi" /></label>
                  </div>
                )}
                <div className="co-btns">
                  <button className="btn btn-ghost" onClick={() => setStep(1)}>← Back</button>
                  <button className="btn btn-primary co-next" onClick={() => setStep(3)}>Review Order →</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="co-section animate-fadeUp">
                <h2 className="co-section-title">Confirm Your Order</h2>
                <div className="co-confirm-block">
                  <div className="co-confirm-row"><span>Ship to</span><strong>{form.name}, {form.city}</strong></div>
                  <div className="co-confirm-row"><span>Email</span><strong>{form.email}</strong></div>
                  <div className="co-confirm-row"><span>Payment</span><strong>{form.payMethod === "card" ? "Credit Card" : form.payMethod === "upi" ? "UPI" : "Cash on Delivery"}</strong></div>
                  <div className="co-confirm-row"><span>Items</span><strong>{cart.count}</strong></div>
                </div>
                <div className="co-btns">
                  <button className="btn btn-ghost" onClick={() => setStep(2)}>← Back</button>
                  <button className="btn btn-primary co-next" onClick={placeOrder} disabled={placing}>
                    {placing ? "Placing Order…" : "🎉 Place Order"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right: order summary */}
          <div className="checkout-summary">
            <h3>Order Summary</h3>
            <div className="cs-items">
              {cart.items.map((item) => (
                <div key={item.id} className="cs-item">
                  <img src={item.image} alt={item.name} />
                  <span className="cs-item-name">{item.name}</span>
                  <span className="cs-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="cs-totals">
              <div className="cs-row"><span>Subtotal</span><span>${cart.total.toFixed(2)}</span></div>
              <div className="cs-row"><span>Shipping</span><span className="price-sale">FREE</span></div>
              <div className="cs-row cs-grand"><span>Total</span><span className="price">${cart.total.toFixed(2)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
