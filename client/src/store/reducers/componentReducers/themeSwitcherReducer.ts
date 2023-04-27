import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface searchState {
    isLightThemeNow: boolean;
}

const initialState: searchState = {
    isLightThemeNow: false,
};

const themeSwitcherReducer = createSlice({
    name: "theme-switcher",
    initialState,
    reducers: {
        updateIsLightTheme: (state, action: PayloadAction<boolean>): void => {
            state.isLightThemeNow = action.payload;
        },
    }
});

export const {updateIsLightTheme} = themeSwitcherReducer.actions;

export default themeSwitcherReducer.reducer;
