import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Commission, CommissionsResponse, CommissionFilters, CommissionStats } from '@/types/commission.types';

// Interface for creating commission
export interface CreateCommissionRequest {
  marketingEmployeeId: number;    // معرف موظف التسويق (مطلوب)
  traineeId: number;             // معرف المتدرب (مطلوب)
  type: 'FIRST_CONTACT' | 'SECOND_CONTACT';  // نوع العمولة (مطلوب)
  amount: number;                // مبلغ العمولة (مطلوب)
  description?: string;          // وصف العمولة (اختياري)
}
// Payout payload
export interface CommissionPayoutPayload {
  amount: number;        // المبلغ المصروف (>= 0.01 ولا يتجاوز قيمة العمولة)
  fromSafeId: string;    // معرّف الخزينة المصدر
  toSafeId: string;      // معرّف الخزينة الهدف (مختلف عن المصدر)
  description: string;   // وصف عملية الصرف
}
import Cookies from 'js-cookie';

// Base query with authentication
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  prepareHeaders: (headers) => {
    // Get token from cookies
    const token = Cookies.get('access_token') || Cookies.get('auth_token');
    
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
      console.log('Using token for RTK Query:', token.substring(0, 20) + '...');
    } else {
      console.warn('No authentication token found for RTK Query!');
    }
    
    headers.set('content-type', 'application/json');
    return headers;
  },
});

// Retry logic for failed requests
const baseQueryWithRetry = async (args: any, api: any, extraOptions: any) => {
  console.log("🔄 Making API request:", {
    url: args.url,
    method: args.method,
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
  });
  
  let result = await baseQuery(args, api, extraOptions);
  
  console.log("📊 API Request result:", {
    data: result.data,
    error: result.error,
    meta: result.meta
  });
  
  // If 401, try to refresh token or redirect to login
  if (result.error && result.error.status === 401) {
    console.warn('❌ 401 error - token may be expired');
    console.log("Error details:", result.error);
  }
  
  return result;
};

export const commissionsApi = createApi({
  reducerPath: 'commissionsApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Commission'],
  endpoints: (builder) => ({
    // Get all commissions - GET endpoint بدون parameters
    getCommissions: builder.query<CommissionsResponse, void>({
      query: () => {
        console.log("🚀 Building query for commissions - NO PARAMETERS");
        
        const finalUrl = `/api/commissions`;
        console.log("📡 Final API URL:", finalUrl);
        
        return {
          url: finalUrl,
          method: 'GET',
        };
      },
      providesTags: ['Commission'],
      // Add transformResponse to log the response
      transformResponse: (response: CommissionsResponse) => {
        console.log("✅ API Response received:", response);
        return response;
      },
      // Add transformErrorResponse to log errors
      transformErrorResponse: (response) => {
        console.error("❌ API Error response:", response);
        return response;
      },
    }),

    // Create new commission - POST endpoint
    createCommission: builder.mutation<Commission, CreateCommissionRequest>({
      query: (newCommission) => {
        console.log("🚀 Creating new commission:", newCommission);
        
        return {
          url: `/api/commissions`,
          method: 'POST',
          body: newCommission,
        };
      },
      invalidatesTags: ['Commission'], // إعادة جلب البيانات بعد الإنشاء
      // Add transformResponse to log the response
      transformResponse: (response: Commission) => {
        console.log("✅ Commission created successfully:", response);
        return response;
      },
      // Add transformErrorResponse to log errors
      transformErrorResponse: (response) => {
        console.error("❌ Error creating commission:", response);
        return response;
      },
    }),

    // Payout a commission - POST /api/commissions/{id}/payout
    payoutCommission: builder.mutation<Commission, { id: number; payload: CommissionPayoutPayload }>({
      query: ({ id, payload }) => {
        return {
          url: `/api/commissions/${id}/payout`,
          method: 'POST',
          body: payload,
        };
      },
      invalidatesTags: ['Commission'],
      transformResponse: (response: Commission) => response,
      transformErrorResponse: (response) => response,
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetCommissionsQuery,
  useCreateCommissionMutation,
  usePayoutCommissionMutation,
} = commissionsApi;
