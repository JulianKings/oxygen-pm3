import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
        searchQuery: null,
        searchStatus: null,
        searchResult: null,
        searchItems: [],
        searchSettings: 'default',
        searchType: 'asc',
        searchCurrentPage: 1,
        searchMaxPages: 1,
        searchIncreasePage: false
    },
    reducers: {
        updateSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        updateSearchSettings: (state, action) => {
            state.searchSettings = action.payload;
        },
        increaseSearchCurrentPage: (state) => {
            state.searchCurrentPage += 1;
        },
        updateSearchIncreasePage: (state, action) => {
            state.searchIncreasePage = action.payload;
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
            state.searchMaxPages = action.payload.total_pages;
            state.searchResult = action.payload.results;
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
export const selectSearchCurrentPage = state => state.search.searchCurrentPage;
export const selectSearchMaxPages = state => state.search.searchMaxPages;
export const selectSearchIncreasePage = state => state.search.searchIncreasePage;


export const fetchImages = createAsyncThunk('search/fetchImages', async (resultObject) => {
    const randomResponse = (resultObject.searchQuery === null || resultObject.searchQuery === '');
    
    const response = await fetch((randomResponse) ? 
        'https://api.unsplash.com/photos/random?count=10' : 
        ('https://api.unsplash.com/search/photos?page=' + resultObject.page + '&per_page=10&query=' + resultObject.searchQuery), 
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

    if(randomResponse)
    {
        response.total_pages = 1;
        response.results = [...response];
    }

    return response;
})

export const { updateSearchQuery, updateSearchItems, updateSearchSettings, 
updateSearchType, forceUpdateSearchItems, increaseSearchCurrentPage, updateSearchIncreasePage } = searchSlice.actions

export default searchSlice.reducer;