import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import counterReducer from '../features/counter/counterSlice';
import menuReducer from '../features/menu/menuSlice';
import profileReducer from '../features/profile/profileSlice'
import authReducer from "../features/auth/authSlice"
import restaurantReducer from "../features/restaurant/restaurantSlice"
import categoriesReducer from "../features/categories/categoriesSlice"
import applyRestaurantReducer from '../features/applyRestaurant/applyRestaurantSlice';
import dashboardReducer from '../features/dashboard/dashboardSlice';
import userMenuReducer from '../features/userMenu/userMenuSlice'
import orderReducer from '../features/order/orderSlice'
import deliveryReducer from '../features/delivery/deliverySlice'
import addressReducer from '../features/address/addressSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    counter: counterReducer,
    profile: profileReducer,
    auth: authReducer,
    menu: menuReducer,
    address: addressReducer,
    restaurant: restaurantReducer,
    categories: categoriesReducer,
    applyRestaurant: applyRestaurantReducer,
    dashboard: dashboardReducer,
    userMenu: userMenuReducer,
    order: orderReducer,
    delivery: deliveryReducer,
  },
});

// Types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
