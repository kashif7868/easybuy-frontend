// src/app/reducer/bannerSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch banner data
export const fetchBanners = createAsyncThunk(
  'banner/fetchBanners',
  async () => {
    const response = await axios.get('http://localhost:8000/api/banners');
    return response.data; // Return the fetched data
  }
);

// Initial state of the banners, ensuring 'banners' is an empty array initially
const initialState = {
  banners: [],
  status: 'idle', // Can be 'idle', 'loading', 'succeeded', or 'failed'
  error: null,
};

// Create the banner slice
const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.banners = action.payload; // Populate banners with the fetched data
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message; // Store the error message if fetch fails
      });
  },
});

// Export the selector to get the banner data
export const selectBanners = (state) => state.banner.banners;
export const selectBannerStatus = (state) => state.banner.status;
export const selectBannerError = (state) => state.banner.error;

export default bannerSlice.reducer;
