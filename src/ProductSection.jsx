import React, { useRef } from "react";
import HomeProductCard from "./HomeProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

function ProductSection({ title, products, bgColor }) {
  const scrollRef = useRef();

  function scrollLeft() {
    scrollRef.current.scrollBy({
      left: -1200,
      behavior: "smooth",
    });
  }

  function scrollRight() {
    scrollRef.current.scrollBy({
      left: 1200,
      behavior: "smooth",
    });
  }

  return (
    <div
      className={`rounded-2xl mb-8 overflow-hidden shadow-sm ${bgColor}`}
    >
      
      {/* Header */}
      <div className="px-6 pt-5 pb-2">
        <h2 className="text-3xl font-bold text-gray-800">
          {title}
        </h2>
      </div>

      {/* Slider */}
      <div className="relative">

        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg w-11 h-11 rounded-full flex items-center justify-center hover:scale-105 transition-all"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg w-11 h-11 rounded-full flex items-center justify-center hover:scale-105 transition-all"
        >
          <ChevronRight size={24} />
        </button>

        {/* Products */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-hidden px-6 py-5 scroll-smooth"
        >
          {products.map((item) => (
            <div key={item.id} className="min-w-[220px]">
              <HomeProductCard product={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductSection;