import React from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51OjiJRAgVqMLdvyKEDiUCfTwAU4eVazBSDEGvwK5Ce2a20lvKlf8RKqsXe7ZlX5o9JCxl7yhIngvoWAZKsw0MFvZ00R93r14k2');

const CheckoutButton = () => {
  const handleClick = async (event) => {
    event.preventDefault();

    // Example product details to be included in the checkout
    const products = [
      { id: 'prod_1', name: 'T-shirt', description: 'Comfortable cotton t-shirt', amount: 2000, currency: 'usd', quantity: 2 },
      { id: 'prod_2', name: 'Jeans', description: 'Stylish blue jeans', amount: 3000, currency: 'usd', quantity: 1 }
    ];

    const stripe = await stripePromise;

    try {
      const response = await axios.post('https://thedarkstarsoft.com/quint/wp-json/custom/v1/create-stripe-session', { products });
      const session = response.data;

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        alert(result.error.message);
      }
    } catch (error) {
      console.error('Error:', error.response.data);
      alert('Error: Could not initiate checkout. Please try again.');
    }
  };

  return <button onClick={handleClick}>Checkout</button>;
};

export default CheckoutButton;
