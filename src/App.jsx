import React,{useState} from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ProductListPage from './ProductListPage';
import {Routes,Route} from 'react-router-dom';
import ProductDetails from './ProductDetails';
import NoMatching from './NoMatching';


function App() {
      let path=window.location.pathname;

  return (
          <>
          
          <Navbar />

          <Routes>
                <Route index element={<ProductListPage />}></Route>
                <Route path="/ProductDetails/:sku/" element={<ProductDetails />}></Route>

          </Routes>

          <Footer />
                
        </>
        
      ) 
}

export default App;
