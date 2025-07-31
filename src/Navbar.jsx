import React from 'react';
import { AiOutlineShopping } from "react-icons/ai";
import { Link } from 'react-router-dom';

function Navbar(){
    return (

        <div className=" flex justify-around items-center py-5 bg-white">
            <img className="w-20" src="https://www.allaboutlean.com/wp-content/uploads/2019/10/Amazon-Logo.png" alt="Amazon" />
           <Link to={"/Cart" } >
                <AiOutlineShopping className='w-10 h-10 text-red-500' />
            </Link>
        </div>

    );
}

export default Navbar;