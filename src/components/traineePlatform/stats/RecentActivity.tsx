import React from 'react';
import { ClockIcon, DevicePhoneMobileIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';
import { RecentActivityUI } from '@/types/traineePlatformStats';

interface RecentActivityProps {
  activities: RecentActivityUI[];
}

// مكون عرض الأنشطة الحديثة
export const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  const getDeviceIcon = (device: string | null) => {
    if (!device) return <ClockIcon className="w-4 h-4 text-gray-400" />;
    
    const deviceLower = device.toLowerCase();
    if (deviceLower.includes('mobile') || deviceLower.includes('phone')) {
      return <DevicePhoneMobileIcon className="w-4 h-4 text-blue-500" />;
    } else if (deviceLower.includes('desktop') || deviceLower.includes('pc')) {
      return <ComputerDesktopIcon className="w-4 h-4 text-green-500" />;
    } else {
      return <ClockIcon className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (logoutAt: string | null) => {
    return logoutAt ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  };

  const getStatusText = (logoutAt: string | null) => {
    return logoutAt ? 'تم تسجيل الخروج' : 'نشط الآن';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">الأنشطة الحديثة</h3>
        <span className="text-sm text-gray-500">
          {activities.length} نشاط
        </span>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                {getDeviceIcon(activity.device)}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{activity.traineeName}</h4>
                <p className="text-sm text-gray-500">{activity.programName}</p>
                <p className="text-xs text-gray-400">
                  دخول: {activity.loginAt}
                  {activity.logoutAt && ` - خروج: ${activity.logoutAt}`}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {activity.duration && (
                <span className="text-sm text-gray-600">
                  {activity.duration}
                </span>
              )}
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(activity.logoutAt)}`}>
                {getStatusText(activity.logoutAt)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
