import { IAddQuestions } from '@/interface';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

interface IProps{
    data:IAddQuestions
    id:number
}

export const QuestionAPI = createApi({
  reducerPath: 'QuestionApi',
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
  tagTypes: ['Question'],
  endpoints: (build) => ({
    AddQuestion: build.mutation< void,IAddQuestions>({
        query: (body) => ({
           method:'POST',
           body,
           url: `/api/questions`,
           providesTags:['Question']
      }),
    })
  }),
});

export const { useAddQuestionMutation} = QuestionAPI;
