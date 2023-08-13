import axios from 'axios';
import {productActions,productDeleteActions, productCreateActions,topRatedProductReviewActions
        ,productCreateReviewActions,productUpdateActions} from '../reducers/productReducers';
import {productDetailActions} from '../reducers/productDetailReducer'

export const fetchProductData = (keyword='') =>{

    return async (dispatch) =>{

        const fetchData = async () =>{
            const response  = await axios.get(`http://127.0.0.1:8000/api/products${keyword}`);
            

            if (!response.status){
                throw new Error("loading Product data failed");
            }
            const data= response.data;
            return data;            
        }

        try{
            dispatch(productActions.product_list_request());
            const data = await fetchData();
            dispatch(productActions.PRODUCT_LIST_SUCCESS(data));

        }catch(error){
            console.log("error",error)
            // const error_data = error.response && error.response.data.message ? error.response.data.message : error.messsage
            dispatch(productActions.PRODUCT_LIST_FAIL(error.response && error.response.data.detail ? error.response.data.detail : error.messsage));
        }
    }
}



export const listTopRatedProducts = (keyword='') =>{

    return async (dispatch) =>{

        const fetchData = async () =>{
            const response  = await axios.get('http://127.0.0.1:8000/api/products/top/');
            
            if (!response.status){
                throw new Error("loading Product data failed");
            }
            const data= response.data;
            return data;            
        }

        try{
            dispatch(topRatedProductReviewActions.TOP_RATED_PRODUCT_REQUEST());
            const data = await fetchData();
            dispatch(topRatedProductReviewActions.TOP_RATED_PRODUCT_SUCCESS(data));

        }catch(error){
            console.log("error",error)
            // const error_data = error.response && error.response.data.message ? error.response.data.message : error.messsage
            dispatch(topRatedProductReviewActions.TOP_RATED_PRODUCT_FAIL(error.response && error.response.data.detail ? error.response.data.detail : error.messsage));
        }
    }
}


export  const deleteProduct =(id)=>{
    return async (dispatch, getState)=>{
        try{
            dispatch(productDeleteActions.PRODUCT_DELETE_REQUEST());
            const {userLogin:{userInfo}} = getState();
            
            const config = {  
                            headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${userInfo.token}`,
                            }
                    } 
            
            const response = await axios.delete(`http://localhost:8000/api/products/delete/${id}`,
                                    config );
            dispatch(productDeleteActions.PRODUCT_DELETE_SUCCESS(response.data));
        }
        catch(error){
            console.log("error",error)
            const error_data = error.response && error.response.data.detail?
                        error.response.data.detail: error.message;
            dispatch(productDeleteActions.PRODUCT_DELETE_FAIL(error_data))
            }
    }
    
}

export  const createProduct =()=>{
    return async (dispatch, getState)=>{
        try{
            dispatch(productCreateActions.PRODUCT_CREATE_REQUEST());
            const {userLogin:{userInfo}} = getState();
            
            const config = {  
                            headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${userInfo.token}`,
                            }
                    } 
            
            const response = await axios.post(`http://localhost:8000/api/products/create/`,
                                    {},config );
            dispatch(productCreateActions.PRODUCT_CREATE_SUCCESS(response.data));
        }
        catch(error){
            console.log("error",error)
            const error_data = error.response && error.response.data.detail?
                        error.response.data.detail: error.message;
            dispatch(productCreateActions.PRODUCT_CREATE_FAIL(error_data))
            }
    }
    
}

export  const updateProduct =(product)=>{
    return async (dispatch, getState)=>{
        try{
            dispatch(productUpdateActions.PRODUCT_UPDATE_REQUEST());
            const {userLogin:{userInfo}} = getState();
            
            const config = {  
                            headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${userInfo.token}`,
                            }
                    } 
            
            const response = await axios.put(`http://localhost:8000/api/products/update/${product._id}/`,
                                    product,config );
            dispatch(productUpdateActions.PRODUCT_UPDATE_SUCCESS(response.data));
            dispatch(productDetailActions.product_detail_success(response.data));
        }
        catch(error){
            console.log("error",error)
            const error_data = error.response && error.response.data.detail?
                        error.response.data.detail: error.message;
            dispatch(productUpdateActions.PRODUCT_UPDATE_FAIL(error_data))
            }
    }
    
}

export  const createProductReview =(productId, review)=>{
    return async (dispatch, getState)=>{
        try{
            dispatch(productCreateReviewActions.PRODUCT_CREATE_REVIEW_REQUEST());
            const {userLogin:{userInfo}} = getState();
            
            const config = {  
                            headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${userInfo.token}`,
                            }
                    } 
            
            const response = await axios.post(`http://localhost:8000/api/products/${productId}/reviews/`,
                                    review,config );
            dispatch(productCreateReviewActions.PRODUCT_CREATE_REVIEW_SUCCESS(response.data));
        }
        catch(error){
            console.log("error",error)
            const error_data = error.response && error.response.data.detail?
                        error.response.data.detail: error.message;
            dispatch(productCreateReviewActions.PRODUCT_CREATE_REVIEW_FAIL(error_data))
            }
    }
    
}