import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const {sortBy,order,category, search, currentPage} = params;
        const {data} = await axios.get(
            `https://62f6a75a612c13062b52efa0.mockapi.io/item?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
            ); 
      return data
    }
  )

const initialState = {
    items: [],
    status:'loading'

}

const pizzaSlice = createSlice({
    name:'pizza',
    initialState,
    reducers: {
        setItems(state, action){
          state.items = action.payload
        },
        },
        extraReducers:{
            [fetchPizzas.pending]:(state,action) => {
                state.status = 'loading';
                state.items = []
            },
            [fetchPizzas.fulfilled]:(state,action) => {
                state.items = action.payload;
                state.status = 'success'
            },
            [fetchPizzas.rejected]:(state,action) => {
                state.status = 'error';
                state.items = []
            }
        }
    })
    export const pizzaDataSelector = (state) => state.pizza
    export const {setItems} = pizzaSlice.actions;
    export default pizzaSlice.reducer