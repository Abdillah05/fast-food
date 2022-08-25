import React, { useContext, useEffect, useState } from 'react'
import { SearchContext } from '../../App';
import Categories from '../categories/categories';
import Pagination from '../pagination';
import PizzaBlock from '../pizzaBlock/pizzaBlock';
import Sckeleton from '../pizzaBlock/sckeleton';
import Sort from '../sort/sort';


const Home = () => {
  const{serchValue} = useContext(SearchContext)
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1)
  const [sortType, setSortType] = useState({
    name: "популярности",
    sortProperty: "raiting"
  })

  const sortBy = sortType.sortProperty.replace('-','');
  const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
  const category = categoryId > 0 ? `category=${categoryId}`:'';
  const search = serchValue ? `search=${serchValue}`:'';
  useEffect(() => {
    setIsLoading(true)
    fetch(`https://62f6a75a612c13062b52efa0.mockapi.io/item?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false)
      });
    window.scrollTo(0, 0)
  }, [categoryId, sortType,serchValue,currentPage])

const sceletons = [...new Array(6)].map((_, index) => <Sckeleton key={index} />)
const pizzas = items.filter((obj) => {
  if(obj.title.toLowerCase().includes(serchValue.toLowerCase())){
   return true 
  } 
  return false
 }).map((obj) => <PizzaBlock key={obj.id} {...obj} />)
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(i) => setCategoryId(i)} />
        <Sort value={sortType} onChangeSort={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? sceletons
          :pizzas
          
        }
      </div>
     <Pagination onChangePage={(number) => setCurrentPage(number)}/>
    </div>
  );
}

export default Home;