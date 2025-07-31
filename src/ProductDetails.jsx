import React,{useState} from "react";
import { useParams } from "react-router-dom";
import allData from "./DummyData";
import CartRow from "./CartRow";
import { CartItem } from "./CartItems";
import { Link } from "react-router-dom";


function ProductDetails(){
    const sku=useParams().sku;
    let product;

    for(let i=0;i<allData.length;i++){
        const p=allData[i];
        if(sku==p.sku){
            product=p;
            break;
        }
    }

    function handleCart(){
        let available=false;
        for(let i=0;i<CartItem.length;i++){
            if(product.sku==CartItem[i].sku){
                available=true;
                break;
            }
        }

        if(available==false){
            CartItem.push(product);
        } 
    }


    let {title,price,Category,Url,oldprice}=product;

    return (

        <div className="grow flex flex-col bg-white m-auto p-5 mt-10 mb-10  sm:flex-row max-w-4xl gap-10  rounded-lg">

            <div className="sm:w-2/5">
                <img className="w-xs object-fit" src={Url} alt={Category} />
            </div>

            <div className="sm:w-3/5 space-y-3">
                <h1 className="text-3xl font-medium">{title}</h1>
                <div className="flex gap-1">
                    {oldprice!=null && <p class="text-xl font-medium text-gray-500 line-through">${oldprice}</p>}
                    <p className="text-xl font-medium">${price}</p>
                </div>
                <p className="text-xl text-gray-500">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate odio reprehenderit modi aut, tenetur commodi optio. Tempore odio error voluptatum eum ducimus. Nemo, vel facilis facere soluta labore impedit similique?</p>
                <div className="flex gap-5">
                   < Link to={"/cart"}>
                        <button onClick={handleCart} className=" text-white text-lg  px-5 py-1 bg-[#ff9f00]  rounded-md">ADD TO CART</button>
                    </Link>  
                    <button className=" text-white text-lg  px-10 py-1 bg-[#fb641b]  rounded-md">BUY NOW</button>
                </div>

            </div>

        </div>

    );
}

export default ProductDetails;