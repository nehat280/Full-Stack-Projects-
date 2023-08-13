import {createSlice} from '@reduxjs/toolkit';


const initialState = {}

const userUpdateProfileReducer = createSlice({
    name: 'updateUserProfile',  
    initialState: initialState,
    reducers:{
        USER_UPDATE_PROFILE_REQUEST(state){
            state.loading = true
        },
        USER_UPDATE_PROFILE_SUCCESS(state, action){
            state.loading = false;
            state.success = true;
            state.userInfo = action.payload
        },
        USER_UPDATE_PROFILE_FAIL(state,action){
            state.loading = false
            state.error = action.payload
        },
        USER_UPDATE_PROFILE_RESET:()=>initialState
    }});

export default userUpdateProfileReducer.reducer;
export const updateUserProfileActions =  userUpdateProfileReducer.actions;