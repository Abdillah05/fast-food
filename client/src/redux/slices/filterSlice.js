import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    searchValue: '',
    currentPage: 1,
    categoryId: 0 ,
    sort: {
        name: "популярности",
        sortProperty: "raiting"
      },

}

const filterSlice = createSlice({
    name:'filters',
    initialState,
    reducers: {
        setCategoryId(state, action){
            state.categoryId = action.payload
        },
        setSearchValue(state, action){
            state.searchValue = action.payload
        },
                setSort(state, action){
                state.sort = action.payload
            },
            setCurrentPage(state, action){
                state.currentPage = action.payload
            },
            setFilters(state, action) {
                state.sort = action.payload.sort
                state.categoryId = Number(action.payload.categoryId)
                state.currentPage = Number(action.payload.currentPage)
            } 
        }
        
    });
    export const cartItemSelectorById = (id) => (state) => state.cart.items.find((obj) => obj.id === id);
    export const filterSelector = (state) => state.filter
    export const sortSelector = (state) => state.filter.sort
    export const {setCategoryId, setSort, setCurrentPage,setFilters,setSearchValue} = filterSlice.actions;
    export default filterSlice.reducer