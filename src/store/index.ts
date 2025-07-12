import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import profileReducer from '../features/profile/profileSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    profile:profileReducer
  },
});

// Types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
