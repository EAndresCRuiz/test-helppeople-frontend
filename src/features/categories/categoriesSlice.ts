import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../config/axiosConfig';
import { Category } from '../../types/Category';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await axios.get('/api/categories');
  return response.data as Category[];
});

export const createCategory = createAsyncThunk('categories/createCategory', async (newCategory: Omit<Category, 'id' | 'created_at' | 'updated_at'>) => {
  const response = await axios.post('/api/categories', newCategory);
  return response.data as Category;
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: [] as Category[],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  },
});

export default categoriesSlice.reducer;