import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

import Navbar from "./Navbar";
import Footer from "./Footer";
import HomePage from "./HomePage";
import ProductDetails from "./ProductDetails";
import CartPage from "./Cartpage";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import ForgotPasswordPage from "./ForgotPasswordPage";
import Dashboard from "./Dashboard";
import CategoryPage from "./CategoryPage";
import ProductListPage from "./ProductListPage"
import { ChatWidget } from "./ai";

function App() {

  const [user, setUser] = useState(null);

  // CART
  const [cart, setCart] = useState(() => {
    try {

      const saved = localStorage.getItem("my-cart");

      return saved ? JSON.parse(saved) : {};

    } catch {

      return {};
    }
  });

  // AUTH CHECK
  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {

      axios
        .get("https://assignment-74-1.onrender.com/api/auth/me", {
          headers: {
            Authorization: token,
          },
        })

        .then((res) => {

          setUser(res.data);

        })

        .catch(() => {

          localStorage.removeItem("token");
        });
    }

  }, []);

  // TOTAL CART COUNT
  const totalCount = Object.values(cart).reduce(
    (sum, q) => sum + q,
    0
  );

  // HANDLE CART
  function handleCart(newCart) {

    setCart(newCart);

    localStorage.setItem(
      "my-cart",
      JSON.stringify(newCart)
    );
  }

  // REMOVE PRODUCT
  function handleRemove(productId) {

    const newCart = { ...cart };

    delete newCart[productId];

    setCart(newCart);

    localStorage.setItem(
      "my-cart",
      JSON.stringify(newCart)
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f1f3f6]">

      {/* NAVBAR */}
      <Navbar
        user={user}
        totalCount={totalCount}
      />

      {/* ROUTES */}
      <div className="flex-grow">

        <Routes>

          {/* HOME */}
          <Route
            path="/"
            element={<HomePage />}
          />

          {/* CATEGORY PAGE */}
          <Route
            path="/category/:categoryName"
            element={<CategoryPage />}
          />

          {/* PRODUCT DETAILS */}
          <Route
            path="/ProductDetails/:id"
            element={
              <ProductDetails
                cart={cart}
                onCart={handleCart}
              />
            }
          />

          {/* CART */}
          <Route
            path="/cart"
            element={
              <CartPage
                cart={cart}
                onCart={handleCart}
                onRemove={handleRemove}
              />
            }
          />

          {/* LOGIN */}
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <LoginPage setUser={setUser} />
              )
            }
          />

          {/* SIGNUP */}
          <Route
            path="/signup"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <SignUpPage setUser={setUser} />
              )
            }
          />
          <Route
  path="/products"
  element={<ProductListPage />}
/>

          {/* FORGOT PASSWORD */}
          <Route
            path="/forgotpassword"
            element={<ForgotPasswordPage />}
          />

          {/* DASHBOARD */}
          <Route
            path="/dashboard"
            element={
              user ? (
                <Dashboard
                  user={user}
                  setUser={setUser}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          {/* FALLBACK */}
          <Route
            path="*"
            element={<Navigate to="/" />}
          />

        </Routes>
      </div>

      {/* FOOTER */}
      <Footer />
       {/* AI Chatbot */}
      {user && <ChatWidget />}
    </div>
  );
}

export default App;