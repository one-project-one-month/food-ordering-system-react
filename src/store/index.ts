import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import counterReducer from '../features/counter/counterSlice';
import profileReducer from '../features/profile/profileSlice';
import authReducer from '../features/auth/authSlice';
import menuReducer from '../features/menu/menuSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    counter: counterReducer,
    profile: profileReducer,
    auth: authReducer,
    menu: menuReducer,
  },
});

// Types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
