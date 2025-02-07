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
    category : '',
    filterOrder : '',
    itemSearch : '',
    allBrands : [],
    selectedBrand : ''
};

export const fetchProduct = createAsyncThunk('products/fetchProduct', async () => {
    
    const url = (`https://api.jsonbin.io/v3/b/${import.meta.env.VITE_URL_ENDPOINT}/latest`);

    const response = await fetch(url, {
        method: 'GET',
        headers  : {
             'X-Master-Key': '$2a$10$t.YvpbvLVvLEsbEHwhKxP.wU8xNKelkAthyRnjvTKUPV4ESZQldye'
        }
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    if (data.error) {
        throw new Error('Error');
    }
    return data.record.products;
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
            // for (let i = 0; i <= 2; i++) {
            //     state.featuredItems.push(state.items[i]);
            // }
          state.featuredItems =  state.allItems.filter(item => item.popular === true);
          state.featuredItems.length = 4
        },
        getAllCategories: (state) => {
            state.allCategories = [];
            state.allItems.map((item) => {
                if (state.allCategories.findIndex((category) => category === item.category) === -1) {
                    state.allCategories.push(item.category);
                }
            })
        },
        getAllBrands: (state) => {
  state.allBrands = state.allItems
    .filter((item) => state.category === "" || item.category === state.category) // Filter by category
    .map((item) => item.brand) // Extract brands
    .filter((brand, index, self) => self.indexOf(brand) === index); // Remove duplicates
},

        setItems : (state , action) => {
            state.items = action.payload;
        },
        setCategory : (state ,action) => {
            state.category = action.payload;
        },
        setSelectedBrand : (state , action) => {
            state.selectedBrand = action.payload;
        },
        setFilterOrder : (state , action) => {
            state.filterOrder = action.payload;
        },
        setItemSearch : (state , action) => {
            state.itemSearch = action.payload;
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
            if(action.payload !== '') {
                state.sortedItems = [...state.sortedItems].filter(item => item.category == action.payload);
                // state.sortedItems = state.getCategoryItems;
            }
        
            //apply pagination
            const startIndex = (state.currentPage - 1) * state.itemsPerPage;
            const endIndex = state.currentPage * state.itemsPerPage;
            state.items = state.sortedItems.slice(startIndex, endIndex);
        } , 
        sortByBrand : (state , action) => {
            if(action.payload !== '') {
                state.sortedItems = [...state.sortedItems].filter(item => item.brand == action.payload);
            }

            //apply pagination
            const startIndex = (state.currentPage - 1) * state.itemsPerPage;
            const endIndex = state.currentPage * state.itemsPerPage;
            state.items = state.sortedItems.slice(startIndex, endIndex);
        },
        setNameFilter: (state, action) => {
            // state.nameFilter = action.payload;
            state.sortedItems = state.allItems.filter(item => item.title.toLowerCase().includes(action.payload.toLowerCase()));
            state.items = state.sortedItems;

            //apply pagination
            const startIndex = (state.currentPage - 1) * state.itemsPerPage;
            const endIndex = state.currentPage * state.itemsPerPage;
            state.items = state.sortedItems.slice(startIndex, endIndex);
        }
    }
}
)

export default productsSlice.reducer;
export const { getFeaturedItems, getAllCategories, sortByBrand , setCategory , setSelectedBrand, getAllBrands , setItemSearch , setFilterOrder, sortByPriceAsc, sortByPriceDesc , sortByTitleAsc , sortByTitleDesc , setCurrentPage , getCategoryItems , setNameFilter , setItems } = productsSlice.actions;
