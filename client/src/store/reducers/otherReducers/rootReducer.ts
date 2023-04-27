import {combineReducers} from 'redux';
import {Reducer} from "react";

import searchInputReducer from '../componentReducers/searchInputReducer';
import menuReducer from "../componentReducers/menuReducer";
import chatListReducer from "../componentReducers/chatListReducer";
import contactListReducer from "../componentReducers/contactListReducer";
import themeSwitcherReducer from "../componentReducers/themeSwitcherReducer";
import socketReducer from "./socketReducer";


export const rootReducer: Reducer<any, any> = combineReducers({
    search: searchInputReducer,
    menu: menuReducer,
    chat_list: chatListReducer,
    contact_list: contactListReducer,
    socket: socketReducer,
    theme_switcher: themeSwitcherReducer
});

export type RootState = ReturnType<typeof rootReducer>;
