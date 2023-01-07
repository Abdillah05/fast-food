import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Categories from '../categories/categories';
import axios from 'axios';
import Pagination from '../pagination';
import PizzaBlock from '../pizzaBlock/pizzaBlock';
import Sckeleton from '../pizzaBlock/sckeleton';
import Sort, { sortList } from '../sort/sort';
import {
  filterSelector,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../../redux/slices/filterSlice';
import qs from 'qs';
import { Link, useNavigate } from 'react-router-dom';
import { fetchPizzas, FetchPizzasArgs, pizzaDataSelector } from '../../redux/slices/pizzaSlice';
import { useAppDispatch } from '../../redux/store';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items, status } = useSelector(pizzaDataSelector);
  const { categoryId, sort, currentPage, searchValue } = useSelector(filterSelector);

  const sortType = sort.sortProperty;

  const isMounted = useRef(false);
  const isSearch = useRef(false);

  const onChangeCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage,
      }),
    );
    window.scrollTo(0, 0);
  };

  // useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       sortProperty: sortType,
  //       categoryId,
  //       currentPage,
  //     });
  //     navigate(`?${queryString}`);
  //   }
  //   isMounted.current = true;
  // }, [categoryId, sortType, currentPage]);

  //Если был первый рендер, то проверяем URL- параметры и сохраняем в редакс
  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = (qs.parse(window.location.search.substring(1))as unknown) as FetchPizzasArgs;
  //     const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);
  //     dispatch(
  //       setFilters({
  //         searchValue:params.search,
  //         categoryId:Number(params.category),
  //         currentPage:Number(params.currentPage),
  //         sort: sort ? sort : sortList[0]
  //       }),
  //     );
  //     isMounted.current = true;
  //   }
  // }, []);
  //если был первый рендер, то запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  const sceletons = [...new Array(6)].map((_, index) => <Sckeleton key={index} />);
  const pizzas = items
    .filter((obj: any) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению не удалось получить пиццы. Повторите попытку позже.</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? sceletons : pizzas}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
