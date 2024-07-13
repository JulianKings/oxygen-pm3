import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from './slices/favoriteSlice';
import searchReducer from './slices/searchSlice';

export default configureStore({
    reducer: {
       favorite: favoriteReducer,
       search: searchReducer
    }
})