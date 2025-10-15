import React from 'react';
import { UserGroupIcon, ClockIcon, TrophyIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

interface AccountStatsProps {
  totalAccounts: number;
  activeAccounts: number;
  inactiveAccounts: number;
  averageProgress: number;
}

// Single Responsibility Principle - Component responsible only for displaying stats
export const AccountStats: React.FC<AccountStatsProps> = ({
  totalAccounts,
  activeAccounts,
  inactiveAccounts,
  averageProgress
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">إجمالي الحسابات</p>
            <p className="text-3xl font-bold text-gray-900">{totalAccounts}</p>
          </div>
          <UserGroupIcon className="w-8 h-8 text-blue-600" />
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">الحسابات النشطة</p>
            <p className="text-3xl font-bold text-green-600">{activeAccounts}</p>
          </div>
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-green-600 rounded-full"></div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">الحسابات المعطلة</p>
            <p className="text-3xl font-bold text-red-600">{inactiveAccounts}</p>
          </div>
          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">متوسط التقدم</p>
            <p className="text-3xl font-bold text-purple-600">{averageProgress}%</p>
          </div>
          <TrophyIcon className="w-8 h-8 text-purple-600" />
        </div>
      </div>
    </div>
  );
};
