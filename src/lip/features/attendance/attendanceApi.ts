import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { TraineeAttendanceDetailsResponse } from '@/types/attendance';

export const attendanceApi = createApi({
  reducerPath: 'attendanceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api',
    prepareHeaders: (headers) => {
      const token = Cookies.get('access_token') || Cookies.get('auth_token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Attendance'],
  endpoints: (builder) => ({
    // Get trainee attendance details
    getTraineeAttendance: builder.query<TraineeAttendanceDetailsResponse, number>({
      query: (traineeId) => `/attendance/trainee/${traineeId}`,
      providesTags: (result, error, traineeId) => [{ type: 'Attendance', id: traineeId }],
    }),
  }),
});

// Export hooks
export const {
  useGetTraineeAttendanceQuery,
} = attendanceApi;