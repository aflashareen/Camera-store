import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from './slices/WishlistSlice'
import cartReducer from './slices/CartSlice'

export const store = configureStore({
    reducer:{
        wishlist : wishlistReducer,
        cart : cartReducer,
    },
});