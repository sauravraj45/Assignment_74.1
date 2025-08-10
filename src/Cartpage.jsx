import React, { useEffect, useState } from "react";
import CartList from "./CartList";
import EmptyCart from "./EmptyCart";
import { getProductData } from "./Api";
import Loading from "./Loading";

function CartPage({ cart, onCart ,onRemove}) {
  const [products, setProducts] = useState([]);
  const[loading,setLoading]=useState(true);

    useEffect(() => {
        const ids = Object.keys(cart || {});
        Promise.all(ids.map((id) => getProductData(id)))
          .then((responses) => {
          const productData = responses.map((res) => res.data);
          setProducts(productData);
          setLoading(false);
      })
      .catch((error) => {
        setProducts([]);
      });
  }, [cart]);
  
  if(loading){
    return <Loading />;
  }

  return (
    <>
  
      {products.length > 0 ? (
        <CartList products={products} cart={cart} onCart={onCart} onRemove={onRemove}/>
      ) : (
        <EmptyCart />
      )}

    </>
  );
}

export default CartPage;
