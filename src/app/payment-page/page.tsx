// pages/payment.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCreateOrderMutation, useVerifyPaymentMutation } from "@/Redux/api/paymentApi";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface CourseData {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  instructor: string;
  duration: string;
  image: string;
  category: string;
}

interface UserData {
  id: string;
  name: string;
  email: string;
}

interface EnrollmentData {
  course: CourseData;
  user: UserData;
}

const PaymentPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useSelector((state: RootState) => state.auth);
  
  const [enrollmentData, setEnrollmentData] = useState<EnrollmentData | null>(null);
  const [createOrder] = useCreateOrderMutation();
  const [verifyPayment] = useVerifyPaymentMutation();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

//   console.log("enroll data are  id",enrollmentData?.course.id);

  useEffect(() => {
    // Get enrollment data from URL parameters
    const dataParam = searchParams.get('data');
    if (dataParam) {
      try {
        const decodedData = JSON.parse(decodeURIComponent(dataParam));
        setEnrollmentData(decodedData);
      } catch (error) {
        setMessage("Invalid course data");
        console.error("Error parsing enrollment data:", error);
      }
    } else {
      setMessage("No course selected");
    }

    // Check if user is logged in
    if (!user) {
      router.push('/login?redirect=/payment');
      return;
    }

    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [searchParams, user, router]);

  const handlePayment = async () => {
    if (!enrollmentData) {
      setMessage("No course selected");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // Step 1: Create Razorpay order with course details
      const orderResponse = await createOrder({ 
        amount: enrollmentData.course.price * 100, // Convert to paise
        enrollmentId: enrollmentData.course.id,
        userId: enrollmentData.user.id
      }).unwrap();
      
      const { order,payment } = orderResponse;
      console.log()

      // Step 2: Open Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        name: "Vereda Education",
        description: `Enrollment for ${enrollmentData.course.title}`,
        order_id: order.id,
        handler: async (response: any) => {
          // Step 3: Verify payment
          try {
            const verifyResponse = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              enrollmentId: payment.enrollmentId,
              userId: enrollmentData.user.id,
              amount: enrollmentData.course.price
            }).unwrap();

            if (verifyResponse.success) {
              setMessage("Payment successful! Redirecting to course...");
              // Redirect to course page or success page
              setTimeout(() => {
                router.push(`/dashboard`);
              }, 2000);
            } else {
              setMessage("Payment verification failed.");
            }
          } catch (err) {
            setMessage("Error verifying payment.");
            console.error("Payment verification error:", err);
          }
        },
        prefill: {
          name: enrollmentData.user.name,
          email: enrollmentData.user.email,
          contact: user?.phone || "" // Add phone if available
        },
        theme: {
          color: "#2563EB",
        },
        modal: {
          ondismiss: function() {
            setMessage("Payment cancelled");
            setLoading(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err: any) {
      setMessage(err?.data?.message || "Error creating order.");
      console.error("Payment error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!enrollmentData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
          {message && <p className="text-red-500">{message}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Complete Your Enrollment</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Course Summary */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Course Details</h2>
              
              <div className="flex items-start gap-4 mb-4">
                <img 
                  src={enrollmentData.course.image} 
                  alt={enrollmentData.course.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-semibold text-lg">{enrollmentData.course.title}</h3>
                  <p className="text-gray-600">by {enrollmentData.course.instructor}</p>
                  <p className="text-sm text-gray-500">{enrollmentData.course.category}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span>{enrollmentData.course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span>Original Price:</span>
                  <span className="line-through text-gray-500">
                    ₹{enrollmentData.course.originalPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Discount:</span>
                  <span className="text-green-600">
                    {enrollmentData.course.discountPercentage}% OFF
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total Amount:</span>
                  <span className="text-blue-600">
                    ₹{enrollmentData.course.price.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
              
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span>Student Name:</span>
                  <span className="font-medium">{enrollmentData.user.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Email:</span>
                  <span className="font-medium">{enrollmentData.user.email}</span>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-yellow-800 mb-2">Secure Payment</h3>
                <p className="text-sm text-yellow-700">
                  Your payment is secured with Razorpay. We do not store your payment details.
                </p>
              </div>

              <button
                onClick={handlePayment}
                disabled={loading}
                className={`w-full py-3 rounded-lg text-white font-semibold transition-colors ${
                  loading 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? "Processing..." : `Pay ₹${enrollmentData.course.price.toLocaleString()}`}
              </button>

              {message && (
                <div className={`mt-4 p-3 rounded-lg text-center ${
                  message.includes("successful") 
                    ? "bg-green-100 text-green-700" 
                    : "bg-red-100 text-red-700"
                }`}>
                  {message}
                </div>
              )}

              <p className="text-xs text-gray-500 text-center mt-4">
                By completing this payment, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;