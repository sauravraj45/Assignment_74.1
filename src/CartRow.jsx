import React, { useState } from 'react';
import { RxCrossCircled } from "react-icons/rx";


function CartRow({Url ,title ,price,sku}){
    const [quantity,Setquantity]=useState(1);

    function handleQuantity(e){
        Setquantity(e.target.value);

    }
    
    return (
            <tr className='border-2'>
                <td><RxCrossCircled className='w-10 h-10 text-gray-300 ml-5'  /></td>
                <td><img className='w-20 h-20 object-cover m-2' src={Url} alt="product-img" /></td>
                <td><p className='text-red-500 text-xl font-medium'>{title}</p></td>
                <td className='text-black text-xl'>${price}</td>
                <td>
                    <input onChange={handleQuantity} type="number" min="1" value={quantity} className='border-2 w-10 text-black text-center'  />
                </td>
                <td className='text-black text-xl'>${price*quantity}</td>
            </tr>
    )

}

export default CartRow;