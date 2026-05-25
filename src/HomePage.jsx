import React, { useEffect, useRef, useState } from "react";

import {
  getProductList,
  getFashionProducts,
  getBeautyProducts,
  getElectronicsProducts,
  getFurnitureProducts,
  getBikeProducts,
  getSportsProducts,
} from "./Api";

import Loading from "./Loading";
import ProductSection from "./ProductSection";
import CategoryNavbar from "./CategoryNavbar";
import ProductList from "./ProductList";

function HomePage() {

  const [loading, setLoading] = useState(true);

  const [allProducts, setAllProducts] =
    useState([]);

  const [displayProducts, setDisplayProducts] =
    useState([]);

  const [fashionProducts, setFashionProducts] =
    useState([]);

  const [beautyProducts, setBeautyProducts] =
    useState([]);

  const [
    electronicsProducts,
    setElectronicsProducts,
  ] = useState([]);

  const [
    furnitureProducts,
    setFurnitureProducts,
  ] = useState([]);

  const [sportsProducts, setSportsProducts] =
    useState([]);

  const [bikeProducts, setBikeProducts] =
    useState([]);

  // LOAD MORE STATES
  const [page, setPage] = useState(1);

  const [loadingMore, setLoadingMore] =
    useState(false);

  // TRACK ALL PRODUCTS SECTION
  const allProductsRef = useRef(null);

  // FETCH DATA
  useEffect(() => {

    async function fetchData() {

      try {

        const [
          all,
          fashion,
          beauty,
          electronics,
          furniture,
          sports,
          bikes,
        ] = await Promise.all([

          getProductList(),

          getFashionProducts(),

          getBeautyProducts(),

          getElectronicsProducts(),

          getFurnitureProducts(),

          getSportsProducts(),

          getBikeProducts(),
        ]);

        // COMBINE ALL PRODUCTS
        const combinedProducts = [

          ...all.data.products,

          ...fashion.data.products,

          ...beauty.data.products,

          ...electronics.data.products,

          ...furniture.data.products,

          ...sports.data.products,

          ...bikes.data.products,
        ];

        // REMOVE DUPLICATES
        const uniqueProducts =
          combinedProducts.filter(
            (item, index, self) =>

              index ===
              self.findIndex(
                (p) => p.id === item.id
              )
          );

        // SET ALL PRODUCTS
        setAllProducts(uniqueProducts);

        // INITIAL PRODUCTS
        setDisplayProducts(
          uniqueProducts.slice(0, 10)
        );

        // CATEGORY PRODUCTS
        setFashionProducts(
          fashion.data.products
        );

        setBeautyProducts(
          beauty.data.products
        );

        setElectronicsProducts(
          electronics.data.products
        );

        setFurnitureProducts(
          furniture.data.products
        );

        setSportsProducts(
          sports.data.products
        );

        setBikeProducts(
          bikes.data.products
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    }

    fetchData();

  }, []);

  // LOAD MORE PRODUCTS
  useEffect(() => {

    function handleScroll() {

      if (!allProductsRef.current) return;

      const sectionTop =
        allProductsRef.current.offsetTop;

      // START ONLY WHEN USER REACHES SECTION
      if (window.scrollY < sectionTop - 500) {
        return;
      }

      // LOAD MORE
      if (

        window.innerHeight +
          window.scrollY >=
          document.body.offsetHeight -
            300 &&
        !loadingMore

      ) {

        loadMoreProducts();
      }
    }

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );

  }, [
    page,
    allProducts,
    loadingMore,
    displayProducts,
  ]);

  // LOAD MORE FUNCTION
  function loadMoreProducts() {

    // STOP IF ALL PRODUCTS LOADED
    if (
      displayProducts.length >=
      allProducts.length
    ) {
      return;
    }

    setLoadingMore(true);

    setTimeout(() => {

      const nextPage = page + 1;

      // NEXT PRODUCTS
      const newProducts =
        allProducts.slice(
          0,
          nextPage * 10
        );

      setDisplayProducts(newProducts);

      setPage(nextPage);

      setLoadingMore(false);

    }, 1000);
  }

  return (
    <div className="bg-[#f1f3f6] min-h-screen">

      {/* CATEGORY NAVBAR */}
      <CategoryNavbar />

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-5">

        {loading ? (

          <Loading />

        ) : (

          <>
            {/* TOP DEALS */}
            <ProductSection
              title="Today's Top Deals"
              products={allProducts.slice(
                0,
                10
              )}
              bgColor="bg-gradient-to-r from-yellow-100 to-orange-100"
            />

            {/* FASHION */}
            <ProductSection
              title="Trending Fashion"
              products={fashionProducts.slice(
                0,
                10
              )}
              bgColor="bg-gradient-to-r from-pink-100 to-purple-100"
            />

            {/* ELECTRONICS */}
            <ProductSection
              title="Best Electronics"
              products={electronicsProducts.slice(
                0,
                10
              )}
              bgColor="bg-gradient-to-r from-blue-100 to-cyan-100"
            />

            {/* BEAUTY */}
            <ProductSection
              title="Beauty Collection"
              products={beautyProducts.slice(
                0,
                10
              )}
              bgColor="bg-gradient-to-r from-rose-100 to-red-100"
            />

            {/* HOME */}
            <ProductSection
              title="Home Essentials"
              products={furnitureProducts.slice(
                0,
                10
              )}
              bgColor="bg-gradient-to-r from-green-100 to-emerald-100"
            />

            {/* SPORTS */}
            <ProductSection
              title="Sports & Bikes"
              products={[
                ...sportsProducts,
                ...bikeProducts,
              ].slice(0, 10)}
              bgColor="bg-gradient-to-r from-orange-100 to-amber-100"
            />

            {/* ALL PRODUCTS */}
            <div
              ref={allProductsRef}
              className="mt-14"
            >

              {/* HEADING */}
              <div className="flex items-center justify-between mb-6">

                <div>

                  <h1 className="text-4xl font-bold text-gray-800">

                    All Products

                  </h1>

                  <p className="text-gray-500 mt-2">

                    Explore all trending products

                  </p>
                </div>
              </div>

              {/* PRODUCTS */}
              <ProductList
                products={displayProducts}
              />

              {/* LOADER */}
              {loadingMore && (

                <div className="flex justify-center py-10">

                  <div className="w-11 h-11 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

                </div>
              )}

              {/* END */}
              {displayProducts.length >=
                allProducts.length && (

                <div className="text-center py-12">

                  <p className="text-gray-500 text-lg font-medium">

                    You've reached the end

                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default HomePage;