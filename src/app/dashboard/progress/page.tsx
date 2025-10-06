// components/dashboard/UserProgress.tsx
"use client";

import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface UserStats {
  totalCourses: number;
  completedCourses: number;
  totalSpent: number;
  learningHours: number;
}

interface UserProgressProps {
  stats: UserStats;
}

const mockStats: UserStats = {
  totalCourses: 12,
  completedCourses: 8,
  totalSpent: 456.75,
  learningHours: 45,
};

const COLORS = {
  completed: "#10B981",
  remaining: "#E5E7EB",
  accent: "#3B82F6",
  warning: "#F59E0B"
};

const UserProgress: React.FC<UserProgressProps> = () => {
  const completionRate = Math.round((mockStats.completedCourses / mockStats.totalCourses) * 100);
  const remainingCourses = mockStats.totalCourses - mockStats.completedCourses;
  
  const chartData = [
    { 
      name: "Completed", 
      value: mockStats.completedCourses,
      color: COLORS.completed
    },
    { 
      name: "Remaining", 
      value: remainingCourses,
      color: COLORS.remaining
    },
  ];

  const statsCards = [
    {
      label: "Completion Rate",
      value: `${completionRate}%`,
      description: "Course progress",
      color: COLORS.completed,
      icon: "📊"
    },
    {
      label: "Learning Hours",
      value: `${mockStats.learningHours}h`,
      description: "Time invested",
      color: COLORS.accent,
      icon: "⏱️"
    },
    {
      label: "Total Investment",
      value: `$${mockStats.totalSpent}`,
      description: "Amount spent",
      color: COLORS.warning,
      icon: "💳"
    }
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800">{payload[0].name}</p>
          <p className="text-sm text-gray-600">
            {payload[0].value} course{payload[0].value !== 1 ? 's' : ''}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8 mt-[80px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Learning Progress</h2>
          <p className="text-gray-500 mt-1">Track your course completion and statistics</p>
        </div>
        <div className="mt-3 sm:mt-0">
          <div className="bg-green-50 text-green-800 px-3 py-1 rounded-full text-sm font-medium inline-flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            {completionRate}% Complete
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Progress Visualization */}
        <div className="space-y-6">
          {/* Pie Chart */}
          <div className="relative">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    startAngle={90}
                    endAngle={450}
                    paddingAngle={2}
                  >
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={index} 
                        fill={entry.color}
                        stroke="#FFFFFF"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Center Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{completionRate}%</div>
                <div className="text-sm text-gray-500">Complete</div>
              </div>
            </div>
          </div>

          {/* Course Progress Bars */}
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-gray-700">Course Completion</span>
              <span className="text-gray-900 font-semibold">
                {mockStats.completedCourses}/{mockStats.totalCourses}
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-green-500 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between text-xs text-gray-500">
              <span>Started</span>
              <span>In Progress</span>
              <span>Completed</span>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {statsCards.map((card, index) => (
              <div 
                key={index}
                className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-gray-300 transition-colors duration-200"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{card.icon}</span>
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: card.color }}
                  ></div>
                </div>
                <div className="text-lg font-bold text-gray-900">{card.value}</div>
                <div className="text-sm font-medium text-gray-700">{card.label}</div>
                <div className="text-xs text-gray-500 mt-1">{card.description}</div>
              </div>
            ))}
          </div>

          {/* Detailed Progress */}
          <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
              <span className="text-lg mr-2">🎯</span>
              Progress Insights
            </h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                {remainingCourses} courses remaining to complete your learning path
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                Average {Math.round(mockStats.learningHours / mockStats.completedCourses)}h per course
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                ${(mockStats.totalSpent / mockStats.completedCourses).toFixed(2)} average per completed course
              </li>
            </ul>
          </div>

          {/* Action Button */}
          <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-sm">
            Continue Learning
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProgress;