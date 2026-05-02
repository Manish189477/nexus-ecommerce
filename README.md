# ⬡ NEXUS — Premium Tech E-Commerce Store

A full-stack e-commerce application with React frontend and Node.js backend.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed

---

### 1. Start the Backend

```bash
cd backend
npm install
npm start
# ✅ API running at http://localhost:5000
```

### 2. Start the Frontend

```bash
cd frontend
npm install
npm start
# ✅ App opens at http://localhost:3000
```

---

## ✨ Features

| Feature | Details |
|---------|---------|
| 🛒 Cart | Add, remove, update quantity with live totals |
| ❤️ Wishlist | Save favourites, persisted per session |
| 🔍 Search & Filter | Search by name/tag, filter by category, sort by price/rating |
| 📦 Orders | Multi-step checkout → order history |
| 🎨 UI | Dark luxury theme, animated hero, hover effects |
| 📱 Responsive | Works on mobile & desktop |

## 🗂️ Project Structure

```
ecommerce/
├── backend/
│   ├── server.js        # Express API (products, cart, wishlist, orders)
│   └── package.json
└── frontend/
    ├── public/
    └── src/
        ├── api.js               # Axios instance + session management
        ├── App.js               # Routes
        ├── context/
        │   └── CartContext.js   # Global cart + wishlist state
        ├── components/
        │   ├── Navbar.js
        │   ├── CartDrawer.js    # Slide-in cart
        │   ├── ProductCard.js
        │   └── Footer.js
        └── pages/
            ├── Home.js          # Hero + product grid
            ├── ProductDetail.js
            ├── Checkout.js      # Multi-step checkout
            ├── OrderSuccess.js
            ├── Orders.js
            └── Wishlist.js
```

## 🌐 API Endpoints

```
GET    /api/products            # List with ?search, ?category, ?sort
GET    /api/products/categories
GET    /api/products/:id
GET    /api/cart
POST   /api/cart                # { productId, quantity }
PUT    /api/cart/:itemId        # { quantity }
DELETE /api/cart/:itemId
DELETE /api/cart                # Clear all
GET    /api/wishlist
POST   /api/wishlist/:productId # Toggle
GET    /api/orders
POST   /api/orders              # Place order (clears cart)
```

> **Note**: Data is stored in memory. Restart the server to reset.
> For production, replace with MongoDB/PostgreSQL.
