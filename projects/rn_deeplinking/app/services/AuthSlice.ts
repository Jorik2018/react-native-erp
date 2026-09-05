//src/app/services/AuthSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  isLoggedIn: boolean;
  user: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  loading: true
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logoutSuccess: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { loginSuccess, logoutSuccess, setLoading } = authSlice.actions;

export const login = (username: string) => async (dispatch: any) => {
  AsyncStorage.setItem('user', username).then(() => {
    dispatch(loginSuccess(username));
  });
};

export const logout = () => async (dispatch: any) => {
  await AsyncStorage.removeItem('user');
  dispatch(logoutSuccess());
};

export const checkLoginStatus = () => async (dispatch: any) => {
  dispatch(setLoading(true));
  try {
    const user = await AsyncStorage.getItem('user');
    if (user) {
      dispatch(loginSuccess(user));
    } else {
      dispatch(setLoading(false));
    }
  } catch (error) {
    dispatch(setLoading(false));
  }
};

export default authSlice.reducer;