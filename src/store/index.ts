import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice'
import counterReducer from '../features/counter/counterSlice';
import profileReducer from '../features/profile/profileSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    counter: counterReducer,
    profile:profileReducer
  },
});

// Types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
