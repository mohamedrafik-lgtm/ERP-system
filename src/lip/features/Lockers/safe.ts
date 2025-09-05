import { FinancialAccount, ILocker, ITransactions, CreateTransaction, IUpdateLocker, Transaction } from '@/interface';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';




export const SafeAPI = createApi({
  reducerPath: 'safeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000',
    prepareHeaders: (headers) => {
      const token = Cookies.get('access_token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['safes'],
  endpoints: (build) => ({
    AddSafe: build.mutation<void, ILocker>({
      query: (body) => ({
        method: 'POST',
        url: `/api/finances/safes`,
        body,
      }),
      invalidatesTags: ['safes'],
    }),
    GetFinance: build.query<FinancialAccount[],void>({
      query: () => `/api/finances/safes`,
      providesTags: ['safes'],
    }),
    AddTransaction: build.mutation<void, CreateTransaction>({
      query: (body) => ({
        method: 'POST',
        url: `/api/finances/transactions`,
        body,
      }),
      invalidatesTags: ['safes'],
    }),
    GetTransactions: build.query<Transaction[], string>({
      query: (safeId) => `/api/finances/safes/${safeId}/transactions`,
      providesTags: ['safes'],
    }),
    UpdateSafe: build.mutation<void, { id: string; data: IUpdateLocker }>({
      query: ({ id, data }) => ({
        method: 'PATCH',
        url: `/api/finances/safes/${id}`,
        body: data,
      }),
      invalidatesTags: ['safes'],
    }),
  }),
});

export const {useAddSafeMutation,useGetFinanceQuery,useGetTransactionsQuery,useAddTransactionMutation,useUpdateSafeMutation} = SafeAPI;
