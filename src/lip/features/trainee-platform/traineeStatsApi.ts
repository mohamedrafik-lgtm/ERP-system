import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { TraineePlatformStatsResponse } from '@/types/traineePlatformStats';

// RTK Query API slice for trainee platform statistics
export const traineeStatsApi = createApi({
  reducerPath: 'traineeStatsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      headers.set('Accept', 'application/json');
      
      // Get token from cookies (same as other APIs)
      const token = Cookies.get('access_token') || Cookies.get('auth_token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
        headers.set('access_token', token);
        headers.set('x-access-token', token);
      }
      
      return headers;
    },
  }),
  tagTypes: ['TraineeStats'],
  endpoints: (builder) => ({
    // Get trainee platform statistics
    getTraineePlatformStats: builder.query<TraineePlatformStatsResponse, void>({
      query: () => '/api/trainee-platform/stats',
      providesTags: [{ type: 'TraineeStats', id: 'LIST' }],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetTraineePlatformStatsQuery,
} = traineeStatsApi;
