import React from "react";
import CartList from "./CartList";
import EmptyCart from "./EmptyCart";
import { CartItem } from "./CartItems";

function CartPage(){

    return(
        <>
        {CartItem.length>0 && <CartList /> }
        {CartItem.length==0&& <EmptyCart></EmptyCart>}
        </>
    )
}

export default CartPage;