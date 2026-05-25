import React from "react";
import Product from "./Product";

function ProductList({ products }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">

      {products.map((items) => {
        return (
          <Product
            key={items.id}
            title={items.title}
            Category={items.category}
            price={items.price}
            Url={items.thumbnail}
            id={items.id}
          />
        );
      })}
    </div>
  );
}

export default ProductList;