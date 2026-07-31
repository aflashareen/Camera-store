import {createSlice }from '@reduxjs/toolkit'

const initialState = {
    items : [],
}
const WishlistSlice = createSlice({
    name : "wishlist",
    initialState,
    reducers : {
        addToWishlist : (state,action)=>{
            const exists = state.items.find((item)=>item.id === action.payload.id);

            if(!exists){
                state.items.push(action.payload);
            }
        },
        removeFromWishlist : (state,action)=>{
            state.items.filter((item)=> item.id !== action.payload);
        },
        clearWishlist : (state) => {
            state.items = [];
        }
    }
})
export const { addToWishlist,removeFromWishlist,clearWishlist} = WishlistSlice.actions;
export default WishlistSlice.reducer;