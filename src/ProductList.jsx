import React from 'react';
import Product from './Product';

function ProductList({products}){

    return (
        <div className="flex flex-wrap gap-7  max-w-xl gap-y-7 m-auto justify-center sm:justify-start">

            {products.map((items)=>{
                return <Product title={items.title} Category={items.Category} price={items.price} oldprice={items.oldprice} Url={items.Url} sku={items.sku} />


            })}

    </div>   

    );
}

export default ProductList;