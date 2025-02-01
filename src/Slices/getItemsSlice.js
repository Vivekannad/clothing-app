import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { STATUS } from './status.js';

const initialState = {
    items: [],
    status: STATUS.LOADING,
    hasErrors: false,
    error: null,
    allItems: [],
    sortedItems: [],
    currentPage: 1,
    itemsPerPage: 15,
    featuredItems: [],
    allCategories: [],
    getCategoryItems: [],
};

export const fetchProduct = createAsyncThunk('products/fetchProduct', async () => {
    const url = (`https://api.escuelajs.co/api/v1/products`);

    const response = await fetch(url);
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
            state.allItems = [];
        })
        .addCase(fetchProduct.fulfilled, (state, action) => {
            state.status = STATUS.SUCCEEDED;
            state.hasErrors = false;
            state.allItems = action.payload;
            state.sortedItems = [...action.payload].sort((a, b) => a.title.localeCompare(b.title));

            const startIndex = (state.currentPage - 1) * state.itemsPerPage;    
            const endIndex = state.currentPage * state.itemsPerPage;
            state.items = state.sortedItems.slice(startIndex, endIndex);
        })
        .addCase(fetchProduct.rejected, (state, action) => {
            state.status = STATUS.FAILED;
            state.hasErrors = true;
            state.error = action.error.message;
        });
    },
    reducers: {
        getFeaturedItems: (state) => {
            state.featuredItems = [];
            for (let i = 0; i <= 2; i++) {
                state.featuredItems.push(state.items[i]);
            }
        },
        getAllCategories: (state) => {
            state.allCategories = [];
            state.allItems.map((item) => {
                if (state.allCategories.findIndex((category) => category.name === item.category.name) === -1) {
                    state.allCategories.push({ name: item.category.name, id: item.category.id });
                }
            })
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        sortByTitleAsc: (state) => {
            state.sortedItems= [...state.sortedItems].sort((a, b) => a.title.localeCompare(b.title));    
            const startIndex = (state.currentPage - 1) * state.itemsPerPage;
            const endIndex = state.currentPage * state.itemsPerPage;
            state.items = state.sortedItems.slice(startIndex, endIndex);
        },
        sortByTitleDesc: (state) => {
            state.sortedItems= [...state.sortedItems].sort((a, b) => b.title.localeCompare(a.title));    
            const startIndex = (state.currentPage - 1) * state.itemsPerPage;
            const endIndex = state.currentPage * state.itemsPerPage;
            state.items = state.sortedItems.slice(startIndex, endIndex);
        },
        sortByPriceAsc: (state) => {
            state.sortedItems = [...state.sortedItems].sort((a, b) => a.price - b.price);
        
            //apply pagination
            const startIndex = (state.currentPage - 1) * state.itemsPerPage;
            const endIndex = state.currentPage * state.itemsPerPage;
            state.items = state.sortedItems.slice(startIndex, endIndex);
        },
        sortByPriceDesc: (state) => {
            state.sortedItems = [...state.sortedItems].sort((a, b) => b.price - a.price);
        
            //apply pagination
            const startIndex = (state.currentPage - 1) * state.itemsPerPage;
            const endIndex = state.currentPage * state.itemsPerPage;
            state.items = state.sortedItems.slice(startIndex, endIndex);
        },
        getCategoryItems: (state, action) => {
            if(Number(action.payload) === 0) {
                state.getCategoryItems = state.allItems;
                state.sortedItems = state.getCategoryItems;
            }else{
                state.getCategoryItems = state.allItems.filter(item => item.category.id === Number(action.payload));
                state.sortedItems = state.getCategoryItems;
            }
        
            //apply pagination
            const startIndex = (state.currentPage - 1) * state.itemsPerPage;
            const endIndex = state.currentPage * state.itemsPerPage;
            state.items = state.sortedItems.slice(startIndex, endIndex);
        }
    }
});

export default productsSlice.reducer;
export const { getFeaturedItems, getAllCategories, sortByPriceAsc, sortByPriceDesc , sortByTitleAsc , sortByTitleDesc , setCurrentPage , getCategoryItems } = productsSlice.actions;
