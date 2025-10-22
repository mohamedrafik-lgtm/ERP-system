import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { 
  UndistributedTraineesResponse, 
  UndistributedTraineesFilters 
} from '@/types/undistributed-trainees';

// Base URL for the API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api';

export const undistributedTraineesApi = createApi({
  reducerPath: 'undistributedTraineesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/trainee-distribution/undistributed/trainees`,
    prepareHeaders: (headers) => {
      const token = Cookies.get('auth_token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['UndistributedTrainees'],
  endpoints: (builder) => ({
    getUndistributedTrainees: builder.query<UndistributedTraineesResponse, UndistributedTraineesFilters>({
      query: (filters) => ({
        url: '/',
        params: filters,
      }),
      providesTags: ['UndistributedTrainees'],
    }),
  }),
});

export const {
  useGetUndistributedTraineesQuery,
} = undistributedTraineesApi;
