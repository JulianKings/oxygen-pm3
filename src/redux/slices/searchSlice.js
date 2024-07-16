import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        searchQuery: null,
        searchStatus: null,
        searchResult: null,
        searchItems: [],
        searchSettings: 'default',
        searchType: 'asc'
    },
    reducers: {
        updateSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        updateSearchSettings: (state, action) => {
            state.searchSettings = action.payload;
        },
        updateSearchType: (state, action) => {
            state.searchType = action.payload;
        },
        updateSearchItems: (state, action) => {
            const result = action.payload;
            if(result && result.length > 0)
            {
                const itemsToAdd = [];
                result.forEach((item) => {
                    if(!(state.searchItems.find((photo) => item.id === photo.id)))
                    {
                        itemsToAdd.push(item);
                    }
                });

                state.searchItems = [...state.searchItems].concat(itemsToAdd);
            }
        },
        forceUpdateSearchItems: (state, action) => {
            state.searchItems = action.payload;
        }
    },
    extraReducers(builder) {
        builder
        .addCase(fetchImages.pending, (state) => {
            state.searchStatus = 'pending';            
        })
        .addCase(fetchImages.fulfilled, (state, action) => {
            state.searchStatus = 'fulfilled';
            state.searchResult = action.payload;
        })
        .addCase(fetchImages.rejected, (state, action) => {
            state.searchStatus = 'rejected';
            state.searchResult = action.error.message;            
        })
    }
});

export const selectSearchQuery = state => state.search.searchQuery;
export const selectSearchStatus = state => state.search.searchStatus;
export const selectSearchResult = state => state.search.searchResult;
export const selectSearchItems = state => state.search.searchItems;
export const selectSearchSettings = state => state.search.searchSettings;
export const selectSearchType = state => state.search.searchType;

export const fetchImages = createAsyncThunk('search/fetchImages', async (searchQuery) => {
    const randomResponse = (searchQuery === null || searchQuery === '');
    const response = await fetch((randomResponse) ? 
        'https://api.unsplash.com/photos/random?count=10' : 
        'https://api.unsplash.com/search/photos?page=1&per_page=10&query=' + searchQuery, 
        {                
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Client-ID ' + import.meta.env.VITE_API_KEY
        },
        mode: "cors",
        dataType: 'json',
    })
    .then((response) => {
        if (response.status >= 400) {
            throw new Error("Could not reach server: " + response.status);
        }

        return response.json();
    })
    .catch((error) => {
        throw new Error(error);
    });

    return (randomResponse) ? (response) : (response.results);
})

export const { updateSearchQuery, updateSearchItems, updateSearchSettings, updateSearchType, forceUpdateSearchItems } = searchSlice.actions

export default searchSlice.reducer;