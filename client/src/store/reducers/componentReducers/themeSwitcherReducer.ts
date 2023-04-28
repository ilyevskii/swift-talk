import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface searchState {
    theme: string;
}

const initialState: searchState = {
    theme: localStorage.getItem('theme') || 'dark-theme',
};

const themeSwitcherReducer = createSlice({
    name: "theme-switcher",
    initialState,
    reducers: {
        updateTheme: (state, action: PayloadAction<string>): void => {
            state.theme = action.payload;
            localStorage.setItem('theme', state.theme);
        },
    }
});

export const {updateTheme} = themeSwitcherReducer.actions;

export default themeSwitcherReducer.reducer;
