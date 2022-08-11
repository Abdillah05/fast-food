import React from 'react'
import Categories from './components/categories/categories';
import Header from './components/header/header';
import PizzaBlock from './components/pizzaBlock/pizzaBlock';
import Sort from './components/sort/sort';

function App() {
  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              <PizzaBlock title='Маргарита' price={300} />
              <PizzaBlock title='4 сыра' price={400} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
