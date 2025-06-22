import { IFormValues, IStudentResponce } from '@/interface';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

interface IUser {
  email: string;
  id: string;
  name: string;
  role: string;
}

interface ILoginResponse {
  access_token: string;
  user: IUser;
}

export const addStudentApi = createApi({
  reducerPath: 'addStudentApi',
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
  tagTypes: ['Students'],
  endpoints: (builder) => ({
    addStudent: builder.mutation<ILoginResponse, IFormValues>({
      query: (body) => ({
        url: '/api/trainees',
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['Students'],
    }),

    getStudents: builder.query<IStudentResponce[], void>({
      query: () => '/api/trainees',
      providesTags: ['Students'],
    }),
  }),
});

export const { useAddStudentMutation, useGetStudentsQuery } = addStudentApi;
export default addStudentApi;
