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

// واجهة استجابة إضافة طالب
export interface AddTraineeResponse {
  success: boolean;
  message: string;
  trainee?: Trainee;
}

// دالة للحصول على التوكن من مصادر مختلفة
const getAuthToken = () => {
  // محاولة الحصول على التوكن من الكوكيز بالاسم الصحيح access_token
  let token = Cookies.get('access_token');
  
  // إذا لم يتم العثور على التوكن، حاول الحصول عليه من الكوكيز بالاسم القديم auth_token
  if (!token) {
    token = Cookies.get('auth_token');
  }
  
  // إذا لم يتم العثور على التوكن في الكوكيز، حاول الحصول عليه من localStorage
  if (!token && typeof window !== 'undefined') {
    const localToken = localStorage.getItem('access_token') || localStorage.getItem('auth_token');
    if (localToken) token = localToken;
  }
  
  // إذا لم يتم العثور على التوكن في localStorage، حاول الحصول عليه من sessionStorage
  if (!token && typeof window !== 'undefined') {
    const sessionToken = sessionStorage.getItem('access_token') || sessionStorage.getItem('auth_token');
    if (sessionToken) token = sessionToken;
  }
  
  return token;
};

// إنشاء API للتعامل مع الطلاب
export const traineesApi = createApi({
  reducerPath: 'traineesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000',
    prepareHeaders: (headers) => {
      // إضافة هيدرز أساسية
      headers.set('Content-Type', 'application/json');
      headers.set('Accept', 'application/json');
      
      // الحصول على التوكن
      const token = getAuthToken();
      
      if (token) {
        // تجربة تنسيقات مختلفة للتوكن
        headers.set('Authorization', `Bearer ${token}`);
      }
      
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // إضافة طالب جديد - استخدام طريقة مختلفة تماماً
    addTrainee: builder.mutation<AddTraineeResponse, Trainee>({
      queryFn: async (traineeData, _queryApi, _extraOptions, baseQuery) => {
        try {
          // الحصول على التوكن
          const token = getAuthToken();
          
          if (!token) {
            return { error: { status: 401, data: { message: 'لم يتم العثور على توكن المصادقة' } } };
          }
          
          console.log('Using token for request:', token);
          
          // إنشاء طلب مخصص مع تجربة تنسيقات مختلفة للتوكن
          const result = await baseQuery({
            url: '/api/trainees',
            method: 'POST',
            body: traineeData,
            headers: {
              // تجربة تنسيقات مختلفة للتوكن
              'Authorization': `Bearer ${token}`,
              'access_token': token,
              'x-access-token': token,
            }
          });
          
          console.log('Query result:', result);
          
          // إذا فشل الطلب، حاول مرة أخرى بتنسيق مختلف للتوكن
          if (result.error && result.error.status === 401) {
            console.log('Trying with different token format...');
            
            // محاولة أخرى بدون Bearer
            const retryResult = await baseQuery({
              url: '/api/trainees',
              method: 'POST',
              body: traineeData,
              headers: {
                'Authorization': token,
              }
            });
            
            console.log('Retry result:', retryResult);
            
            if (retryResult.error) {
              return { error: retryResult.error };
            }
            
            return { data: retryResult.data as AddTraineeResponse };
          }
          
          if (result.error) {
            return { error: result.error };
          }
          
          return { data: result.data as AddTraineeResponse };
        } catch (error) {
          console.error('Error in addTrainee queryFn:', error);
          return {
            error: {
              status: 500,
              data: { message: 'حدث خطأ غير متوقع أثناء إضافة الطالب' }
            }
          };
        }
      }
    }),
    
    // الحصول على قائمة الطلاب
    getTrainees: builder.query<Trainee[], void>({
      query: () => '/api/trainees',
    }),
    
    // الحصول على بيانات طالب واحد
    getTrainee: builder.query<Trainee, number>({
      query: (id) => `/api/trainees/${id}`,
    }),
  }),
});

// تصدير الـ hooks اللازمة للاستخدام
export const { 
  useAddTraineeMutation,
  useGetTraineesQuery,
  useGetTraineeQuery
} = traineesApi;

export default traineesApi; 