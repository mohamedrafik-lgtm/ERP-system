import { ITraineeFees, IResponseLecture } from '@/interface';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';




export const FeesAPI = createApi({
  reducerPath: 'feesApi',
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
  tagTypes: ['Fees'],
  endpoints: (build) => ({
    AddFees: build.mutation<void, ITraineeFees>({
  query: (body) => ({
    method: 'POST',
    url: `/api/finances/trainee-fees`,
    body,
  }),
  invalidatesTags: ['Fees'],
}),


    GetFees: build.query< IResponseLecture,{id:number}>({
        query: ({id}) =>  `/api/lectures/content/${id}`,
          providesTags: ['Fees'],
    }),
  }),
});

export const {useAddFeesMutation} = FeesAPI;
