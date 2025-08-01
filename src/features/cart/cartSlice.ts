import { createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, CartState } from '../../types/cart.types';
import api from '../../config/axios';
import Cookies from 'js-cookie';

const cartUrl = 'api/v1/cart';

export const addToCartItem = createAsyncThunk<any, any>(
  "cart/add",
  async (payload, { rejectWithValue }) => {
    try {
      const result = await api.post(`${cartUrl}/add`, {...payload});
      return result.data;

    } catch (error:any) {
      return rejectWithValue(
        error?.response.data.data ?? "An error occurred during add to cart"
      );
    }
  }
);

export const getCartItems = createAsyncThunk<any>(
  "cart/get",
  async (_, { rejectWithValue }) => {
    try {
      const customerId = Cookies.get('userId')
      const result = await api.get(`${cartUrl}/customer/${String(customerId)}`);
      return result.data;

    } catch (error:any) {
      return rejectWithValue(
        error?.response.data.data ?? "An error occurred during retrieving cart items"
      );
    }
  }
);

export const removeCartItem = createAsyncThunk<string, any>(
  "cart/remove",
  async ({itemId}, { rejectWithValue }) => {
    try {
      const result = await api.delete(`${cartUrl}/remove/${String(itemId)}`);
      return result.data;

    } catch (error:any) {
      return rejectWithValue(
        error?.response.data.data ?? "An error occurred during remove item from cart"
      );
    }
  }
);

export const removeAllCartItem = createAsyncThunk<string, any>(
  "cart/removeall",
  async (_, { rejectWithValue }) => {
    try {
      const result = await api.delete(`${cartUrl}/remove/force`);
      return result.data;

    } catch (error:any) {
      return rejectWithValue(
        error?.response.data.data ?? "An error occurred during remove the whole cart"
      );
    }
  }
);

const initialState: CartState = {
  items: [],
  new: {
    data: [],
    loading: false,
    error: false,
  },
  quantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
       const existingItem = state.items.find(item => item.id === action.payload.id);
    if (existingItem) {
        existingItem.quantity += action.payload.quantity;
    } else {
        state.items.push(action.payload);
    }
    state.quantity = state.items.reduce((total, item) => total + item.quantity, 0);
  },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.quantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
    },
    clearCart: (state) => {
      state.items = [];
      state.quantity = 0;
    },
  },
  extraReducers: (builder) => {
      builder.addCase(addToCartItem.fulfilled, (state: any, action) => {
        state.new.data = action.payload;
        state.new.loading = false;
      });
      builder.addCase(addToCartItem.pending, (state) => {
        state.new.loading = true;
        state.new.error = false;
      });
      builder.addCase(addToCartItem.rejected, (state) => {
        state.new.loading = false;
        state.new.error = true;
      }); 
      builder.addCase(removeAllCartItem.fulfilled, (state: any, action) => {
        state.new.data = action.payload;
        state.new.loading = false;
      });
      builder.addCase(removeAllCartItem.pending, (state) => {
        state.new.loading = true;
        state.new.error = false;
      });
      builder.addCase(removeAllCartItem.rejected, (state) => {
        state.new.loading = false;
        state.new.error = true;
      });   
  }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
