// import React,{useState,useEffect} from "react";
// import { RxCrossCircled } from "react-icons/rx";

// function CartRow({Url, title, price, id, quantity, onQuantityChange, onRemove }) {
    
//     const [localQuantity, setLocalQuantity] = useState(quantity);
    
//   useEffect(() => {
//     setLocalQuantity(quantity);
//   }, [quantity]);

//   function handleChange(e) {
//     const val = Math.max(1, Number(e.target.value));
//     setLocalQuantity(val);
//     onQuantityChange(id, val);
//   }

//   function handleRemove() {
//     onRemove(id);
//   }
    
   
//     return (
//         <tr className="border-2">
//             <td>
//                 <button onClick={handleRemove} >
//                     <RxCrossCircled className="w-10 h-10 text-gray-300 ml-5 hover:text-red-500 transition" />
//                 </button>
//             </td>
//             <td>
//                 <img
//                     className="w-20 h-20 object-cover m-2"
//                     src={Url}
//                     alt={title}
//                 />
//             </td>
//             <td>
//                 <p className="text-red-500 text-xl font-medium">
//                     {title}
//                 </p>
//             </td>
//             <td className="text-black text-xl">${price?.toFixed(2)}</td>
//             <td>
//                 <input
//                     type="number"
//                     min="1"
//                     onChange={handleChange}
//                     value={localQuantity}
//                     className="border-2 w-14 text-black text-center"
//                 />
//             </td>
//             <td className="text-black text-xl">
//                  ${(price * quantity).toFixed(2)}
//             </td>
//         </tr>
//     );
// }

// export default CartRow;

import React, { useState, useEffect } from "react";

function CartRow({ Url, title, price, id, quantity, onQuantityChange, onRemove }) {

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

  return (
    <div className="border-b p-5 ">

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
            Delivery by <span className="font-medium text-black">Apr 15</span>
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