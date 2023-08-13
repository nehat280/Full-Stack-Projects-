import {createSlice} from '@reduxjs/toolkit';

const initialState = {userProfile:{}}
const userProfileSlice = createSlice({
    name:'userProfile',
    initialState:initialState,
    reducers: {
        USER_PROFILE_REQUEST(state){
            state.loading = true;
        },
        USER_PROFILE_SUCCESS(state, action){
            state.loading = false;
            state.userProfile = action.payload
        },
        USER_PROFILE_FAIL(state,action){
            state.loading = false;
            state.error = action.payload
        },
        USER_PROFILE_RESET:()=>initialState
    }
});

const userListInitialState = {users:[]}
const userListSlice = createSlice({
    name:'userList',
    initialState:userListInitialState,
    reducers: {
        USER_LIST_REQUEST(state){
            state.loading = true;
        },
        USER_LIST_SUCCESS(state, action){
            state.loading = false;
            state.users = action.payload
        },
        USER_LIST_FAIL(state,action){
            state.loading = false;
            state.error = action.payload
        },
        USER_LIST_RESET:()=>userListInitialState
    }
})

const userDeleteInitialState = {}
const userDeleteSlice = createSlice({
    name:'userDelete',
    initialState:userDeleteInitialState,
    reducers: {
        USER_DELETE_REQUEST(state){
            state.loading = true;
        },
        USER_DELETE_SUCCESS(state, action){
            state.loading = false;
            state.success = true
        },
        USER_DELETE_FAIL(state,action){
            state.loading = false;
            state.error = action.payload
        },
        USER_DELETE_RESET:()=>userDeleteInitialState
    }
})


const userUpdateInitialState = {user:{}}
const userUpdateSlice = createSlice({
    name:'userUpdate',
    initialState:userUpdateInitialState,
    reducers: {
        USER_UPDATE_REQUEST(state){
            state.loading = true;
        },
        USER_UPDATE_SUCCESS(state){
            state.loading = false;
            state.success = true
        },
        USER_UPDATE_FAIL(state,action){
            state.loading = false;
            state.error = action.payload
        },
        USER_UPDATE_RESET:()=>userUpdateInitialState
    }
})

export const userUpdateReducer = userUpdateSlice.reducer;
export const userUpdateActions = userUpdateSlice.actions;

export const userDeleteReducer = userDeleteSlice.reducer;
export const userDeleteActions = userDeleteSlice.actions;

export const userListReducer = userListSlice.reducer;
export const userListActions = userListSlice.actions;

export const userProfileReducer = userProfileSlice.reducer;
export const userProfileActions = userProfileSlice.actions;