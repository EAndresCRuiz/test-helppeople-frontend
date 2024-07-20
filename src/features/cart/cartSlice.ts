import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../config/axiosConfig';
import { Product } from '../../types/Product';

interface CartItem {
    id: number;
    product: Product;
    quantity: number;
    product_id: number;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async () => {
    const response = await axios.get('/cart');
    return response.data as CartItem[];
});

export const addToCart = createAsyncThunk('cart/addToCart', async (product: Product) => {
    const response = await axios.post('/cart', { product_id: product.id, quantity: 1 });
    // response.data.product = product;
    return response.data as CartItem;
});

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (id: number) => {
    await axios.delete(`/cart/${id}`);
    return id;
});

export const clearCart = createAsyncThunk('cart/clearCart', async () => {
    await axios.delete('/cart');
    return [];
});

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCartItems.fulfilled, (state, action) => {
            state.items = action.payload;
        });
        builder.addCase(addToCart.fulfilled, (state, action) => {
            
            const existingItem = state.items.find(item => {                
                return item.product_id === action.payload.product_id
            });
            if (existingItem) {                
                existingItem.quantity = action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
        });
        builder.addCase(removeFromCart.fulfilled, (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        });
        builder.addCase(clearCart.fulfilled, (state) => {
            state.items = [];
        });
    },
});

export default cartSlice.reducer;