import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  Marketer,
  MarketerResponse,
  MarketerFilters,
  MarketerStats,
  CreateMarketerRequest,
  UpdateMarketerRequest,
  MarketerPerformance,
  MarketerReport,
  MarketingEmployeeResponse,
  CreateMarketingTargetRequest,
  MarketingTargetResponse,
  MarketingTargetQueryParams,
  MarketingTargetEmployeeQueryParams,
  UpdateMarketingTargetRequest
} from '@/types/marketer.types';
import {
  MarketingTraineeResponse,
  MarketingTraineesQueryParams,
  MarketingTraineesResponse,
  UpdateTraineeContactRequest,
  AssignTraineeRequest,
  MarketingEmployeeForContact
} from '@/types/submissions.types';
import { MarketingEmployeeDetailResponse, UpdateMarketingEmployeeRequest } from '@/types/marketing-employee-detail.types';
import { MarketingEmployeeTraineesResponse, MarketingEmployeeTraineesFilters } from '@/types/marketing-employee-trainees.types';
import { MarketingStatsResponse, MarketingStatsFilters } from '@/types/marketing-stats.types';

// API Request Interface for creating marketing employee
export interface CreateMarketingEmployeeRequest {
  name: string;           // مطلوب - اسم موظف التسويق
  phone: string;          // مطلوب - رقم الهاتف
  email?: string;         // اختياري - البريد الإلكتروني
  isActive?: boolean;     // اختياري - حالة نشاط الموظف (افتراضي: true)
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
      console.log('Using token for RTK Query (Marketers):', token.substring(0, 20) + '...');
    } else {
      console.warn('No authentication token found for RTK Query (Marketers)!');
    }
    
    headers.set('content-type', 'application/json');
    return headers;
  },
});

// Retry logic for failed requests
const baseQueryWithRetry = async (args: any, api: any, extraOptions: any) => {
  console.log("🔄 Making API request (Marketers):", {
    url: args.url,
    method: args.method,
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
  });
  
  let result = await baseQuery(args, api, extraOptions);
  
  console.log("📊 API Request result (Marketers):", {
    data: result.data,
    error: result.error,
    meta: result.meta
  });
  
  // If 401, try to refresh token or redirect to login
  if (result.error && result.error.status === 401) {
    console.warn('❌ 401 error - token may be expired (Marketers)');
    console.log("Error details:", result.error);
  }
  
  return result;
};

export const marketersApi = createApi({
  reducerPath: 'marketersApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Marketer', 'MarketerStats', 'MarketerPerformance'],
  endpoints: (builder) => ({
    // Get all marketing employees - GET endpoint
    getMarketingEmployees: builder.query<MarketingEmployeeResponse[], void>({
      query: () => {
        console.log("🚀 Building query for marketing employees - NO PARAMETERS");
        
        const finalUrl = `/api/marketing/employees`;
        console.log("📡 Final API URL (Marketing Employees):", finalUrl);
        
        return {
          url: finalUrl,
          method: 'GET',
        };
      },
      providesTags: ['Marketer'],
      // Add transformResponse to log the response
      transformResponse: (response: MarketingEmployeeResponse[]) => {
        console.log("✅ API Response received (Marketing Employees):", response);
        return response;
      },
      // Add transformErrorResponse to log errors
      transformErrorResponse: (response) => {
        console.error("❌ API Error response (Marketing Employees):", {
          status: response.status,
          statusText: response.statusText,
          data: response.data,
          error: response.error
        });
        return response;
      },
    }),

    // Get all marketers - GET endpoint (Legacy)
    getMarketers: builder.query<MarketerResponse, MarketerFilters | void>({
      query: (filters) => {
        console.log("🚀 Building query for marketers with filters:", filters);
        
        const params = new URLSearchParams();
        
        if (filters?.status) params.append('status', filters.status);
        if (filters?.position) params.append('position', filters.position);
        if (filters?.city) params.append('city', filters.city);
        if (filters?.search) params.append('search', filters.search);
        if (filters?.dateFrom) params.append('dateFrom', filters.dateFrom);
        if (filters?.dateTo) params.append('dateTo', filters.dateTo);
        
        const finalUrl = `/api/marketers?${params.toString()}`;
        console.log("📡 Final API URL (Marketers):", finalUrl);
        
        return {
          url: finalUrl,
          method: 'GET',
        };
      },
      providesTags: ['Marketer'],
      // Add transformResponse to log the response
      transformResponse: (response: MarketerResponse) => {
        console.log("✅ API Response received (Marketers):", response);
        return response;
      },
      // Add transformErrorResponse to log errors
      transformErrorResponse: (response) => {
        console.error("❌ API Error response (Marketers):", {
          status: response.status,
          statusText: response.statusText,
          data: response.data,
          error: response.error
        });
        return response;
      },
    }),

    // Get marketing employee by ID - detailed view
    getMarketingEmployeeById: builder.query<MarketingEmployeeDetailResponse, number>({
      query: (id) => {
        console.log("🚀 Getting marketing employee by ID:", id);
        return `/api/marketing/employees/${id}`;
      },
      providesTags: (result, error, id) => [{ type: 'Marketer', id }],
      transformResponse: (response: MarketingEmployeeDetailResponse) => {
        console.log("✅ Marketing employee details received:", response);
        return response;
      },
      transformErrorResponse: (response) => {
        console.error("❌ Error getting marketing employee details:", {
          status: response.status,
          statusText: response.statusText,
          data: response.data,
          error: response.error
        });
        return response;
      },
    }),

    // Get marketer by ID (Legacy)
    getMarketerById: builder.query<Marketer, number>({
      query: (id) => {
        console.log("🚀 Getting marketer by ID:", id);
        return `/api/marketers/${id}`;
      },
      providesTags: (result, error, id) => [{ type: 'Marketer', id }],
      transformResponse: (response: Marketer) => {
        console.log("✅ Marketer details received:", response);
        return response;
      },
    }),

    // Create new marketing employee - POST endpoint
    createMarketingEmployee: builder.mutation<Marketer, CreateMarketingEmployeeRequest>({
      query: (newEmployee) => {
        console.log("🚀 Creating new marketing employee:", newEmployee);
        
        return {
          url: `/api/marketing/employees`,
          method: 'POST',
          body: newEmployee,
        };
      },
      invalidatesTags: ['Marketer', 'MarketerStats'],
      // Add transformResponse to log the response
      transformResponse: (response: Marketer) => {
        console.log("✅ Marketing employee created successfully:", response);
        return response;
      },
      // Add transformErrorResponse to log errors
      transformErrorResponse: (response) => {
        console.error("❌ Error creating marketing employee:", {
          status: response.status,
          statusText: response.statusText,
          data: response.data,
          error: response.error
        });
        return response;
      },
    }),

    // Update marketing employee - PUT endpoint
    updateMarketingEmployee: builder.mutation<MarketingEmployeeDetailResponse, { id: number; data: UpdateMarketingEmployeeRequest }>({
      query: ({ id, data }) => {
        console.log("🚀 Updating marketing employee:", { id, data });
        
        return {
          url: `/api/marketing/employees/${id}`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: 'Marketer', id },
        'Marketer',
        'MarketerStats'
      ],
      // Add transformResponse to log the response
      transformResponse: (response: MarketingEmployeeDetailResponse) => {
        console.log("✅ Marketing employee updated successfully:", response);
        return response;
      },
      // Add transformErrorResponse to log errors
      transformErrorResponse: (response) => {
        console.error("❌ Error updating marketing employee:", {
          status: response.status,
          statusText: response.statusText,
          data: response.data,
          error: response.error
        });
        return response;
      },
    }),

    // Delete marketing employee - DELETE endpoint
    deleteMarketingEmployee: builder.mutation<{ success: boolean; message: string }, number>({
      query: (id) => {
        console.log("🚀 Deleting marketing employee:", id);
        
        return {
          url: `/api/marketing/employees/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, id) => [
        { type: 'Marketer', id },
        'Marketer',
        'MarketerStats'
      ],
      // Add transformResponse to log the response
      transformResponse: (response: { success: boolean; message: string }) => {
        console.log("✅ Marketing employee deleted successfully:", response);
        return response;
      },
      // Add transformErrorResponse to log errors
      transformErrorResponse: (response) => {
        console.error("❌ Error deleting marketing employee:", {
          status: response.status,
          statusText: response.statusText,
          data: response.data,
          error: response.error
        });
        return response;
      },
    }),

    // Create marketing target - POST endpoint
    createMarketingTarget: builder.mutation<{ success: boolean; message: string; data: any }, CreateMarketingTargetRequest>({
      query: (targetData) => {
        console.log("🚀 Creating marketing target:", targetData);
        
        return {
          url: `/api/marketing/targets`,
          method: 'POST',
          body: targetData,
        };
      },
      invalidatesTags: ['Marketer', 'MarketerStats', 'MarketerPerformance'],
      // Add transformResponse to log the response
      transformResponse: (response: { success: boolean; message: string; data: any }) => {
        console.log("✅ Marketing target created successfully:", response);
        return response;
      },
      // Add transformErrorResponse to log errors
      transformErrorResponse: (response) => {
        console.error("❌ Error creating marketing target:", {
          status: response.status,
          statusText: response.statusText,
          data: response.data,
          error: response.error
        });
        return response;
      },
    }),

    // Get marketing targets - GET endpoint
    getMarketingTargets: builder.query<MarketingTargetResponse[], MarketingTargetQueryParams>({
      query: (params) => {
        console.log("🚀 Getting marketing targets with params:", params);
        
        const queryParams = new URLSearchParams({
          month: params.month.toString(),
          year: params.year.toString(),
        });
        
        const finalUrl = `/api/marketing/targets?${queryParams.toString()}`;
        console.log("📡 Final API URL (Marketing Targets):", finalUrl);
        
        return { url: finalUrl, method: 'GET' };
      },
      providesTags: ['Marketer', 'MarketerStats', 'MarketerPerformance'],
      transformResponse: (response: MarketingTargetResponse[]) => {
        console.log("✅ Marketing targets received:", response);
        return response;
      },
      transformErrorResponse: (response) => {
        console.error("❌ Error getting marketing targets:", {
          status: response.status,
          statusText: response.statusText,
          data: response.data,
          error: response.error
        });
        return response;
      },
    }),

    // Get marketing targets for specific employee - GET endpoint
    getMarketingTargetsByEmployee: builder.query<MarketingTargetResponse[], MarketingTargetEmployeeQueryParams>({
      query: (params) => {
        console.log("🚀 Getting marketing targets for employee:", params);
        
        const queryParams = new URLSearchParams();
        if (params.month) queryParams.append('month', params.month.toString());
        if (params.year) queryParams.append('year', params.year.toString());
        
        const queryString = queryParams.toString();
        const finalUrl = `/api/marketing/targets/employee/${params.employeeId}${queryString ? `?${queryString}` : ''}`;
        console.log("📡 Final API URL (Employee Targets):", finalUrl);
        
        return { url: finalUrl, method: 'GET' };
      },
      providesTags: (result, error, params) => [
        { type: 'Marketer', id: params.employeeId },
        'MarketerStats',
        'MarketerPerformance'
      ],
      transformResponse: (response: MarketingTargetResponse[]) => {
        console.log("✅ Employee marketing targets received:", response);
        return response;
      },
      transformErrorResponse: (response) => {
        console.error("❌ Error getting employee marketing targets:", {
          status: response.status,
          statusText: response.statusText,
          data: response.data,
          error: response.error
        });
        return response;
      },
    }),

    // Update marketing target - PUT endpoint
    updateMarketingTarget: builder.mutation<{ success: boolean; message: string; data: MarketingTargetResponse }, { id: number; data: UpdateMarketingTargetRequest }>({
      query: ({ id, data }) => {
        console.log("🚀 Updating marketing target:", { id, data });
        
        return {
          url: `/api/marketing/targets/${id}`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        'Marketer',
        'MarketerStats',
        'MarketerPerformance'
      ],
      transformResponse: (response: { success: boolean; message: string; data: MarketingTargetResponse }) => {
        console.log("✅ Marketing target updated successfully:", response);
        return response;
      },
      transformErrorResponse: (response) => {
        console.error("❌ Error updating marketing target:", {
          status: response.status,
          statusText: response.statusText,
          data: response.data,
          error: response.error
        });
        return response;
      },
    }),

    // Get marketing trainees - GET endpoint
    getMarketingTrainees: builder.query<MarketingTraineesResponse, MarketingTraineesQueryParams>({
      query: (params) => {
        console.log("🚀 Getting marketing trainees with params:", params);
        
        const queryParams = new URLSearchParams({
          page: params.page,
          limit: params.limit,
          search: params.search,
          status: params.status,
          employeeId: params.employeeId,
          unassigned: params.unassigned,
        });
        
        const finalUrl = `/api/marketing/trainees?${queryParams.toString()}`;
        console.log("📡 Final API URL (Marketing Trainees):", finalUrl);
        
        return { url: finalUrl, method: 'GET' };
      },
      providesTags: ['Marketer', 'MarketerStats', 'MarketerPerformance'],
      transformResponse: (response: MarketingTraineesResponse) => {
        console.log("✅ Marketing trainees received:", response);
        return response;
      },
      transformErrorResponse: (response) => {
        console.error("❌ Error getting marketing trainees:", {
          status: response.status,
          statusText: response.statusText,
          data: response.data,
          error: response.error
        });
        return response;
      },
    }),

    // Update trainee contact assignment - PUT endpoint
    updateTraineeContact: builder.mutation<{ success: boolean; message: string; data: MarketingTraineeResponse }, { id: number; data: UpdateTraineeContactRequest }>({
      query: ({ id, data }) => {
        console.log("🚀 Updating trainee contact assignment:", { id, data });
        
        return {
          url: `/api/marketing/trainees/${id}/contact`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: ['Marketer', 'MarketerStats', 'MarketerPerformance'],
      transformResponse: (response: { success: boolean; message: string; data: MarketingTraineeResponse }) => {
        console.log("✅ Trainee contact assignment updated successfully:", response);
        return response;
      },
      transformErrorResponse: (response) => {
        console.error("❌ Error updating trainee contact assignment:", {
          status: response.status,
          statusText: response.statusText,
          data: response.data,
          error: response.error
        });
        return response;
      },
    }),

    // Assign trainee to marketing employee - PUT endpoint
    assignTraineeToEmployee: builder.mutation<{ success: boolean; message: string; data: MarketingTraineeResponse }, { traineeId: number; data: AssignTraineeRequest }>({
      query: ({ traineeId, data }) => {
        console.log("🚀 Assigning trainee to marketing employee:", { traineeId, data });
        
        return {
          url: `/api/marketing/trainees/${traineeId}/assign`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: ['Marketer', 'MarketerStats', 'MarketerPerformance'],
      transformResponse: (response: { success: boolean; message: string; data: MarketingTraineeResponse }) => {
        console.log("✅ Trainee assigned to marketing employee successfully:", response);
        return response;
      },
      transformErrorResponse: (response) => {
        console.error("❌ Error assigning trainee to marketing employee:", {
          status: response.status,
          statusText: response.statusText,
          data: response.data,
          error: response.error
        });
        return response;
      },
    }),

    // Update marketer - PUT endpoint
    updateMarketer: builder.mutation<Marketer, { id: number; data: UpdateMarketerRequest }>({
      query: ({ id, data }) => {
        console.log("🚀 Updating marketer:", { id, data });
        
        return {
          url: `/api/marketers/${id}`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: 'Marketer', id },
        'Marketer',
        'MarketerStats'
      ],
      transformResponse: (response: Marketer) => {
        console.log("✅ Marketer updated successfully:", response);
        return response;
      },
      transformErrorResponse: (response) => {
        console.error("❌ Error updating marketer:", {
          status: response.status,
          statusText: response.statusText,
          data: response.data,
          error: response.error
        });
        return response;
      },
    }),

    // Delete marketer - DELETE endpoint
    deleteMarketer: builder.mutation<void, number>({
      query: (id) => {
        console.log("🚀 Deleting marketer:", id);
        
        return {
          url: `/api/marketers/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, id) => [
        { type: 'Marketer', id },
        'Marketer',
        'MarketerStats'
      ],
      transformResponse: (response) => {
        console.log("✅ Marketer deleted successfully");
        return response;
      },
      transformErrorResponse: (response) => {
        console.error("❌ Error deleting marketer:", {
          status: response.status,
          statusText: response.statusText,
          data: response.data,
          error: response.error
        });
        return response;
      },
    }),

    // Get marketer statistics
    getMarketerStats: builder.query<MarketerStats, MarketerFilters | void>({
      query: (filters) => {
        console.log("🚀 Getting marketer stats with filters:", filters);
        
        const params = new URLSearchParams();
        
        if (filters?.status) params.append('status', filters.status);
        if (filters?.position) params.append('position', filters.position);
        if (filters?.city) params.append('city', filters.city);
        if (filters?.dateFrom) params.append('dateFrom', filters.dateFrom);
        if (filters?.dateTo) params.append('dateTo', filters.dateTo);
        
        const finalUrl = `/api/marketers/stats?${params.toString()}`;
        console.log("📡 Final API URL (Marketer Stats):", finalUrl);
        
        return {
          url: finalUrl,
          method: 'GET',
        };
      },
      providesTags: ['MarketerStats'],
      transformResponse: (response: MarketerStats) => {
        console.log("✅ Marketer stats received:", response);
        return response;
      },
      transformErrorResponse: (response) => {
        console.error("❌ API Error response (Marketer Stats):", {
          status: response.status,
          statusText: response.statusText,
          data: response.data,
          error: response.error
        });
        return response;
      },
    }),

    // Get marketer performance
    getMarketerPerformance: builder.query<MarketerPerformance[], { period: string; limit?: number }>({
      query: ({ period, limit = 10 }) => {
        console.log("🚀 Getting marketer performance:", { period, limit });
        
        const params = new URLSearchParams();
        params.append('period', period);
        params.append('limit', limit.toString());
        
        return {
          url: `/api/marketers/performance?${params.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['MarketerPerformance'],
      transformResponse: (response: MarketerPerformance[]) => {
        console.log("✅ Marketer performance received:", response);
        return response;
      },
    }),

    // Get marketer report
    getMarketerReport: builder.query<MarketerReport, { marketerId: number; period: string }>({
      query: ({ marketerId, period }) => {
        console.log("🚀 Getting marketer report:", { marketerId, period });
        
        const params = new URLSearchParams();
        params.append('period', period);
        
        return {
          url: `/api/marketers/${marketerId}/report?${params.toString()}`,
          method: 'GET',
        };
      },
      providesTags: (result, error, { marketerId }) => [{ type: 'Marketer', id: marketerId }],
      transformResponse: (response: MarketerReport) => {
        console.log("✅ Marketer report received:", response);
        return response;
      },
    }),

    // Export marketers data
    exportMarketers: builder.mutation<Blob, MarketerFilters | void>({
      query: (filters) => {
        console.log("🚀 Exporting marketers data:", filters);
        
        const params = new URLSearchParams();
        
        if (filters?.status) params.append('status', filters.status);
        if (filters?.position) params.append('position', filters.position);
        if (filters?.city) params.append('city', filters.city);
        if (filters?.search) params.append('search', filters.search);
        if (filters?.dateFrom) params.append('dateFrom', filters.dateFrom);
        if (filters?.dateTo) params.append('dateTo', filters.dateTo);
        
        return {
          url: `/api/marketers/export?${params.toString()}`,
          method: 'GET',
          responseHandler: (response: Response) => response.blob(),
        };
      },
      transformResponse: (response: Blob) => {
        console.log("✅ Marketers data exported successfully");
        return response;
      },
      transformErrorResponse: (response) => {
        console.error("❌ Error exporting marketers data:", {
          status: response.status,
          statusText: response.statusText,
          data: response.data,
          error: response.error
        });
        return response;
      },
    }),

    // Get marketing statistics - GET endpoint
    getMarketingStats: builder.query<MarketingStatsResponse, MarketingStatsFilters>({
      query: (filters = {}) => {
        console.log("🚀 Getting marketing statistics:", filters);
        
        const queryParams = new URLSearchParams();
        if (filters.month) queryParams.append('month', filters.month.toString());
        if (filters.year) queryParams.append('year', filters.year.toString());
        
        const finalUrl = `/api/marketing/stats?${queryParams.toString()}`;
        console.log("📡 Final API URL (Marketing Stats):", finalUrl);
        
        return { url: finalUrl, method: 'GET' };
      },
      providesTags: ['Marketer', 'MarketerStats', 'MarketerPerformance'],
      transformResponse: (response: MarketingStatsResponse) => {
        console.log("✅ Marketing statistics received:", response);
        return response;
      },
      transformErrorResponse: (response) => {
        console.error("❌ Error getting marketing statistics:", {
          status: response.status,
          statusText: response.statusText,
          data: response.data,
          error: response.error
        });
        return response;
      },
    }),

    // Get marketing employee trainees - GET endpoint
    getMarketingEmployeeTrainees: builder.query<MarketingEmployeeTraineesResponse, { employeeId: number; filters?: MarketingEmployeeTraineesFilters }>({
      query: ({ employeeId, filters = {} }) => {
        console.log("🚀 Getting marketing employee trainees:", { employeeId, filters });
        
        const queryParams = new URLSearchParams();
        if (filters.page) queryParams.append('page', filters.page.toString());
        if (filters.limit) queryParams.append('limit', filters.limit.toString());
        if (filters.search) queryParams.append('search', filters.search);
        if (filters.status) queryParams.append('status', filters.status);
        if (filters.programId) queryParams.append('programId', filters.programId.toString());
        if (filters.startDate) queryParams.append('startDate', filters.startDate);
        if (filters.endDate) queryParams.append('endDate', filters.endDate);
        if (filters.gender) queryParams.append('gender', filters.gender);
        if (filters.enrollmentType) queryParams.append('enrollmentType', filters.enrollmentType);
        
        const finalUrl = `/api/marketing/employees/${employeeId}/trainees?${queryParams.toString()}`;
        console.log("📡 Final API URL (Marketing Employee Trainees):", finalUrl);
        
        return { url: finalUrl, method: 'GET' };
      },
      providesTags: (result, error, { employeeId }) => [
        { type: 'Marketer', id: employeeId },
        'Marketer',
        'MarketerStats',
        'MarketerPerformance'
      ],
      transformResponse: (response: MarketingEmployeeTraineesResponse) => {
        console.log("✅ Marketing employee trainees received:", response);
        return response;
      },
      transformErrorResponse: (response) => {
        console.error("❌ Error getting marketing employee trainees:", {
          status: response.status,
          statusText: response.statusText,
          data: response.data,
          error: response.error
        });
        return response;
      },
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetMarketingEmployeesQuery,
  useGetMarketingEmployeeByIdQuery,
  useCreateMarketingEmployeeMutation,
  useUpdateMarketingEmployeeMutation,
  useDeleteMarketingEmployeeMutation,
  useCreateMarketingTargetMutation,
  useGetMarketingTargetsQuery,
  useGetMarketingTargetsByEmployeeQuery,
  useUpdateMarketingTargetMutation,
  useGetMarketingTraineesQuery,
  useUpdateTraineeContactMutation,
  useAssignTraineeToEmployeeMutation,
  useGetMarketingEmployeeTraineesQuery, // New export
  useGetMarketingStatsQuery, // New export
  useGetMarketersQuery,
  useGetMarketerByIdQuery,
  useUpdateMarketerMutation,
  useDeleteMarketerMutation,
  useGetMarketerStatsQuery,
  useGetMarketerPerformanceQuery,
  useGetMarketerReportQuery,
  useExportMarketersMutation,
} = marketersApi;
