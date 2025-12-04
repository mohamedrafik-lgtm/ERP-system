import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import {
  TraineeRequestsResponse,
  UpdateTraineeRequestPayload,
  TraineeRequest,
} from '@/types/traineeRequests';

export const traineeRequestsApi = createApi({
  reducerPath: 'traineeRequestsApi',
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
  tagTypes: ['TraineeRequests'],
  endpoints: (builder) => ({
    // Get all trainee requests
    getTraineeRequests: builder.query<TraineeRequestsResponse, void>({
      query: () => '/api/trainee-requests',
      providesTags: ['TraineeRequests'],
    }),

    // Get single trainee request by ID
    getTraineeRequestById: builder.query<TraineeRequest, string>({
      query: (id) => `/api/trainee-requests/${id}`,
      providesTags: (result, error, id) => [{ type: 'TraineeRequests', id }],
    }),

    // Update trainee request (approve/reject)
    updateTraineeRequest: builder.mutation<TraineeRequest, UpdateTraineeRequestPayload>({
      query: ({ id, ...body }) => ({
        url: `/api/trainee-requests/${id}/review`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['TraineeRequests'],
    }),

    // Delete trainee request
    deleteTraineeRequest: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/trainee-requests/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['TraineeRequests'],
    }),
  }),
});

export const {
  useGetTraineeRequestsQuery,
  useGetTraineeRequestByIdQuery,
  useUpdateTraineeRequestMutation,
  useDeleteTraineeRequestMutation,
} = traineeRequestsApi;