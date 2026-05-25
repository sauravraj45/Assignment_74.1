import React from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ totalCount, user }) {

  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b">

      <div className="max-w-7xl mx-auto px-3 md:px-4 py-3 flex items-center justify-between gap-3">

        {/* LOGO */}
        <img
          src="/logo.jpg"
          alt="logo"
          className="w-20 md:w-24 cursor-pointer"
          onClick={() => navigate("/")}
        />

        {/* SEARCH */}
        <div className="flex-1 flex justify-center">

          <div className="w-full max-w-[220px] sm:max-w-[320px] md:max-w-[520px] relative">

          <input
  type="text"
  placeholder="Search for products, brands and more"
  onKeyDown={(e) => {

    if (e.key === "Enter") {

      const value =
        e.target.value.trim();

      // STOP EMPTY SEARCH
      if (!value) return;

      navigate(
        `/products?search=${encodeURIComponent(
          value
        )}`
      );
    }
  }}
  className="w-full bg-gray-100 rounded-xl h-[42px] md:h-[46px] pl-11 pr-4 outline-none border focus:border-blue-500 text-[13px] md:text-[15px]"
/>

            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-[18px]" />
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-5 md:gap-7 mr-[10px]">

          {/* CART */}
          <Link to="/cart">

            <div className="relative cursor-pointer">

              <AiOutlineShopping className="w-8 h-8 md:w-9 md:h-9 text-blue-600" />

              {totalCount > 0 && (

                <span className="absolute -top-2 -right-2 text-[11px] bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center font-medium">

                  {totalCount}

                </span>
              )}
            </div>
          </Link>

          {/* USER */}
          {user ? (

            <FaUserCircle
              size={30}
              className="cursor-pointer text-gray-700 hover:text-blue-600 transition-all"
              onClick={() =>
                navigate("/dashboard")
              }
            />

          ) : (

            <Link
              to="/login"
              className="bg-blue-600 text-white px-4 md:px-5 h-[40px] rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center text-[14px] font-medium"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;