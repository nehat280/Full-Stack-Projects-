import {configureStore} from '@reduxjs/toolkit';
import {productReducer,productDeleteReducer, productCreateReducer,
    productUpdateReducer,productCreateReviewReducer,topRatedProductReviewReducer} from './reducers/productReducers';
import productDetailReducer from './reducers/productDetailReducer';
import userLoginReducer from './reducers/userLoginReducer';
import cartReducer from './reducers/cartReducer'
import userRegistrationReducer from './reducers/userRegistrationReducer';
import {userProfileReducer,userListReducer,userDeleteReducer,userUpdateReducer} from './reducers/userProfileReducer'
import userUpdateProfileReducer from './reducers/userUpdateProfileReducer';
import {createOrderReducer,orderDetailsReducer,orderPayReducer,
    orderDeliverReducer,listMyOrderSliceReducer,listAllOrderReducer} from './reducers/orderReducer';

const store = configureStore(
        {   
            reducer: {products: productReducer,
                productDelete:productDeleteReducer,
                product_detail: productDetailReducer,
                productCreate: productCreateReducer,
                productUpdate:productUpdateReducer,
                topProduct:topRatedProductReviewReducer,
                productCreateReview:productCreateReviewReducer,
                cart: cartReducer,
                userLogin: userLoginReducer,
                userRegistration:userRegistrationReducer,
                userProfile: userProfileReducer,
                userDelete:userDeleteReducer,
                userList:userListReducer,
                userUpdate:userUpdateReducer,
                userUpdateProfile: userUpdateProfileReducer,
                createOrder:createOrderReducer,
                orderDetail:orderDetailsReducer,
                orderPay:orderPayReducer,
                orderDeliver:orderDeliverReducer,
                listAllOrder:listAllOrderReducer,
                listMyOrder: listMyOrderSliceReducer,
            }
        }
    )

export default store;