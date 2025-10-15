import React from 'react';
import { DeviceStatsUI } from '@/types/traineePlatformStats';

interface DeviceStatsProps {
  devices: DeviceStatsUI[];
}

// مكون عرض إحصائيات الأجهزة
export const DeviceStats: React.FC<DeviceStatsProps> = ({ devices }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">إحصائيات الأجهزة</h3>
        <span className="text-sm text-gray-500">
          {devices.length} نوع جهاز
        </span>
      </div>
      
      <div className="space-y-4">
        {devices.map((device, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="text-2xl">{device.icon}</div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{device.device}</h4>
                <p className="text-sm text-gray-500">{device.count} مستخدم</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${device.color}`}
                  style={{ width: `${device.percentage}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-900 w-12 text-left">
                {device.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
