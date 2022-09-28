import React from 'react'
import { Route, Routes } from 'react-router-dom';
// import Header from './components/header/header';
import MainLayout from './components/layout/mainLoyout';
import Cart from './components/pages/cart';
import FullPizza from './components/pages/fullPizza';
import Home from './components/pages/home';
import NotFound from './components/pages/notFound';



function App() {

  return (
    <>
      
            <Routes>
            <Route path='/' element={<MainLayout/>}>
              <Route path='' element={<Home/>} />
              <Route path='cart' element={<Cart/>} />
              <Route path='pizza/:id' element={<FullPizza/>} />
              <Route path='*' element={<NotFound/>} />
            </Route>
            </Routes>
      
    </>
  );
}

export default App;
