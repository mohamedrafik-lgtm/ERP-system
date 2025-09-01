import { IRequist, IStudentRequest } from '@/interface';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

// واجهة بيانات الطالب
export interface Trainee {
  id?: number;
  nameAr: string;
  nameEn: string;
  enrollmentType: 'REGULAR' | 'DISTANCE' | string;
  maritalStatus: 'SINGLE' | 'MARRIED' | 'DIVORCED' | 'WIDOWED' | string;
  nationalId: string;
  idIssueDate: string;
  idExpiryDate: string;
  programType: 'SUMMER' | 'WINTER' | string;
  nationality: string;
  gender: 'MALE' | 'FEMALE' | string;
  birthDate: string;
  residenceAddress: string;
  photoUrl: string;
  religion: 'ISLAM' | 'CHRISTIANITY' | 'JUDAISM' | 'OTHER' | string;
  programId: number;
  country: string;
  governorate: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  guardianPhone: string;
  guardianEmail: string;
  guardianJob: string;
  guardianRelation: string;
  guardianNationalId: string;
  landline?: string;
  whatsapp?: string;
  facebook?: string;
  educationType: 'PRIMARY' | 'PREPARATORY' | 'SECONDARY' | 'UNIVERSITY' | string;
  schoolName: string;
  graduationDate: string;
  totalGrade: number;
  gradePercentage: number;
  sportsActivity?: string;
  culturalActivity?: string;
  educationalActivity?: string;
  notes?: string;
}

// // واجهة استجابة إضافة طالب
// export interface AddTraineeResponse {
//   success: boolean;
//   message: string;
//   trainee?: Trainee;
// }

// // دالة للحصول على التوكن من مصادر مختلفة
// const getAuthToken = () => {
//   // محاولة الحصول على التوكن من الكوكيز بالاسم الصحيح access_token
//   let token = Cookies.get('access_token');
  
//   // إذا لم يتم العثور على التوكن، حاول الحصول عليه من الكوكيز بالاسم القديم auth_token
//   if (!token) {
//     token = Cookies.get('auth_token');
//   }
  
//   // إذا لم يتم العثور على التوكن في الكوكيز، حاول الحصول عليه من localStorage
//   if (!token && typeof window !== 'undefined') {
//     const localToken = localStorage.getItem('access_token') || localStorage.getItem('auth_token');
//     if (localToken) token = localToken;
//   }
  
//   // إذا لم يتم العثور على التوكن في localStorage، حاول الحصول عليه من sessionStorage
//   if (!token && typeof window !== 'undefined') {
//     const sessionToken = sessionStorage.getItem('access_token') || sessionStorage.getItem('auth_token');
//     if (sessionToken) token = sessionToken;
//   }
  
//   return token;
// };

// إنشاء API للتعامل مع الطلاب
export const traineesApi = createApi({
  reducerPath: 'traineesApi',
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
  endpoints: (builder) => ({
    // إضافة طالب جديد - استخدام طريقة مختلفة تماماً
    addTrainee: builder.mutation<void, IStudentRequest>({
             query: (body) => ({
               url: '/api/trainees',
               method: 'POST',
               body,
               headers: {
                 'Content-Type': 'application/json',
               },
             }),

    }),
    
    // الحصول على قائمة الطلاب
    getTrainees: builder.query<Trainee[], void>({
      query: () => '/api/trainees',
    }),
    
    // الحصول على بيانات طالب واحد
    getTrainee: builder.query<IStudentRequest, number>({
      query: (id) => `/api/trainees/${id}`,
    }),
    
    // تحديث بيانات طالب
    updateTrainee: builder.mutation<IStudentRequest, { id: number; data: IStudentRequest }>({
      query: ({ id, data }) => ({
        url: `/api/trainees/${id}`,
        method: 'PUT',
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});

// تصدير الـ hooks اللازمة للاستخدام
export const { 
  useAddTraineeMutation,
  useGetTraineesQuery,
  useGetTraineeQuery,
  useUpdateTraineeMutation
} = traineesApi;

export default traineesApi; 