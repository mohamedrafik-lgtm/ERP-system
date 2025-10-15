import React from 'react';
import { ProgramStatsUI } from '@/types/traineePlatformStats';

interface ProgramsStatsProps {
  programs: ProgramStatsUI[];
}

// مكون عرض إحصائيات البرامج
export const ProgramsStats: React.FC<ProgramsStatsProps> = ({ programs }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">إحصائيات البرامج</h3>
        <span className="text-sm text-gray-500">
          {programs.length} برنامج
        </span>
      </div>
      
      <div className="space-y-4">
        {programs.map((program) => (
          <div key={program.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{program.name}</h4>
              <p className="text-sm text-gray-500">{program.traineeCount} متدرب</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${program.percentage}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-900 w-12 text-left">
                {program.percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
