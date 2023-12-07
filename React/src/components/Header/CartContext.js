import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // Logic to add item to cart
      return [...prevItems, product];
    });
  };

  const itemCount = cartItems.length;

  return (
    <CartContext.Provider value={{ cartItems, addToCart, itemCount }}>
      {children}
    </CartContext.Provider>
  );
};
