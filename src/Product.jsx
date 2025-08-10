import React from 'react';
import { Link } from 'react-router-dom';

function Product({Url,title,Category,price,id}){
    return (

        <div className='w-40'>
            <Link to={"/ProductDetails/" + id}>
                <img className="w-30 h-30  object-cover bg-gray-100" src={Url} alt={Category} />
                <p className="text-gray-500 mt-2">{Category}</p>
                <h1 className="font-medium">{title}</h1>
            </Link>
            <p className="text-red-600 text-xl"> ☆☆☆☆☆ </p>
            <div className="flex gap-1">
                <p className="font-medium">${price}</p>
            </div>
            
        </div>
        
    );
}

export default Product;