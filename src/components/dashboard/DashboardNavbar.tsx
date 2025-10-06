"use client";
import React from "react";
import { Menu, X } from "lucide-react";
import { User } from "../../types";

interface DashboardNavbarProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

const mockUser: User = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  avatar: "/avatar-placeholder.png",
  joinDate: "2024-01-15",
  subscription: "premium",
};

const DashboardNavbar: React.FC<DashboardNavbarProps> = ({
  isSidebarOpen,
  onToggleSidebar,
}) => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 fixed w-full z-50">
      <div className="px-4 sm:px-6 py-3 flex justify-between items-center">
        {/* Left section: Brand + Mobile Toggle */}
        <div className="flex items-center space-x-3">
          {/* Mobile Sidebar Toggle */}
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            {isSidebarOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>

          {/* Logo / Brand */}
          <h1 className="text-2xl font-bold text-gray-800">Vereda </h1>
        </div>

        {/* Right section: User profile + notifications */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-gray-900">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-5 5v-5zM10.5 3.75a6 6 0 0 0-6 6v2.25l-2 2V15h15v-.75l-2-2V9.75a6 6 0 0 0-6-6z"
              />
            </svg>
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile Dropdown */}
          <div className="relative group hidden sm:block">
            <button className="flex items-center space-x-3 text-gray-700 hover:text-gray-900">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                {mockUser.name.charAt(0)}
              </div>
              <span className="font-medium">{mockUser.name}</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="p-4 border-b border-gray-200">
                <p className="font-semibold text-gray-800">{mockUser.name}</p>
                <p className="text-sm text-gray-600">{mockUser.email}</p>
              </div>
              <div className="p-2">
                <a
                  href="/dashboard"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Dashboard
                </a>
                <a
                  href="/dashboard/settings"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Profile Settings
                </a>
                <a
                  href="/dashboard/courses"
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  My Courses
                </a>
                <a
                  href="/logout"
                  className="block px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                >
                  Sign Out
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Optional background dim effect when sidebar opens */}
      {isSidebarOpen && (
        <div className=" duration-300"></div>
      )}
    </nav>
  );
};

export default DashboardNavbar;
