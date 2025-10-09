import { apiSlice } from "../apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCourses: builder.query<{ success: boolean; courses: any[] }, void>({
      query: () => ({
        url: "/courses/getAll-courses", // match your backend route
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

// Hooks
export const {
  useGetAllCoursesQuery,
} = userApi;
