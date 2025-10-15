import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import {
  VerifyTraineeRequest,
  VerifyTraineeResponse,
  VerifyPhoneRequest,
  VerifyPhoneResponse,
  CreatePasswordRequest,
  CreatePasswordResponse,
} from '@/types/traineeAuth';

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
  }),
});

export const {
  useVerifyTraineeMutation,
  useVerifyPhoneMutation,
  useCreatePasswordMutation,
} = traineeAuthApi;

