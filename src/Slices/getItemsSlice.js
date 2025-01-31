import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { STATUS } from './status';

const initialState = {
    items: [],
    status: STATUS.LOADING,
    hasErrors: false,
    error: null,
    featuredItems : [],
    allCategories : []
};

export const fetchProduct = createAsyncThunk('products/fetchProduct', async () => {
    const response = await fetch('https://api.escuelajs.co/api/v1/products');    
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    if (data.error) {
        throw new Error('Error');
    }
    return data;
});

const productsSlice = createSlice({
    name: 'products',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchProduct.pending, (state, action) => {
            state.status = STATUS.LOADING;
            state.hasErrors = false;
            state.items = [];
        })
        .addCase(fetchProduct.fulfilled, (state, action) => {
            state.status = STATUS.SUCCEEDED;
            state.hasErrors = false;
            state.items = action.payload;
        })
        .addCase(fetchProduct.rejected, (state, action) => {
            state.status = STATUS.FAILED;
            state.hasErrors = true;
            state.error = action.error.message;
        });
    },
    reducers : {
        getFeaturedItems : (state) => {
            state.featuredItems = [];
            for(let i = 0 ; i <= 2; i++) {
                state.featuredItems.push(state.items[i]);
            }
        } , 
        getAllCategories : (state) => {
            state.allCategories = [];
            state.items.map((item) => {
                if(state.allCategories.findIndex((category) => category.name === item.category.name) === -1) {
                    state.allCategories.push({name: item.category.name , id : item.category.id});
                }
            })
            }
    }
});

export default productsSlice.reducer;
export const { getFeaturedItems , getAllCategories } = productsSlice.actions;
