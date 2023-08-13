import {createSlice} from '@reduxjs/toolkit';

const initialState = {product:{
    reviews:[],
}}

const productDetailSlice = createSlice({
    name: 'product_detail',
    initialState: initialState,
    reducers: {
        product_detail_request(state){
            state.loading = true;            
        },
        product_detail_success(state, action){
            state.loading = false;
            state.product = action.payload
        },
        product_detail_fail(state,action){
            state.loading = false;
            state.error = action.payload
        }
    }
})

export default productDetailSlice.reducer;
export const productDetailActions = productDetailSlice.actions