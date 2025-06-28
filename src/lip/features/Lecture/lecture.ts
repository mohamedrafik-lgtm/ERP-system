import { ILecture, IResponseLecture } from '@/interface';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';




export const LectureAPI = createApi({
  reducerPath: 'LectureApi',
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
  tagTypes: ['Lecture'],
  endpoints: (build) => ({
    AddLecture: build.mutation<void, ILecture>({
  query: (body) => ({
    method: 'POST',
    url: `/api/lectures`,
    body,
  }),
  invalidatesTags: ['Lecture'],
}),

DeleteLecture: build.mutation<void, { id: number }>({
  query: ({ id }) => ({
    method: 'DELETE',
    url: `/api/lectures/${id}`,
  }),
  invalidatesTags: ['Lecture'],
}),

    GetLecture: build.query< IResponseLecture,{id:number}>({
        query: ({id}) =>  `/api/lectures/content/${id}`,
          providesTags: ['Lecture'],
    }),
  }),
});

export const {useAddLectureMutation,useGetLectureQuery,useDeleteLectureMutation } = LectureAPI;
