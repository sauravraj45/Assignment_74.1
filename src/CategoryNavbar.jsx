import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  Shirt,
  Smartphone,
  Sparkles,
  Monitor,
  BookOpen,
  Sofa,
  LayoutGrid,
  Watch,
  Gamepad2,
  Headphones,
  Bike,
  Dumbbell,
  ShoppingBag,
} from "lucide-react";

function CategoryNavbar() {

  const navigate = useNavigate();
  const location = useLocation();

  const categories = [
    {
      name: "For You",
      path: "/",
      icon: <LayoutGrid size={18} />,
    },
    {
      name: "Fashion",
      path: "/category/fashion",
      icon: <Shirt size={18} />,
    },
    {
      name: "Mobile",
      path: "/category/mobile",
      icon: <Smartphone size={18} />,
    },
    {
      name: "Beauty",
      path: "/category/beauty",
      icon: <Sparkles size={18} />,
    },
    {
      name: "Electronics",
      path: "/category/electronics",
      icon: <Monitor size={18} />,
    },
    {
      name: "Home",
      path: "/category/home",
      icon: <ShoppingBag size={18} />,
    },
    {
      name: "Books",
      path: "/category/books",
      icon: <BookOpen size={18} />,
    },
    {
      name: "Furniture",
      path: "/category/furniture",
      icon: <Sofa size={18} />,
    },
    {
      name: "Watches",
      path: "/category/watches",
      icon: <Watch size={18} />,
    },
    {
      name: "Gaming",
      path: "/category/gaming",
      icon: <Gamepad2 size={18} />,
    },
    {
      name: "Audio",
      path: "/category/audio",
      icon: <Headphones size={18} />,
    },
    {
      name: "Bikes",
      path: "/category/bikes",
      icon: <Bike size={18} />,
    },
    {
      name: "Sports",
      path: "/category/sports",
      icon: <Dumbbell size={18} />,
    },
  ];

  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-20">

      <div className="max-w-7xl mx-auto px-3">

        <div className="flex items-center justify-center gap-10 overflow-x-auto scrollbar-hide py-2">

          {categories.map((category, index) => {

            const isActive =
              location.pathname === category.path;

            return (
              <button
                key={index}
                onClick={() => navigate(category.path)}
                className="flex flex-col items-center min-w-fit relative group"
              >

                {/* ICON */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300

                  ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-700 group-hover:text-blue-600"
                  }
                  `}
                >
                  {category.icon}
                </div>

                {/* TEXT */}
                <p
                  className={`text-[13px] font-medium whitespace-nowrap transition-all duration-300

                  ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-700 group-hover:text-blue-600"
                  }
                  `}
                >
                  {category.name}
                </p>

                {/* ACTIVE LINE */}
                {isActive && (
                  <div className="absolute -bottom-2 w-full h-[2px] bg-blue-600 rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CategoryNavbar;