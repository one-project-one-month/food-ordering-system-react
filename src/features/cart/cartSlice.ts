import { createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, CartState } from '../../types/cart.types';

const initialState: CartState = {
  items: [],
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
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
