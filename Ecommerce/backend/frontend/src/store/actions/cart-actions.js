import axios from 'axios';
import {cartActions} from '../reducers/cartReducer';

export const addToCart = (id,qty)=>{

    return async (dispatch,getState)=>{
        const response = await axios.get(`http://127.0.0.1:8000/api/products/${id}`)
        const data = response.data
        dispatch(cartActions.cart_add_item({product: data._id, name: data.name, image: data.image, 
                                            price: data.price, countInStock: data.countInStock, qty})) 
        
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
        }
}

export const removeFromCart = (id)=>{
    return (dispatch,getState) =>{
        dispatch(cartActions.cart_remove_item(id))
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    }
    
}


export const saveShippingAddress = (data)=>{
    return (dispatch) =>{
        dispatch(cartActions.CART_SAVE_SHIPPING_ADDRESS(data))
        localStorage.setItem('shippingAddress', JSON.stringify(data))
    }
    
}


export const savePaymentMethod = (data)=>{
    return (dispatch) =>{
        dispatch(cartActions.CART_SAVE_PAYMENT_METHOD(data))
        localStorage.setItem('paymentmethod', JSON.stringify(data))
    }
    
}