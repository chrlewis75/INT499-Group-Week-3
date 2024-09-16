import React from 'react';
import list from '../components/data'; // Import the subscription data
import { useCart } from '../context/CartContext'; // For hook
import './Subscriptions.css'; // Styling for the page

const Subscriptions = () => {
  const { addToCart, error } = useCart(); // Get the addToCart function and error state

  const handleAddToCart = (subscription) => {
    // Add item to cart
    addToCart(subscription);
  };

  return (
    <div className="subscriptions-container">
      <h1>Choose Your Subscription</h1>

      {/* Error message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="subscription-list">
        {list.map((subscription) => (
          <div key={subscription.id} className="subscription-card">
            <img src={subscription.img} alt={subscription.service} />
            <h2>{subscription.service}</h2>
            <p>{subscription.serviceInfo}</p>
            <p>${subscription.price.toFixed(2)} / month</p>
            <button onClick={() => handleAddToCart(subscription)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscriptions;
