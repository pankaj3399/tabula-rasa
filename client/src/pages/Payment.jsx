import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useAuth } from '../contexts/AuthContext';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { currentUser } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/payment/create-subscription`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentMethodId: '', email: currentUser.email }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Payment failed');
      }

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        alert('Subscription created successfully!');
      }
    } catch (err) {
      setError('Payment failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <CardElement className="p-2 border rounded dark:bg-gray-700 dark:text-white" />
      {error && <div className="text-red-500 mt-2">{error}</div>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Processing...' : 'Subscribe'}
      </button>
    </form>
  );
};

const Payment = () => (
  <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  </div>
);

export default Payment;