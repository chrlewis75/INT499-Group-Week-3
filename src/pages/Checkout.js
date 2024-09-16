// src/pages/Checkout.js
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import './Checkout.css'; // import appropriate styles

const Checkout = () => {
  const { cart, clearCart } = useCart(); // Access cart and clearCart method from CartContext
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleCompletePurchase = () => {

    // Clear the cart after purchase
    clearCart();

    // Set confirmation message
    setConfirmationMessage('Thank you for your purchase! Your order has been confirmed.');
  };

  return (
    <div className='checkout'>
      <h2>Checkout</h2>
      <ul className='checkout-items'>
        {cart.map((item, index) => (
          <li key={index} className='checkout-item'>
            <div className='checkout-item-info'>
              <h3>{item.service}</h3> {/* Display subscription name from data.js */}
              <p>Price: ${item.price.toFixed(2)}</p>
              <p>Quantity: {item.amount}</p>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={handleCompletePurchase} className='complete-purchase-button'>
        Complete Purchase
      </button>
      {confirmationMessage && <p className='confirmation-message'>{confirmationMessage}</p>}
    </div>
  );
};

export default Checkout;
