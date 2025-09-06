import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TraineePaymentsResponse } from '@/types/traineePaymentDetails';
import Cookies from 'js-cookie';

// Interface for auto payment request
export interface AutoPaymentRequest {
  traineeId: number;
  amount: number;
  safeId: string;
  notes: string;
}

// Interface for auto payment response
export interface AutoPaymentResponse {
  success: boolean;
  message: string;
  data?: {
    paymentId: string;
    traineeId: number;
    amount: number;
    safeId: string;
    notes: string;
    timestamp: string;
    distributedPayments: Array<{
      feeId: number;
      amount: number;
      status: string;
    }>;
  };
}

export const traineePaymentDetailsApi = createApi({
  reducerPath: 'traineePaymentDetailsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api/finances',
    prepareHeaders: (headers) => {
      const token = Cookies.get('access_token') || Cookies.get('auth_token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['TraineePaymentDetails'],
  endpoints: (builder) => ({
    getTraineePayments: builder.query<TraineePaymentsResponse, string>({
      query: (traineeId) => ({
        url: `/trainees/${traineeId}/payments`,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }),
      keepUnusedDataFor: 0,
      providesTags: ['TraineePaymentDetails'],
    }),
    autoPayment: builder.mutation<AutoPaymentResponse, AutoPaymentRequest>({
      query: (body) => ({
        url: '/auto-payment',
        method: 'POST',
        body,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }),
      invalidatesTags: ['TraineePaymentDetails'],
    }),
  }),
});

export const {
  useGetTraineePaymentsQuery,
  useAutoPaymentMutation,
} = traineePaymentDetailsApi;
