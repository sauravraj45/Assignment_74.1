import React,{useState} from 'react';
import DummyData from './DummyData';
import ProductList from './ProductList';
import NoMatching from './NoMatching';

function ProductListPage() {

    const allData=DummyData;

    const[query,Setquery]=useState('');
    const[sort,Setsort]=useState("Default")

    let Data=allData.filter((items)=>{
        return items.title.toLowerCase().indexOf(query.toLowerCase()) !=-1;
      })

    if(sort=="Title"){
      Data=allData.sort((x,y)=>{
        return x.title > y.title ? 1: -1;
      })
    }

    else if(sort=="PriceLH"){
      Data=allData.sort((x,y)=>{
        return x.price - y.price;
      })
    }

    else if(sort=="PriceHL"){
      Data=allData.sort((x,y)=>{
        return y.price - x.price;
      })

    }
    
    
    function HandleQuery(event){
      Setquery(event.target.value);
    }

    function HandleSort(event){
      Setsort(event.target.value);
    }
  
  return (
      
        <div className="grow bg-white max-w-2xl  m-auto mt-10 mb-10 p-10 flex flex-col">

            <div className="flex flex-col gap-5 sm:flex-row justify-between mb-10 ">
              <input onChange={HandleQuery} className="border-2 border-blue-800 px-7 rounded-lg " placeholder='Search Here ...' />
                <select value={sort} onChange={HandleSort} class="bg-gray-100 py-1 px-5 border-2 border-gray-700 rounded-lg">
                    <option value="Default">Default Sort</option>
                    <option value="Title">Sort by title</option>
                    <option value="PriceLH">Sort by price:low to high</option>
                    <option value="PriceHL">Sort by price: high to low</option>
                </select>
            </div>

           { Data.length>0 &&<ProductList products={Data} />}
          {Data.length<1 && <NoMatching />} 

        </div>

     
  )
}

export default ProductListPage ;
