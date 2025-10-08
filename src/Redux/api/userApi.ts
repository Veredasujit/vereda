
import { apiSlice } from "../apiSlice";


export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   

getAllProfiles: builder.query<{ success: boolean; users: any[] }, void>({
  query: () => ({
    url: "/auth/all-profile",
    method: "GET",
  }),
}),
  }),

  overrideExisting: false,
});

// Hooks
export const {
  useGetAllProfilesQuery,
} = userApi;
