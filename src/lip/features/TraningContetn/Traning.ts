import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { ITrainingContent, ITrainingContentRequest, IAddTrainengContent } from '@/interface/index';

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
    AddTrainingContent: build.mutation<any, IAddTrainengContent>({
      query: (data) => ({
        url: '/api/training-contents',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['TraningContent']
    }),
    DeleteTrainingContent: build.mutation<void, {id:number}>({
      query: ({id}) => ({
        url: `/api/training-contents/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['TraningContent']
    }),
    getTrainengContent: build.query<ITrainingContent[], void>({
      query: () => `/api/training-contents`,
      providesTags: ['TraningContent']
    }),
    getTrainingContentsWithCount: build.query<ITrainingContent[], void>({
      query: () => '/api/training-contents?includeQuestionCount=true',
      providesTags: ['TraningContent']
    }),
     getContent: build.query<ITrainingContent, {id:number}>({
      query: ({id}) => `/api/training-contents/${id}`,
      providesTags: ['TraningContent']
    }),
  }),
});

export const {useGetCodeQuery, useCreateTrainingContentMutation,useAddTrainingContentMutation,useGetTrainengContentQuery,useGetTrainingContentsWithCountQuery,useGetContentQuery,useDeleteTrainingContentMutation} = TraningContetnApi;
