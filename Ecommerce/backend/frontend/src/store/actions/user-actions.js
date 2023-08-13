import axios from 'axios';
import {userActions} from '../reducers/userLoginReducer'
import {userRegistrationActions} from '../reducers/userRegistrationReducer';
import {userProfileActions,userListActions,userDeleteActions,userUpdateActions} from '../reducers/userProfileReducer';
import {updateUserProfileActions} from '../reducers/userUpdateProfileReducer';
import {listMyOrderSliceActions} from '../reducers/orderReducer';

export const Login =(email, password)=>{
    return async(dispatch)=>{
        try{
            dispatch(userActions.USER_LOGIN_REQUEST);
            const config = {headers:{'Content-type':'application/json'}}
            const response = await axios.post('http://localhost:8000/api/users/login/',
                                        {
                                            'username':email,
                                            'password': password
                                        },
                                        config);
            dispatch(userActions.USER_LOGIN_SUCCESS(response.data));
            localStorage.setItem('userInfo', JSON.stringify(response.data));

        }
        catch(error){
            // console.log(error.response)
            const error_data = error.response && error.response.data.detail?
                            error.response.data.detail: error.message
            dispatch(userActions.USER_LOGIN_FAIL(error_data))
        }
    }
}

export const Logout =()=>{
    return (dispatch)=>{
    localStorage.removeItem('userInfo');
    dispatch(userActions.USER_LOGOUT());
    dispatch(listMyOrderSliceActions.ORDER_LIST_MY_RESET());
    dispatch(userListActions.USER_LIST_RESET());
    }
}

export const Register = (name,email,password) =>{
    return async (dispatch)=>{
        try{
            dispatch(userRegistrationActions.USER_REGISTRATION_REQUEST());
            const config = {'Content-type':'application/json'}
            const response = await axios.post('http://localhost:8000/api/users/register/',
                                        {
                                            'name':name,
                                            'email':email,
                                            'password':password
                                        },
                                        config);
            dispatch(userRegistrationActions.USER_REGISTRATION_SUCCESS(response.data));
            dispatch(userActions.USER_LOGIN_SUCCESS(response.data));
            localStorage.setItem('userInfo',JSON.stringify(response.data));
        }
        catch(error){
            const error_data = error.response && error.response.data.detail?
                        error.response.data.detail: error.message;
            dispatch(userRegistrationActions.USER_REGISTRATION_FAIL(error_data))
            }
    }
}


export const getUserDetails = (id) =>{
    return async (dispatch, getState)=>{
        try{
            dispatch(userProfileActions.USER_PROFILE_REQUEST());
            const {userLogin:{userInfo}} = getState();
            // console.log("userprofile",userInfo)
            
            
            const response = await axios.get(`http://localhost:8000/api/users/${id}/`,
                                    {  
                                        headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${userInfo.token}`
                                        }
                                    }   
                                            );
            const data = await response.data
            dispatch(userProfileActions.USER_PROFILE_SUCCESS(data));
        }
        catch(error){
            console.log("error",error)
            const error_data = error.response && error.response.data.detail?
                        error.response.data.detail: error.message;
            dispatch(userProfileActions.USER_PROFILE_FAIL(error_data))
            }
    }
}

export const updateUserProfile = (user) =>{
    return async (dispatch, getState)=>{
        try{
            dispatch(updateUserProfileActions.USER_UPDATE_PROFILE_REQUEST());
            const {userLogin:{userInfo}} = getState();
            // console.log("info",userInfo)
            const config = {  
                            headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${userInfo.token}`
                            }
                    } 
            const response = await axios.put('http://localhost:8000/api/users/profile/update/',
                                    user, config );

            dispatch(updateUserProfileActions.USER_UPDATE_PROFILE_SUCCESS(response.data));

            dispatch(userActions.USER_LOGIN_SUCCESS(response.data));
            localStorage.setItem('userInfo',JSON.stringify(response.data));
        }
        catch(error){
            console.log("error",error)
            const error_data = error.response && error.response.data.detail?
                        error.response.data.detail: error.message;
            dispatch(updateUserProfileActions.USER_UPDATE_PROFILE_FAIL(error_data))
            }
    }
}


export const listUsers = () =>{
    return async (dispatch, getState)=>{
        try{
            dispatch(userListActions.USER_LIST_REQUEST());
            const {userLogin:{userInfo}} = getState();
            // console.log("info",userInfo)
            const config = {  
                            headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${userInfo.token}`
                            }
                    } 
            const response = await axios.get('http://localhost:8000/api/users/',
                                    config );
            dispatch(userListActions.USER_LIST_SUCCESS(response.data));
            
        }
        catch(error){
            console.log("error",error)
            const error_data = error.response && error.response.data.detail?
                        error.response.data.detail: error.message;
            dispatch(userListActions.USER_LIST_FAIL(error_data))
            }
    }
}


export const deleteUser = (id) =>{
    return async (dispatch,getState)=>{
        try{
            dispatch(userDeleteActions.USER_DELETE_REQUEST());
            const {userLogin:{userInfo}} = getState();
            const config = {  
                            headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${userInfo.token}`
                            }
                    } 
            const response = await axios.delete(`http://localhost:8000/api/users/delete/${id}/`,
                                    config );
            dispatch(userDeleteActions.USER_DELETE_SUCCESS(response.data));
        }
        catch(error){
            const error_data = error.response && error.response.data.detail?
                        error.response.data.detail: error.message;
            dispatch(userDeleteActions.USER_DELETE_FAIL(error_data))
            }
    }
}


export const updateUser = (user) =>{
    return async (dispatch,getState)=>{
        try{
            dispatch(userUpdateActions.USER_UPDATE_REQUEST());
            const {userLogin:{userInfo}} = getState();
            const config = {  
                            headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${userInfo.token}`
                            }
                    } 
            const response = await axios.put(`http://localhost:8000/api/users/update/${user._id}/`,
                                    user,config );
            dispatch(userUpdateActions.USER_UPDATE_SUCCESS());
            dispatch(userProfileActions.USER_PROFILE_SUCCESS(response.data));
        }
        catch(error){
            const error_data = error.response && error.response.data.detail?
                        error.response.data.detail: error.message;
            dispatch(userUpdateActions.USER_UPDATE_FAIL(error_data))
            }
    }
}