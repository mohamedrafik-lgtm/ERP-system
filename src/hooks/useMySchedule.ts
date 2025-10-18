import { useState, useEffect } from 'react';
import { useGetMyScheduleQuery } from '@/lip/features/trainee-auth/traineeAuthApi';
import { MyScheduleResponse } from '@/types/schedule';
import { mockScheduleData } from '@/data/mockSchedule';

export const useMySchedule = () => {
  const [useMockData, setUseMockData] = useState(false);
  const [mockData, setMockData] = useState<MyScheduleResponse | null>(null);

  const { 
    data: scheduleData, 
    isLoading: loading, 
    error: queryError,
    refetch 
  } = useGetMyScheduleQuery(undefined, {
    skip: useMockData, // Skip the query if using mock data
  });

  // Check if API is available, if not use mock data
  useEffect(() => {
    if (queryError && (queryError as any)?.status === 404) {
      console.log('API not available, using mock data for schedule');
      setUseMockData(true);
      setMockData(mockScheduleData);
    }
  }, [queryError]);

  const refetchSchedule = () => {
    if (useMockData) {
      setMockData(mockScheduleData);
    } else {
      refetch();
    }
  };

  return {
    scheduleData: useMockData ? mockData : scheduleData,
    loading,
    error: useMockData ? null : (queryError ? (queryError as any)?.data?.message || 'حدث خطأ في تحميل الجدول' : null),
    refetch: refetchSchedule,
    isUsingMockData: useMockData,
  };
};
