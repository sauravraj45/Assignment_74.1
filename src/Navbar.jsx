// import React from 'react';
// import { AiOutlineShopping } from "react-icons/ai";
// import { FaUserCircle } from "react-icons/fa";
// import { Link, useNavigate } from 'react-router-dom';

// function Navbar({ totalCount }) {
//   const navigate = useNavigate();

//   return (
//     <nav className="flex justify-around items-center py-5 px-6 bg-white shadow-md">
//       <img
//         className="w-20 cursor-pointer"
//         src="/logo.jpg"
//         alt="logo"
//         onClick={() => navigate('/')}
//       />
//        <div className="flex items-center space-x-10">
//         <Link to="/Cart">
//           <div className="relative">
//             <AiOutlineShopping className="w-10 h-10 text-red-500 cursor-pointer hover:text-red-700" />
//             {totalCount > 0 && (
//               <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
//                 {totalCount}
//               </span>
//             )}
//           </div>
//         </Link>
//         <FaUserCircle
//           size={40}
//           className="text-gray-700 cursor-pointer hover:text-gray-900"
//           onClick={() => navigate('/dashboard')}
//         />
//       </div> 
//     </nav>
//   );
// }

// export default Navbar;

import React from 'react';
import { AiOutlineShopping } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ totalCount, user }) {
  const navigate = useNavigate();


  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md">

      {/* LOGO */}
      <img
        src="/logo.jpg"
        alt="logo"
        className="w-20 cursor-pointer"
        onClick={() => navigate('/')}
      />

      <div className="flex items-center gap-6">

        {/* CART - ALWAYS VISIBLE */}
        <Link to="/cart">
          <div className="relative">
            <AiOutlineShopping className="w-9 h-9 text-red-500" />
            {totalCount > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </div>
        </Link>

        {/* USER OPTIONS */}
        {user ? (
          <>
            <FaUserCircle
              size={36}
              className="cursor-pointer text-gray-700"
              onClick={() => navigate('/dashboard')}
            />
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-xl text-black px-4 py-2 rounded-xl hover:bg-blue-700 hover:text-white"
            >
              Sign in
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;










