import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TraineeFeesResponse, TraineeFee, FeeType } from '@/types/traineeFees';
import Cookies from 'js-cookie';

export const traineeFeesApi = createApi({
  reducerPath: 'traineeFeesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api/finances',
    prepareHeaders: (headers) => {
      // إضافة التوكن للمصادقة
      const token = Cookies.get('access_token') || Cookies.get('auth_token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['TraineeFees'],
  endpoints: (builder) => ({
    // جلب جميع رسوم المتدربين من الباك اند
    getTraineeFees: builder.query<TraineeFeesResponse, void>({
      query: () => ({
        url: '/trainee-fees',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }),
      // عدم استخدام الـ caching في RTK Query
      keepUnusedDataFor: 0,
      providesTags: ['TraineeFees'],
    }),
  }),
});

export const {
  useGetTraineeFeesQuery,
} = traineeFeesApi;
