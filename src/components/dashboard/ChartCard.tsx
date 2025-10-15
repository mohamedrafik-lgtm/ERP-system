"use client";
import React from 'react';
import { ChartBarIcon } from '@heroicons/react/24/outline';

interface ChartCardProps {
  title: string;
  data: number[];
  labels: string[];
  color?: string;
  bgColor?: string;
  textColor?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({ 
  title, 
  data, 
  labels, 
  color = "text-blue-600",
  bgColor = "bg-blue-50",
  textColor = "text-blue-600"
}) => {
  const maxValue = Math.max(...data);
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <div className={`p-2 rounded-lg ${bgColor}`}>
          <ChartBarIcon className={`w-5 h-5 ${textColor}`} />
        </div>
      </div>
      
      <div className="space-y-3">
        {data.map((value, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-16 text-sm text-gray-600 text-left">
              {labels[index]}
            </div>
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${bgColor.replace('bg-', 'bg-').replace('-50', '-500')}`}
                style={{ width: `${(value / maxValue) * 100}%` }}
              />
            </div>
            <div className="w-12 text-sm font-medium text-gray-900 text-left">
              {value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartCard;
