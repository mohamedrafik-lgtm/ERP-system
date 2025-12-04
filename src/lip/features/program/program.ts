import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { IProgram, UpdateProgramPayload, Program, ProgramData } from '@/interface';

export const programApi = createApi({
  reducerPath: 'programApi',
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
  tagTypes: ['Programs'],
  endpoints: (build) => ({
    getPrograms: build.query<Program[], void>({
      query: () => `/api/programs`,
      providesTags: ['Programs'],
    }),
    getProgramById: build.query<Program, number>({
      query: (id) => `/api/programs/${id}`,
      providesTags: (result, error, id) => [{ type: 'Programs', id }],
    }),
    addProgram: build.mutation<Program, ProgramData>({
      query: (body) => ({
        url: `/api/programs`,
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['Programs'],
    }),
    UpdateProgram: build.mutation<unknown, UpdateProgramPayload>({
      query: ({data,id}) => ({
        url: `/api/programs/${id}`,
        method: 'PATCH',
        body : data,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['Programs'],
    }),
    deleteProgram: build.mutation<void, number>({
      query: (id) => ({
        url: `/api/programs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Programs'],
    }),
  }),
});

export const {
  useGetProgramsQuery,
  useGetProgramByIdQuery,
  useAddProgramMutation,
  useDeleteProgramMutation,
  useUpdateProgramMutation
} = programApi;
