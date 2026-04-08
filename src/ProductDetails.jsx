
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductData } from "./Api";
import Loading from "./Loading";

function ProductDetails({ cart, onCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    getProductData(id).then((response) => {
      setProduct(response.data);
    });
  }, [id]);

  // ✅ CHECK IF PRODUCT ALREADY IN CART
  const isInCart = cart[id];

  // ✅ ADD TO CART (+1 only)
  function handleAddToCart() {
    const newCart = { ...cart };
    newCart[id] = (newCart[id] || 0) + 1;
    onCart(newCart);
  }

  // ✅ GO TO CART
  function handleGoToCart() {
    navigate("/cart");
  }

  // ✅ BUY NOW (ADD + REDIRECT, DO NOT REMOVE OLD ITEMS)
  function handleBuyNow() {
    const newCart = { ...cart }; // 🔥 keep existing items
    newCart[id] = (newCart[id] || 0) + 1;

    onCart(newCart);
    navigate("/cart");
  }

  return product ? (
    <div className="flex flex-col bg-white m-auto p-5 mt-10 mb-10 sm:flex-row max-w-4xl gap-10 rounded-lg">

      {/* IMAGE */}
      <div className="sm:w-2/5 bg-gray-100">
        <img
          className="w-full object-contain"
          src={product.thumbnail}
          alt={product.title}
        />
      </div>

      {/* DETAILS */}
      <div className="sm:w-3/5 space-y-4">

        <h1 className="text-3xl font-semibold">{product.title}</h1>

        <p className="text-2xl font-bold text-gray-800">
          ₹{product.price}
        </p>

        <p className="text-gray-600">{product.description}</p>

        {/* BUTTONS */}
        <div className="flex gap-4 mt-5">

          {/* ADD / GO TO CART */}
          {isInCart ? (
            <button
              onClick={handleGoToCart}
              className="text-white px-6 py-2 bg-green-600 rounded-md hover:bg-green-700"
            >
              GO TO CART
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className="text-white px-6 py-2 bg-[#ff9f00] rounded-md hover:bg-[#e68a00]"
            >
              ADD TO CART
            </button>
          )}

          {/* BUY NOW */}
          <button
            onClick={handleBuyNow}
            className="text-white px-6 py-2 bg-[#fb641b] rounded-md hover:bg-[#e85a17]"
          >
            BUY NOW
          </button>

        </div>

      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default ProductDetails;































