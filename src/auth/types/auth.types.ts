// src/auth/types/auth.types.ts

export interface LoginRequest {
  username: string;
  password: string;
  destiny?: string;
}

export interface LoginResponse {
  user_nicename: string;
  user: string;
  perms: string[];
  token: string;
}

export interface RefreshResponse {
  token: string;
}