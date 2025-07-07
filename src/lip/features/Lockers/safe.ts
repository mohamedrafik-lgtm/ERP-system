import { FinancialAccount, ILocker, ITransactions } from '@/interface';
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
    AddTransaction: build.mutation<void, ITransactions>({
      query: (body) => ({
        method: 'POST',
        url: `/api/finances/transactions`,
        body,
      }),
      invalidatesTags: ['safes'],
    }),
  }),
});

export const {useAddSafeMutation,useGetFinanceQuery} = SafeAPI;
