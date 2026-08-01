// import { createSlice } from '@reduxjs/toolkit'

// const initialState = {
//     items: JSON.parse(localStorage.getItem("wishlist")) || [],
// }
// const WishlistSlice = createSlice({
//     name: "wishlist",
//     initialState,
//     reducers: {
//         addToWishlist: (state, action) => {
//             const exists = state.items.find((item) => item.id === action.payload.id);

//             if (!exists) {
//                 state.items.push(action.payload);
//             }

//             localStorage.setItem(
//                 'wishlist',
//                 JSON.stringify(state.items)
//             )
//         },
//         removeFromWishlist: (state, action) => {
//             state.items= state.items.filter((item) => item.id !== action.payload);

//             localStorage.setItem(
//                 "wishlist",
//                 JSON.stringify(state.items)
//             )
//         },
//         clearWishlist: (state) => {
//             state.items = [];
//         },
//     }
// })
// export const { addToWishlist, removeFromWishlist, clearWishlist } = WishlistSlice.actions;
// export default WishlistSlice.reducer;