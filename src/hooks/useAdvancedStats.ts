import { useState, useEffect } from 'react';
import { useGetAdvancedStatsQuery } from '@/lip/features/trainee-auth/traineeAuthApi';
import { AdvancedStatsResponse } from '@/types/advancedStats';
import { mockAdvancedStats } from '@/data/mockAdvancedStats';

export const useAdvancedStats = () => {
  const [useMockData, setUseMockData] = useState(false);
  const [mockData, setMockData] = useState<AdvancedStatsResponse | null>(null);

  const { 
    data: statsData, 
    isLoading: loading, 
    error: queryError,
    refetch 
  } = useGetAdvancedStatsQuery(undefined, {
    skip: useMockData, // Skip the query if using mock data
  });

  // Check if API is available, if not use mock data
  useEffect(() => {
    if (queryError && (queryError as any)?.status === 404) {
      console.log('API not available, using mock data for advanced stats');
      setUseMockData(true);
      setMockData(mockAdvancedStats);
    }
  }, [queryError]);

  const refetchStats = () => {
    if (useMockData) {
      setMockData(mockAdvancedStats);
    } else {
      refetch();
    }
  };

  return {
    statsData: useMockData ? mockData : statsData,
    loading,
    error: useMockData ? null : (queryError ? (queryError as any)?.data?.message || 'حدث خطأ في تحميل الإحصائيات' : null),
    refetch: refetchStats,
    isUsingMockData: useMockData,
  };
};
