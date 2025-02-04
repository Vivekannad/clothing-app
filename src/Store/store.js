import { configureStore } from "@reduxjs/toolkit";

import getItemsSlice from "../Slices/getItemsSlice";
import cartSlice from "../Slices/cartSlice"
import themeSlice from "../Slices/themeSlice";


export default configureStore({
    reducer: {
        products: getItemsSlice,
        cart : cartSlice,
        theme : themeSlice
    },
})