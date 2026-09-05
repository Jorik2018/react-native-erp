// src/auth/api/authApi.ts

import axios from 'axios';
import { authSession } from '../session/authSession';
import type {
  LoginRequest,
  LoginResponse,
  RefreshResponse,
} from '../types/auth.types';

const API_URL = import.meta.env.VITE_API_URL ?? '/api';

export async function login(
  request: LoginRequest,
): Promise<LoginResponse> {
  const response = await axios.post<LoginResponse>(
    `${API_URL}/auth`,
    {
      username: request.username,
      password: request.password,
    },
    {
      withCredentials: true,
    },
  );

  authSession.setAccessToken(response.data.token);

  return response.data;
}

export async function refreshSession(): Promise<string> {
  const response = await axios.post<RefreshResponse>(
    `${API_URL}/auth/refresh`,
    {},
    {
      withCredentials: true,
    },
  );

  authSession.setAccessToken(response.data.token);

  return response.data.token;
}