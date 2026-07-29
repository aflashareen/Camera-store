import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user : null,
    isAuthenticated: false,
    loading: false,
    error: null,
};
const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers:{
        loginSuccess: (state,action)=>{
            state.user = action.payload;
            state.isAuthenticated = true;
            state.error = null;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
        },
        setLoading: (state,action)=>{
            state.loading = action.payload;
        },
        setError: (state,action)=>{
            state.error = action.payload;
        },
    },
});

export const { loginSuccess,logout,setLoading,setError } = authSlice.actions;
export default authSlice.reducer;
