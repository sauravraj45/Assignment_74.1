import React from "react";
import { Link } from "react-router-dom";

function EmptyCart(){
    return (
        <div className="flex justify-center mt-20">
            <div className="flex flex-col gap-3 items-center max-w-xl bg-white rounded-xl p-5">
                <p className="text-2xl font-medium">Your cart is empty!</p>
                <p className="text-gray-600">Add items to it now.</p>
                <Link to={"/"}>
                    <button className="text-xl text-white bg-blue-500 px-7 py-2  rounded-md m-5">Shop now</button>
                </Link>
            </div>
        </div>
    )
}

export default EmptyCart;