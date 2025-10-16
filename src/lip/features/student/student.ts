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
interface IUpdate{
  data:IFormValues,
  id:number
}
interface IGetStudent{
  id:number
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
      UpdateStudent: builder.mutation<ILoginResponse, IUpdate>({
      query: ({data,id}) => ({
        url: `/api/trainees/${id}`,
        method: 'PATCH',
        body:data,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['Students'],
    }),
    getStudents: builder.query<IStudentResponce[], void>({
      query: () => {
        console.log("🔍 Getting students from API endpoint: /api/trainees");
        return '/api/trainees';
      },
      providesTags: ['Students'],
      transformResponse: (response: IStudentResponce[]) => {
        console.log("🔍 Students API Response:", response);
        return response;
      },
      transformErrorResponse: (response) => {
        console.error("❌ Error getting students:", response);
        return response;
      },
    }),
    getStudent: builder.query<IStudentResponce,IGetStudent >({
      query: ({id}) => `/api/trainees/${id}`,
      providesTags: ['Students'],
    }),
  }),
});

export const { useAddStudentMutation, useGetStudentsQuery ,useUpdateStudentMutation,useGetStudentQuery} = addStudentApi;
export default addStudentApi;
