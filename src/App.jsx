import React,{useState} from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ProductListPage from './ProductListPage';
import {Routes,Route} from 'react-router-dom';
import ProductDetails from './ProductDetails';
import CartPage from './Cartpage';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import ForgotPasswordPage from './ForgotPasswordPage';
function App() {
 
  let savedData = {};
  try {
    const savedStr = localStorage.getItem("my-cart");
    savedData = savedStr ? JSON.parse(savedStr) : {};
  } catch {
    savedData = {};
  }

  const [cart, setCart] = useState(savedData);

function handleCart(newCart) {
    setCart(newCart);
    localStorage.setItem("my-cart", JSON.stringify(newCart));
  }

  const totalCount = Object.values(cart).reduce((sum, q) => sum + q, 0);
  function handleRemove(productId) {
  const newCart = { ...cart };
  delete newCart[productId];
  setCart(newCart);
  localStorage.setItem("my-cart", JSON.stringify(newCart));
}

  return (
      <div className='flex flex-col h-screen bg-gray-200 overflow-scroll'>
        <Navbar totalCount={totalCount} />
        <div className='grow'>
              <Routes>
              <Route index element={<ProductListPage />} />
              <Route path="/ProductDetails/:id/" element={<ProductDetails cart={cart} onCart={handleCart} />}/>
              <Route path="/Cart/" element={<CartPage cart={cart} onCart={handleCart} onRemove={handleRemove} />} />
               <Route path={"/login/"}  element={<LoginPage />} ></Route>
              <Route path={"/signup/"} index element={<SignUpPage />} ></Route>
              <Route path={"/forgotpassword/"} element={<ForgotPasswordPage />} ></Route>
            </Routes>
        </div>
        <Footer />
      </div>
  );
}
 export default App;





