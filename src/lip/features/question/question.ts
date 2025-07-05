import { IAddQuestions, IQuestionsResponce } from '@/interface';
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
  tagTypes: ['Questions'],
  endpoints: (build) => ({
    AddQuestion: build.mutation<void, IAddQuestions>({
      query: (body) => ({
        method: 'POST',
        body,
        url: `/api/questions`,
      }),
      invalidatesTags: [{ type: 'Questions', id: 'LIST' }],
    }),

    GetQuestionsInTrainengContent: build.query<IQuestionsResponce[], { id: number }>({
      query: ({ id }) => ({
        url: `/api/questions/content/${id}`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map((q) => ({ type: 'Questions' as const, id: q.id })),
              { type: 'Questions', id: 'LIST' },
            ]
          : [{ type: 'Questions', id: 'LIST' }],
    }),

    DeleteQuestion: build.mutation<void, { id: number }>({
      query: ({ id }) => ({
        method: 'DELETE',
        url: `/api/questions/${id}`,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Questions', id: arg.id },
        { type: 'Questions', id: 'LIST' },
      ],
    }),
  }),
});

export const { useAddQuestionMutation,useGetQuestionsInTrainengContentQuery,useDeleteQuestionMutation} = QuestionAPI;
