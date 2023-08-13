import { createSlice } from "@reduxjs/toolkit";

const initialState = {products:[]}
// list all the products
const productSlice = createSlice({
    name:'products',
    initialState: initialState,
    reducers:{
        product_list_request(state){
            state.loading = true;
            state.products = []
        },
        PRODUCT_LIST_SUCCESS(state, action){
            state.loading = false;
            state.products = action.payload.products
            state.page =  action.payload.page
            state.pages =  action.payload.pages
        },
        PRODUCT_LIST_FAIL(state,action){
            state.loading = false;
            state.error = action.payload
        }
    }
})

const productDeleteInitialState = {}
// list all the products
const productDeleteSlice = createSlice({
    name:'productDelete',
    initialState: productDeleteInitialState,
    reducers:{
        PRODUCT_DELETE_REQUEST(state){
            state.loading = true;
        },
        PRODUCT_DELETE_SUCCESS(state, action){
            state.loading = false;
            state.success = true
        },
        PRODUCT_DELETE_FAIL(state,action){
            state.loading = false;
            state.error = action.payload
        }
    }
})


const productCreateInitialState = {}
// list all the products
const productCreateSlice = createSlice({
    name:'productCreate',
    initialState: productCreateInitialState,
    reducers:{
        PRODUCT_CREATE_REQUEST(state){
            state.loading = true;
        },
        PRODUCT_CREATE_SUCCESS(state, action){
            state.loading = false;
            state.success = true
            state.product = action.payload
        },
        PRODUCT_CREATE_FAIL(state,action){
            state.loading = false;
            state.error = action.payload
        },
        PRODUCT_CREATE_RESET:()=>productCreateInitialState
    }
})

const productUpdateInitialState = {product:{}}
// list all the products
const productUpdateSlice = createSlice({
    name:'productUpdate',
    initialState: productUpdateInitialState,
    reducers:{
        PRODUCT_UPDATE_REQUEST(state){
            state.loading = true;
        },
        PRODUCT_UPDATE_SUCCESS(state, action){
            state.loading = false;
            state.success = true
            state.product = action.payload
        },
        PRODUCT_UPDATE_FAIL(state,action){
            state.loading = false;
            state.error = action.payload
        },
        PRODUCT_UPDATE_RESET:()=>productUpdateInitialState
    }
})

const productCreateReviewInitialState = {}
// list all the products
const productCreateReviewSlice = createSlice({
    name:'productCreateReview',
    initialState: productCreateReviewInitialState,
    reducers:{
        PRODUCT_CREATE_REVIEW_REQUEST(state){
            state.loading = true;
        },
        PRODUCT_CREATE_REVIEW_SUCCESS(state, action){
            state.loading = false;
            state.success = true
        },
        PRODUCT_CREATE_REVIEW_FAIL(state,action){
            state.loading = false;
            state.error = action.payload
        },
        PRODUCT_CREATE_REVIEW_RESET:()=>productCreateReviewInitialState
    }
})

const topRatedProductInitialState = {products:[]}
// list all the products
const topRatedProductReviewSlice = createSlice({
    name:'productCreateReview',
    initialState: topRatedProductInitialState,
    reducers:{
        TOP_RATED_PRODUCT_REQUEST(state){
            state.loading = true;
        },
        TOP_RATED_PRODUCT_SUCCESS(state, action){
            state.loading = false;
            state.products = action.payload
        },
        TOP_RATED_PRODUCT_FAIL(state,action){
            state.loading = false;
            state.error = action.payload
        },
        TOP_RATED_PRODUCT_RESET:()=>topRatedProductInitialState
    }
})

export const topRatedProductReviewReducer= topRatedProductReviewSlice.reducer;
export const topRatedProductReviewActions = topRatedProductReviewSlice.actions;

export const productCreateReviewReducer= productCreateReviewSlice.reducer;
export const productCreateReviewActions = productCreateReviewSlice.actions;

export const productUpdateReducer= productUpdateSlice.reducer;
export const productUpdateActions = productUpdateSlice.actions;


export const productCreateReducer= productCreateSlice.reducer;
export const productCreateActions = productCreateSlice.actions;


export const productDeleteReducer= productDeleteSlice.reducer;
export const productDeleteActions = productDeleteSlice.actions;

export const productReducer =  productSlice.reducer;
export const productActions = productSlice.actions;