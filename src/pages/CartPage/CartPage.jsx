// src/pages/CartPage/CartPage.jsx
import React from 'react';
import './CartPage.scss'; // Make sure you have this SCSS file in the same directory
import CheckoutButton from '../../components/CheckoutButton/CheckoutButton'; // Adjust the path as necessary

const dummyCartItems = [
  { id: '1', name: 'Product 1', price: 2000, quantity: 1 }, // price in cents for consistency with Stripe
  { id: '2', name: 'Product 2', price: 1500, quantity: 2 },
];

const CartPage = () => {
  // Calculate total price
  const total = dummyCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>
      {dummyCartItems.map(item => (
        <div key={item.id} className="cart-item">
          <span>{item.name}</span>
          <span>${(item.price / 100).toFixed(2)} x {item.quantity}</span>
        </div>
      ))}
      <div className="cart-total">Total: ${(total / 100).toFixed(2)}</div>
      <CheckoutButton total={total} className="btn-colored"/>
    </div>
  );
};

export default CartPage;
