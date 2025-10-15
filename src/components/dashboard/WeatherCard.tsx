"use client";
import React from 'react';
import { 
  SunIcon, 
  CloudIcon, 
  BoltIcon,
  HeartIcon 
} from '@heroicons/react/24/outline';

interface WeatherCardProps {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: React.ComponentType<any>;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ 
  temperature, 
  condition, 
  humidity, 
  windSpeed,
  icon: Icon 
}) => {
  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg text-white p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">الطقس اليوم</h3>
          <p className="text-blue-100 text-sm">القاهرة، مصر</p>
        </div>
        <div className="p-3 bg-white/20 rounded-xl">
          <Icon className="w-8 h-8" />
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="text-4xl font-bold">{temperature}°</div>
        <div className="text-right">
          <p className="text-blue-100">{condition}</p>
          <p className="text-sm text-blue-200">رطوبة {humidity}%</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-2">
          <BoltIcon className="w-4 h-4" />
          <span>رياح {windSpeed} كم/س</span>
        </div>
        <div className="flex items-center space-x-2">
          <HeartIcon className="w-4 h-4" />
          <span>ممتاز للتدريب</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
