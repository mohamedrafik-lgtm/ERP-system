import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { UndistributedTraineesResponse, UndistributedTraineesQueryParams } from '@/types/undistributed-trainees';

export const undistributedTraineesApi = createApi({
  reducerPath: 'undistributedTraineesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000',
    prepareHeaders: (headers) => {
      const token = Cookies.get('access_token') || Cookies.get('auth_token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['UndistributedTrainees'],
  endpoints: (builder) => ({
    // Get undistributed trainees with pagination
    getUndistributedTrainees: builder.query<UndistributedTraineesResponse, UndistributedTraineesQueryParams | void>({
      query: (params = {}) => {
        const queryString = params && Object.keys(params).length > 0
          ? '?' + Object.entries(params)
              .filter(([_, value]) => value !== undefined)
              .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
              .join('&')
          : '';
        
        return `/api/trainee-distribution/undistributed/trainees${queryString}`;
      },
      providesTags: ['UndistributedTrainees'],
    }),
  }),
});

export const {
  useGetUndistributedTraineesQuery,
} = undistributedTraineesApi;
