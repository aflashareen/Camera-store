import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    items : [],
}
const CartSlice = createSlice({
    name : "cart",
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            const existing = state.items.find((item)=>item.id === action.payload.id);

            if(existing){
                existing.quantity += 1;
            }else{
                state.items.push({
                    ...action.payload,
                    quantity: 1,
                });
            }
        },
        removeFromCart:(state,action)=>{
            state.items = state.items.filter((item)=>item.id !== action.payload);

            localStorage.setItem('cart',JSON.stringify(state.items))
        },
        increaseQuantity: (state,action)=>{
            const item = state.items.find((item)=> item.id === action.payload);

            if(item) item.quantity += 1;
            localStorage.setItem('cart',JSON.stringify(state.items))
        },
        decreaseQuantity: (state,action)=>{
            const item = state.items.find((item)=> item.id === action.payload);

            if(item && item.quantity > 1){
                item.quantity -= 1;
            } else{
                state.items = state.items.filter((item)=>item.id !== action.payload);
            }
            localStorage.setItem('cart',JSON.stringify(state.items))
        },
        clearCart : (state)=>{
            state.items = [];
        }
    }
})
export const { addToCart,removeFromCart,increaseQuantity,decreaseQuantity } = CartSlice.actions;
export default CartSlice.reducer;