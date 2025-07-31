import React,{useState} from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ProductListPage from './ProductListPage';
import {Routes,Route} from 'react-router-dom';
import ProductDetails from './ProductDetails';
import CartPage from './Cartpage';


function App() {
      let path=window.location.pathname;

  return (
          <>
          <div className='flex flex-col h-screen bg-gray-200 overflow-scroll'>
          <Navbar />
            <Routes>
                <Route index element={<ProductListPage />}></Route>
                <Route path="/ProductDetails/:sku/" element={<ProductDetails />}></Route>
                <Route path="/Cart" element={   <CartPage />} ></Route>

          </Routes>
          <Footer />
          </div>
                
        </>
        
      ) 
}

export default App;
