import React, { createContext, useContext, useState, useEffect } from 'react';

// Creating CartContext to provide cart state and methods
const CartContext = createContext();

// CartProvider component to manage cart state and provide methods to its children
export const CartProvider = ({ children }) => {
  // Initialize cart state from localStorage or default to an empty array
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });
  
  const [error, setError] = useState('');

  // Update localStorage whenever the cart state changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        if (existingItem.amount + item.amount > 1) {
          setError('You cannot add more than one subscription.');
          return prevCart;
        }
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, amount: cartItem.amount + item.amount }
            : cartItem
        );
      } else {
        setError('');
        return [...prevCart, item];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, error }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use CartContext
export const useCart = () => useContext(CartContext);
