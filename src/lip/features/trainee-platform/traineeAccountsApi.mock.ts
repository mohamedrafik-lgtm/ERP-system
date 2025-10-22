import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { mockTraineeAccounts, mockTraineeAccountStats } from '@/data/mockTraineeAccounts';

// Mock API for testing without backend
export const traineeAccountsApiMock = createApi({
  reducerPath: 'traineeAccountsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['TraineeAccount'],
  endpoints: (builder) => ({
    getTraineeAccounts: builder.query({
      queryFn: async () => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return { data: mockTraineeAccounts };
      },
      providesTags: ['TraineeAccount'],
    }),
    
    getTraineeAccountById: builder.query({
      queryFn: async (id: string) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        const account = mockTraineeAccounts.data.find(acc => acc.id === id);
        return account 
          ? { data: { data: account } } 
          : { error: { status: 404, data: 'Not found' } };
      },
      providesTags: (result, error, id) => [{ type: 'TraineeAccount', id }],
    }),
    
    updateTraineeAccountStatus: builder.mutation({
      queryFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        const account = mockTraineeAccounts.data.find(acc => acc.id === id);
        if (account) {
          account.isActive = isActive;
          return { data: account };
        }
        return { error: { status: 404, data: 'Not found' } };
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'TraineeAccount', id }],
    }),
    
    resetTraineeAccountPassword: builder.mutation({
      queryFn: async (id: string) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return { data: { message: 'Password reset successfully' } };
      },
      invalidatesTags: (result, error, id) => [{ type: 'TraineeAccount', id }],
    }),
    
    deleteTraineeAccount: builder.mutation({
      queryFn: async (id: string) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        const index = mockTraineeAccounts.data.findIndex(acc => acc.id === id);
        if (index !== -1) {
          mockTraineeAccounts.data.splice(index, 1);
          return { data: { message: 'Account deleted successfully' } };
        }
        return { error: { status: 404, data: 'Not found' } };
      },
      invalidatesTags: ['TraineeAccount'],
    }),
    
    getTraineeAccountStats: builder.query({
      queryFn: async () => {
        await new Promise(resolve => setTimeout(resolve, 300));
        return { data: mockTraineeAccountStats };
      },
      providesTags: ['TraineeAccount'],
    }),
  }),
});

export const {
  useGetTraineeAccountsQuery,
  useGetTraineeAccountByIdQuery,
  useUpdateTraineeAccountStatusMutation,
  useResetTraineeAccountPasswordMutation,
  useDeleteTraineeAccountMutation,
  useGetTraineeAccountStatsQuery,
} = traineeAccountsApiMock;
