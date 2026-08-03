import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AIProductCard({ product }) {
  const navigate = useNavigate();

  if (!product) return null;

  const data = product.product ?? product;

  const image =
    data.thumbnail ||
    data.image ||
    data.images?.[0] ||
    "https://placehold.co/400x400?text=No+Image";

  const rating =
    data.rating ??
    data.average_rating;

  function handleView() {
    navigate(`/ProductDetails/${data.id}`);
  }

  const chips = [
    data.ram,
    data.storage,
    data.color,
    data.processor,
    data.camera,
    data.battery,
  ].filter(Boolean);

  return (
    <div
      onClick={handleView}
      className="group mt-3 cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative flex h-28 items-center justify-center bg-gray-50">

        {/* Rating */}
        {rating && (
          <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-[10px] font-semibold text-yellow-700 shadow-sm">
            <Star
              size={10}
              fill="currentColor"
            />
            {rating}
          </div>
        )}

        <img
          src={image}
          alt={data.title || data.name}
          className="h-20 w-auto max-w-[75%] object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="border-t bg-white px-3 py-3">

        {/* Product Title */}
        <h3
          className="truncate text-sm font-semibold text-gray-900"
          title={data.title || data.name}
        >
          {data.title || data.name}
        </h3>

        {/* Brand */}
        {data.brand && (
          <p className="mt-1 truncate text-xs font-medium text-blue-600">
            {data.brand}
          </p>
        )}

        {/* Chips */}
        {chips.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">

            {chips.map((chip, index) => (
              <span
                key={index}
                className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-medium text-gray-700 border"
              >
                {chip}
              </span>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}