import React from 'react';
import Product from './Product';

function ProductList({products}){

    return (
        <div className="flex flex-wrap gap-8  max-w-2xl gap-y-7 m-auto justify-center sm:justify-start">

            {products.map((items)=>{
                return <Product title={items.title} Category={items.category} price={items.price}  Url={items.thumbnail} id={items.id} />

            })}

    </div>   

    );
}

export default ProductList;