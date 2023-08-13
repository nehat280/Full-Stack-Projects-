import {createSlice} from '@reduxjs/toolkit';

const orderCreateInitialState = {}

const orderCreateSlice = createSlice({
    name:'createOrder',
    initialState:orderCreateInitialState,
    reducers:{
        ORDER_CREATE_REQUEST(state){
            state.loading=true;
        },
        ORDER_CREATE_SUCCESS(state,action){
            state.loading = false;
            state.success= true;
            state.order = action.payload
        },
        ORDER_CREATE_FAIL(state,action){
            state.loading = false;
            state.error = action.payload
        }, 
        ORDER_CREATE_RESET:()=>orderCreateInitialState,  
    }
});



// const orderDetailInitialState = { loading:true, orderItems:[], shippingAddress:{}}
const orderDetailInitialState = { }

const orderDetailsSlice = createSlice({
    name:'orderDetail',
    initialState:orderDetailInitialState,
    reducers:{
        ORDER_DETAILS_REQUEST(state){
            state.loading=true;
        },
        ORDER_DETAILS_SUCCESS(state,action){
            state.loading = false;
            state.success= true;
            state.order = action.payload
        }, 
        ORDER_DETAILS_FAIL(state,action){
            state.loading = false;
            state.error = action.payload
        },      
    }
});

const orderPayInitialState = {}

const orderPaySlice = createSlice({
    name:'orderPay',
    initialState:orderPayInitialState,
    reducers:{
        ORDER_PAY_REQUEST(state){
            state.loading=true;
        },
        ORDER_PAY_SUCCESS(state){
            state.loading = false;
            state.success= true;
        }, 
        ORDER_PAY_FAIL(state,action){
            state.loading = false;
            state.error = action.payload
        },      
        ORDER_PAY_RESET:()=>orderPayInitialState
    }
});


const orderDeliverInitialState = {}

const orderDeliverSlice = createSlice({
    name:'orderDeliver',
    initialState:orderDeliverInitialState,
    reducers:{
        ORDER_DELIVER_REQUEST(state){
            state.loading=true;
        },
        ORDER_DELIVER_SUCCESS(state){
            state.loading = false;
            state.success= true;
        }, 
        ORDER_DELIVER_FAIL(state,action){
            state.loading = false;
            state.error = action.payload
        },      
        ORDER_DELIVER_RESET:()=>orderDeliverInitialState
    }
});


const listMyOrderSliceInitialState = {orders:[]}

const listMyOrderSlice = createSlice({
    name:'listMyOrder',
    initialState:listMyOrderSliceInitialState,
    reducers:{
        ORDER_LIST_MY_REQUEST(state){
            state.loading=true;
        },
        ORDER_LIST_MY_SUCCESS(state,action){
            state.loading = false;
            state.orders= action.payload;
        }, 
        ORDER_LIST_MY_FAIL(state,action){
            state.loading = false;
            state.error = action.payload
        },      
        ORDER_LIST_MY_RESET:()=>listMyOrderSliceInitialState
    }
});



const listAllOrdersSliceInitialState = {orders:[]}

const listAllOrderSlice = createSlice({
    name:'listAllOrder',
    initialState:listAllOrdersSliceInitialState,
    reducers:{
        ORDER_LIST_REQUEST(state){
            state.loading=true;
        },
        ORDER_LIST_SUCCESS(state,action){
            state.loading = false;
            state.orders= action.payload;
        }, 
        ORDER_LIST_FAIL(state,action){
            state.loading = false;
            state.error = action.payload
        }
    }
});


// list my order constants
export const listAllOrderReducer = listAllOrderSlice.reducer;
export const listAllOrderActions  = listAllOrderSlice.actions;

// list my order constants
export const listMyOrderSliceReducer = listMyOrderSlice.reducer;
export const listMyOrderSliceActions  = listMyOrderSlice.actions;

// order pay constants
export const orderPayReducer = orderPaySlice.reducer;
export const orderPayActions  = orderPaySlice.actions;


// order pay constants
export const orderDeliverReducer = orderDeliverSlice.reducer;
export const orderDeliverActions  = orderDeliverSlice.actions;

//create order constants 
export const createOrderReducer = orderCreateSlice.reducer;
export const createOrderActions  = orderCreateSlice.actions;

//order detail constants
export const orderDetailsReducer = orderDetailsSlice.reducer;
export const orderDetailActions  = orderDetailsSlice.actions;