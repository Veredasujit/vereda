"use client"
import React from 'react';
import { User, UserStats } from '../../types/index';
import DashboardStats from '@/components/dashboard/DashboardStats';
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import { useGetEnrollmentByIdQuery } from '@/Redux/api/enrollmentApi';

// Mock data
const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  joinDate: '2024-01-15',
  subscription: 'premium'
};



const DashboardPage: React.FC = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const userData = useSelector((state: RootState) => state.auth.user);
    const userId=userData?.id;
      
      const { data: enrollmentsData, error, isLoading } = useGetEnrollmentByIdQuery(userId);
      
      // console.log("enrollment data are ", enrollmentsData);
      const enrollmentCount = enrollmentsData?.enrollments?.length ?? 0;

// console.log("Total Enrollments:", enrollmentCount);
        const mockStats: UserStats = {
          totalCourses: enrollmentCount,
          completedCourses: 1,
          totalSpent: 456.75,
          learningHours: 45.5,
          completionRate: 67,
          
        };

  return (
    <div className="min-h-screen bg-gray-50 mt-[80px]">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <header className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back,<span className='text-blue-800'>{userData?.name || 'User'}!</span>  <span className="animate-wave">👋</span>
              </h1>
              <p className="text-gray-600 mt-2 flex items-center gap-2">
                <span>Here's your learning progress and account overview</span>
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {mockUser.subscription}
                </span>
              </p>
              <p className="text-gray-500 text-sm mt-1">{currentDate}</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <div className="text-right">
                <p className="text-sm text-gray-600">Member since</p>
                  <p className="text-gray-900 font-medium">
                    {userData?.createdAt
                      ? new Date(userData.createdAt).toLocaleDateString('en-US', {
                          month: 'long',
                          year: 'numeric',
                        })
                      : 'N/A'}
                  </p>

              </div>
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <DashboardStats stats={mockStats} />

        {/* Additional Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600">✅</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Completed Advanced React Course</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600">🎯</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Started TypeScript Mastery</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200">
                <span className="text-2xl mb-2 block">📚</span>
                <span className="text-sm font-medium text-gray-900">Browse Courses</span>
              </button>
              <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors duration-200">
                <span className="text-2xl mb-2 block">🎯</span>
                <span className="text-sm font-medium text-gray-900">Set Goals</span>
              </button>
              <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors duration-200">
                <span className="text-2xl mb-2 block">📊</span>
                <span className="text-sm font-medium text-gray-900">View Progress</span>
              </button>
              <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors duration-200">
                <span className="text-2xl mb-2 block">⚙️</span>
                <span className="text-sm font-medium text-gray-900">Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;