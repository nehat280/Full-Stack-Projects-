import {createSlice} from '@reduxjs/toolkit';


const shippingAddressFromStorage = localStorage.getItem('shippingAddress')?
                                    JSON.parse(localStorage.getItem('shippingAddress')):{}

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
                    JSON.parse(localStorage.getItem('cartItems')): []
const initialState= {cartItems:cartItemsFromStorage, shippingAddress:shippingAddressFromStorage}
 

const cartSlice = createSlice({
    name:'cart',
    initialState:initialState,
    reducers: {
        cart_add_item(state,action){
            const item = action.payload
            console.log(state.cartItems)
            const existItem = state.cartItems.find(x=> x.product=== item.product)
            if (existItem){
                state.cartItems = state.cartItems.map(x => x.product === existItem.product? item : x)
            }else{
                state.cartItems = [...state.cartItems, item]
            }

        },
        cart_remove_item(state,action){
            state.cartItems = state.cartItems.filter(x => x.product !== action.payload)
        },
        CART_SAVE_SHIPPING_ADDRESS(state,action){
            state.shippingAddress = action.payload
        },
        CART_SAVE_PAYMENT_METHOD(state,action){
            state.paymentMethod = action.payload
        },
        CART_CLEAR_ITEMS:()=>initialState
    }
        
})

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;