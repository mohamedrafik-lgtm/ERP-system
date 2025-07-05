import { CreateMarketerDto,Marketer } from '@/interface';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';




export const MarketerAPI = createApi({
  reducerPath: 'marketerApi',
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
  tagTypes: ['Marketer'],
  endpoints: (build) => ({
    AddMarketer: build.mutation<void, CreateMarketerDto>({
      query: (body) => ({
        method: 'POST',
        url: `/api/marketers`,
        body,
      }),
      invalidatesTags: ['Marketer'],
    }),
    GetMarketers: build.query<Marketer[], void>({
      query: () => `/api/marketers`,

      providesTags: ['Marketer'],
  }),
  }),
});

export const {useAddMarketerMutation,useGetMarketersQuery} = MarketerAPI;
