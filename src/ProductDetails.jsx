import React from "react";
import { useParams } from "react-router-dom";
import allData from "./DummyData";

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

    let {title,price,Category,Url,oldprice}=product;

    return (

        <div className=" flex flex-col bg-gray-200 m-auto p-5 mt-10 mb-10  sm:flex-row max-w-4xl gap-10  sm:border-2 border-gray-700 rounded-lg">

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
                    <input className="w-10 text-xl text-center  border border-black rounded-md  inline-block" value="1" />
                    <button className=" text-white text-lg  border px-5 py-1 bg-red-500 border-red-500 rounded-md">ADD TO CART</button>
                </div>

            </div>

        </div>

    );
}

export default ProductDetails;