import { configureStore } from "@reduxjs/toolkit";

import getItemsSlice from "../Slices/getItemsSlice";
import cartSlice from "../Slices/cartSlice"


export default configureStore({
    reducer: {
        products: getItemsSlice,
        cart : cartSlice
    },
})