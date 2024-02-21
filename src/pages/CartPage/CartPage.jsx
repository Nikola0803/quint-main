import React from "react";
import "./CartPage.scss";
import CheckoutButton from "../../components/CheckoutButton/CheckoutButton";
import { useCart } from "../../context/CartContext";

const CartPage = () => {
  const { cartItems, clearCart } = useCart(); // Use cart context and clearCart function

  // Calculate total price
  const total = cartItems.reduce(
    (acc, item) => acc + parseInt(item.custom_price),
    0
  );

  const handleClearCart = () => {
    // Call clearCart function to clear the cart
    clearCart();
  };

  return (
    <div className="cart-container position-relative">
      <h2>Your Shopping Cart</h2>
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item.product_id} className="cart-item">
            <span>
              {Object.keys(item.items)
                .sort()
                .map((key, index) => (
                  <span key={index}>
                    {key}: {item.items[key].width}, {item.items[key].height}
                  </span>
                ))}
            </span>

            <span>€{item.custom_price}</span>
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
      <div className="cart-total">Total: €{total}.00</div>
      <CheckoutButton items={cartItems} total={total} className="btn-colored" />
      <button onClick={handleClearCart} className="btn-clear-cart">
        Clear Cart
      </button>
    </div>
  );
};

export default CartPage;
