import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { Program, ProgramData } from '@/interface';

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
    deleteProgram: build.mutation<void, number>({
      query: (id) => ({
        url: `/api/programs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Programs'],
    }),
  }),
});

export const { useGetProgramsQuery, useAddProgramMutation ,useDeleteProgramMutation} = programApi;
