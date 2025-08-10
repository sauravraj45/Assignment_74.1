import React from 'react';
import { AiOutlineShopping } from "react-icons/ai";
import { Link } from 'react-router-dom';

function Navbar({totalCount}){
    return (

        <div className=" flex justify-around items-center py-5 bg-white">
            <img className="w-20" src="https://www.allaboutlean.com/wp-content/uploads/2019/10/Amazon-Logo.png" alt="Amazon" />
           <Link to={"/Cart" } >
           <div className='flex'>
                <AiOutlineShopping className='w-10 h-10 text-red-500'  />
                <span className='relative -left-1 bottom-1 text-xl font-medium text-red-500'>{totalCount}</span>  
           </div>
            </Link>
            
        </div>

    );
}

export default Navbar;