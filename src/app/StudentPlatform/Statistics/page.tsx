"use client";
import React, { useState } from 'react';
import { useGetTraineePlatformStatsQuery } from '@/lip/features/trainee-platform/traineeStatsApi';
import { TraineeStatsMapper } from '@/mappers/TraineeStatsMapper';
import { 
  StatsOverview, 
  ProgramsStats, 
  RecentActivity, 
  TopActivities, 
  DeviceStats 
} from '@/components/traineePlatform/stats';

// Main component for trainee platform statistics
export default function Statistics() {
  const [selectedPeriod, setSelectedPeriod] = useState('شهري');

  // RTK Query hook
  const {
    data: response,
    isLoading: loading,
    error: queryError,
    refetch
  } = useGetTraineePlatformStatsQuery();

  // Transform data using mapper
  const overview = response?.overview ? TraineeStatsMapper.toOverviewUI(response.overview) : null;
  const programs = response?.programsStats ? TraineeStatsMapper.toProgramStatsUI(response.programsStats) : [];
  const recentActivities = response?.recentActivity ? TraineeStatsMapper.toRecentActivityUI(response.recentActivity) : [];
  const topActivities = response?.topActivities ? TraineeStatsMapper.toTopActivityUI(response.topActivities) : [];
  const deviceStats = response?.deviceStats ? TraineeStatsMapper.toDeviceStatsUI(response.deviceStats) : [];

  const error = queryError ? 'حدث خطأ في تحميل الإحصائيات' : null;

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري تحميل الإحصائيات...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">⚠️</div>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => refetch()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">إحصائيات منصة المتدربين</h1>
              <p className="text-gray-600 mt-2">
                نظرة شاملة على أداء المنصة وإحصائيات المتدربين
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="يومي">يومي</option>
                <option value="أسبوعي">أسبوعي</option>
                <option value="شهري">شهري</option>
                <option value="سنوي">سنوي</option>
              </select>
            </div>
          </div>
        </div>

        {/* Statistics Overview */}
        {overview && <StatsOverview overview={overview} />}

        {/* Programs Statistics */}
        {programs.length > 0 && <ProgramsStats programs={programs} />}

        {/* Recent Activity */}
        {recentActivities.length > 0 && <RecentActivity activities={recentActivities} />}

        {/* Top Activities */}
        {topActivities.length > 0 && <TopActivities activities={topActivities} />}

        {/* Device Statistics */}
        {deviceStats.length > 0 && <DeviceStats devices={deviceStats} />}
      </div>
    </div>
  );
}