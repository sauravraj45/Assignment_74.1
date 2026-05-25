// import React, { useEffect, useState } from "react";

// import ProductList from "./ProductList";
// import Loading from "./Loading";
// import NoMatching from "./NoMatching";

// import { getProductList } from "./Api";

// function ProductListPage() {

//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // FETCH PRODUCTS
//   useEffect(() => {

//     async function fetchProducts() {

//       try {

//         const response = await getProductList();

//         setProducts(response.data.products);

//       } catch (error) {

//         console.log(error);

//       } finally {

//         setLoading(false);
//       }
//     }

//     fetchProducts();

//   }, []);

//   return (
//     <div className="bg-[#f1f3f6] min-h-screen">

//       <div className="max-w-7xl mx-auto px-4 py-6">

//         <div className="bg-white rounded-xl shadow-sm p-5">

//           {/* HEADER */}
//           <div className="mb-7">

//             <h1 className="text-3xl font-bold text-gray-800">
//               All Products
//             </h1>

//             <p className="text-gray-500 mt-1">
//               {products.length} Products Available
//             </p>
//           </div>

//           {/* PRODUCTS */}
//           {loading ? (

//             <Loading />

//           ) : (

//             <>
//               {products.length > 0 ? (

//                 <ProductList products={products} />

//               ) : (

//                 <NoMatching />

//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductListPage;

import React, {
  useEffect,
  useState,
} from "react";

import {
  useLocation,
} from "react-router-dom";

import ProductList from "./ProductList";
import NoMatching from "./NoMatching";
import Loading from "./Loading";

import {
  getProductList,
} from "./Api";

function ProductListPage() {

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const location = useLocation();

  // SEARCH PARAM
  const searchParams =
    new URLSearchParams(location.search);

  const searchQuery =
    searchParams.get("search") || "";

  // FETCH PRODUCTS
  useEffect(() => {

    async function fetchProducts() {

      setLoading(true);

      try {

        const response =
          await getProductList();

        const allProducts =
          response.data.products;

        // SMART SEARCH LOGIC
        const filtered =
          allProducts.filter((item) => {

            const query =
              searchQuery
                .toLowerCase()
                .trim();

            // DON'T SHOW ALL PRODUCTS
            if (!query) return false;

            // SEARCHABLE TEXT
            const searchableText = `

              ${item.title || ""}
              ${item.category || ""}
              ${item.brand || ""}
              ${item.description || ""}

            `
              .toLowerCase();

            // SPLIT USER WORDS
            const queryWords =
              query.split(" ");

            // MATCH PARTIAL WORDS
            return queryWords.every(
              (word) =>

                searchableText.includes(
                  word
                )
            );
          });

        setProducts(filtered);

      } catch (error) {

        console.log(error);
      }

      setLoading(false);
    }

    fetchProducts();

  }, [searchQuery]);

  return (
    <div className="bg-[#f1f3f6] min-h-screen py-6">

      <div className="max-w-7xl mx-auto px-4">

        {loading ? (

          <Loading />

        ) : (

          <>
            {/* HEADING */}
            <div className="mb-6">

              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">

                Search Results

              </h1>

              <p className="text-gray-500 mt-2">

                {products.length} products found for
                {" "}

                <span className="font-medium text-gray-700">

                  "{searchQuery}"

                </span>
              </p>
            </div>

            {/* PRODUCTS */}
            {products.length > 0 ? (

              <ProductList
                products={products}
              />

            ) : (

              <NoMatching />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ProductListPage;