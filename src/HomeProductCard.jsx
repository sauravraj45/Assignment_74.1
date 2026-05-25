import React from "react";
import { Link } from "react-router-dom";

function HomeProductCard({ product }) {

  return (
    <Link to={"/ProductDetails/" + product.id}>

      <div className="bg-white rounded-2xl p-4 hover:shadow-xl transition-all duration-300 cursor-pointer group">

        {/* IMAGE */}
        <div className="h-[180px] flex items-center justify-center overflow-hidden">

          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-[150px] object-contain group-hover:scale-110 transition-all duration-500"
          />
        </div>

        {/* DETAILS */}
        <div className="mt-4">

          <p className="text-xs uppercase text-gray-500">

            {product.category}

          </p>

          <h2 className="text-[15px] font-semibold text-gray-800 mt-2 truncate">

            {product.title}

          </h2>

          <p className="text-xl font-bold text-gray-900 mt-3">

            ₹{product.price}

          </p>
        </div>
      </div>
    </Link>
  );
}

export default HomeProductCard;