
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';


import Navbar from './Navbar';
import Footer from './Footer';
import ProductListPage from './ProductListPage';
import ProductDetails from './ProductDetails';
import CartPage from './Cartpage';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import ForgotPasswordPage from './ForgotPasswordPage';
import Dashboard from './Dashboard';


function App() {
  const [user, setUser] = useState(null);

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("my-cart");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: token },
        })
        .then(res => setUser(res.data))
        .catch(() => localStorage.removeItem("token"));
    }
  }, []);

  const totalCount = Object.values(cart).reduce((sum, q) => sum + q, 0);

  function handleCart(newCart) {
    setCart(newCart);
    localStorage.setItem("my-cart", JSON.stringify(newCart));
  }

  function handleRemove(productId) {
    const newCart = { ...cart };
    delete newCart[productId];
    setCart(newCart);
    localStorage.setItem("my-cart", JSON.stringify(newCart));
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">

      <Navbar user={user} totalCount={totalCount} />


      <div className="flex-grow">
        <Routes>

          {/* ALWAYS SHOW PRODUCT LIST FIRST */}

          <Route path="/" element={<ProductListPage />} />

          <Route path="/productdetails/:id" element={<ProductDetails cart={cart} onCart={handleCart} />} />
          <Route path="/cart" element={<CartPage cart={cart} onCart={handleCart} onRemove={handleRemove} />} />
          

          {/* AUTH PAGES */}
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <LoginPage setUser={setUser} />}
          />

          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <SignUpPage setUser={setUser} />}
          />

          <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
         

          {/* DASHBOARD */}

          <Route
            path="/dashboard"
            element={user ? <Dashboard user={user} setUser={setUser} /> : <Navigate to="/" />}
          />


          {/* FALLBACK */}
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;

