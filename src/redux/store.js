import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/AuthSlice';
import wishlistReducer from './slices/WishlistSlice'

export const store = configureStore({
    reducer:{
        auth : authReducer,
        wishlist : wishlistReducer,
    },
});