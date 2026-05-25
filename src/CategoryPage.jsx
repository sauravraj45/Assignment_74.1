import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProductList from "./ProductList";
import Loading from "./Loading";
import CategoryNavbar from "./CategoryNavbar";

import {
  getFashionProducts,
  getMobileProducts,
  getBeautyProducts,
  getElectronicsProducts,
  getHomeProducts,
  getBooksProducts,
  getFurnitureProducts,
  getWatchProducts,
  getGamingProducts,
  getAudioProducts,
  getBikeProducts,
  getSportsProducts,
} from "./Api";

function CategoryPage() {

  const { categoryName } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // FILTER STATES
  const [sortOption, setSortOption] = useState("default");
  const [priceRange, setPriceRange] = useState("all");

  // FETCH PRODUCTS
  useEffect(() => {

    async function fetchCategoryProducts() {

      setLoading(true);

      try {

        let response;

        switch (categoryName) {

          case "fashion":
            response = await getFashionProducts();
            break;

          case "mobile":
            response = await getMobileProducts();
            break;

          case "beauty":
            response = await getBeautyProducts();
            break;

          case "electronics":
            response = await getElectronicsProducts();
            break;

          case "home":
            response = await getHomeProducts();
            break;

          case "books":
            response = await getBooksProducts();
            break;

          case "furniture":
            response = await getFurnitureProducts();
            break;

          case "watches":
            response = await getWatchProducts();
            break;

          case "gaming":
            response = await getGamingProducts();
            break;

          case "audio":
            response = await getAudioProducts();
            break;

          case "bikes":
            response = await getBikeProducts();
            break;

          case "sports":
            response = await getSportsProducts();
            break;

          default:
            response = {
              data: {
                products: [],
              },
            };
        }

        setProducts(response.data.products);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    }

    fetchCategoryProducts();

  }, [categoryName]);

  // FILTER PRODUCTS
  let filteredProducts = [...products];

  // PRICE FILTER
  if (priceRange === "0-100") {

    filteredProducts = filteredProducts.filter(
      (item) => item.price >= 0 && item.price <= 100
    );

  } else if (priceRange === "100-500") {

    filteredProducts = filteredProducts.filter(
      (item) => item.price > 100 && item.price <= 500
    );

  } else if (priceRange === "500-1000") {

    filteredProducts = filteredProducts.filter(
      (item) => item.price > 500 && item.price <= 1000
    );

  } else if (priceRange === "1000-1500") {

    filteredProducts = filteredProducts.filter(
      (item) => item.price > 1000 && item.price <= 1500
    );

  } else if (priceRange === "1500-2000") {

    filteredProducts = filteredProducts.filter(
      (item) => item.price > 1500 && item.price <= 2000
    );

  } else if (priceRange === "2000+") {

    filteredProducts = filteredProducts.filter(
      (item) => item.price > 2000
    );
  }

  // SORTING
  if (sortOption === "priceLow") {

    filteredProducts.sort(
      (a, b) => a.price - b.price
    );

  } else if (sortOption === "priceHigh") {

    filteredProducts.sort(
      (a, b) => b.price - a.price
    );

  } else if (sortOption === "title") {

    filteredProducts.sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  }

  return (
    <div className="bg-[#f1f3f6] min-h-screen">

      {/* CATEGORY NAVBAR */}
      <CategoryNavbar />

      <div className="max-w-7xl mx-auto px-4 py-5 flex gap-5">

        {/* SIDEBAR */}
        <div className="hidden lg:block w-[250px]">

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 sticky top-24">

            {/* HEADER */}
            <div className="flex items-center justify-between pb-4 border-b">

              <h2 className="text-lg font-semibold text-gray-800">
                Filters
              </h2>

              <button
                onClick={() => {
                  setSortOption("default");
                  setPriceRange("all");
                }}
                className="text-sm text-blue-600 hover:underline"
              >
                Clear
              </button>
            </div>

            {/* SORT */}
            <div className="py-5 border-b">

              <h3 className="font-medium text-gray-800 mb-3">
                Sort By
              </h3>

              <select
                value={sortOption}
                onChange={(e) =>
                  setSortOption(e.target.value)
                }
                className="w-full border border-gray-200 rounded-lg px-4 py-3 bg-gray-50 outline-none focus:border-blue-500"
              >
                <option value="default">
                  Default
                </option>

                <option value="title">
                  Product Name
                </option>

                <option value="priceLow">
                  Price: Low to High
                </option>

                <option value="priceHigh">
                  Price: High to Low
                </option>
              </select>
            </div>

            {/* PRICE */}
            <div className="pt-5">

              <h3 className="font-medium text-gray-800 mb-3">
                Price Range
              </h3>

              <select
                value={priceRange}
                onChange={(e) =>
                  setPriceRange(e.target.value)
                }
                className="w-full border border-gray-200 rounded-lg px-4 py-3 bg-gray-50 outline-none focus:border-green-500"
              >

                <option value="all">
                  All Prices
                </option>

                <option value="0-100">
                  ₹0 - ₹100
                </option>

                <option value="100-500">
                  ₹100 - ₹500
                </option>

                <option value="500-1000">
                  ₹500 - ₹1000
                </option>

                <option value="1000-1500">
                  ₹1000 - ₹1500
                </option>

                <option value="1500-2000">
                  ₹1500 - ₹2000
                </option>

                <option value="2000+">
                  ₹2000+
                </option>

              </select>
            </div>
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="flex-1">

          <div className="bg-white rounded-xl shadow-sm p-5">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-7">

              <div>

                <h1 className="text-3xl font-bold capitalize text-gray-800">

                  {categoryName}

                </h1>

                <p className="text-gray-500 mt-1">

                  {filteredProducts.length} Products Available

                </p>
              </div>

              {/* MOBILE FILTERS */}
              <div className="mt-4 md:mt-0 lg:hidden flex gap-3">

                <select
                  value={sortOption}
                  onChange={(e) =>
                    setSortOption(e.target.value)
                  }
                  className="border rounded-xl px-4 py-2 bg-gray-50"
                >
                  <option value="default">
                    Default
                  </option>

                  <option value="title">
                    Product Name
                  </option>

                  <option value="priceLow">
                    Price Low to High
                  </option>

                  <option value="priceHigh">
                    Price High to Low
                  </option>

                </select>

                <select
                  value={priceRange}
                  onChange={(e) =>
                    setPriceRange(e.target.value)
                  }
                  className="border rounded-xl px-4 py-2 bg-gray-50"
                >
                  <option value="all">
                    All Prices
                  </option>

                  <option value="0-100">
                    ₹0 - ₹100
                  </option>

                  <option value="100-500">
                    ₹100 - ₹500
                  </option>

                  <option value="500-1000">
                    ₹500 - ₹1000
                  </option>

                  <option value="1000-1500">
                    ₹1000 - ₹1500
                  </option>

                  <option value="1500-2000">
                    ₹1500 - ₹2000
                  </option>

                  <option value="2000+">
                    ₹2000+
                  </option>
                </select>
              </div>
            </div>

            {/* PRODUCTS */}
            {loading ? (

              <Loading />

            ) : (

              <>
                {filteredProducts.length > 0 ? (

                  <ProductList
                    products={filteredProducts}
                  />

                ) : (

                  <div className="flex flex-col items-center justify-center py-24">

                    <h2 className="text-3xl font-bold text-gray-700">
                      No Products Found
                    </h2>

                    <p className="text-gray-500 mt-3 text-lg">
                      No products available in this price range
                    </p>
                  </div>

                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;