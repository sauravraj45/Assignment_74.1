import React from "react";
import { Link } from "react-router-dom";

function BuyNowMessage({ onBackHome }) {
  return (
    <div className="flex justify-center items-center min-h-[70vh] bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full text-center">

        {/* SUCCESS ICON */}
        <div className="text-green-600 text-5xl mb-3">✔</div>

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Order Confirmed!
        </h2>

        {/* MESSAGE */}
        <p className="text-gray-600 mb-4">
          Thank you for shopping with us.
        </p>
        <p className="text-gray-500 text-sm mb-6">
          Your order has been placed successfully and is being processed.
        </p>

        {/* DELIVERY INFO */}
        <div className="bg-gray-50 border rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600">
            Expected Delivery by:
          </p>
          <p className="font-semibold text-gray-800">
            Apr 15 - Apr 18
          </p>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-4 justify-center">

          {/* HOME LINK */}
          <Link
            to="/"
            onClick={onBackHome}
            className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Continue Shopping
          </Link>

          {/* VIEW CART (OPTIONAL) */}
          {/* <Link
            to="/cart"
            className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            View Cart
          </Link> */}

        </div>

      </div>
    </div>
  );
}

export default BuyNowMessage;