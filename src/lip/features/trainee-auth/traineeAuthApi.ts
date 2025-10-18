import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import {
  VerifyTraineeRequest,
  VerifyTraineeResponse,
  VerifyPhoneRequest,
  VerifyPhoneResponse,
  CreatePasswordRequest,
  CreatePasswordResponse,
  TraineeLoginRequest,
  TraineeLoginResponse,
} from '@/types/traineeAuth';
import { TraineeProfileResponse } from '@/types/trainee';
import { MyScheduleResponse } from '@/types/schedule';
import { AdvancedStatsResponse } from '@/types/advancedStats';

export const traineeAuthApi = createApi({
  reducerPath: 'traineeAuthApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      headers.set('Accept', 'application/json');

      // استخدام js-cookie للتوافق مع المشروع
      const token = Cookies.get('access_token') || Cookies.get('auth_token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
        headers.set('access_token', token);
        headers.set('x-access-token', token);
      }

      return headers;
    },
  }),
  tagTypes: ['TraineeAuth'],
  endpoints: (builder) => ({
    // Step 1: Verify Trainee
    verifyTrainee: builder.mutation<VerifyTraineeResponse, VerifyTraineeRequest>({
      query: (data) => ({
        url: '/api/trainee-auth/verify-trainee',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'TraineeAuth' as const, id: 'VERIFY' }],
    }),
    
    // Step 2: Verify Phone
    verifyPhone: builder.mutation<VerifyPhoneResponse, VerifyPhoneRequest>({
      query: (data) => ({
        url: '/api/trainee-auth/verify-phone',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'TraineeAuth' as const, id: 'VERIFY_PHONE' }],
    }),
    
    // Step 3: Create Password
    createPassword: builder.mutation<CreatePasswordResponse, CreatePasswordRequest>({
      query: (data) => ({
        url: '/api/trainee-auth/create-password',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'TraineeAuth' as const, id: 'CREATE_PASSWORD' }],
    }),
    
    // Step 4: Trainee Login
    traineeLogin: builder.mutation<TraineeLoginResponse, TraineeLoginRequest>({
      query: (data) => ({
        url: '/api/trainee-auth/login',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: TraineeLoginResponse) => {
        console.log('Trainee login response:', response);
        return response;
      },
      transformErrorResponse: (response) => {
        console.error('Trainee login error:', response);
        return response;
      },
    }),

    // Get Trainee Profile
    getTraineeProfile: builder.query<TraineeProfileResponse, void>({
      query: () => '/api/trainee-auth/profile',
      providesTags: [{ type: 'TraineeAuth' as const, id: 'PROFILE' }],
    }),

    // Update Trainee Profile
    updateTraineeProfile: builder.mutation<TraineeProfileResponse, Partial<TraineeProfileResponse>>({
      query: (data) => ({
        url: '/api/trainee-auth/profile',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: [{ type: 'TraineeAuth' as const, id: 'PROFILE' }],
    }),

    // Get My Schedule
    getMySchedule: builder.query<MyScheduleResponse, void>({
      query: () => '/api/trainee-auth/my-schedule',
      providesTags: [{ type: 'TraineeAuth' as const, id: 'SCHEDULE' }],
    }),

    // Get Advanced Stats
    getAdvancedStats: builder.query<AdvancedStatsResponse, void>({
      query: () => '/api/trainee-auth/advanced-stats',
      providesTags: [{ type: 'TraineeAuth' as const, id: 'ADVANCED_STATS' }],
    }),
  }),
});

export const {
  useVerifyTraineeMutation,
  useVerifyPhoneMutation,
  useCreatePasswordMutation,
  useTraineeLoginMutation,
  useGetTraineeProfileQuery,
  useUpdateTraineeProfileMutation,
  useGetMyScheduleQuery,
  useGetAdvancedStatsQuery,
} = traineeAuthApi;

