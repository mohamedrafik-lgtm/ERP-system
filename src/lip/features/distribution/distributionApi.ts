import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { DistributionsResponse, Distribution } from '@/types/distribution';

export const distributionApi = createApi({
  reducerPath: 'distributionApi',
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
  tagTypes: ['Distributions'],
  endpoints: (builder) => ({
    // Get all distributions
    getDistributions: builder.query<DistributionsResponse, void>({
      query: () => '/api/trainee-distribution',
      providesTags: ['Distributions'],
    }),

    // Get single distribution by ID
    getDistributionById: builder.query<Distribution, string>({
      query: (id) => `/api/trainee-distribution/${id}`,
      providesTags: (result, error, id) => [{ type: 'Distributions', id }],
    }),

    // Delete distribution
    deleteDistribution: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/trainee-distribution/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Distributions'],
    }),
  }),
});

export const {
  useGetDistributionsQuery,
  useGetDistributionByIdQuery,
  useDeleteDistributionMutation,
} = distributionApi;
