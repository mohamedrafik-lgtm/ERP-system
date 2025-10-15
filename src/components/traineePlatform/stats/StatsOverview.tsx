import React from 'react';
import { 
  UserGroupIcon, 
  UserIcon, 
  ClockIcon, 
  ChartBarIcon,
  CalendarDaysIcon,
  CalendarIcon,
  CalendarDaysIcon as CalendarMonthIcon
} from '@heroicons/react/24/outline';
import { StatsOverviewUI } from '@/types/traineePlatformStats';

interface StatsOverviewProps {
  overview: StatsOverviewUI;
}

// مكون عرض الإحصائيات العامة
export const StatsOverview: React.FC<StatsOverviewProps> = ({ overview }) => {
  const statsCards = [
    {
      title: 'إجمالي الحسابات',
      value: overview.totalAccounts,
      icon: UserGroupIcon,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'الحسابات النشطة',
      value: overview.activeAccounts,
      icon: UserIcon,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      title: 'المتدربين المسجلين',
      value: overview.registeredTrainees,
      icon: UserGroupIcon,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      title: 'إجمالي الجلسات',
      value: overview.totalSessions,
      icon: ChartBarIcon,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
    {
      title: 'إجمالي الوقت',
      value: overview.totalTimeSpent,
      icon: ClockIcon,
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600'
    },
    {
      title: 'متوسط وقت الجلسة',
      value: overview.averageSessionTime,
      icon: ClockIcon,
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-600'
    },
    {
      title: 'نشط اليوم',
      value: overview.activeToday,
      icon: CalendarDaysIcon,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600'
    },
    {
      title: 'نشط هذا الأسبوع',
      value: overview.activeThisWeek,
      icon: CalendarIcon,
      color: 'from-cyan-500 to-cyan-600',
      bgColor: 'bg-cyan-50',
      textColor: 'text-cyan-600'
    },
    {
      title: 'نشط هذا الشهر',
      value: overview.activeThisMonth,
      icon: CalendarMonthIcon,
      color: 'from-rose-500 to-rose-600',
      bgColor: 'bg-rose-50',
      textColor: 'text-rose-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {statsCards.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-2">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
              <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
