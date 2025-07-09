import { ITraineeFees, IResponseLecture, ITraineeFeeWithRelations, IPayTrainerFee } from '@/interface';
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
      ActivateFee: build.mutation<void, {id:number}>({
        query: ({id}) => ({
          method: 'POST',
          url: `/api/finances/trainee-fees/${id}/apply`,
        }),
        invalidatesTags: ['Fees'],
      }),
      PayTraineeFee: build.mutation<void, IPayTrainerFee>({
        query: (body) => ({
          method: 'POST',
          url: `/api/finances/trainee-payments`,
          body,
        }),
        invalidatesTags: ['Fees'],
      }),

    //  /api/finances/trainee-payments
    GetFees: build.query< ITraineeFeeWithRelations[],void>({
        query: () =>  `/api/finances/trainee-fees`,
          providesTags: ['Fees'],
    }),
  }),
});

export const {useAddFeesMutation,useGetFeesQuery,useActivateFeeMutation} = FeesAPI;
