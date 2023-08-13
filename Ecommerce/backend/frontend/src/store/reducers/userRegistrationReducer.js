import {createSlice} from '@reduxjs/toolkit';


const initialState = {}
const userRegistrationSlice = createSlice({
    name:'userRegistration',
    initialState: initialState,
    reducers:{
        USER_REGISTRATION_REQUEST(state){
            state.loading = true
        },
        USER_REGISTRATION_SUCCESS(state,action){
            state.loading = false;
            state.userInfo = action.payload
        },
        USER_REGISTRATION_FAIL(state,action){
            state.loading = false;
            state.error = action.error
        }
    }
})

export const userRegistrationActions = userRegistrationSlice.actions;
export default userRegistrationSlice.reducer;