// src/pages/CartPage/CartPage.jsx
import React from "react";
import "./CartPage.scss";
import CheckoutButton from "../../components/CheckoutButton/CheckoutButton"; // Adjust the path as necessary
import { useCart } from "../../context/CartContext"; // Adjust the import path as necessary

const CartPage = () => {
  const { cartItems } = useCart(); // Use cart context

  // Calculate total price
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  console.log(cartItems, "rad");
  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <span>{item.name}</span>
            <span>
              €{(item.price / 100).toFixed(2)} x {item.quantity}
            </span>
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
      <div className="cart-total">Total: €{(total / 100).toFixed(2)}</div>
      <CheckoutButton total={total} className="btn-colored" />
    </div>
  );
};

export default CartPage;
