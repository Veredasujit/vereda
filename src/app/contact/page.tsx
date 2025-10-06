'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Globe, Send } from 'lucide-react';
import dynamic from 'next/dynamic';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        
        
        <h1 className="text-3xl md:text-3xl font-bold text-gray-900 mb-4">
          GET IN TOUCH <span className='text-blue-600'>WITH US  </span>
        </h1>
        
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We're Always Eager To Hear From You!
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Send size={20} />
                Send Your Message
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