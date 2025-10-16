import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import {
  QuizResponse,
  QuizListResponse,
  QuizQueryParams,
  QuizCreateRequest,
  QuizUpdateRequest,
  QuizStats
} from '@/types/quiz.types';

// Base query with authentication
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  prepareHeaders: (headers) => {
    const token = Cookies.get('access_token') || Cookies.get('auth_token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

// Retry logic for failed requests
const baseQueryWithRetry = async (args: any, api: any, extraOptions: any) => {
  console.log("🔄 Making API request (Quiz):", {
    url: args.url,
    method: args.method,
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
  });
  
  let result = await baseQuery(args, api, extraOptions);
  
  console.log("📊 API Request result (Quiz):", {
    data: result.data,
    error: result.error,
    meta: result.meta
  });
  
  if (result.error && result.error.status === 401) {
    // Handle unauthorized access
    console.log("🔐 Unauthorized access, redirecting to login");
  }
  
  return result;
};

export const quizApi = createApi({
  reducerPath: 'quizApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Quiz', 'QuizStats'],
  endpoints: (builder) => ({
    // Get all quizzes with filters
    getQuizzes: builder.query<QuizListResponse, QuizQueryParams>({
      query: (params) => {
        console.log("🚀 Getting quizzes with params:", params);
        
        const queryParams = new URLSearchParams();
        
        if (params.contentId) queryParams.append('contentId', params.contentId);
        if (params.page) queryParams.append('page', params.page.toString());
        if (params.limit) queryParams.append('limit', params.limit.toString());
        if (params.search) queryParams.append('search', params.search);
        if (params.status && params.status !== 'all') queryParams.append('status', params.status);
        if (params.isPublished !== undefined) queryParams.append('isPublished', params.isPublished.toString());
        
        const finalUrl = `/api/quizzes?${queryParams.toString()}`;
        console.log("📡 Final API URL (Quizzes):", finalUrl);
        
        return { url: finalUrl, method: 'GET' };
      },
      providesTags: (result) =>
        result && result.data
          ? [
              ...result.data.map(({ id }) => ({ type: 'Quiz' as const, id })),
              { type: 'Quiz', id: 'LIST' },
            ]
          : [{ type: 'Quiz', id: 'LIST' }],
      transformResponse: (response: QuizListResponse) => {
        console.log("✅ Quizzes received:", response);
        // Ensure data is always an array
        if (response && typeof response === 'object') {
          return {
            ...response,
            data: Array.isArray(response.data) ? response.data : []
          };
        }
        return {
          data: [],
          total: 0,
          page: 1,
          limit: 10,
          totalPages: 0
        };
      },
      transformErrorResponse: (response) => {
        console.error("❌ Error getting quizzes:", {
          status: response.status,
          statusText: response.statusText,
          data: response.data,
          error: response.error
        });
        return response;
      },
    }),

    // Get single quiz by ID
    getQuizById: builder.query<QuizResponse, number>({
      query: (id) => `/api/quizzes/${id}`,
      providesTags: (result, error, id) => [{ type: 'Quiz', id }],
    }),

    // Create new quiz
    createQuiz: builder.mutation<QuizResponse, QuizCreateRequest>({
      query: (data) => ({
        url: '/api/quizzes',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [
        { type: 'Quiz', id: 'LIST' },
        { type: 'QuizStats' }
      ],
    }),

    // Update quiz
    updateQuiz: builder.mutation<QuizResponse, QuizUpdateRequest>({
      query: ({ id, ...data }) => ({
        url: `/api/quizzes/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Quiz', id },
        { type: 'Quiz', id: 'LIST' },
        { type: 'QuizStats' }
      ],
    }),

    // Delete quiz
    deleteQuiz: builder.mutation<void, number>({
      query: (id) => ({
        url: `/api/quizzes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [
        { type: 'Quiz', id: 'LIST' },
        { type: 'QuizStats' }
      ],
    }),

    // Publish/Unpublish quiz
    toggleQuizPublish: builder.mutation<QuizResponse, { id: number; isPublished: boolean }>({
      query: ({ id, isPublished }) => ({
        url: `/api/quizzes/${id}/publish`,
        method: 'PATCH',
        body: { isPublished },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Quiz', id },
        { type: 'Quiz', id: 'LIST' },
        { type: 'QuizStats' }
      ],
    }),

    // Activate/Deactivate quiz
    toggleQuizActive: builder.mutation<QuizResponse, { id: number; isActive: boolean }>({
      query: ({ id, isActive }) => ({
        url: `/api/quizzes/${id}/activate`,
        method: 'PATCH',
        body: { isActive },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Quiz', id },
        { type: 'Quiz', id: 'LIST' },
        { type: 'QuizStats' }
      ],
    }),

    // Get quiz statistics
    getQuizStats: builder.query<QuizStats, void>({
      query: () => '/api/quizzes/stats',
      providesTags: ['QuizStats'],
    }),

    // Get quizzes by content ID
    getQuizzesByContent: builder.query<QuizListResponse, { contentId: string; params?: Partial<QuizQueryParams> }>({
      query: ({ contentId, params = {} }) => {
        console.log("🚀 Getting quizzes by content ID:", contentId, params);
        
        const queryParams = new URLSearchParams();
        queryParams.append('contentId', contentId);
        
        if (params.page) queryParams.append('page', params.page.toString());
        if (params.limit) queryParams.append('limit', params.limit.toString());
        if (params.search) queryParams.append('search', params.search);
        if (params.status && params.status !== 'all') queryParams.append('status', params.status);
        if (params.isPublished !== undefined) queryParams.append('isPublished', params.isPublished.toString());
        
        const finalUrl = `/api/quizzes?${queryParams.toString()}`;
        console.log("📡 Final API URL (Quizzes by Content):", finalUrl);
        
        return { url: finalUrl, method: 'GET' };
      },
      providesTags: (result, error, { contentId }) => {
        const tags = [
          { type: 'Quiz' as const, id: 'LIST' },
          { type: 'Quiz' as const, id: `CONTENT_${contentId}` }
        ];
        
        if (result && result.data) {
          tags.push(...result.data.map(({ id }) => ({ type: 'Quiz' as const, id })));
        }
        
        return tags;
      },
    }),
  }),
});

export const {
  useGetQuizzesQuery,
  useGetQuizByIdQuery,
  useCreateQuizMutation,
  useUpdateQuizMutation,
  useDeleteQuizMutation,
  useToggleQuizPublishMutation,
  useToggleQuizActiveMutation,
  useGetQuizStatsQuery,
  useGetQuizzesByContentQuery,
} = quizApi;

export default quizApi;
