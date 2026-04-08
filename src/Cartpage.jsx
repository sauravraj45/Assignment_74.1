import React, { useEffect, useState } from "react";
import CartList from "./CartList";
import { getProductData } from "./Api";
import Loading from "./Loading";

function CartPage({ cart, onCart, onRemove }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ids = Object.keys(cart || {});
    Promise.all(ids.map((id) => getProductData(id)))
      .then((responses) => {
        const productData = responses.map((res) => res.data);
        setProducts(productData);
        setLoading(false);
      })
      .catch(() => {
        setProducts([]);
        setLoading(false);
      });
  }, [cart]);

  if (loading) return <Loading />;

  // ✅ Always render CartList

  return (
    <CartList
      products={products}
      cart={cart}
      onCart={onCart}
      onRemove={onRemove}
    />
  );
}

export default CartPage;