'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Globe, Send } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useCreateContactMutation } from '@/Redux/api/contactApi'; // Update with correct path
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import toast from 'react-hot-toast';
// Dynamically import the map component with no SSR
const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => (
    <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
      <div className="text-center text-gray-600">
        <MapPin size={32} className="mx-auto mb-2" />
        <p>Loading map...</p>
      </div>
    </div>
  )
});

interface FormData {
  name: string;
  email: string;
  mobile: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    mobile: '',
    subject: '',
    message: ''
  });
const userId = useSelector((state: RootState) => state.auth.user?.id);
// console.log("user ID",userId)
  // Initialize the mutation hook
  const [createContact, { isLoading, isError, isSuccess, error }] = useCreateContactMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Prepare the data for the API call
      const contactData = {
        userId:userId!, // You'll need to get this from your auth context or props
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        subject: formData.subject,
        message: formData.message
      };

      // Call the mutation
      const result = await createContact(contactData).unwrap();
      toast.success("Your message has been sent successfully! We'll get back to you soon.")
      // console.log('Contact created successfully:', result);
      
      // Reset form on success
      if (result.success) {
        setFormData({
          name: '',
          email: '',
          mobile: '',
          subject: '',
          message: ''
        });
      }
    } catch (err) {
      toast.error("Failed to send message")
      console.error('Failed to create contact:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-3xl md:text-3xl font-bold text-gray-900 mb-4">
          GET IN TOUCH <span className='text-blue-600'>WITH US</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We're Always Eager To Hear From You!
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Success Message */}
        {isSuccess && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            Your message has been sent successfully! We'll get back to you soon.
          </div>
        )}

        {/* Error Message */}
        {isError && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            Failed to send your message. Please try again later.
            {error && 'data' in error && (
              <p className="text-sm mt-1">{(error.data as any)?.message}</p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Fill The Form Below So We Can Get To Know You And Your Needs Better.
              </h2>
              <p className="text-gray-600">
                Let us know how we can help you. We'll get back to you as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  required
                  value={formData.mobile}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Enter your mobile number"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="What is this regarding?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2 disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Your Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column - Company Info & Team */}
          <div className="space-y-8">
            {/* Company Information */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                    V
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">vereda digital technologies</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex text-yellow-400">
                      {'★'.repeat(5)}
                    </div>
                    <span className="text-sm text-gray-600">5.0 (9 reviews)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-700">
                  <MapPin size={20} className="text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Office Address</p>
                    <p className="text-sm">Sinha Library road, Venture park, Patna</p>
                    <p className="text-sm">Lodipur, Patna, Bihar 800001, India</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <Phone size={20} className="text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Phone number</p>
                    <p className="text-sm">+919570994444</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <Mail size={20} className="text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Send email</p>
                    <p className="text-sm">support@vereda.co.in</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <Globe size={20} className="text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Our website</p>
                    <p className="text-sm">www.vereda.co.in</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Location</h3>
              <Map />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}