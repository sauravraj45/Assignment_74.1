import React from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

function Product({ Url, title, Category, price, id }) {

  return (
    <Link to={"/ProductDetails/" + id}>

      <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">

        {/* IMAGE */}
        <div className="relative bg-[#f8f8f8] h-[200px] flex items-center justify-center overflow-hidden">

          {/* WISHLIST */}
          <button className="absolute top-3 right-3 z-10 bg-white p-2 rounded-full shadow-sm hover:bg-red-50 transition-all duration-300">

            <Heart
              size={16}
              className="text-gray-500 hover:text-red-500"
            />
          </button>

          {/* PRODUCT IMAGE */}
          <img
            className="h-[150px] object-contain group-hover:scale-110 transition-all duration-500"
            src={Url}
            alt={Category}
          />
        </div>

        {/* DETAILS */}
        <div className="p-4">

          {/* CATEGORY */}
          <p className="text-[11px] uppercase tracking-wide text-gray-500 font-medium">

            {Category}

          </p>

          {/* TITLE */}
          <h1 className="text-[14px] font-semibold text-gray-800 mt-2 truncate group-hover:text-blue-600 transition-all duration-300">

            {title}

          </h1>

          {/* PRICE */}
          <div className="mt-3">

            <p className="text-xl font-bold text-gray-900">

              ₹{price}

            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Product;