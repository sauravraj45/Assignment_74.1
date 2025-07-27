import React,{useState} from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ProductList from './ProductList';



function App() {

    const allData=[

            {title:"Green Printed Tshirt", price:"34.00", Category:"Tshirts." ,Url:"https://media.istockphoto.com/id/2115301019/photo/folded-mens-crew-neck-t-shirt-mockup.jpg?s=612x612&w=0&k=20&c=sIMCwJSxDP0g0jfAYwGO9Sl0Sb5ww_WDY6nNeBSDbK8=" },
            {title:"Personalised Mug" , price:"15.00", Category:"Mugs", Url:"https://media.istockphoto.com/id/1410844473/photo/white-mug-on-green-background.jpg?s=612x612&w=0&k=20&c=2Vg50S5WhvVj3KGkuQlWXvZy1Vqa0YygY90cWlFMWp4="},
            {title:"Father's Day Coffee Mug", price:"19.00", Category:"Mugs", Url:"https://media.istockphoto.com/id/613871050/photo/mug-mock-up.jpg?s=612x612&w=0&k=20&c=vtRB-E2OUthzy2V0OC1K9it4fCSt44LHMhp4RYQRtig="},
            {title:"Printed Dark Blue Tshirt" , price:"34.00", Category:"Tshirts", Url:"https://media.istockphoto.com/id/1340904057/photo/blank-t-shirt-mockup-in-front-side-and-back-views.jpg?s=612x612&w=0&k=20&c=_7kcEOeR-dPMSt6cl9OkEgAVOqUwflUqZiwQM6Si39E="},
            {title:"Printed Green Tshirt", price:"28.00", Category:"Tshirts", oldprice:"$35.00" , Url:"https://vestirio.com/cdn/shop/files/11_ac0ac8da-69d4-4616-9dd3-e370356bb834.webp?v=1715427056"},
            {title:"Printed Brown Tshirt" , price:"25.00", Category:"Tshirts" ,oldprice:"$34.00", Url:"https://media.istockphoto.com/id/610876634/photo/closeup-blank-brown-cotton-tshirt-hanging-center-concrete-white-empty.jpg?s=612x612&w=0&k=20&c=GhfRO6ySEzrgd3npK9lg355ximtCEQwywWHFJvKEA1I="},
            {title:"Printed Pink Tshirt", price:"25.00" ,Category:"Tshirts", oldprice:"$35.00" , Url:"https://www.fuelforfans.com/dw/image/v2/BDWJ_PRD/on/demandware.static/-/Sites-master-catalog/default/dw4c5f979c/images/large/324901029006_pp_02_formula-1.jpg?sw=800&sh=800&sm=fit"},
            {title:"Typography Tshirt", price:"32.00", Category:"Tshirts", oldprice:"$34.00", Url:"https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/D33004s2.jpg?im=Resize,width=750"},
             {title:"Black Coffee Mug", price:"15.00", Category:"Mugs", Url:"https://media.istockphoto.com/id/1199399523/photo/black-ceramic-mug-on-white-background-blank-drink-cup-for-your-design.jpg?s=612x612&w=0&k=20&c=6C9AD6LDPajP7rNHz8EqWHHbN7SGNirw-RUkX3WCUaA="}
            
      ]


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
    <>

      <Navbar />

      <div className="bg-gray-200 p-5">
        <div className="bg-white max-w-2xl  m-auto mt-10 mb-10 p-10 flex flex-col">

            <div className="flex flex-col gap-5 sm:flex-row justify-between mb-10 ">
              <input onChange={HandleQuery} className="border-2 border-blue-800 px-7 rounded-lg " placeholder='Search Here ...' />
                <select value={sort} onChange={HandleSort} class="bg-gray-100 py-1 px-5 border-2 border-gray-700 rounded-lg">
                    <option value="Default">Default Sort</option>
                    <option value="Title">Sort by title</option>
                    <option value="PriceLH">Sort by price:low to high</option>
                    <option value="PriceHL">Sort by price: high to low</option>
                </select>
            </div>

            <ProductList products={Data} />

            <div className="flex mt-7 gap-1">
                <p className="text-white bg-red-600  px-3">1</p>
                <p className="text-red-600 border border-red-600 px-3">2</p>
                <p className="text-red-600 border border-red-600 px-2">→</p>
            </div>
        </div>
      </div>

      <Footer />
  
    </>
  )
}

export default App;
