// src/auth/api/captchaApi.ts

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL ?? '/api';

export interface CaptchaResponse {
  captchaId: string;
  image: string;
}

export interface CaptchaValidationRequest {
  captchaId: string;
  captcha: string;
}

export interface CaptchaValidationResponse {
  valid: boolean;
}

export async function createCaptcha(): Promise<CaptchaResponse> {
  const response = await axios.get<CaptchaResponse>(
    `${API_URL}/capcha/new`,
  );

  return response.data;
}

export async function validateCaptcha(
  request: CaptchaValidationRequest,
): Promise<CaptchaValidationResponse> {
  const response = await axios.post<CaptchaValidationResponse>(
    `${API_URL}/capcha/validate`,
    {
      captchaId: request.captchaId,
      captcha: request.captcha,
    },
  );

  return response.data;
}