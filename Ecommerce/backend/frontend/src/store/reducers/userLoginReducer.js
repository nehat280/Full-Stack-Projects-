import {createSlice} from '@reduxjs/toolkit';


const userInfoFromStorage = localStorage.getItem('userInfo')?
                            JSON.parse(localStorage.getItem('userInfo')) : null
const initialState = {userInfo:userInfoFromStorage}

const userSlice = createSlice({
    name: 'userLogin',
    initialState: initialState,
    reducers:{
        USER_LOGIN_REQUEST(state){
            state.loading = true
        },
        USER_LOGIN_SUCCESS(state, action){
            state.loading = false
            state.userInfo = action.payload
        },
        USER_LOGIN_FAIL(state,action){
            state.loading = false
            state.error = action.payload
        },
        USER_LOGOUT:()=> initialState,
    
    }});

export default userSlice.reducer;
export const userActions =  userSlice.actions;