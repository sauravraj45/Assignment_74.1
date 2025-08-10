import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import CartRow from "./CartRow";

function CartList({ products,cart,onCart ,onRemove}) {
   
    const [pendingCart, setPendingCart] = useState({ ...cart });
        
    useEffect(() => {
        setPendingCart({ ...cart });
    }, [cart]);

  const totalPrice = products.reduce((sum, product) => {
    const quantity = pendingCart[product.id] || 0;
    return sum + product.price * quantity;
  }, 0);

  function handleUpdateCart() {
    const filteredCart = {};
    Object.entries(pendingCart).forEach(([id, qty]) => {
      if (qty > 0) filteredCart[id] = qty;
    });

    onCart(filteredCart);
  }

  function handleQuantityChange(id, newQuantity) {
    setPendingCart(prev => ({
      ...prev,
      [id]: newQuantity,
    }));
  }


    

    
    return (
        <>
            <table className="max-w-4xl bg-white m-auto mt-10 mb-10  w-full border-2 border-gray-300 text-gray-500">
                <thead>
                    <tr className="h-12 bg-gray-100">
                        <th></th>
                        <th></th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((product) => (
                        <CartRow
                            key={product.id}
                            Url={product.thumbnail}
                            title={product.title}
                            price={product.price}
                            id={product.id}
                            quantity={pendingCart[product.id]}
                            onQuantityChange={handleQuantityChange}
                             onRemove={onRemove}

                        />
                    ))}

                    <tr>
                        <td colSpan="2">
                            <input
                                className="border-2 py-2 px-2 text-black m-3"
                                type="text"
                                placeholder="Coupon code"
                            />
                        </td>
                        <td colSpan="2">
                            <button className="text-white bg-red-500 px-3 py-2 rounded-md m-3">
                                APPLY COUPON
                            </button>
                        </td>
                        <td colSpan="2">
                            <button
                                onClick={handleUpdateCart}
                                className="text-white bg-blue-500 px-3 py-2 rounded-md m-3"
                            >
                                UPDATE CART
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table className="max-w-md bg-white w-full border-2 border-gray-300 m-auto mb-10">
                <thead>
                    <tr className="border-2 bg-gray-100">
                        <th className="text-start text-xl p-2">Cart Totals</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-2 text-xl mr-10">
                        <td className="p-2">SubTotal</td>
                        <td className="p-2">${totalPrice.toFixed(2)}</td>
                    </tr>
                    <tr className="border-2 text-xl">
                        <td className="p-2">Total</td>
                        <td className="p-2">${totalPrice.toFixed(2)}</td>
                    </tr>
                    <tr className="text-center">
                        <td colSpan="2">
                            <Link to={"/login"}>
                            
                            <button className="text-white bg-red-500 px-5 py-2 rounded-md mb-3 mt-3">
                                PROCEED TO CHECKOUT
                            </button>
                            </Link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

export default CartList;