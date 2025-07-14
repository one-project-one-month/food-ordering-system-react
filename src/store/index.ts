import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// Types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
