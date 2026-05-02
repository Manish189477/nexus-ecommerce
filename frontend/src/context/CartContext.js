import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import api from "../api";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState({ items: [], total: 0, count: 0 });
  const [loading, setLoading] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  const fetchCart = useCallback(async () => {
    try {
      const { data } = await api.get("/api/cart");
      setCart(data);
    } catch (e) {}
  }, []);

  const fetchWishlist = useCallback(async () => {
    try {
      const { data } = await api.get("/api/wishlist");
      setWishlist(data);
    } catch (e) {}
  }, []);

  useEffect(() => {
    fetchCart();
    fetchWishlist();
  }, [fetchCart, fetchWishlist]);

  const addToCart = useCallback(async (productId, quantity = 1) => {
    setLoading(true);
    try {
      const { data } = await api.post("/api/cart", { productId, quantity });
      setCart(data);
      return true;
    } catch (e) {
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateQty = useCallback(async (itemId, quantity) => {
    const { data } = await api.put(`/api/cart/${itemId}`, { quantity });
    setCart(data);
  }, []);

  const removeItem = useCallback(async (itemId) => {
    const { data } = await api.delete(`/api/cart/${itemId}`);
    setCart(data);
  }, []);

  const clearCart = useCallback(async () => {
    const { data } = await api.delete("/api/cart");
    setCart(data);
  }, []);

  const toggleWishlist = useCallback(async (productId) => {
    const { data } = await api.post(`/api/wishlist/${productId}`);
    setWishlist(data);
  }, []);

  const isWishlisted = useCallback((id) => wishlist.includes(id), [wishlist]);

  return (
    <CartContext.Provider value={{ cart, loading, addToCart, updateQty, removeItem, clearCart, wishlist, toggleWishlist, isWishlisted, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
