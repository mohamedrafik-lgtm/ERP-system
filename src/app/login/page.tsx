"use client";
import { Input } from "@/components/input";
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { LoginSchema } from "@/Schema/login";
import { useLoginMutation } from "@/lip/features/auth/login";
import { setCredentials } from "@/lip/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import toast from "react-hot-toast";

interface LoginInputs {
  email: string;
  password: string;
  remember: boolean;
}

const LoginPage = () => {
  const [login, { data, isLoading, isError, isSuccess }] = useLoginMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    // إذا تم تسجيل الدخول بنجاح
    if (isSuccess && data) {
      // تخزين معلومات المصادقة في Redux
      dispatch(setCredentials(data));
      
      // الانتقال إلى الصفحة الرئيسية
      router.push('/');
    }
  }, [isSuccess, data, dispatch, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      remember: true
    }
  });

  const onSubmit: SubmitHandler<LoginInputs> = async (formData) => {
    setErrorMessage(null);
    try {
      const response = await login({
        email: formData.email,
        password: formData.password
      }).unwrap();
      
      console.log('Login response:', response); // طباعة الاستجابة للتحقق
      
      // تخزين التوكن باسم access_token
      if (response.access_token) {
        // إذا كان المستخدم قد اختار "تذكرني"، فقم بتعيين مدة صلاحية أطول للكوكيز
        const expiresIn = formData.remember ? 30 : 1; // 30 يوم أو 1 يوم
        toast.success('تم تسجيل الدخول بنجاح');
        // تخزين التوكن باسم access_token
        Cookies.set('access_token', response.access_token, { 
          expires: expiresIn,
          path: '/' 
        });
        
        // تخزين نسخة احتياطية باسم auth_token للتوافق مع الكود الحالي
        Cookies.set('auth_token', response.access_token, { 
          expires: expiresIn,
          path: '/' 
        });
        
        if (response.user) {
          Cookies.set('user_data', JSON.stringify(response.user), { 
            expires: expiresIn,
            path: '/' 
          });
        }
      } else {
        console.error('No access_token in response:', response);
        setErrorMessage('لم يتم العثور على توكن المصادقة في الاستجابة');
      }
    } catch (err) {
      console.error('Login failed:', err);
      // التعامل مع أخطاء تسجيل الدخول
      if (err && typeof err === 'object' && 'status' in err) {
        if (err.status === 401) {
          setErrorMessage('بيانات الاعتماد غير صحيحة. يرجى التحقق من البريد الإلكتروني وكلمة المرور.');
        } else if (err.status === 429) {
          setErrorMessage('تم تجاوز عدد محاولات تسجيل الدخول. يرجى المحاولة مرة أخرى لاحقًا.');
        } else {
          setErrorMessage('حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.');
        }
      } else {
        setErrorMessage('حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.');
      }
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen px-4 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
          <h3 className="text-3xl font-bold mb-10 text-center text-gray-800">تسجيل الدخول</h3>
          
          <div className="w-full space-y-6">
            <div className="flex flex-col space-y-2 w-full">
              <label htmlFor="email" className="text-lg font-medium">البريد الإلكتروني</label>
              <Input
                type="text"
                {...register("email")}
                placeholder="example@domain.com"
                id="email"
                className="w-full bg-white rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                required
              />
              {errors.email?.message && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="flex flex-col space-y-2 w-full">
              <label htmlFor="password" className="text-lg font-medium">كلمة المرور</label>
              <Input
                type="password"
                {...register("password")}
                placeholder="••••••••"
                id="password"
                className="w-full bg-white rounded-lg border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition"
                required
              />
              {errors.password?.message && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>
            
            <div className="flex items-center justify-end">
              <label htmlFor="remember" className="text-sm text-gray-600 ml-2">حفظ تسجيل الدخول</label>
              <input 
                type="checkbox" 
                id="remember"
                {...register("remember")}
                className="rounded text-orange-600 focus:ring-orange-500"
              />
            </div>

            {(isError || errorMessage) && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <p className="text-center text-sm">
                  {errorMessage || "خطأ في تسجيل الدخول. يرجى التحقق من بيانات الاعتماد الخاصة بك."}
                </p>
              </div>
            )}

            <button 
              type="submit" 
              className="w-full py-3 rounded-lg text-white bg-orange-600 hover:bg-orange-700 transition font-medium text-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  جاري التحميل...
                </div>
              ) : 'تسجيل الدخول'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
