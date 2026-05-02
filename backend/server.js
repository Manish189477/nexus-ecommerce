const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(express.json());

// ─── In-memory data ───────────────────────────────────────────────────────────

const products = [
  {
    id: "1",
    name: "AirPods Pro Max",
    category: "Electronics",
    price: 549.99,
    originalPrice: 649.99,
    rating: 4.8,
    reviews: 2341,
    stock: 15,
    badge: "Best Seller",
    description:
      "Premium over-ear headphones with active noise cancellation and spatial audio for an immersive listening experience.",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600",
    ],
    specs: { Battery: "20hr", Connectivity: "Bluetooth 5.3", Weight: "385g", Color: "Midnight" },
    tags: ["wireless", "noise-cancelling", "premium"],
  },
  {
    id: "2",
    name: "MacBook Pro 14\"",
    category: "Computers",
    price: 1999.99,
    originalPrice: 2199.99,
    rating: 4.9,
    reviews: 1876,
    stock: 8,
    badge: "New",
    description:
      "Apple M3 Pro chip with 12-core CPU, stunning Liquid Retina XDR display, and all-day battery life.",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600",
    ],
    specs: { Processor: "M3 Pro", RAM: "18GB", Storage: "512GB SSD", Display: "14.2\" XDR" },
    tags: ["laptop", "apple", "professional"],
  },
  {
    id: "3",
    name: "Sony Alpha A7 IV",
    category: "Cameras",
    price: 2499.99,
    originalPrice: 2799.99,
    rating: 4.7,
    reviews: 934,
    stock: 5,
    badge: "Hot",
    description:
      "33MP full-frame mirrorless camera with advanced autofocus, 4K 60p video, and professional-grade build.",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600",
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600",
    ],
    specs: { Sensor: "33MP BSI CMOS", ISO: "100-51200", Video: "4K 60fps", AF: "759-point" },
    tags: ["mirrorless", "professional", "photography"],
  },
  {
    id: "4",
    name: "Apple Watch Ultra 2",
    category: "Wearables",
    price: 799.99,
    originalPrice: 849.99,
    rating: 4.8,
    reviews: 1203,
    stock: 20,
    badge: "Sale",
    description:
      "The most capable Apple Watch with titanium case, precision dual-frequency GPS, and 60hr battery life.",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600",
    ],
    specs: { Case: "49mm Titanium", Battery: "60hr", GPS: "L1/L5", WR: "100m" },
    tags: ["smartwatch", "fitness", "adventure"],
  },
  {
    id: "5",
    name: "iPad Pro M2",
    category: "Tablets",
    price: 1099.99,
    originalPrice: 1199.99,
    rating: 4.7,
    reviews: 2109,
    stock: 12,
    badge: null,
    description:
      "The ultimate iPad with M2 chip, ProMotion XDR display, Apple Pencil hover, and Wi-Fi 6E connectivity.",
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600",
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600",
    ],
    specs: { Chip: "M2", Display: "12.9\" Liquid XDR", Storage: "256GB", Connectivity: "Wi-Fi 6E" },
    tags: ["tablet", "creative", "productivity"],
  },
  {
    id: "6",
    name: "Samsung 4K OLED TV",
    category: "TVs",
    price: 1799.99,
    originalPrice: 2299.99,
    rating: 4.6,
    reviews: 567,
    stock: 6,
    badge: "Deal",
    description:
      "65\" QD-OLED display with Neural Quantum Processor 4K, Dolby Atmos, and stunning HDR performance.",
    images: [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=600",
      "https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?w=600",
    ],
    specs: { Size: "65\"", Panel: "QD-OLED", Refresh: "120Hz", HDR: "HDR10+" },
    tags: ["tv", "oled", "entertainment"],
  },
  {
    id: "7",
    name: "DJI Mini 4 Pro",
    category: "Drones",
    price: 959.99,
    originalPrice: 1099.99,
    rating: 4.9,
    reviews: 723,
    stock: 10,
    badge: "New",
    description:
      "Under 249g foldable drone with 4K/60fps camera, 34-min flight time, and omnidirectional obstacle sensing.",
    images: [
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600",
      "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=600",
    ],
    specs: { Weight: "< 249g", Camera: "4K/60fps", Flight: "34 min", Range: "20km" },
    tags: ["drone", "aerial", "photography"],
  },
  {
    id: "8",
    name: "Mechanical Gaming KB",
    category: "Peripherals",
    price: 179.99,
    originalPrice: 219.99,
    rating: 4.5,
    reviews: 3421,
    stock: 30,
    badge: "Popular",
    description:
      "TKL layout with Cherry MX switches, per-key RGB lighting, and aircraft-grade aluminum frame.",
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600",
      "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=600",
    ],
    specs: { Switches: "Cherry MX Red", Layout: "TKL 80%", RGB: "Per-key", Frame: "Aluminum" },
    tags: ["gaming", "keyboard", "rgb"],
  },
];

// In-memory cart & orders (keyed by session id from header or default)
const carts = {};
const orders = {};
const wishlist = {};

function getCart(sessionId) {
  if (!carts[sessionId]) carts[sessionId] = [];
  return carts[sessionId];
}

// ─── Product routes ───────────────────────────────────────────────────────────

app.get("/api/products", (req, res) => {
  const { category, search, sort, minPrice, maxPrice } = req.query;
  let result = [...products];

  if (category && category !== "All") {
    result = result.filter((p) => p.category === category);
  }
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.includes(q))
    );
  }
  if (minPrice) result = result.filter((p) => p.price >= Number(minPrice));
  if (maxPrice) result = result.filter((p) => p.price <= Number(maxPrice));

  if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
  else if (sort === "rating") result.sort((a, b) => b.rating - a.rating);
  else if (sort === "name") result.sort((a, b) => a.name.localeCompare(b.name));

  res.json({ products: result, total: result.length });
});

app.get("/api/products/categories", (req, res) => {
  const cats = ["All", ...new Set(products.map((p) => p.category))];
  res.json(cats);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
});

// ─── Cart routes ──────────────────────────────────────────────────────────────

app.get("/api/cart", (req, res) => {
  const sid = req.headers["x-session-id"] || "default";
  const cart = getCart(sid);
  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  res.json({ items: cart, total: +total.toFixed(2), count: cart.reduce((s, i) => s + i.quantity, 0) });
});

app.post("/api/cart", (req, res) => {
  const sid = req.headers["x-session-id"] || "default";
  const cart = getCart(sid);
  const { productId, quantity = 1 } = req.body;

  const product = products.find((p) => p.id === productId);
  if (!product) return res.status(404).json({ error: "Product not found" });

  const existing = cart.find((i) => i.productId === productId);
  if (existing) {
    existing.quantity = Math.min(existing.quantity + quantity, product.stock);
  } else {
    cart.push({ id: uuidv4(), productId, name: product.name, price: product.price, image: product.images[0], quantity, stock: product.stock });
  }

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  res.json({ items: cart, total: +total.toFixed(2), count: cart.reduce((s, i) => s + i.quantity, 0) });
});

app.put("/api/cart/:itemId", (req, res) => {
  const sid = req.headers["x-session-id"] || "default";
  const cart = getCart(sid);
  const { quantity } = req.body;
  const item = cart.find((i) => i.id === req.params.itemId);
  if (!item) return res.status(404).json({ error: "Cart item not found" });

  if (quantity <= 0) {
    const idx = cart.indexOf(item);
    cart.splice(idx, 1);
  } else {
    item.quantity = Math.min(quantity, item.stock);
  }

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  res.json({ items: cart, total: +total.toFixed(2), count: cart.reduce((s, i) => s + i.quantity, 0) });
});

app.delete("/api/cart/:itemId", (req, res) => {
  const sid = req.headers["x-session-id"] || "default";
  const cart = getCart(sid);
  const idx = cart.findIndex((i) => i.id === req.params.itemId);
  if (idx === -1) return res.status(404).json({ error: "Cart item not found" });
  cart.splice(idx, 1);
  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  res.json({ items: cart, total: +total.toFixed(2), count: cart.reduce((s, i) => s + i.quantity, 0) });
});

app.delete("/api/cart", (req, res) => {
  const sid = req.headers["x-session-id"] || "default";
  carts[sid] = [];
  res.json({ items: [], total: 0, count: 0 });
});

// ─── Wishlist routes ──────────────────────────────────────────────────────────

app.get("/api/wishlist", (req, res) => {
  const sid = req.headers["x-session-id"] || "default";
  if (!wishlist[sid]) wishlist[sid] = [];
  res.json(wishlist[sid]);
});

app.post("/api/wishlist/:productId", (req, res) => {
  const sid = req.headers["x-session-id"] || "default";
  if (!wishlist[sid]) wishlist[sid] = [];
  const pid = req.params.productId;
  const idx = wishlist[sid].indexOf(pid);
  if (idx === -1) wishlist[sid].push(pid);
  else wishlist[sid].splice(idx, 1);
  res.json(wishlist[sid]);
});

// ─── Order routes ─────────────────────────────────────────────────────────────

app.post("/api/orders", (req, res) => {
  const sid = req.headers["x-session-id"] || "default";
  const cart = getCart(sid);
  if (cart.length === 0) return res.status(400).json({ error: "Cart is empty" });

  const { shippingInfo, paymentMethod } = req.body;
  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const orderId = uuidv4().slice(0, 8).toUpperCase();

  const order = {
    id: orderId,
    items: [...cart],
    total: +total.toFixed(2),
    shippingInfo,
    paymentMethod,
    status: "Confirmed",
    createdAt: new Date().toISOString(),
    estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
  };

  if (!orders[sid]) orders[sid] = [];
  orders[sid].push(order);
  carts[sid] = [];

  res.json(order);
});

app.get("/api/orders", (req, res) => {
  const sid = req.headers["x-session-id"] || "default";
  res.json(orders[sid] || []);
});

// ─── Health check ─────────────────────────────────────────────────────────────

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ API running on http://localhost:${PORT}`));
