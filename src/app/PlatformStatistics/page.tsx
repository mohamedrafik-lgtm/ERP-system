'use client';

import React, { useState } from 'react';
import { useGetPlatformStatsQuery } from '@/lip/features/trainee-platform/traineeAccountsApi';
import {
  ChartBarIcon,
  UserGroupIcon,
  ClockIcon,
  DevicePhoneMobileIcon,
  ArrowPathIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline';
import { formatDateTime, formatDateOnly } from '@/utils/dateUtils';

const PlatformStatisticsPage = () => {
  const [filters, setFilters] = useState<{
    startDate?: string;
    endDate?: string;
    programId?: number;
  }>({});

  const { data: stats, isLoading, error, refetch } = useGetPlatformStatsQuery(filters);

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}س ${minutes}د`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل الإحصائيات...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
            <p className="text-red-600 mb-4">⚠️ فشل في تحميل إحصائيات المنصة</p>
            <p className="text-sm text-gray-500 mb-4">
              تأكد من تشغيل الباك إند على http://localhost:4000
            </p>
            <button
              onClick={() => refetch()}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              إعادة المحاولة
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                <ChartBarIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">إحصائيات المنصة</h1>
                <p className="text-gray-500 text-sm">نظرة شاملة على نشاط المنصة</p>
              </div>
            </div>
            <button
              onClick={() => refetch()}
              className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
            >
              <ArrowPathIcon className="w-5 h-5" />
              تحديث
            </button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="إجمالي الحسابات"
            value={stats.overview.totalAccounts}
            icon={UserGroupIcon}
            color="blue"
          />
          <StatCard
            title="الحسابات النشطة"
            value={stats.overview.activeAccounts}
            icon={UserGroupIcon}
            color="green"
          />
          <StatCard
            title="إجمالي الجلسات"
            value={stats.overview.totalSessions}
            icon={ClockIcon}
            color="purple"
          />
          <StatCard
            title="متوسط وقت الجلسة"
            value={formatDuration(stats.overview.averageSessionTime)}
            icon={ClockIcon}
            color="orange"
            isText
          />
        </div>

        {/* Activity Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ActivityCard
            title="النشط اليوم"
            value={stats.overview.activeToday}
            color="green"
          />
          <ActivityCard
            title="النشط هذا الأسبوع"
            value={stats.overview.activeThisWeek}
            color="blue"
          />
          <ActivityCard
            title="النشط هذا الشهر"
            value={stats.overview.activeThisMonth}
            color="purple"
          />
        </div>

        {/* Programs Stats */}
        {stats.programsStats && stats.programsStats.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">إحصائيات البرامج</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats.programsStats.map((program) => (
                <div
                  key={program.id}
                  className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100"
                >
                  <h3 className="font-semibold text-gray-900 mb-2">{program.nameAr}</h3>
                  <p className="text-3xl font-bold text-blue-600">{program.traineeCount}</p>
                  <p className="text-sm text-gray-500">متدرب</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Device Stats */}
        {stats.deviceStats && stats.deviceStats.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <DevicePhoneMobileIcon className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">إحصائيات الأجهزة</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.deviceStats.map((device, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200"
                >
                  <p className="text-sm text-gray-600 mb-2">{device.device || 'غير محدد'}</p>
                  <p className="text-2xl font-bold text-gray-900">{device.count}</p>
                  <p className="text-xs text-gray-500">جلسة</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Activity */}
        {stats.recentActivity && stats.recentActivity.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">النشاط الأخير</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">المتدرب</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">البرنامج</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">وقت الدخول</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">وقت الخروج</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">المدة</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">الجهاز</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentActivity.map((activity) => (
                    <tr key={activity.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                      <td className="py-3 px-4 text-sm text-gray-900">{activity.trainee.nameAr}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{activity.trainee.program.nameAr}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">{formatDateTime(activity.loginAt)}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {activity.logoutAt ? formatDateTime(activity.logoutAt) : 'نشط الآن'}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {activity.duration ? formatDuration(activity.duration) : '-'}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">{activity.device || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Top Activities */}
        {stats.topActivities && stats.topActivities.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">أكثر الأنشطة</h2>
            <div className="space-y-3">
              {stats.topActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
                >
                  <span className="text-gray-900 font-medium">{activity.type}</span>
                  <span className="text-2xl font-bold text-blue-600">{activity.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({
  title,
  value,
  icon: Icon,
  color,
  isText = false,
}: {
  title: string;
  value: number | string;
  icon: React.ComponentType<{ className?: string }>;
  color: 'blue' | 'green' | 'purple' | 'orange';
  isText?: boolean;
}) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 bg-gradient-to-br ${colorClasses[color]} rounded-xl`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <h3 className="text-sm text-gray-600 mb-2">{title}</h3>
      <p className={`${isText ? 'text-2xl' : 'text-3xl'} font-bold text-gray-900`}>
        {typeof value === 'number' ? value.toLocaleString('ar-EG') : value}
      </p>
    </div>
  );
};

// Activity Card Component
const ActivityCard = ({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: 'green' | 'blue' | 'purple';
}) => {
  const colorClasses = {
    green: 'from-green-500 to-green-600',
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} rounded-2xl shadow-lg p-6 text-white`}>
      <h3 className="text-sm opacity-90 mb-2">{title}</h3>
      <p className="text-4xl font-bold">{value.toLocaleString('ar-EG')}</p>
      <p className="text-sm opacity-75 mt-2">متدرب</p>
    </div>
  );
};

export default PlatformStatisticsPage;

