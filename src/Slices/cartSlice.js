import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartedItems : [],
    totalCartedItems : 0,
    quantity: 0
}

const cartSlice  = createSlice( {
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action){
            state.cartedItems.push(action.payload)
            
        },
        removeFromCart(state, action){
            // state.cartedItems.splice(action.payload, 1);
            state.cartedItems = state.cartedItems.filter((item) => item.id !== action.payload)
            state.totalCartedItems = state.cartedItems.reduce((acc, item) => acc + item.amount, 0)
        },
        setTotalCartedItems(state , action) {
            state.totalCartedItems += action.payload;
        }
        // increamentCart(state,action) {
        //     state.
        // },
        // decreamentCart(state,action) {
        //     state.quantity--
        // }
    }

})

export const { addToCart, removeFromCart , setTotalCartedItems} = cartSlice.actions;
export default cartSlice.reducer;   