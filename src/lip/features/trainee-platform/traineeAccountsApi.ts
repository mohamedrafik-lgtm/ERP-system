import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

// Types for Trainee Accounts
export interface TraineeAccount {
  id: string;
  nationalId: string;
  birthDate: Date;
  password: string | null;
  isActive: boolean;
  lastLoginAt: Date | null;
  resetCode: string | null;
  resetCodeExpiresAt: Date | null;
  resetCodeGeneratedAt: Date | null;
  traineeId: number;
  createdAt: Date;
  updatedAt: Date;
  trainee: {
    id: number;
    nameAr: string;
    nameEn: string;
    nationalId: string;
    email: string | null;
    phone: string;
    photoUrl: string | null;
    traineeStatus: string;
    classLevel: string;
    academicYear: string;
    program: {
      id: number;
      nameAr: string;
      nameEn: string;
    };
  };
}

export interface TraineeAccountsResponse {
  data: TraineeAccount[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface TraineeAccountsQuery {
  search?: string;
  isActive?: boolean;
  programId?: number;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Platform Statistics Types
export interface PlatformOverview {
  totalAccounts: number;
  activeAccounts: number;
  inactiveAccounts: number;
  registeredTrainees: number;
  unregisteredTrainees: number;
  totalSessions: number;
  totalTimeSpent: number;
  averageSessionTime: number;
  activeToday: number;
  activeThisWeek: number;
  activeThisMonth: number;
}

export interface LoginActivity {
  date: string;
  count: number;
  uniqueUsers: number;
  totalTime: number;
  averageTime: number;
}

export interface ProgramStats {
  id: number;
  nameAr: string;
  traineeCount: number;
}

export interface RecentActivity {
  id: string;
  loginAt: Date;
  logoutAt: Date | null;
  duration: number | null;
  device: string | null;
  trainee: {
    nameAr: string;
    program: {
      nameAr: string;
    };
  };
}

export interface TopActivity {
  type: string;
  count: number;
}

export interface DeviceStats {
  device: string;
  count: number;
}

export interface PlatformStats {
  overview: PlatformOverview;
  loginActivity: LoginActivity[];
  programsStats: ProgramStats[];
  recentActivity: RecentActivity[];
  topActivities: TopActivity[];
  deviceStats: DeviceStats[];
}

export interface PlatformStatsFilters {
  startDate?: string;
  endDate?: string;
  programId?: number;
}

export const traineeAccountsApi = createApi({
  reducerPath: 'traineeAccountsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api',
    prepareHeaders: (headers) => {
      const token = Cookies.get('access_token') || Cookies.get('auth_token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['TraineeAccount'],
  endpoints: (builder) => ({
    // Get all trainee accounts with filters
    getTraineeAccounts: builder.query<TraineeAccountsResponse, TraineeAccountsQuery>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        
        if (params.search) searchParams.append('search', params.search);
        if (params.isActive !== undefined) searchParams.append('isActive', params.isActive.toString());
        if (params.programId) searchParams.append('programId', params.programId.toString());
        if (params.page) searchParams.append('page', params.page.toString());
        if (params.limit) searchParams.append('limit', params.limit.toString());
        if (params.sortBy) searchParams.append('sortBy', params.sortBy);
        if (params.sortOrder) searchParams.append('sortOrder', params.sortOrder);
        
        return {
          url: `/trainee-platform/accounts?${searchParams.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['TraineeAccount'],
    }),
    
    // Get single trainee account by ID
    getTraineeAccountById: builder.query<TraineeAccount, string>({
      query: (id) => `/trainee-platform/accounts/${id}`,
      providesTags: (result, error, id) => [{ type: 'TraineeAccount', id }],
    }),
    
    // Toggle trainee account status
    updateTraineeAccountStatus: builder.mutation<TraineeAccount, { id: string; isActive: boolean }>({
      query: ({ id, isActive }) => ({
        url: `/trainee-platform/accounts/${id}/toggle-status`,
        method: 'PATCH',
        body: {},
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'TraineeAccount', id }, 'TraineeAccount'],
    }),
    
    // Reset trainee account password
    resetTraineeAccountPassword: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/trainee-platform/accounts/${id}/reset-password`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'TraineeAccount', id }],
    }),
    
    // Delete trainee account
    deleteTraineeAccount: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/trainee-platform/accounts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['TraineeAccount'],
    }),
    
    // Get trainee account statistics
    getTraineeAccountStats: builder.query<{
      totalAccounts: number;
      activeAccounts: number;
      inactiveAccounts: number;
      averageAccountAgeInDays: number;
    }, void>({
      query: () => '/trainee-platform/accounts/stats',
      providesTags: ['TraineeAccount'],
    }),
    
    // Get platform statistics
    getPlatformStats: builder.query<PlatformStats, PlatformStatsFilters | void>({
      query: (filters) => {
        const searchParams = new URLSearchParams();
        
        if (filters) {
          if (filters.startDate) searchParams.append('startDate', filters.startDate);
          if (filters.endDate) searchParams.append('endDate', filters.endDate);
          if (filters.programId) searchParams.append('programId', filters.programId.toString());
        }
        
        const queryString = searchParams.toString();
        return queryString 
          ? `/trainee-platform/stats?${queryString}`
          : '/trainee-platform/stats';
      },
      providesTags: ['TraineeAccount'],
    }),
  }),
});

// Export hooks for use in components
export const {
  useGetTraineeAccountsQuery,
  useGetTraineeAccountByIdQuery,
  useUpdateTraineeAccountStatusMutation,
  useResetTraineeAccountPasswordMutation,
  useDeleteTraineeAccountMutation,
  useGetTraineeAccountStatsQuery,
  useGetPlatformStatsQuery,
} = traineeAccountsApi;