import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../config/axiosConfig';
import { Product } from '../../types/Product';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('/api/products');
  return response.data as Product[];
});

export const createProduct = createAsyncThunk('products/createProduct', async (newProduct: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
  const response = await axios.post('/api/products', newProduct);
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
  },
});

export default productsSlice.reducer;
