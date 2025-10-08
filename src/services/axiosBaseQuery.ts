import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosError, AxiosRequestConfig } from 'axios';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + '/api',
  withCredentials: true,
});

export type AxiosBaseQueryArgs = {
  url: string;
  method?: AxiosRequestConfig['method'];
  data?: AxiosRequestConfig['data'];
  body?: AxiosRequestConfig['data'];
  params?: AxiosRequestConfig['params'];
  headers?: AxiosRequestConfig['headers'];
};

export const axiosBaseQuery =
  (): BaseQueryFn<
    AxiosBaseQueryArgs,
    unknown,
    { status?: number | string; data?: unknown }
  > =>
  async ({ url, method = 'GET', data, body, params, headers }, { getState }) => {
    try {
      const token = (getState() as any).auth?.token;

      const result = await axiosInstance({
        url,
        method,
        data: data ?? body,
        params,
        headers: {
          ...(headers || {}),
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      return { data: result.data };
    } catch (e) {
      const err = e as AxiosError;
      return {
        error: {
          status: err.response?.status ?? 'FETCH_ERROR',
          data: err.response?.data ?? err.message,
        },
      };
    }
  };
