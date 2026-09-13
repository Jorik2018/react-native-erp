// src/auth/api/captchaApi.ts

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL ?? '/api';

export interface CaptchaResponse {
  captchaId: string;
  image: string;
  expiresIn: number;
}

export interface CaptchaValidationRequest {
  captchaId: string;
  captcha: string;
}

export interface CaptchaValidationResponse {
  valid: boolean;
}

export async function createCaptcha(previousCaptchaId?:string): Promise<CaptchaResponse> {
  const response = await axios.get<CaptchaResponse>(
    `${API_URL}/captcha/new?previousCaptchaId=${previousCaptchaId}`,
  );

  return response.data;
}