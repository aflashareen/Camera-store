import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/AuthSlice';
import wishlistReducer from './slices/WishlistSlice'
import cartReducer from './slices/CartSlice'

export const store = configureStore({
    reducer:{
        auth : authReducer,
        wishlist : wishlistReducer,
        cart : cartReducer,
    },
});