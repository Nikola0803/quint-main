import React from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

// Load your Stripe publishable key
const stripePromise = loadStripe('pk_test_51OjiJRAgVqMLdvyKEDiUCfTwAU4eVazBSDEGvwK5Ce2a20lvKlf8RKqsXe7ZlX5o9JCxl7yhIngvoWAZKsw0MFvZ00R93r14k2');

const CheckoutButton = () => {
  const handleClick = async (event) => {
    event.preventDefault();

    // Get Stripe.js instance
    const stripe = await stripePromise;

    // Call your backend to create the Checkout Session
    try {
      const response = await axios.post('https://thedarkstarsoft.com/quint/wp-json/custom/v1/create-stripe-session');
      const session = response.data;

      // When the Checkout Session is created, redirect to Stripe's hosted checkout page.
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
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