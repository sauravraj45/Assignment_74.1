import React from 'react';
import { Link } from 'react-router-dom';

function Product({Url,title,Category,oldprice,price,sku}){
    return (

        <div>
            <Link to={"/ProductDetails/" + sku}>
                <img className="w-40 h-40 object-cover" src={Url} alt="product-img" />
                <p className="text-gray-500 mt-2">{Category}</p>
                <h1 className="font-medium">{title}</h1>
            </Link>
            <p className="text-red-600 text-xl"> ☆☆☆☆☆ </p>
            <div className="flex gap-1">
               {oldprice!=null && <p className="text-gray-500 line-through">${oldprice} </p>}
                <p className="font-medium">${price}</p>
            </div>
            
        </div>
        
    );
}

export default Product;