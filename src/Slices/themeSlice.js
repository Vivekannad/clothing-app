import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    theme : 'light'
}

const themeSlice = createSlice({
    name : 'theme',
    initialState,
    reducers : {
        changeTheme : (state, action) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
              document.documentElement.setAttribute('data-theme', state.theme);
        }
    }
})

export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;