import axios from 'axios';
import {createOrderActions,orderDetailActions,orderPayActions,
    orderDeliverActions,listMyOrderSliceActions,listAllOrderActions} from '../reducers/orderReducer';
import {cartActions} from '../reducers/cartReducer';

export const createOrder = (order) =>{
    return async (dispatch, getState)=>{
        try{
            dispatch(createOrderActions.ORDER_CREATE_REQUEST());
            const {userLogin:{userInfo}} = getState();
            
            const config = {  
                            headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${userInfo.token}`
                            }
                    } 
            
            const response = await axios.post('http://localhost:8000/api/orders/add/',
                                    order, config );
            dispatch(createOrderActions.ORDER_CREATE_SUCCESS(response.data));
            dispatch(cartActions.CART_CLEAR_ITEMS());
            localStorage.removeItem('cartItems')
        }
        catch(error){
            console.log("error",error)
            const error_data = error.response && error.response.data.detail?
                        error.response.data.detail: error.message;
            dispatch(createOrderActions.ORDER_CREATE_FAIL(error_data))
            }
    }
}


export const getOrderDetails = (id) =>{
    return async (dispatch, getState)=>{
        try{
            dispatch(orderDetailActions.ORDER_DETAILS_REQUEST());
            const {userLogin:{userInfo}} = getState();
            
            const config = {  
                            headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${userInfo.token}`
                            }
                    } 
            console.log("id",id)
            
            const response = await axios.get(`http://localhost:8000/api/orders/${id}/`,
                                    config );
            dispatch(orderDetailActions.ORDER_DETAILS_SUCCESS(response.data));
        }
        catch(error){
            console.log("error",error)
            const error_data = error.response && error.response.data.detail?
                        error.response.data.detail: error.message;
            dispatch(orderDetailActions.ORDER_DETAILS_FAIL(error_data))
            }
    }
}



export const payOrder = (id,paymentResult) =>{
    return async (dispatch, getState)=>{
        try{
            dispatch(orderPayActions.ORDER_PAY_REQUEST());
            const {userLogin:{userInfo}} = getState();
            
            const config = {  
                            headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${userInfo.token}`
                            }
                    } 
            
            const response = await axios.put(`http://localhost:8000/api/orders/${id}/pay/`,
                                    paymentResult, config );
            dispatch(orderPayActions.ORDER_PAY_SUCCESS(response.data));
        }
        catch(error){
            const error_data = error.response && error.response.data.detail?
                        error.response.data.detail: error.message;
            dispatch(orderPayActions.ORDER_PAY_FAIL(error_data))
            }
    }
}

export const deliverOrder = (order) =>{
    return async (dispatch, getState)=>{
        try{
            dispatch(orderDeliverActions.ORDER_DELIVER_REQUEST());
            const {userLogin:{userInfo}} = getState();
            
            const config = {  
                            headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${userInfo.token}`
                            }
                    } 
            
            const response = await axios.put(`http://localhost:8000/api/orders/${order._id}/deliver/`,
                                    {}, config );
            dispatch(orderDeliverActions.ORDER_DELIVER_SUCCESS(response.data));
        }
        catch(error){
            const error_data = error.response && error.response.data.detail?
                        error.response.data.detail: error.message;
            dispatch(orderDeliverActions.ORDER_DELIVER_FAIL(error_data))
            }
    }
}

export const ListMyOrders = () =>{
    return async (dispatch, getState)=>{
        try{
            dispatch(listMyOrderSliceActions.ORDER_LIST_MY_REQUEST());
            const {userLogin:{userInfo}} = getState();
            
            const config = {  
                            headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${userInfo.token}`
                            }
                    } 
            
            const response = await axios.get(`http://localhost:8000/api/orders/myorders/`,
                                    config );
            dispatch(listMyOrderSliceActions.ORDER_LIST_MY_SUCCESS(response.data));
        }
        catch(error){
            console.log("error",error)
            const error_data = error.response && error.response.data.detail?
                        error.response.data.detail: error.message;
            dispatch(listMyOrderSliceActions.ORDER_LIST_MY_FAIL(error_data))
            }
    }
}

export const ListAllOrders = () =>{
    return async (dispatch, getState)=>{
        try{
            dispatch(listAllOrderActions.ORDER_LIST_REQUEST());
            const {userLogin:{userInfo}} = getState();
            
            const config = {  
                            headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${userInfo.token}`
                            }
                    } 
            
            const response = await axios.get(`http://localhost:8000/api/orders/`,
                                    config );
            dispatch(listAllOrderActions.ORDER_LIST_SUCCESS(response.data));
        }
        catch(error){
            console.log("error",error)
            const error_data = error.response && error.response.data.detail?
                        error.response.data.detail: error.message;
            dispatch(listAllOrderActions.ORDER_LIST_FAIL(error_data))
            }
    }
}
