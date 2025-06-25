import { FormValues } from '@/components/EmployeeManagement/EmployeeModalContent';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const EmployeeAPI = createApi({
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
  tagTypes: ['Employee'],
  endpoints: (build) => ({
    addEmployee: build.mutation< any,FormValues>({
        query: (body) => ({
           url: `/api/users`,
           method: 'POST',
           body,
           headers: {
             'Content-Type': 'application/json',
           },
      }),
    })
  }),
});

export const {useAddEmployeeMutation } = EmployeeAPI;
