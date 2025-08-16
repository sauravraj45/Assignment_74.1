import React from 'react';
import { AiOutlineShopping } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ totalCount }) {
  const navigate = useNavigate();

  return (
    <nav className="flex justify-around items-center py-5 px-6 bg-white shadow-md">
      <img
        className="w-20 cursor-pointer"
        src="https://www.allaboutlean.com/wp-content/uploads/2019/10/Amazon-Logo.png"
        alt="Amazon"
        onClick={() => navigate('/')}
      />

      <div className="flex items-center space-x-10">
        <Link to="/Cart">
          <div className="relative">
            <AiOutlineShopping className="w-10 h-10 text-red-500 cursor-pointer hover:text-red-700" />
            {totalCount > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </div>
        </Link>
        <FaUserCircle
          size={40}
          className="text-gray-700 cursor-pointer hover:text-gray-900"
          onClick={() => navigate('/dashboard')}
        />
      </div>
    </nav>
  );
}

export default Navbar;


















