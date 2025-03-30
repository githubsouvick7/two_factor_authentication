"use client";

import axios, { AxiosRequestConfig, Method, AxiosError } from "axios";

// const BASE_URL = "https://two-factor-authentication-ttk6.onrender.com";
const BASE_URL = "http://localhost:8000";

interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
}

type FetcherParams =
  | [
      endpoint: string,
      method?: Method,
      data?: unknown,
      headers?: Record<string, string>
    ]
  | [options: FetcherOptions];

interface FetcherOptions {
  endpoint: string;
  method?: Method;
  data?: unknown;
  headers?: Record<string, string>;
}

export const fetcher = async <T = unknown,>(
  ...args: FetcherParams
): Promise<T> => {
  let endpoint: string;
  let method: Method = "GET";
  let data: unknown = null;
  let headers: Record<string, string> = {};

  if (typeof args[0] === "string") {
    [endpoint, method = "GET", data = null, headers = {}] = args as [
      string,
      Method?,
      unknown?,
      Record<string, string>?
    ];
  } else {
    // Handle options object style: fetcher({ endpoint, method, data, headers })
    const options = args[0] as FetcherOptions;
    endpoint = options.endpoint;
    method = options.method || "GET";
    data = options.data || null;
    headers = options.headers || {};
  }

  try {
    const url = `${BASE_URL}${endpoint}`;
    const defaultHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`,
      ...headers,
    };

    const config: AxiosRequestConfig = {
      method,
      url,
      headers: defaultHeaders,
      ...(data !== null && { data }),
    };

    const response = await axios(config);
    return response.data;
  } catch (error: unknown) {
    console.log("API Call Error:", error);

    const axiosError = error as AxiosError<ApiResponse>;
    const errorMessage =
      axiosError.response?.data?.message ||
      axiosError.response?.data ||
      (error as Error).message ||
      "An unknown error occurred";

    throw new Error(
      typeof errorMessage === "string"
        ? errorMessage
        : JSON.stringify(errorMessage)
    );
  }
};
