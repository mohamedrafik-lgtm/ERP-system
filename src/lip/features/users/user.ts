import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { FormValues } from '@/components/EmployeeManagement/EmployeeModalContent';


interface IUserOption {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt:string;
  updatedAt:string;
}
export const UserAPI = createApi({
  reducerPath: 'userApi',
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
  tagTypes: ['user'],
  endpoints: (build) => ({
    GetUserEmployee: build.query< IUserOption[],void>({
        query: () =>  `/api/users`,
        providesTags:['user']
    }),
    addEmployee: build.mutation< any,FormValues>({
        query: (body) => ({
           url: `/api/users`,
           method: 'POST',
           body,
           headers: {
             'Content-Type': 'application/json',
           },
          }),
          invalidatesTags:['user']
    }),
    DeleteEmployee: build.mutation< any,{id:string}>({
        query: ({id}) => ({
           url: `/api/users/${id}`,
           method: 'DELETE',
           headers: {
             'Content-Type': 'application/json',
           },
          }),
          invalidatesTags:['user']
      
    })
  }),
});

export const {useGetUserEmployeeQuery,useAddEmployeeMutation ,useDeleteEmployeeMutation } = UserAPI;
