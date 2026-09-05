// src/auth/session/authSession.ts

let accessToken: string | null = null;

export const authSession = {
  getAccessToken() {
    return accessToken;
  },

  setAccessToken(token: string) {
    accessToken = token;
  },

  clear() {
    accessToken = null;
  },

  isAuthenticated() {
    return accessToken !== null;
  },
};