// src/app/reducer/sliderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch slider images
export const fetchSliderImages = createAsyncThunk(
  'slider/fetchSliderImages',
  async () => {
    const response = await axios.get('http://localhost:8000/api/sliders');
    return response.data; // return the response data
  }
);

// Initial state of the slider
const initialState = {
  images: [],
  status: 'idle', // Can be 'idle', 'loading', 'succeeded', or 'failed'
  error: null,
};

// Create the slider slice
const sliderSlice = createSlice({
  name: 'slider',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSliderImages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSliderImages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.images = action.payload; // Populate images with the fetched data
      })
      .addCase(fetchSliderImages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message; // Store the error message if fetch fails
      });
  },
});

// Export the selector to get the slider data
export const selectSliderImages = (state) => state.slider.images;
export const selectSliderStatus = (state) => state.slider.status;
export const selectSliderError = (state) => state.slider.error;

export default sliderSlice.reducer;
