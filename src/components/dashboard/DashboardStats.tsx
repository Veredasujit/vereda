import React from 'react';
import { UserStats } from '../../types/index';

interface DashboardStatsProps {
  stats: UserStats;
}

interface StatCard {
  title: string;
  value: string;
  subtitle?: string;
  icon: string;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats }) => {
  const statCards: StatCard[] = [
    {
      title: 'Total Courses',
      value: stats.totalCourses.toString(),
      subtitle: 'Enrolled',
      icon: '📚',
      color: 'blue',
      trend: { value: 2, isPositive: true }
    },
    {
      title: 'Completed',
      value: stats.completedCourses.toString(),
      subtitle: `${stats.completionRate}% completion rate`,
      icon: '✅',
      color: 'green',
      trend: { value: 1, isPositive: true }
    },
    {
      title: 'Total Spent',
      value: `₹${stats.totalSpent.toFixed(2)}`,
      subtitle: 'Lifetime investment',
      icon: '💳',
      color: 'purple'
    },
    
  ];

  const getColorClasses = (color: string, type: 'bg' | 'text' | 'border' = 'bg') => {
    const colors = {
      blue: {
        bg: 'bg-blue-50',
        text: 'text-blue-600',
        border: 'border-blue-200'
      },
      green: {
        bg: 'bg-green-50',
        text: 'text-green-600',
        border: 'border-green-200'
      },
      purple: {
        bg: 'bg-purple-50',
        text: 'text-purple-600',
        border: 'border-purple-200'
      },
      orange: {
        bg: 'bg-orange-50',
        text: 'text-orange-600',
        border: 'border-orange-200'
      },
      red: {
        bg: 'bg-red-50',
        text: 'text-red-600',
        border: 'border-red-200'
      }
    };
    
    return colors[color as keyof typeof colors]?.[type] || colors.blue[type];
  };

  const TrendIndicator: React.FC<{ trend: { value: number; isPositive: boolean } }> = ({ trend }) => (
    <div className={`flex items-center gap-1 text-xs ${
      trend.isPositive ? 'text-green-600' : 'text-red-600'
    }`}>
      <span>{trend.isPositive ? '↗' : '↘'}</span>
      <span>{trend.value}%</span>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => (
        <div 
          key={index} 
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                {stat.trend && <TrendIndicator trend={stat.trend} />}
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              {stat.subtitle && (
                <p className="text-xs text-gray-500">{stat.subtitle}</p>
              )}
            </div>
            <div 
              className={`w-12 h-12 rounded-xl ${getColorClasses(stat.color, 'bg')} ${getColorClasses(stat.color, 'border')} border flex items-center justify-center text-xl transition-transform duration-200 hover:scale-105`}
              aria-hidden="true"
            >
              {stat.icon}
            </div>
          </div>
          
          {/* Progress bar for completion rate */}
          {stat.title === 'Completed' && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${stats.completionRate}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;