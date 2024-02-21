import React, { createContext, useContext, useState } from 'react';
import { useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (newProductConfig) => {
    setCartItems(currentItems => {
      const existingProductIndex = currentItems.findIndex(item =>
        item.product_id === newProductConfig.product_id &&
        JSON.stringify(item.items) === JSON.stringify(newProductConfig.items)
      );

      if (existingProductIndex >= 0) {
        // Product with the same configuration exists, update quantity
        return currentItems.map((item, index) =>
          index === existingProductIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // New product configuration, add to cart
        const updatedItems = [...currentItems, newProductConfig];
        // Update local storage
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
        return updatedItems;
      }
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  useEffect(() => {
    // Get cart items from local storage if exists
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

