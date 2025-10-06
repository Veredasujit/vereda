export default function Footer() {
  return (
    <div className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Want Us To Email You About Special Offers And Updates?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Stay updated with our latest courses, special offers, and educational insights. 
              Subscribe to our newsletter and never miss an opportunity.
            </p>
            
            <div className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900">
                  Subscribe Now
                </button>
              </div>
              
              {/* Checkbox */}
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="newsletter-consent"
                  className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor="newsletter-consent" className="ml-2 text-sm text-gray-300">
                  I agree to receive educational updates and promotional emails
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Account Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Account</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="/dashboard" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a 
                  href="/login" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                >
                  Login
                </a>
              </li>
              <li>
                <a 
                  href="/register" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                >
                  Register
                </a>
              </li>
            </ul>
          </div>

          {/* About Us Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">About Us</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="/about-us" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                >
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href="/contact" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a 
                  href="/refund-policy" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                >
                  Refund Policy
                </a>
              </li>
              <li>
                <a 
                  href="/terms-and-conditions" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a 
                  href="/privacy" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Follow Us</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://www.facebook.com/veredaindia?mibextid=LQQJ4d" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform flex items-center gap-2"
                >
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  Facebook
                </a>
              </li>
              <li>
                <a 
                  href="https://www.instagram.com/veredaindia" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform flex items-center gap-2"
                >
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  Instagram
                </a>
              </li>
              <li>
                <a 
                  href="https://www.linkedin.com/company/vereda-management-india/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform flex items-center gap-2"
                >
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {/* Help Center Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-400">Support</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://api.whatsapp.com/send/?phone=%2B919570994444&text&type=phone_number&app_absent=0" 
                 target="_blank"
                  className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a 
                  href="tel:+919570994444" 
                  target="_blank"
                  className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                >
                  Contact Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-300 mb-4 md:mb-0">
              <p className="text-lg font-semibold">Vereda Digital Learning</p>
              <p className="text-sm">© 2025 All rights reserved</p>
            </div>
            
            
          </div>
        </div>
      </div>
    </div>
  );
}