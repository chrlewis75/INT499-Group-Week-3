// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // Importing Navbar component
import Home from './pages/Home'; // Importing Home page component
import Login from './pages/Login'; // Importing Login page component
import Movies from './pages/Movies'; // Importing Movies page component
import Cart from './components/Cart'; // Importing Cart component
import About from './pages/About'; // Importing About page component
import Subscriptions from './pages/Subscriptions'; // Importing Subscriptions page component
import { CartProvider } from './context/CartContext'; // Importing CartProvider for context management
import './App.css'; // Importing global styles
import Checkout from './pages/Checkout'; // Importing Checkout page component

function App() {
  return (
    <Router>
      {/* CartProvider wraps the entire application to provide cart context */}
      <CartProvider>
        <Navbar /> {/* Navbar component to be displayed on all pages */}
        <Routes>
          {/* Define routes for different pages */}
          <Route path="/" element={<Home />} /> {/* Home page */}
          <Route path="/login" element={<Login />} /> {/* Login page */}
          <Route path="/movies" element={<Movies />} /> {/* Movies page */}
          <Route path="/subscriptions" element={<Subscriptions />} /> {/* Subscriptions page */}
          <Route path="/cart" element={<Cart />} /> {/* Cart page */}
          <Route path="/about" element={<About />} /> {/* About page */}
          <Route path="/checkout" element={<Checkout />} /> {/* Checkout page */}
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;
