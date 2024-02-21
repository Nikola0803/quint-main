// src/components/CartPage.js
import React from 'react';
import CheckoutButton from './CheckoutButton'; // Make sure to create this component based on previous instructions
import './Cart.scss';

// Example cart items
const cartItems = [
  { id: 'prod_1', name: 'Product 1', price: 1000, quantity: 2 }, // Price in cents
  { id: 'prod_2', name: 'Product 2', price: 1500, quantity: 1 },
];

const CartPage = () => {
  // Calculate total
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>{item.name} - €{item.price / 100} x {item.quantity}</li>
        ))}
      </ul>
      <p>Total: €{total / 100}</p>
      <CheckoutButton total={total} />
    </div>
  );
};

export default CartPage;
