import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import {
  StudyMaterial,
  StudyMaterialsResponse,
  StudyMaterialsFilters,
  CreateStudyMaterialRequest,
  UpdateStudyMaterialRequest,
  StudyMaterialStats,
  DeliveryTracking,
  DeliveryTrackingResponse,
  DeliveryTrackingFilters,
  CreateDeliveryRequest,
  UpdateDeliveryRequest,
  DeliveryStats,
  QueryDeliveriesDto,
  DeliveriesListResponse,
} from '@/types/studyTools';

export const studyToolsApi = createApi({
  reducerPath: 'studyToolsApi',
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
  tagTypes: ['StudyTool', 'Delivery'],
  endpoints: (builder) => ({
    // ==================== Study Materials Endpoints ====================
    
    // Get all study materials with filters
    getStudyMaterials: builder.query<StudyMaterialsResponse, StudyMaterialsFilters | void>({
      query: (filters) => {
        const params = new URLSearchParams();
        
        if (filters) {
          if (filters.search) params.append('search', filters.search);
          if (filters.programId) params.append('programId', filters.programId.toString());
          if (filters.isActive !== undefined) params.append('isActive', filters.isActive.toString());
          if (filters.page) params.append('page', filters.page.toString());
          if (filters.limit) params.append('limit', filters.limit.toString());
        }
        
        return `/study-materials?${params.toString()}`;
      },
      transformResponse: (response: any) => {
        console.log('Raw API Response:', response);
        
        // Handle if response has "materials" and "pagination" (actual API structure)
        if (response.materials && Array.isArray(response.materials)) {
          return {
            data: response.materials,
            meta: response.pagination || {
              page: 1,
              limit: 10,
              total: response.materials.length,
              totalPages: 1,
              hasNext: false,
              hasPrev: false,
            }
          };
        }
        
        // Handle if response has "data" and "meta"
        if (response.data && Array.isArray(response.data)) {
          return {
            data: response.data,
            meta: response.meta || response.pagination || {
              page: 1,
              limit: 10,
              total: response.data.length,
              totalPages: 1,
              hasNext: false,
              hasPrev: false,
            }
          };
        }
        
        // Handle if response is already in correct format
        return response;
      },
      providesTags: ['StudyTool'],
    }),
    
    // Get single study material by ID
    getStudyMaterialById: builder.query<StudyMaterial, string>({
      query: (id) => `/study-materials/${id}`,
      providesTags: (result, error, id) => [{ type: 'StudyTool', id }],
    }),
    
    // Create new study material
    createStudyMaterial: builder.mutation<StudyMaterial, CreateStudyMaterialRequest>({
      query: (data) => ({
        url: '/study-materials',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['StudyTool'],
    }),
    
    // Update study material
    updateStudyMaterial: builder.mutation<StudyMaterial, UpdateStudyMaterialRequest>({
      query: ({ id, ...data }) => ({
        url: `/study-materials/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'StudyTool', id }, 'StudyTool'],
    }),
    
    // Delete study material
    deleteStudyMaterial: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/study-materials/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['StudyTool'],
    }),
    
    // Get study materials statistics
    getStudyMaterialsStats: builder.query<StudyMaterialStats, void>({
      query: () => '/study-materials/stats',
      providesTags: ['StudyTool'],
    }),
    
    // Get all programs for dropdown
    getPrograms: builder.query<Array<{ id: number; nameAr: string; nameEn: string | null }>, void>({
      query: () => '/programs',
    }),
    
    // Get all fees for dropdown
    getFees: builder.query<Array<{ id: number; name: string; amount: number }>, void>({
      query: () => '/finances/trainee-fees',
    }),
    
    // Get all users/employees for dropdown
    getUsers: builder.query<Array<{ id: string; name: string; email: string }>, void>({
      query: () => '/users',
    }),
    
    // ==================== Delivery Tracking Endpoints ====================
    
    // Get all deliveries with filters
    getDeliveries: builder.query<DeliveryTrackingResponse, DeliveryTrackingFilters | void>({
      query: (filters) => {
        const params = new URLSearchParams();
        
        if (filters) {
          if (filters.search) params.append('search', filters.search);
          if (filters.traineeId) params.append('traineeId', filters.traineeId.toString());
          if (filters.studyToolId) params.append('studyToolId', filters.studyToolId.toString());
          if (filters.status) params.append('status', filters.status);
          if (filters.startDate) params.append('startDate', filters.startDate);
          if (filters.endDate) params.append('endDate', filters.endDate);
          if (filters.page) params.append('page', filters.page.toString());
          if (filters.limit) params.append('limit', filters.limit.toString());
          if (filters.sortBy) params.append('sortBy', filters.sortBy);
          if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);
        }
        
        return `/delivery-tracking?${params.toString()}`;
      },
      providesTags: ['Delivery'],
    }),
    
    // Get single delivery by ID
    getDeliveryById: builder.query<DeliveryTracking, number>({
      query: (id) => `/delivery-tracking/${id}`,
      providesTags: (result, error, id) => [{ type: 'Delivery', id }],
    }),
    
    // Create new delivery
    createDelivery: builder.mutation<DeliveryTracking, CreateDeliveryRequest>({
      query: (data) => ({
        url: '/delivery-tracking',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Delivery', 'StudyTool'],
    }),
    
    // Update delivery (mark as returned, etc.)
    updateDelivery: builder.mutation<DeliveryTracking, UpdateDeliveryRequest>({
      query: ({ id, ...data }) => ({
        url: `/delivery-tracking/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Delivery', id },
        'Delivery',
        'StudyTool',
      ],
    }),
    
    // Delete delivery
    deleteDelivery: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/delivery-tracking/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Delivery', 'StudyTool'],
    }),
    
    // Get delivery statistics
    getDeliveryStats: builder.query<DeliveryStats, void>({
      query: () => '/delivery-tracking/stats',
      providesTags: ['Delivery'],
    }),
    
    // ==================== New Deliveries List Endpoint ====================
    
    // Get deliveries list with filters
    getDeliveriesList: builder.query<DeliveriesListResponse, QueryDeliveriesDto | void>({
      query: (filters) => {
        const params = new URLSearchParams();
        
        if (filters) {
          if (filters.studyMaterialId) params.append('studyMaterialId', filters.studyMaterialId);
          if (filters.traineeId) params.append('traineeId', filters.traineeId.toString());
          if (filters.programId) params.append('programId', filters.programId.toString());
          if (filters.status) params.append('status', filters.status);
          if (filters.search) params.append('search', filters.search);
          if (filters.page) params.append('page', filters.page.toString());
          if (filters.limit) params.append('limit', filters.limit.toString());
        }
        
        return `/study-materials/deliveries/list?${params.toString()}`;
      },
      providesTags: ['Delivery'],
    }),
  }),
});

// Export hooks for use in components
export const {
  // Study Materials hooks
  useGetStudyMaterialsQuery,
  useGetStudyMaterialByIdQuery,
  useCreateStudyMaterialMutation,
  useUpdateStudyMaterialMutation,
  useDeleteStudyMaterialMutation,
  useGetStudyMaterialsStatsQuery,
  useGetProgramsQuery,
  useGetFeesQuery,
  useGetUsersQuery,
  
  // Delivery Tracking hooks
  useGetDeliveriesQuery,
  useGetDeliveryByIdQuery,
  useCreateDeliveryMutation,
  useUpdateDeliveryMutation,
  useDeleteDeliveryMutation,
  useGetDeliveryStatsQuery,
  
  // New Deliveries List hook
  useGetDeliveriesListQuery,
} = studyToolsApi;