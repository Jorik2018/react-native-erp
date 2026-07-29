import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'crypto-js';

interface AuthState {
  isLoggedIn: boolean;
  isAuthLoaded: boolean;
  token: string | null;
  tokenExpiration: number | null;
}

interface LoginPayload {
  token: string;
  expirationTime: number;
}

const initialState: AuthState = {
  isLoggedIn: false,
  isAuthLoaded: false,
  token: null,
  tokenExpiration: null,
};

const SECRET_KEY = 'secret-key';

const encryptData = (data: string): string => {
  return CryptoJS.AES.encrypt(
    data,
    SECRET_KEY,
  ).toString();
};

const decryptData = (
  encryptedData: string,
): string => {
  const bytes = CryptoJS.AES.decrypt(
    encryptedData,
    SECRET_KEY,
  );

  return bytes.toString(CryptoJS.enc.Utf8);
};

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    startAuthLoading: state => {
      state.isAuthLoaded = false;
    },

    login: (
      state,
      action: PayloadAction<LoginPayload>,
    ) => {
      state.isLoggedIn = true;
      state.isAuthLoaded = true;
      state.token = action.payload.token;
      state.tokenExpiration =
        action.payload.expirationTime;
    },

    logout: state => {
      state.isLoggedIn = false;
      state.isAuthLoaded = true;
      state.token = null;
      state.tokenExpiration = null;
    },
  },
});

export const {
  login,
  logout,
  startAuthLoading,
} = authSlice.actions;

export const loginAndSave =
  (payload: LoginPayload) =>
  async (dispatch: any) => {
    try {
      const { token, expirationTime } = payload;

      await AsyncStorage.multiSet([
        ['token', encryptData(token)],
        [
          'tokenExpiration',
          encryptData(
            expirationTime.toString(),
          ),
        ],
      ]);

      dispatch(login(payload));
    } catch (error) {
      console.error(
        'Error guardando el token:',
        error,
      );

      throw error;
    }
  };

export const logoutAndClear =
  () => async (dispatch: any) => {
    try {
      await AsyncStorage.multiRemove([
        'token',
        'tokenExpiration',
      ]);
    } finally {
      dispatch(logout());
    }
  };

export const loadTokenFromStorage =
  () => async (dispatch: any) => {
    dispatch(startAuthLoading());

    try {
      const values =
        await AsyncStorage.multiGet([
          'token',
          'tokenExpiration',
        ]);

      const encryptedToken =
        values[0]?.[1];

      const encryptedExpiration =
        values[1]?.[1];

      if (
        !encryptedToken ||
        !encryptedExpiration
      ) {
        dispatch(logout());
        return;
      }

      const token =
        decryptData(encryptedToken);

      const expirationText =
        decryptData(encryptedExpiration);

      const expirationTime =
        Number(expirationText);

      const isValid =
        token.length > 0 &&
        Number.isFinite(expirationTime) &&
        Date.now() < expirationTime;

      if (isValid) {
        dispatch(
          login({
            token,
            expirationTime,
          }),
        );

        return;
      }

      await AsyncStorage.multiRemove([
        'token',
        'tokenExpiration',
      ]);

      dispatch(logout());
    } catch (error) {
      console.error(
        'Error cargando el token:',
        error,
      );

      await AsyncStorage.multiRemove([
        'token',
        'tokenExpiration',
      ]);

      dispatch(logout());
    }
  };

export default authSlice.reducer;