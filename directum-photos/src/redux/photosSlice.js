import {
    createSlice,
    createAsyncThunk,
    createSelector,
} from "@reduxjs/toolkit";

import { getAllPhotos } from "../api/openApi";

export const LoadingState = {
    idle: "idle",
    loading: "loading",
    succeeded: "succeeded",
    failed: "failed",
};

const initialState = {
    photos: [],
    loading: LoadingState.idle,
    error: null,
};

export const fetchPhotos = createAsyncThunk(
    "photos/fetchPhotos",
    async () => await getAllPhotos()
);

const photosSlice = createSlice({
    name: "photos",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchPhotos.pending]: (state, action) => {
            state.loading = LoadingState.loading;
        },
        [fetchPhotos.fulfilled]: (state, action) => {
            state.loading = LoadingState.succeeded;
            state.photos = action.payload;
        },
        [fetchPhotos.rejected]: (state, action) => {
            state.loading = LoadingState.failed;
            state.error = action.error.message;
        },
    },
});

export default photosSlice.reducer;

export const selectPhotos = createSelector(
    (state) => ({
        photos: state.photos.photos,
        loading: state.photos.loading,
        error: state.photos.error,
    }),
    (state) => state
);
