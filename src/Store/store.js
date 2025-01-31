import { configureStore } from "@reduxjs/toolkit";

import getItemsSlice from "../Slices/getItemsSlice";

export default configureStore({
    reducer: {
        products: getItemsSlice,
    },
})