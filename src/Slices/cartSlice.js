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
            const itemId = action.payload;
            const itemIndex = state.cartedItems.findIndex(item => item.id === itemId);
            
            if (itemIndex !== -1) {
                // Remove the item from the array
                state.cartedItems.splice(itemIndex, 1);
                
                // Recalculate totalCartedItems
                state.totalCartedItems = state.cartedItems.reduce((acc, item) => acc + item.amount, 0);
            } else {
                console.warn(`Attempted to remove non-existent item with id: ${itemId}`);
            }        
        },
        setTotalCartedItems(state , action) {
            state.totalCartedItems += action.payload;
        },
        adjustQuantity(state , action) {
            state.totalCartedItems = 0;
            state.cartedItems.forEach((item) => {
                if(item.id === action.payload.id) {
                    item.amount = action.payload.amount;
                }
                state.totalCartedItems += item.amount;
            })
        }
        // increamentCart(state,action) {
        //     state.
        // },
        // decreamentCart(state,action) {
        //     state.quantity--
        // }
    }

})

export const { addToCart, removeFromCart , setTotalCartedItems , adjustQuantity} = cartSlice.actions;
export default cartSlice.reducer;   