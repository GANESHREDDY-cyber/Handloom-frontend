import { createContext, useContext, useState, useEffect } from "react";
import { cartService } from "../services";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.role === "BUYER") fetchCart();
  }, [user]);

  useEffect(() => {
    setCartCount(cartItems.reduce((sum, i) => sum + i.quantity, 0));
  }, [cartItems]);

  const fetchCart = async () => {
    try {
      const { data } = await cartService.get();
      setCartItems(data.items || []);
    } catch { setCartItems([]); }
  };

  const addToCart = async (productId, quantity = 1) => {
    await cartService.add({ productId, quantity });
    await fetchCart();
  };

  const removeFromCart = async (itemId) => {
    await cartService.remove(itemId);
    await fetchCart();
  };

  const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, cartCount, cartTotal, addToCart, removeFromCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
