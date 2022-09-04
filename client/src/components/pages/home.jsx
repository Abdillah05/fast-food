import React, { useContext, useEffect, useRef, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { SearchContext } from '../../App';
import Categories from '../categories/categories';
import axios from 'axios';
import Pagination from '../pagination';
import PizzaBlock from '../pizzaBlock/pizzaBlock';
import Sckeleton from '../pizzaBlock/sckeleton';
import Sort, { sortList } from '../sort/sort';
import { setCategoryId, setCurrentPage, setFilters } from '../../redux/slices/filterSlice'
import qs from 'qs'
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { categoryId, sort, currentPage } = useSelector(state => state.filter)

  const sortType = sort.sortProperty;

  const isMounted = useRef(false)
  const isSearch = useRef(false)
  const {serchValue} = useContext(SearchContext)
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  
const onChangeCategory = (id) => {
  dispatch(setCategoryId(id))
}

const onChangePage = (number) => {
 dispatch(setCurrentPage(number)) 
}

const fetchPizzas = () => {
  setIsLoading(true);
  const sortBy = sortType.replace('-','');
  const order = sortType.includes('-') ? 'asc' : 'desc';
  const category = categoryId > 0 ? `category=${categoryId}`:'';
  const search = serchValue ? `search=${serchValue}`:'';
  
      axios
           .get(`https://62f6a75a612c13062b52efa0.mockapi.io/item?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
           )
           .then((res) =>{
            setItems(res.data)
            setIsLoading(false)
           })
             
           
      window.scrollTo(0, 0)
}

useEffect(() => {
  if(isMounted.current){
    const queryString = qs.stringify({ 
      sortProperty: sortType,
      categoryId,
      currentPage,
    })
navigate(`?${queryString}`)
  }
  isMounted.current = true
},[categoryId, sortType, currentPage])


//Если был первый рендер, то проверяем URL- параметры и сохраняем в редакс
useEffect(() => {
  if(window.location.search){
    const params = qs.parse(window.location.search.substring(1));
    const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);
    dispatch(
      setFilters({
      ...params,
      sort
    })
    )
    isSearch.current = true
  }
  
},[])
//если был первый рендер, то запрашиваем пиццы
useEffect(() => {
 window.scrollTo(0, 0);

 if (!isSearch.current) {
   fetchPizzas();
 }
   isSearch.current = false
 
  }, [categoryId, sortType, serchValue, currentPage]);

  
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
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? sceletons
          :pizzas
          
        }
      </div>
     <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
    </div>
  );
}

export default Home;