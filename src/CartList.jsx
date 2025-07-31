import React from "react";
import { CartItem } from "./CartItems";
import CartRow from "./CartRow";

function CartList(){

    let Totalprice=0;
    for(let i=0;i<CartItem.length;i++){
        let p=+(CartItem[i].price);
        Totalprice+=p;
    }

    return (
        <> 
        
            <table className='max-w-4xl bg-white m-auto mt-10 mb-10 text-center  w-full border-2 border-gray-300 text-gray-500 '>
                <thead >
                    <tr className='h-12 bg-gray-100 '>
                        <th></th>
                        <th></th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>

                <tbody>
                    {CartItem.map((items)=>{ 
                    return <CartRow Url={items.Url} title={items.title} price={items.price} sku={items.sku} />

                })}
    
                    <tr>
                       <td></td>
                       <td></td>
                        <td> <input className="border-2  py-1 px-2 text-black" type="text" placeholder="Coupon code"/></td>
                         <td>
                            <button className="text-white bg-red-500 px-3 py-2 rounded-md m-3">APPLY COUPON</button>
                        </td>
                        
                    </tr>

                </tbody>
            </table>
        

         <table className="max-w-md  bg-white w-full border -2 border-gray-300 m-auto mb-10">

            <thead>
                <tr className="border-2 bg-gray-100">
                    <th className="text-start text-xl p-2">Cart Totals</th>
                    <th></th>
                </tr>
            </thead>

            <tbody>
                <tr className="border-2 text-xl mr-10">
                    <td className="p-2">SubTotal</td>
                    <td className="p-2">${Totalprice}</td>
                </tr>
                <tr className="border-2 text-xl">
                    <td className="p-2">Total</td>
                    <td className="p-2">${Totalprice}</td>
                </tr>
                <tr className="text-center">
                    <button className="text-white bg-red-500 px-5 py-2 rounded-md mb-3 mt-3">PROCEED TO CHECKOUT</button>
                </tr>
            </tbody>
        </table>


        </>
    )
}

export default CartList;