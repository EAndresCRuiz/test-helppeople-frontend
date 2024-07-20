// src/features/categories/categoriesSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../config/axiosConfig';
import { Category } from '../../types/Category';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await axios.get('/categories');
  return response.data as Category[];
});

export const createCategory = createAsyncThunk('categories/createCategory', async (newCategory: Omit<Category, 'id' | 'created_at' | 'updated_at'>) => {
  const response = await axios.post('/categories', newCategory);
  return response.data as Category;
});

export const updateCategory = createAsyncThunk('categories/updateCategory', async ({ id, updatedCategory }: { id: number, updatedCategory: Omit<Category, 'id' | 'created_at' | 'updated_at'> }) => {
  const response = await axios.put(`/categories/${id}`, updatedCategory);
  return response.data as Category;
});

export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (id: number) => {
  await axios.delete(`/categories/${id}`);
  return id;
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
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      const index = state.findIndex(category => category.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      return state.filter(category => category.id !== action.payload);
    });
  },
});

export default categoriesSlice.reducer;