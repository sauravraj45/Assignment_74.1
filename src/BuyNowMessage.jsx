import React from "react";

function BuyNowMessage({ onBackHome }) {
  return (
    <div className="flex flex-col items-center max-w-xl gap-5 m-auto p-7 mt-10 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-green-600 mb-2">
        ✅ Order Confirmed!
      </h2>
      <div className="text-gray-700 text-center text-xl">
        <p>Thank you for shopping with us.  </p>
        <p>Your order is being processed and will be delivered soon.</p>
        </div>
      <button
        onClick={onBackHome}
        className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
      >
        Back to Home
      </button>
    </div>
  );
}

export default BuyNowMessage;
