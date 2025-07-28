import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import counterReducer from '../features/counter/counterSlice';
import menuReducer from '../features/menu/menuSlice';
import profileReducer from '../features/profile/profileSlice'
import authReducer from "../features/auth/authSlice"
import restaurantReducer from "../features/restaurant/restaurantSlice"
import categoriesReducer from "../features/categories/categoriesSlice"
import applyRestaurantReducer from '../features/applyRestaurant/applyRestaurantSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    counter: counterReducer,
    profile: profileReducer,
    auth: authReducer,
    menu: menuReducer,
    restaurant: restaurantReducer,
    categories: categoriesReducer,
    applyRestaurant: applyRestaurantReducer,
  },
});

// Types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
