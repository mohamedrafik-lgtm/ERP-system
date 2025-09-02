import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TraineePaymentResponse } from '@/types/payment';

export const traineePaymentsApi = createApi({
  reducerPath: 'traineePaymentsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/finances',
    prepareHeaders: (headers) => {
      // Add any authentication headers here if needed
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['TraineePayment'],
  endpoints: (builder) => ({
    getTraineePayments: builder.query<TraineePaymentResponse[], void>({
      query: () => '/trainee-payments',
      providesTags: ['TraineePayment'],
    }),
    addTraineePayment: builder.mutation<TraineePaymentResponse, {
      traineeId: number;
      amount: number;
      safeId: string;
      notes?: string;
    }>({
      query: (paymentData) => ({
        url: '/trainee-payments',
        method: 'POST',
        body: paymentData,
      }),
      invalidatesTags: ['TraineePayment'],
    }),
    updateTraineePayment: builder.mutation<TraineePaymentResponse, {
      id: number;
      amount: number;
      safeId: string;
      notes?: string;
    }>({
      query: ({ id, ...paymentData }) => ({
        url: `/trainee-payments/${id}`,
        method: 'PUT',
        body: paymentData,
      }),
      invalidatesTags: ['TraineePayment'],
    }),
  }),
});

export const {
  useGetTraineePaymentsQuery,
  useAddTraineePaymentMutation,
  useUpdateTraineePaymentMutation,
} = traineePaymentsApi;
