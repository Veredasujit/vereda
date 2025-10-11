// features/payment/paymentApi.ts
import { apiSlice } from "../apiSlice";

export const paymentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    // Get single payment by ID
    getPaymentById: builder.query<{ success: boolean; payment: any }, string>({
      query: (id) => ({
        url: `/payments/${id}`,
        method: "GET",
      }),
    }),
    // Create a new Razorpay order
    createOrder: builder.mutation<{ success: boolean; order: any; payment:any }, { amount: number; currency?: string; enrollmentId:string; userId:string }>({
      query: (body) => ({
        url: "/payments/create-order",
        method: "POST",
        body,
      }),
    }),
    // Verify payment
    verifyPayment: builder.mutation<{ success: boolean }, { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string; enrollmentId:string; userId:string;amount:number }>({
      query: (body) => ({
        url: "/payments/verify",
        method: "POST",
        body,
      }),
    }),
    // Delete payment
    deletePayment: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/payments/${id}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});

// Hooks generated automatically
export const {
  useGetPaymentByIdQuery,
  useCreateOrderMutation,
  useVerifyPaymentMutation,
  useDeletePaymentMutation,
} = paymentApi;
