import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { IProgram, UpdateProgramPayload, Program, ProgramData, ITrainingContentRequest } from '@/interface';

interface ICode{
    code:string
}
export const TraningContetnApi = createApi({
  reducerPath: 'traningContetnApi',
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
  tagTypes: ['TraningContent'],
  endpoints: (build) => ({
    getCode: build.query<ICode, void>({
      query: () => `/api/training-contents/generate-code`,
      providesTags: ['TraningContent'],
    }),
    createTrainingContent: build.mutation<any, ITrainingContentRequest>({
      query: (data) => ({
        url: '/api/training-contents',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['TraningContent'],
    }),
  }),
});

export const {useGetCodeQuery, useCreateTrainingContentMutation} = TraningContetnApi;
