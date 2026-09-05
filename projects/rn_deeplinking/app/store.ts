//src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import GrocerySlice from './services/GrocerySlice';
import AuthSlice from './services/AuthSlice';

export const store = configureStore({
  reducer: {
    grocery: GrocerySlice,
    auth: AuthSlice
    //user: userReducer,
    //product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
