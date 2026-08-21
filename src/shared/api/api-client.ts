import axios, { AxiosError } from "axios";

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

if (import.meta.env.DEV && !import.meta.env.VITE_API_BASE_URL) {
  console.warn("axiosClient VITE_API_BASE_URL is not set.");
}

export interface NormalizedApiError {
  message: string;
  status?: number;
  isNetworkError: boolean;
}

function normalizeApiError(error: AxiosError): NormalizedApiError {
  if (error.response) {
    return {
      message:
        (error.response.data as { message?: string })?.message ??
        "خطایی در سرور رخ داد. لطفاً دوباره تلاش کنید.",
      status: error.response.status,
      isNetworkError: false,
    };
  }

  if (error.request) {
    return {
      message: "ارتباط با سرور برقرار نشد. اتصال اینترنت خود را بررسی کنید.",
      isNetworkError: true,
    };
  }

  return {
    message: "خطای غیرمنتظره رخ داد.",
    isNetworkError: false,
  };
}

axiosClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => Promise.reject(normalizeApiError(error)),
);
