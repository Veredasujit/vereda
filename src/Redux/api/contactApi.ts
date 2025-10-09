import { apiSlice } from "../apiSlice";

// Define expected types (optional but recommended for TypeScript)
interface ContactFormData {
  userId: string;
  name: string;
  email: string;
  mobile: string;
  subject: string;
  message?: string;
}

interface ContactResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    

    // ✅ Create new contact
    createContact: builder.mutation<ContactResponse, ContactFormData>({
      query: (contactData) => ({
        url: "/contacts/create-contact", // matches your Express route (/api/contacts)
        method: "POST",
        body: contactData,
      }),
    }),

  }),
  overrideExisting: false,
});

// Hooks
export const {
  
  useCreateContactMutation,
  
} = userApi;
