"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileURL: string;
  bio: string;
  skills: string[];
  joinDate: string;
  subscription: "free" | "premium" | "pro";
}

const mockUser: User = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  phone: "+1 (555) 123-4567",
  profileURL: "https://example.com/johndoe",
  bio: "Full-stack developer with 5+ years of experience in React and Node.js. Passionate about building scalable web applications and mentoring junior developers.",
  skills: ["React", "TypeScript", "Node.js", "Python", "UI/UX Design"],
  joinDate: "2024-01-15",
  subscription: "premium",
};

const UserSettings: React.FC = () => {
  const [user, setUser] = useState<User>(mockUser);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    profileURL: user.profileURL,
    bio: user.bio,
    skills: user.skills.join(", "),
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openModal = () => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      profileURL: user.profileURL,
      bio: user.bio,
      skills: user.skills.join(", "),
    });
    setIsModalOpen(true);
  };

  const handleSaveChanges = async () => {
    setIsLoading(true);
    toast.success("Updated Successfully !")
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setUser({
      ...user,
      ...formData,
      skills: formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill !== ""),
    });
    setIsLoading(false);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getSubscriptionColor = (subscription: string) => {
    switch (subscription) {
      case "premium":
        return "bg-gradient-to-r from-yellow-400 to-orange-500";
      case "pro":
        return "bg-gradient-to-r from-purple-500 to-pink-500";
      default:
        return "bg-gradient-to-r from-gray-400 to-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 mt-[80px]">
      {/* Main Profile Card */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className={`${getSubscriptionColor(user.subscription)} p-8 text-white`}>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-6 mb-4 md:mb-0">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold backdrop-blur-sm border border-white/30">
                  {getInitials(user.name)}
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{user.name}</h1>
                  <p className="text-white/80 mt-1">{user.email}</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">
                    {user.subscription.charAt(0).toUpperCase() + user.subscription.slice(1)} Member
                  </span>
                </div>
              </div>
              <button
                onClick={openModal}
                className="px-6 py-3 bg-white text-gray-800 rounded-xl font-semibold hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Edit Profile
              </button>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Contact Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600">📱</span>
                      </div>
                      <span className="text-gray-700">{user.phone}</span>
                    </div>
                    
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Member Since
                  </h3>
                  <p className="text-gray-700 text-lg font-medium">
                    {new Date(user.joinDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                    Bio
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{user.bio}</p>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border border-orange-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                    Skills & Expertise
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 bg-white/80 backdrop-blur-sm rounded-lg text-gray-700 font-medium text-sm border border-orange-200 hover:scale-105 transform transition-all duration-200 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-blue-600/20 backdrop-blur-sm z-50 p-4">
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Edit Profile</h3>
                <button
                  onClick={handleCancel}
                  className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile URL
                  </label>
                  <input
                    type="url"
                    name="profileURL"
                    value={formData.profileURL}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="https://example.com/yourprofile"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-200"
                    placeholder="Tell us about yourself..."
                  />
                  <div className="text-right text-sm text-gray-500 mt-1">
                    {formData.bio.length}/500
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skills
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="React, TypeScript, Node.js, ..."
                  />
                  <div className="text-sm text-gray-500 mt-1">
                    Separate skills with commas
                  </div>
                  
                  {/* Skills Preview */}
                  {formData.skills && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {formData.skills.split(",").map((skill, index) => (
                        skill.trim() && (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-lg font-medium"
                          >
                            {skill.trim()}
                          </span>
                        )
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={handleCancel}
                disabled={isLoading}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                disabled={isLoading}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 flex items-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>Save Changes</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSettings;