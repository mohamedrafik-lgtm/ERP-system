"use client";
import React from 'react';
import { 
  ArrowTrendingUpIcon, 
  ArrowTrendingDownIcon,
  ArrowUpIcon,
  ArrowDownIcon 
} from '@heroicons/react/24/outline';

interface AnalyticsData {
  label: string;
  value: number;
  change: number;
  changeType: 'positive' | 'negative';
  trend: 'up' | 'down';
}

interface AnalyticsCardProps {
  title: string;
  data: AnalyticsData[];
  color?: string;
  bgColor?: string;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ 
  title, 
  data, 
  color = "text-blue-600",
  bgColor = "bg-blue-50"
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${bgColor}`}>
                {item.trend === 'up' ? (
                  <ArrowTrendingUpIcon className={`w-4 h-4 ${color}`} />
                ) : (
                  <ArrowTrendingDownIcon className={`w-4 h-4 ${color}`} />
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{item.label}</p>
                <p className="text-2xl font-bold text-gray-900">{item.value.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className={`flex items-center space-x-1 ${
                item.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {item.changeType === 'positive' ? (
                  <ArrowUpIcon className="w-4 h-4" />
                ) : (
                  <ArrowDownIcon className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">
                  {item.change > 0 ? '+' : ''}{item.change}%
                </span>
              </div>
              <p className="text-xs text-gray-500">من الشهر الماضي</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsCard;
