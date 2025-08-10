import React,{useState,useEffect} from "react";
import { RxCrossCircled } from "react-icons/rx";

function CartRow({Url, title, price, id, quantity, onQuantityChange, onRemove }) {
    
    const [localQuantity, setLocalQuantity] = useState(quantity);
    
  useEffect(() => {
    setLocalQuantity(quantity);
  }, [quantity]);

  function handleChange(e) {
    const val = Math.max(1, Number(e.target.value));
    setLocalQuantity(val);
    onQuantityChange(id, val);
  }

  function handleRemove() {
    onRemove(id);
  }
    
   
    return (
        <tr className="border-2">
            <td>
                <button onClick={handleRemove} >
                    <RxCrossCircled className="w-10 h-10 text-gray-300 ml-5 hover:text-red-500 transition" />
                </button>
            </td>
            <td>
                <img
                    className="w-20 h-20 object-cover m-2"
                    src={Url}
                    alt={title}
                />
            </td>
            <td>
                <p className="text-red-500 text-xl font-medium">
                    {title}
                </p>
            </td>
            <td className="text-black text-xl">${price?.toFixed(2)}</td>
            <td>
                <input
                    type="number"
                    min="1"
                    onChange={handleChange}
                    value={localQuantity}
                    className="border-2 w-14 text-black text-center"
                />
            </td>
            <td className="text-black text-xl">
                 ${(price * quantity).toFixed(2)}
            </td>
        </tr>
    );
}

export default CartRow;

