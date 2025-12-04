import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import {
  DeferralRequestsResponse,
  DeferralRequestsQueryParams,
  UpdateDeferralRequestPayload,
  DeferralRequest,
} from '@/types/deferralRequests';

export const deferralRequestsApi = createApi({
  reducerPath: 'deferralRequestsApi',
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
  tagTypes: ['DeferralRequests'],
  endpoints: (builder) => ({
    // Get all deferral requests
    getDeferralRequests: builder.query<DeferralRequestsResponse, void>({
      query: () => '/api/deferral-requests',
      providesTags: ['DeferralRequests'],
    }),

    // Get single deferral request by ID
    getDeferralRequestById: builder.query<DeferralRequest, string>({
      query: (id) => `/api/deferral-requests/${id}`,
      providesTags: (result, error, id) => [{ type: 'DeferralRequests', id }],
    }),

    // Update deferral request (approve/reject)
    updateDeferralRequest: builder.mutation<DeferralRequest, UpdateDeferralRequestPayload>({
      query: ({ id, ...body }) => ({
        url: `/api/trainee-requests/${id}/review`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['DeferralRequests'],
    }),

    // Delete deferral request
    deleteDeferralRequest: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/deferral-requests/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['DeferralRequests'],
    }),
  }),
});

export const {
  useGetDeferralRequestsQuery,
  useGetDeferralRequestByIdQuery,
  useUpdateDeferralRequestMutation,
  useDeleteDeferralRequestMutation,
} = deferralRequestsApi;