import {combineReducers} from 'redux';
import searchInputReducer from './searchInputReducer';
import menuReducer from "./menuReducer";
import chatListReducer from "./chatListReducer";
import contactListReducer from "./contactListReducer";
import {Reducer} from "react";

export const rootReducer: Reducer<any, any> = combineReducers({
    search: searchInputReducer,
    menu: menuReducer,
    chat_list: chatListReducer,
    contact_list: contactListReducer
});

export type RootState = ReturnType<typeof rootReducer>;
