import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice'
import counterReducer from '../features/counter/counterSlice';
import profileReducer from '../features/profile/profileSlice'
import authReducer from "../features/auth/authSlice"

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    counter: counterReducer,
    profile:profileReducer,
    auth: authReducer,
  },
});

// Types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
