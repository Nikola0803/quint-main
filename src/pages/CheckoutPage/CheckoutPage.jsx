import React, { useState } from 'react';
import axios from 'axios';
import "/Users/nikolazivkovic/Downloads/window-app/src/components/Checkout/Checkout.scss";

const CheckoutPage = () => {
  const [customerDetails, setCustomerDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    zip: '',
    country: '',
  });

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Function to submit the form and initiate the Stripe checkout
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Replace with the actual endpoint that creates a Stripe Checkout session
    const createSessionUrl = 'https://yourdomain.com/api/create-stripe-session';

    try {
      const response = await axios.post(createSessionUrl, { customerDetails });
      const { sessionId } = response.data;

      // Redirect to Stripe's Checkout page
      const stripe = window.Stripe('your_stripe_public_key'); // Replace with your Stripe public key
      stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error('Error creating Stripe session:', error);
      alert('Failed to initiate payment. Please try again.');
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" value={customerDetails.firstName} onChange={handleChange} placeholder="First Name" required />
        <input type="text" name="lastName" value={customerDetails.lastName} onChange={handleChange} placeholder="Last Name" required />
        <input type="email" name="email" value={customerDetails.email} onChange={handleChange} placeholder="Email" required />
        <input type="tel" name="phone" value={customerDetails.phone} onChange={handleChange} placeholder="Phone Number" required />
        <input type="text" name="address1" value={customerDetails.address1} onChange={handleChange} placeholder="Address 1" required />
        <input type="text" name="address2" value={customerDetails.address2} onChange={handleChange} placeholder="Address 2" />
        <input type="text" name="city" value={customerDetails.city} onChange={handleChange} placeholder="City" required />
        <input type="text" name="zip" value={customerDetails.zip} onChange={handleChange} placeholder="ZIP / Postal Code" required />
        <input type="text" name="country" value={customerDetails.country} onChange={handleChange} placeholder="Country" required />
        <button type="submit">Proceed to Payment</button>
      </form>
    </div>
  );
};

export default CheckoutPage;