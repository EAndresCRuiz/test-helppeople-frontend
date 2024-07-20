// src/features/products/productsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../config/axiosConfig';
import { Product } from '../../types/Product';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('/products');
  return response.data as Product[];
});

export const createProduct = createAsyncThunk('products/createProduct', async (newProduct: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
  const response = await axios.post('/products', newProduct);
  return response.data as Product;
});

export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id, updatedProduct }: { id: number, updatedProduct: Omit<Product, 'id' | 'created_at' | 'updated_at'> }) => {
  const response = await axios.put(`/products/${id}`, updatedProduct);
  return response.data as Product;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id: number) => {
  await axios.delete(`/products/${id}`);
  return id;
});

export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id: number) => {
  const response = await axios.get(`/products/${id}`);
  return response.data as Product;
});

const productsSlice = createSlice({
  name: 'products',
  initialState: [] as Product[],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.push(action.payload);
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      const index = state.findIndex(product => product.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      return state.filter(product => product.id !== action.payload);
    });
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      const index = state.findIndex((product) => product.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      } else {
        state.push(action.payload);
      }
    });
  },
});

export default productsSlice.reducer;