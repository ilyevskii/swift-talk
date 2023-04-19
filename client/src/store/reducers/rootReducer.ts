import {combineReducers} from 'redux';
import searchInputReducer from './searchInputReducer';
import menuReducer from "./menuReducer";
import {Reducer} from "react";

export const rootReducer: Reducer<any, any> = combineReducers({
    search: searchInputReducer,
    menu: menuReducer
});

export type RootState = ReturnType<typeof rootReducer>;
