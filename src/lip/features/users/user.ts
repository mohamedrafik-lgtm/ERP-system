import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';


interface IProps{
    name:string;
    code:string;
    type:string;
    parentId:number;
    debitBalance:number;
    creditBalance:number;
    totalBalance:number;
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
    GetUserEmployee: build.query< IProps[],void>({
        query: () => ({
           url: `/api/users`,
           providesTags:['user']
      }),
    })
  }),
});

export const {useGetUserEmployeeQuery } = UserAPI;
