// src/app/services/authApi.ts
import { apiSlice } from "../apiSlice";

// Helper: persist/remove token
const setToken = (token: string) => localStorage.setItem("token", token);
const clearToken = () => localStorage.removeItem("token");

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Login
    login: builder.mutation<
      { message: string; token: string; admin: any }, // Response
      { phone: string; password: string }             // Request body
    >({
      query: (body) => ({
        url: "/admins/admins/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.token) {
            setToken(data.token);
          }
        } catch {
          // ignore errors
        }
      },
    }),

    // Logout
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/admins/admins/logout", // if you don’t have logout API, you can just clear token
        method: "POST",
      }),
      invalidatesTags: ["Auth", "Profile"],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          clearToken();
        }
      },
    }),
  }),

  overrideExisting: false,
});

// Hooks
export const { useLoginMutation, useLogoutMutation } = authApi;
