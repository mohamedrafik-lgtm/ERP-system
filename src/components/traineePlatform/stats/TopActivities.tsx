import React from 'react';
import { TopActivityUI } from '@/types/traineePlatformStats';

interface TopActivitiesProps {
  activities: TopActivityUI[];
}

// مكون عرض الأنشطة الأكثر شيوعاً
export const TopActivities: React.FC<TopActivitiesProps> = ({ activities }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">الأنشطة الأكثر شيوعاً</h3>
        <span className="text-sm text-gray-500">
          {activities.length} نوع نشاط
        </span>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="text-2xl">{activity.icon}</div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{activity.type}</h4>
                <p className="text-sm text-gray-500">{activity.count} مرة</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${activity.color}`}
                  style={{ width: `${activity.percentage}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-900 w-12 text-left">
                {activity.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
