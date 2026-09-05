import { configureStore } from '@reduxjs/toolkit';
import { AuthReducer } from './reducers/auth.store';

const store = configureStore({
  reducer: {
    authStore: AuthReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;