import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

// Types for the API response
export interface Trainee {
  id: string;
  nameAr: string;
  nameEn: string;
  nationalId: string;
  photoUrl: string | null;
}

export interface Assignment {
  id: string;
  roomId: string;
  traineeId: string;
  orderNumber: number;
  createdAt: string;
  updatedAt: string;
  trainee: Trainee;
}

export interface Room {
  id: string;
  distributionId: string;
  roomName: string;
  roomNumber: number;
  capacity: number | null;
  createdAt: string;
  updatedAt: string;
  assignments: Assignment[];
  _count: {
    assignments: number;
  };
}

export interface Program {
  id: number;
  nameAr: string;
  nameEn: string;
}

export interface Distribution {
  id: string;
  programId: number;
  type: "THEORY" | "PRACTICAL";
  numberOfRooms: number;
  academicYear: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  program: Program;
  rooms: Room[];
  _count: {
    rooms: number;
  };
}

export interface DistributionFilters {
  search?: string;
  type?: "THEORY" | "PRACTICAL";
  programId?: number;
  academicYear?: string;
  page?: number;
  limit?: number;
}

export interface DistributionStats {
  totalDistributions: number;
  theoreticalDistributions: number;
  practicalDistributions: number;
  totalRooms: number;
  totalTrainees: number;
  unassignedRooms: number;
}

export interface CreateDistributionRequest {
  programId: number;
  type: "THEORY" | "PRACTICAL";
  numberOfRooms: number;
  roomCapacities?: number[];
}

export interface UpdateDistributionRequest {
  id: string;
  data: {
    numberOfRooms?: number;
    academicYear?: string;
    rooms?: {
      id?: string;
      roomName?: string;
      roomNumber?: number;
      capacity?: number;
    }[];
  };
}

export interface AssignTraineeRequest {
  distributionId: string;
  roomId: string;
  traineeId: string;
  orderNumber?: number;
}

export interface UnassignTraineeRequest {
  assignmentId: string;
}

export const distributionApi = createApi({
  reducerPath: 'distributionApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api',
    prepareHeaders: (headers) => {
      const token = Cookies.get('auth_token') || Cookies.get('access_token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Distribution', 'Room', 'Assignment'],
  endpoints: (builder) => ({
    // Get all distributions
    getDistributions: builder.query<Distribution[], DistributionFilters | void>({
      query: (filters = {}) => {
        const params = new URLSearchParams();
        if (filters.search) params.append('search', filters.search);
        if (filters.type) params.append('type', filters.type);
        if (filters.programId) params.append('programId', filters.programId.toString());
        if (filters.academicYear) params.append('academicYear', filters.academicYear);
        if (filters.page) params.append('page', filters.page.toString());
        if (filters.limit) params.append('limit', filters.limit.toString());
        
        return {
          url: `/trainee-distribution${params.toString() ? `?${params.toString()}` : ''}`,
        };
      },
      providesTags: ['Distribution'],
    }),

    // Get distribution by ID
    getDistributionById: builder.query<Distribution, string>({
      query: (id) => `/trainee-distribution/${id}`,
      providesTags: (result, error, id) => [{ type: 'Distribution', id }],
    }),

    // Get distribution statistics
    getDistributionStats: builder.query<DistributionStats, void>({
      query: () => '/trainee-distribution/stats',
      providesTags: ['Distribution'],
    }),

    // Create new distribution
    createDistribution: builder.mutation<Distribution, CreateDistributionRequest>({
      query: (data) => ({
        url: '/trainee-distribution',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Distribution'],
    }),

    // Update distribution
    updateDistribution: builder.mutation<Distribution, UpdateDistributionRequest>({
      query: ({ id, data }) => ({
        url: `/trainee-distribution/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Distribution', id },
        'Distribution'
      ],
    }),

    // Delete distribution
    deleteDistribution: builder.mutation<void, string>({
      query: (id) => ({
        url: `/trainee-distribution/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Distribution'],
    }),

    // Assign trainee to room
    assignTrainee: builder.mutation<Assignment, AssignTraineeRequest>({
      query: (data) => ({
        url: '/trainee-distribution/assign',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Assignment', 'Distribution'],
    }),

    // Unassign trainee from room
    unassignTrainee: builder.mutation<void, UnassignTraineeRequest>({
      query: ({ assignmentId }) => ({
        url: `/trainee-distribution/unassign/${assignmentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Assignment', 'Distribution'],
    }),

    // Get unassigned trainees
    getUnassignedTrainees: builder.query<Trainee[], { programId?: number; academicYear?: string }>({
      query: (filters) => {
        const params = new URLSearchParams();
        if (filters.programId) params.append('programId', filters.programId.toString());
        if (filters.academicYear) params.append('academicYear', filters.academicYear);
        
        return {
          url: `/trainee-distribution/unassigned${params.toString() ? `?${params.toString()}` : ''}`,
        };
      },
      providesTags: ['Assignment'],
    }),

    // Bulk assign trainees
    bulkAssignTrainees: builder.mutation<Assignment[], {
      distributionId: string;
      assignments: {
        roomId: string;
        traineeId: string;
        orderNumber?: number;
      }[];
    }>({
      query: (data) => ({
        url: '/trainee-distribution/bulk-assign',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Assignment', 'Distribution'],
    }),

    // Export distribution to PDF
    exportDistribution: builder.mutation<Blob, string>({
      query: (id) => ({
        url: `/trainee-distribution/${id}/export`,
        method: 'GET',
        responseHandler: (response) => response.blob(),
      }),
    }),

    // Import distribution from Excel
    importDistribution: builder.mutation<Distribution[], FormData>({
      query: (formData) => ({
        url: '/trainee-distribution/import',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Distribution'],
    }),
  }),
});

export const {
  useGetDistributionsQuery,
  useGetDistributionByIdQuery,
  useGetDistributionStatsQuery,
  useCreateDistributionMutation,
  useUpdateDistributionMutation,
  useDeleteDistributionMutation,
  useAssignTraineeMutation,
  useUnassignTraineeMutation,
  useGetUnassignedTraineesQuery,
  useBulkAssignTraineesMutation,
  useExportDistributionMutation,
  useImportDistributionMutation,
} = distributionApi;
