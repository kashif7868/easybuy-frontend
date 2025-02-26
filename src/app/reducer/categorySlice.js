// src/app/reducer/categorySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunk to fetch all categories
export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async () => {
    const response = await axios.get('http://localhost:8000/api/categories');
    return response.data; // Assuming the response is an array of categories
  }
);

// Async Thunk to fetch category by ID
export const fetchCategoryById = createAsyncThunk(
  'category/fetchCategoryById',
  async (categoryId) => {
    const response = await axios.get(`http://localhost:8000/api/category/${categoryId}`);
    return response.data; // Assuming response has the category details
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
    currentCategory: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handling categories fetch
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

    // Handling fetch category by ID
    builder
      .addCase(fetchCategoryById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentCategory = action.payload;
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;
