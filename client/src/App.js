import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import Header from './components/header/header';
import Cart from './components/pages/cart';
import Home from './components/pages/home';
import NotFound from './components/pages/notFound';


export  const SearchContext = React.createContext();
function App() {
const [serchValue, setSerchValue] = useState('');
  return (
    <>
      <div className="wrapper">
        <SearchContext.Provider value={{serchValue, setSerchValue}}>
            <Header/>
        <div className="content">
            <Routes>
              <Route path='/' element={<Home serchValue={serchValue} setSerchValue={setSerchValue}/>} />
              <Route path='/cart' element={<Cart/>} />
              <Route path='*' element={<NotFound/>} />
            </Routes>
        </div>
        </SearchContext.Provider>
      </div>
    </>
  );
}

export default App;
