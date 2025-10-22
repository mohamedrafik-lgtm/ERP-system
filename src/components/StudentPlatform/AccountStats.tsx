'use client';
import React from 'react';
import {
  UserGroupIcon,
  CheckCircleIcon,
  XCircleIcon,
  AcademicCapIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

interface AccountStatsProps {
  stats: any;
  isLoading: boolean;
  error: any;
  onRefresh: () => void;
}

const AccountStats: React.FC<AccountStatsProps> = ({ stats, isLoading, error, onRefresh }) => {
  const StatCard = ({ title, value, icon: Icon, colorClass, bgColorClass }: {
    title: string;
    value: string | number;
    icon: React.ElementType;
    colorClass: string;
    bgColorClass: string;
  }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${bgColorClass}`}>
        <Icon className={`w-6 h-6 ${colorClass}`} />
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-3xl font-bold text-gray-900">إدارة حسابات المتدربين</h1>
        <button
          onClick={onRefresh}
          className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
          title="تحديث الإحصائيات"
        >
          <ArrowPathIcon className="w-6 h-6" />
        </button>
      </div>
      <p className="text-gray-600">
        عرض وإدارة جميع حسابات المتدربين في المنصة، مع إحصائيات مفصلة وخيارات بحث وتصفية.
      </p>

      {/* Stats Cards */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="إجمالي الحسابات"
          value={isLoading ? '...' : stats?.totalAccounts || 0}
          icon={UserGroupIcon}
          colorClass="text-blue-600"
          bgColorClass="bg-blue-100"
        />
        <StatCard
          title="حسابات نشطة"
          value={isLoading ? '...' : stats?.activeAccounts || 0}
          icon={CheckCircleIcon}
          colorClass="text-green-600"
          bgColorClass="bg-green-100"
        />
        <StatCard
          title="حسابات غير نشطة"
          value={isLoading ? '...' : stats?.inactiveAccounts || 0}
          icon={XCircleIcon}
          colorClass="text-red-600"
          bgColorClass="bg-red-100"
        />
        <StatCard
          title="متوسط عمر الحساب"
          value={isLoading ? '...' : `${stats?.averageAccountAgeInDays || 0} يوم`}
          icon={AcademicCapIcon}
          colorClass="text-purple-600"
          bgColorClass="bg-purple-100"
        />
      </div>
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm font-medium">
            ⚠️ لا يمكن تحميل الإحصائيات - تأكد من تشغيل الباك إند على http://localhost:4000
          </p>
        </div>
      )}
    </div>
  );
};

export default AccountStats;
