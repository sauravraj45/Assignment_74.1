import React, { useState, useEffect } from "react";

function CartRow({
  Url,
  title,
  price,
  id,
  quantity,
  onQuantityChange,
  onRemove,
}) {

  const [localQuantity, setLocalQuantity] = useState(quantity);

  useEffect(() => {
    setLocalQuantity(quantity);
  }, [quantity]);

  function updateQty(val) {
    const newQty = Math.max(1, val);
    setLocalQuantity(newQty);
    onQuantityChange(id, newQty);
  }

  function handleRemove() {
    onRemove(id);
  }

  // DELIVERY DATE = CURRENT DATE + 5 DAYS
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5);

  const formattedDate = deliveryDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });

  return (
    <div className="border-b p-5">

      <div className="flex gap-5">

        {/* LEFT SIDE */}
        <div className="flex flex-col items-center">

          {/* IMAGE */}
          <img
            src={Url}
            alt={title}
            className="w-32 h-32 object-contain"
          />

          {/* QUANTITY BELOW IMAGE */}
          <div className="flex items-center gap-1 mt-3">

            <button
              onClick={() => updateQty(localQuantity - 1)}
              className="border px-2"
            >
              -
            </button>

            <span className="px-3">{localQuantity}</span>

            <button
              onClick={() => updateQty(localQuantity + 1)}
              className="border px-2"
            >
              +
            </button>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col flex-1 mt-5">

          {/* TITLE */}
          <h2 className="text-xl font-medium text-gray-800 hover:text-blue-600 cursor-pointer">
            {title}
          </h2>

          {/* PRICE */}
          <p className="text-lg font-semibold mt-3">
            ₹{price}
          </p>

          {/* DELIVERY */}
          <p className="text-ms text-gray-500 mt-4">
            Delivery by{" "}
            <span className="font-medium text-black">
              {formattedDate}
            </span>
          </p>

        </div>

      </div>

      {/* LINE */}
      <hr className="my-4" />

      {/* ACTIONS */}
      <div className="flex gap-20 text-lg font-semibold">

        <button className="hover:text-blue-600">
          Save for later
        </button>

        <button
          onClick={handleRemove}
          className="hover:text-red-500"
        >
          Remove
        </button>

      </div>

    </div>
  );
}

export default CartRow;