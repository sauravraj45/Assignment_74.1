import React, { useEffect, useState } from "react";
import CartList from "./CartList";
import { getProductData } from "./Api";
import Loading from "./Loading";

function CartPage({ cart, onCart, onRemove }) {

  const [products, setProducts] = useState([]);
  const [unavailableProducts, setUnavailableProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadProducts() {

      setLoading(true);

      const ids = Object.keys(cart || {});

      const aiProducts = JSON.parse(
        localStorage.getItem("apna_ai_products") || "[]"
      );

      const availableProducts = [];
      const unavailable = [];

      for (const id of ids) {

        try {

          // ==========================
          // AI Products
          // ==========================

          const aiProduct = aiProducts.find(
            (item) => item.id === Number(id)
          );

          if (aiProduct) {

            availableProducts.push({
              ...aiProduct,

              category:
                aiProduct.category || "Smartphones",

              description:
                aiProduct.description ||
                "No description available.",

              images:
                aiProduct.images?.length
                  ? aiProduct.images
                  : [aiProduct.thumbnail],

              stock:
                aiProduct.stock || 100,

              discountPercentage:
                aiProduct.discountPercentage || 0,
            });

            continue;
          }

          // ==========================
          // Dummy Products
          // ==========================

          const response = await getProductData(id);

          availableProducts.push(response.data);

        } catch (error) {

          console.error(
            `Unable to fetch product ${id}`,
            error
          );

          unavailable.push({
            id: Number(id),
          });

        }

      }

      setProducts(availableProducts);
      setUnavailableProducts(unavailable);

      setLoading(false);

    }

    loadProducts();

  }, [cart]);

  if (loading) return <Loading />;

  return (
    <CartList
      products={products}
      unavailableProducts={unavailableProducts}
      cart={cart}
      onCart={onCart}
      onRemove={onRemove}
    />
  );
}

export default CartPage;