import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  Heart,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  getProductData,
  getProductList,
} from "./Api";

import Loading from "./Loading";
import ProductList from "./ProductList";

function ProductDetails({ cart, onCart }) {

  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState();

  const [currentImage, setCurrentImage] =
    useState(0);

  const [similarProducts, setSimilarProducts] =
    useState([]);

  const [similarLoading, setSimilarLoading] =
    useState(true);

  // FETCH PRODUCT
  useEffect(() => {

    async function fetchData() {

      setSimilarLoading(true);

      const response =
        await getProductData(id);

      setProduct(response.data);

      setCurrentImage(0);

      // FETCH ALL PRODUCTS
      const allProducts =
        await getProductList();

      // ONLY SIMILAR PRODUCTS
      const related =
        allProducts.data.products.filter(
          (item) =>
            item.category ===
              response.data.category &&
            item.id !== response.data.id
        );

      setSimilarProducts(related);

      setSimilarLoading(false);

      // SCROLL TOP
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    fetchData();

  }, [id]);

  // CHECK CART
  const isInCart = cart[id];

  // ADD TO CART
  function handleAddToCart() {

    const newCart = { ...cart };

    newCart[id] =
      (newCart[id] || 0) + 1;

    onCart(newCart);
  }

  // GO TO CART
  function handleGoToCart() {

    navigate("/cart");
  }

  // BUY NOW
  function handleBuyNow() {

    const newCart = { ...cart };

    newCart[id] =
      (newCart[id] || 0) + 1;

    onCart(newCart);

    navigate("/cart");
  }

  // NEXT IMAGE
  function nextImage() {

    if (
      currentImage <
      product.images.length - 1
    ) {

      setCurrentImage(currentImage + 1);

    } else {

      setCurrentImage(0);
    }
  }

  // PREV IMAGE
  function prevImage() {

    if (currentImage > 0) {

      setCurrentImage(currentImage - 1);

    } else {

      setCurrentImage(
        product.images.length - 1
      );
    }
  }

  return product ? (

    <div className="bg-[#f1f3f6] min-h-screen py-4 md:py-6">

      <div className="max-w-7xl mx-auto px-3 md:px-4">

        {/* MAIN SECTION */}
        <div className="bg-white rounded-2xl p-4 md:p-6 flex flex-col lg:flex-row gap-8">

          {/* LEFT */}
          <div className="lg:w-[42%]">

            {/* IMAGE CONTAINER */}
            <div className="bg-[#f8f8f8] rounded-2xl h-[320px] md:h-[430px] flex items-center justify-center relative overflow-hidden border">

              {/* HEART */}
              <button className="absolute top-4 right-4 z-10 bg-white p-2.5 rounded-full shadow">

                <Heart
                  size={18}
                  className="text-gray-500"
                />
              </button>

              {/* LEFT */}
              <button
                onClick={prevImage}
                className="absolute left-3 z-10 bg-white shadow-md w-9 h-9 rounded-full flex items-center justify-center"
              >
                <ChevronLeft size={20} />
              </button>

              {/* IMAGE */}
              <img
                src={
                  product.images[currentImage]
                }
                alt={product.title}
                className="h-[220px] md:h-[300px] object-contain hover:scale-105 transition-all duration-500"
              />

              {/* RIGHT */}
              <button
                onClick={nextImage}
                className="absolute right-3 z-10 bg-white shadow-md w-9 h-9 rounded-full flex items-center justify-center"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* DOTS */}
            <div className="flex items-center justify-center gap-2 mt-5">

              {product.images.map(
                (_, index) => (

                  <button
                    key={index}
                    onClick={() =>
                      setCurrentImage(index)
                    }
                    className={`transition-all rounded-full

                    ${
                      currentImage === index
                        ? "w-6 h-2 bg-blue-600"
                        : "w-2 h-2 bg-gray-300"
                    }
                    `}
                  ></button>
                )
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:w-[58%]">

            {/* CATEGORY */}
            <p className="text-[15px] uppercase tracking-wider text-blue-600 font-semibold">

              {product.category}

            </p>

            {/* TITLE */}
            <h1 className="text-[25px] md:text-[25px] font-bold text-gray-800 mt-2 leading-relaxed">

              {product.title}

            </h1>

            {/* RATING */}
            <div className="flex items-center gap-3 mt-4">

              <div className="flex items-center gap-1 bg-green-600 text-white px-2.5 py-1 rounded-md text-xs font-medium">

                {product.rating}

                <Star
                  size={12}
                  fill="currentColor"
                />
              </div>

              <p className="text-xs md:text-sm text-gray-500">

                12,540 Ratings & Reviews

              </p>
            </div>

            {/* PRICE */}
            <div className="mt-6">

              <div className="flex items-center flex-wrap gap-3">

                <h2 className="text-[30px] md:text-[36px] font-bold text-gray-900">

                  ₹{product.price}

                </h2>

                <p className="text-base text-gray-400 line-through">

                  ₹{product.price + 300}

                </p>

                <span className="text-green-600 font-semibold text-sm">

                  25% Off

                </span>
              </div>

              <p className="text-green-600 mt-2 text-sm font-medium">

                Special price available

              </p>
            </div>

            {/* DESCRIPTION */}
            <div className="mt-5">

              <h3 className="text-xl font-bold text-gray-800 mb-3">

                Product Details

              </h3>

              <p className="text-gray-700 leading-7 text-[20px] md:text-[15px]">

                {product.description}

              </p>
            </div>
            {/* BUTTONS */}
            <div className="flex flex-row flex-wrap gap-4 mt-10 justify-center sm:justify-start">

              {isInCart ? (

                <button
                  onClick={handleGoToCart}
                  className="w-[160px] sm:w-[190px] h-[46px] sm:h-[50px] bg-green-600 text-white rounded-xl font-semibold text-[14px] sm:text-[17px] tracking-wide hover:bg-green-700 transition-all"
                >
                  GO TO CART
                </button>

              ) : (

                <button
                  onClick={handleAddToCart}
                  className="w-[160px] sm:w-[190px] h-[46px] sm:h-[50px] bg-[#ff9f00] text-white rounded-xl font-semibold text-[14px] sm:text-[17px] tracking-wide hover:bg-[#f39200] transition-all"
                >
                  ADD TO CART
                </button>
              )}

              <button
                onClick={handleBuyNow}
                className="w-[160px] sm:w-[190px] h-[46px] sm:h-[50px] bg-[#fb641b] text-white rounded-xl font-semibold text-[14px] sm:text-[17px] tracking-wide hover:bg-[#f45d13] transition-all"
              >
                BUY NOW
              </button>
            </div>
                  

          </div>
        </div>

        {/* SIMILAR PRODUCTS */}
        <div className="mt-8 bg-white rounded-2xl p-4 md:p-6">

          <div className="flex items-center justify-between mb-6">

            <div>

              <h2 className="text-xl md:text-2xl font-bold text-gray-800">

                Similar Products

              </h2>

              <p className="text-sm text-gray-500 mt-1">

                Products related to this item

              </p>
            </div>
          </div>

          {/* LOADER */}
          {similarLoading ? (

            <div className="flex justify-center py-10">

              <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

            </div>

          ) : (

            <>
              {similarProducts.length > 0 ? (

                <ProductList
                  products={similarProducts}
                />

              ) : (

                <div className="py-10 text-center">

                  <p className="text-gray-500 text-lg">

                    No Similar Products

                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>

  ) : (

    <Loading />
  );
}

export default ProductDetails;