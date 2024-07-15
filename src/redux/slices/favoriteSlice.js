import { createSlice } from "@reduxjs/toolkit";

export const favoriteSlice = createSlice({
    name: 'favorite',
    initialState: {
        photoList: null
    },
    reducers: {
        updatePhotoList: (state, action) => {
            state.photoList = action.payload;
        },
        appendPhotoToList: (state, action) => {
            if(state.photoList && state.photoList.length && state.photoList.length > 0)
            {
                state.photoList = state.photoList.concat[action.payload];
            }
        },
        removePhotoFromList: (state, action) => {
            if(state.photoList && state.photoList.length && state.photoList.length > 0)
            {
                state.photoList = state.photoList.filter((photo) => photo.id !== action.payload);                
            }
        }
    }
});

export const selectPhotoList = state => state.favorite.photoList;

export const { updatePhotoList, appendPhotoToList, removePhotoFromList } = favoriteSlice.actions;

export default favoriteSlice.reducer;