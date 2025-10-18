import { useState, useEffect } from 'react';
import { useGetTraineeProfileQuery, useUpdateTraineeProfileMutation } from '@/lip/features/trainee-auth/traineeAuthApi';
import { TraineeProfileResponse } from '@/types/trainee';
import { mockTraineeProfile } from '@/data/mockTraineeProfile';

export const useTraineeProfile = () => {
  const [useMockData, setUseMockData] = useState(false);
  const [mockProfile, setMockProfile] = useState<TraineeProfileResponse | null>(null);

  const { 
    data: profile, 
    isLoading: loading, 
    error: queryError,
    refetch 
  } = useGetTraineeProfileQuery(undefined, {
    skip: useMockData, // Skip the query if using mock data
  });

  const [updateProfileMutation, { isLoading: isUpdating }] = useUpdateTraineeProfileMutation();

  // Check if API is available, if not use mock data
  useEffect(() => {
    if (queryError && (queryError as any)?.status === 404) {
      console.log('API not available, using mock data');
      setUseMockData(true);
      setMockProfile(mockTraineeProfile);
    }
  }, [queryError]);

  const updateProfile = async (data: any) => {
    try {
      if (useMockData) {
        // Simulate update with mock data
        const updatedProfile = { ...mockTraineeProfile, ...data };
        setMockProfile(updatedProfile);
        return updatedProfile;
      } else {
        const result = await updateProfileMutation(data).unwrap();
        return result;
      }
    } catch (error) {
      throw error;
    }
  };

  const refetchProfile = () => {
    if (useMockData) {
      setMockProfile(mockTraineeProfile);
    } else {
      refetch();
    }
  };

  return {
    profile: useMockData ? mockProfile : profile,
    loading: loading || isUpdating,
    error: useMockData ? null : (queryError ? (queryError as any)?.data?.message || 'حدث خطأ في تحميل البيانات' : null),
    refetch: refetchProfile,
    updateProfile,
    isUsingMockData: useMockData,
  };
};
