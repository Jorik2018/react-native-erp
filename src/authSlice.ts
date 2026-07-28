import { createSlice } from '@reduxjs/toolkit';
import Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'crypto-js';

const initialState:any = {
  isLoggedIn: false,
  token: null,
  tokenExpiration: null,
};

const encryptData = (data:any) => {
  return CryptoJS.AES.encrypt(data, 'secret-key').toString(); // Aquí puedes usar una clave secreta
};

const decryptData = (encryptedData:any) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, 'secret-key');
  return bytes.toString(CryptoJS.enc.Utf8);
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: async (state, action) => {
      state.isLoggedIn = true;
      const { token, expirationTime } = action.payload;
      state.token = token;
      state.tokenExpiration = expirationTime;
      state.isLoggedIn = true;
      await AsyncStorage.setItem('token', encryptData(token));
      await AsyncStorage.setItem('tokenExpiration', encryptData(expirationTime.toString()));
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export const loadTokenFromStorage = () => async (dispatch:any) => {
  try {
    // Retrieve the token and expiration time from secure storage
    const token:any = await Keychain.getGenericPassword('token');
    const expirationTime:any = await Keychain.getGenericPassword('tokenExpiration');

    if (token && expirationTime) {
      const currentTime = new Date().getTime();
      if (currentTime < expirationTime) {
        // If token is valid, set it in the Redux store
        dispatch(login({ token, expirationTime }));
      } else {
        dispatch(logout());
      }
    }
  } catch (error) {
    console.error('Error loading token from storage:', error);
  }
};

export default authSlice.reducer;
