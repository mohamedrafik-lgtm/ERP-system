import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { 
  TraineeAccountResponse, 
  TraineeAccountFilters, 
  TraineeAccountUpdateRequest, 
  TraineeAccountCreateRequest 
} from '@/types/traineePlatform';

// RTK Query API slice for trainee accounts
export const traineeAccountsApi = createApi({
  reducerPath: 'traineeAccountsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      headers.set('Accept', 'application/json');
      
      // Get token from cookies (same as login API)
      const token = Cookies.get('access_token') || Cookies.get('auth_token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
        headers.set('access_token', token);
        headers.set('x-access-token', token);
      }
      
      return headers;
    },
  }),
  tagTypes: ['TraineeAccount'],
  endpoints: (builder) => ({
    // Get trainee accounts with filters and pagination
    getTraineeAccounts: builder.query<TraineeAccountResponse, TraineeAccountFilters>({
      query: (filters) => {
        const params = new URLSearchParams();
        
        if (filters.search) params.append('search', filters.search);
        if (filters.status && filters.status !== 'all') params.append('status', filters.status);
        if (filters.programId) params.append('programId', filters.programId.toString());
        if (filters.traineeStatus) params.append('traineeStatus', filters.traineeStatus);
        if (filters.page) params.append('page', filters.page.toString());
        if (filters.limit) params.append('limit', filters.limit.toString());

        return {
          url: `/api/trainee-platform/accounts`,
          params: Object.fromEntries(params),
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'TraineeAccount' as const, id })),
              { type: 'TraineeAccount', id: 'LIST' },
            ]
          : [{ type: 'TraineeAccount', id: 'LIST' }],
    }),

    // Get single trainee account by ID
    getTraineeAccountById: builder.query<TraineeAccountResponse, string>({
      query: (id) => `/api/trainee-platform/accounts/${id}`,
      providesTags: (result, error, id) => [{ type: 'TraineeAccount', id }],
    }),

    // Update trainee account
    updateTraineeAccount: builder.mutation<void, { id: string; data: TraineeAccountUpdateRequest }>({
      query: ({ id, data }) => ({
        url: `/api/trainee-platform/accounts/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'TraineeAccount', id },
        { type: 'TraineeAccount', id: 'LIST' },
      ],
    }),

    // Create new trainee account
    createTraineeAccount: builder.mutation<void, TraineeAccountCreateRequest>({
      query: (data) => ({
        url: `/api/trainee-platform/accounts`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'TraineeAccount', id: 'LIST' }],
    }),

    // Delete trainee account
    deleteTraineeAccount: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/trainee-platform/accounts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'TraineeAccount', id },
        { type: 'TraineeAccount', id: 'LIST' },
      ],
    }),

     // Bulk update accounts
     bulkUpdateAccounts: builder.mutation<void, { ids: string[]; data: TraineeAccountUpdateRequest }>({
       query: ({ ids, data }) => ({
         url: `/api/trainee-platform/accounts/bulk`,
         method: 'PUT',
         body: { ids, data },
       }),
       invalidatesTags: (result, error, { ids }) => [
         ...ids.map(id => ({ type: 'TraineeAccount' as const, id })),
         { type: 'TraineeAccount' as const, id: 'LIST' },
       ],
     }),

     // Bulk delete accounts
     bulkDeleteAccounts: builder.mutation<void, string[]>({
       query: (ids) => ({
         url: `/api/trainee-platform/accounts/bulk`,
         method: 'DELETE',
         body: { ids },
       }),
       invalidatesTags: (result, error, ids) => [
         ...ids.map(id => ({ type: 'TraineeAccount' as const, id })),
         { type: 'TraineeAccount' as const, id: 'LIST' },
       ],
     }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetTraineeAccountsQuery,
  useGetTraineeAccountByIdQuery,
  useUpdateTraineeAccountMutation,
  useCreateTraineeAccountMutation,
  useDeleteTraineeAccountMutation,
  useBulkUpdateAccountsMutation,
  useBulkDeleteAccountsMutation,
} = traineeAccountsApi;
