import { combineReducers, createStore } from "redux";

import booksReducer from "./reducer/booksReducer";
import categoriesReducer from "./reducer/categoriesReducer";

const rootReducer= combineReducers({
    booksState:booksReducer,
    categoriesState:categoriesReducer
})

const store =createStore(rootReducer)

export default store