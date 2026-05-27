import React from "react";
import { Link } from "react-router-dom";

function BuyNowMessage({ onBackHome }) {

  // CURRENT DATE
  const today = new Date();

  // START DELIVERY DATE (+5 DAYS)
  const startDate = new Date();

  startDate.setDate(
    today.getDate() + 5
  );

  // END DELIVERY DATE (+6 DAYS)
  const endDate = new Date();

  endDate.setDate(
    today.getDate() + 6
  );

  // FORMAT DATE
  const options = {
    month: "short",
    day: "numeric",
  };

  const formattedStart =
    startDate.toLocaleDateString(
      "en-US",
      options
    );

  const formattedEnd =
    endDate.toLocaleDateString(
      "en-US",
      options
    );

  return (
    <div className="flex justify-center items-center min-h-[70vh] bg-gray-100 px-4">

      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-lg w-full text-center">

        {/* SUCCESS ICON */}
        <div className="text-green-600 text-5xl mb-3">

          ✔

        </div>

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-gray-800 mb-2">

          Order Confirmed!

        </h2>

        {/* MESSAGE */}
        <p className="text-gray-600 mb-2 text-[16px]">

          Thank you for shopping with us.

        </p>

        <p className="text-gray-500 text-sm mb-6">

          Your order has been placed successfully and is being processed.

        </p>

        {/* DELIVERY INFO */}
        <div className="bg-gray-50 border rounded-xl p-5 mb-6">

          <p className="text-sm text-gray-500">

            Expected Delivery by

          </p>

          <p className="font-semibold text-gray-800 text-xl mt-2">

            {formattedStart} - {formattedEnd}

          </p>
        </div>

        {/* BUTTON */}
        <div className="flex justify-center">

          <Link
            to="/"
            onClick={onBackHome}
            className="px-6 h-[48px] bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center font-medium text-[15px]"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BuyNowMessage;