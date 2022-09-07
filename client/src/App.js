import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import Header from './components/header/header';
import Cart from './components/pages/cart';
import Home from './components/pages/home';
import NotFound from './components/pages/notFound';



function App() {

  return (
    <>
      <div className="wrapper">
            <Header/>
        <div className="content">
            <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='/cart' element={<Cart/>} />
              <Route path='*' element={<NotFound/>} />
            </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
