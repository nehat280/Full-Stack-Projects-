import axios from "axios";
import {productDetailActions} from '../reducers/productDetailReducer';


export const fetchProductDetails = (id)=>{
    return async (dispatch) =>{
        const fetchProdDetail = async ()=>{
            const response = await axios.get(`http://localhost:8000/api/products/${id}`)
            if (!response.status){
                throw new Error("loading product details failed")
            }
            const data = response.data
            return data;
        }
        try{
            dispatch(productDetailActions.product_detail_request());
            const data = await fetchProdDetail();
            dispatch(productDetailActions.product_detail_success(data));
        }catch(error){
            const error_data = error.response && error.response.data.detail ? error.resoonse.data.detail: error.detail
            dispatch(productDetailActions.product_detail_fail(error_data));
        }


    }
}