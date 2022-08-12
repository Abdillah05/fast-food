import React from 'react'
import Categories from './components/categories/categories';
import Header from './components/header/header';
import PizzaBlock from './components/pizzaBlock/pizzaBlock';
import Sort from './components/sort/sort';
import pizzas from './assets/pizzas.json'

function App() {
  console.log(pizzas);
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
              {
                pizzas.map((obj) => (
                  <PizzaBlock 
                  key={obj.id}
                  title={obj.title} 
                  price={obj.price} 
                  sizes={obj.sizes}
                  imageUrl={obj.imageUrl}
                  types={obj.types}
                  />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
