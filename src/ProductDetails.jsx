import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductData } from "./Api";
import Loading from "./Loading";
import BuyNowMessage from "./BuyNowMessage";

function ProductDetails({ cart, onCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(1);
  const [purchased, setPurchased] = useState(false); 

  const navigate = useNavigate();

  useEffect(() => {
    const purchasedFlag = localStorage.getItem(`purchased-${id}`);
    if (purchasedFlag === "true") setPurchased(true);
  }, [id]);

  useEffect(() => {
    getProductData(id).then((response) => {
      setProduct(response.data);
    });
  }, [id]);

  function handleQuantityChange(e) {
    const val = Math.max(1, Number(e.target.value));
    setQuantity(val);
  }

  function handleAddToCart() {
    const newCart = { ...cart };
    newCart[id] = (newCart[id] || 0) + quantity;
    onCart(newCart);
  }

  function handleBuyNow() {
    setPurchased(true);
    localStorage.setItem(`purchased-${id}`, "true"); 
  }

  function handleBackHome() {
    localStorage.removeItem(`purchased-${id}`); 
    navigate("/");
  }

  if (purchased) {
   
    return <BuyNowMessage onBackHome={handleBackHome} />;
  }

  return product ? (
    <div className="flex flex-col bg-white m-auto p-5 mt-10 mb-10 sm:flex-row max-w-4xl gap-10 rounded-lg">
      <div className="sm:w-2/5 bg-gray-100">
        <img
          className="w-xs object-fit"
          src={product.thumbnail}
          alt={product.category}
        />
      </div>

      <div className="sm:w-3/5 space-y-3">
        <h1 className="text-3xl font-medium">{product.title}</h1>
        <div className="flex gap-1">
          <p className="text-xl font-medium">${product.price}</p>
        </div>
        <p className="text-xl text-gray-500">{product.description}</p>

        <div className="flex gap-5 items-center mt-3">
          <input
            onChange={handleQuantityChange}
            value={quantity}
            type="number"
            min="1"
            className="border-2 w-10 text-black text-center"
          />
          <button
            onClick={handleAddToCart}
            className="text-white text-lg px-5 py-1 bg-[#ff9f00] rounded-md"
          >
            ADD TO CART
          </button>
          <button
            onClick={handleBuyNow}
            className="text-white text-lg px-10 py-1 bg-[#fb641b] rounded-md"
          >
            BUY NOW
          </button>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default ProductDetails;
































