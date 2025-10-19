"use client";
import { Input } from "@/components/input";
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { EmployeeLoginSchema } from "@/Schema/login";
import { useLoginMutation } from "@/lip/features/auth/login";
import { setCredentials } from "@/lip/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import toast from "react-hot-toast";
import { 
  EyeIcon, 
  EyeSlashIcon, 
  UserIcon, 
  LockClosedIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  UserGroupIcon,
  ArrowLeftIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

interface LoginInputs {
  emailOrPhone: string;
  password: string;
  remember: boolean;
}

const EmployeeLoginPage = () => {
  const [login, { data, isLoading, isError, isSuccess }] = useLoginMutation();
  
  console.log('🔧 Employee login component mounted');
  console.log('🔧 Login mutation state:', { isLoading, isError, isSuccess });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState<string | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    // إذا تم تسجيل الدخول بنجاح
    if (isSuccess && data) {
      console.log('Employee login successful:', data);
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
    resolver: yupResolver(EmployeeLoginSchema) as any,
    defaultValues: {
      remember: true
    }
  });

  const onSubmit = async (formData: any) => {
    console.log('🎯 Employee login form submitted with data:', formData);
    console.log('🔍 Form validation status:', {
      hasErrors: Object.keys(errors).length > 0,
      errors: errors
    });
    setErrorMessage(null);
    try {
      console.log('📞 Calling login mutation...');
      const response = await login({
        emailOrPhone: formData.emailOrPhone,
        password: formData.password
      }).unwrap();
      
      console.log('Employee login response:', response);
      
      // تخزين التوكن باسم access_token
      if (response.access_token) {
        const expiresIn = formData.remember ? 30 : 1;
        toast.success('تم تسجيل الدخول بنجاح');
        
        Cookies.set('access_token', response.access_token, { 
          expires: expiresIn,
          path: '/' 
        });
        
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
      console.error('❌ Employee login failed:', err);
      console.error('❌ Error details:', {
        status: (err as any)?.status,
        data: (err as any)?.data,
        message: (err as any)?.message
      });
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center p-4" dir="rtl">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => router.push('/account-type')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>العودة لاختيار نوع الحساب</span>
          </button>
        </div>

        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mb-4">
              <UserGroupIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">تسجيل دخول الموظف</h1>
            <p className="text-gray-600">سجل دخولك للوصول إلى لوحة التحكم الإدارية</p>
          </div>

          <form onSubmit={(e) => {
            console.log('📝 Form submit event triggered');
            e.preventDefault();
            handleSubmit(onSubmit)(e);
          }} className="space-y-6">
            {/* Email/Phone Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                البريد الإلكتروني أو رقم الهاتف
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="text"
                  {...register("emailOrPhone")}
                  placeholder="example@domain.com"
                  id="email"
                  onFocus={() => setIsFocused('email')}
                  onBlur={() => setIsFocused(null)}
                  className={`w-full pr-10 pl-4 py-3 border-2 rounded-xl transition-all duration-200 ${
                    isFocused === 'email' 
                      ? 'border-purple-500 ring-4 ring-purple-100' 
                      : 'border-gray-200 hover:border-gray-300'
                  } ${errors.emailOrPhone ? 'border-red-500 ring-4 ring-red-100' : ''}`}
                />
              </div>
              {errors.emailOrPhone?.message && (
                <div className="flex items-center space-x-2 text-red-600 text-sm">
                  <ExclamationTriangleIcon className="w-4 h-4" />
                  <span>{errors.emailOrPhone.message}</span>
                </div>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                كلمة المرور
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="••••••••"
                  id="password"
                  onFocus={() => setIsFocused('password')}
                  onBlur={() => setIsFocused(null)}
                  className={`w-full pr-10 pl-4 py-3 border-2 rounded-xl transition-all duration-200 ${
                    isFocused === 'password' 
                      ? 'border-purple-500 ring-4 ring-purple-100' 
                      : 'border-gray-200 hover:border-gray-300'
                  } ${errors.password ? 'border-red-500 ring-4 ring-red-100' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 left-0 pl-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password?.message && (
                <div className="flex items-center space-x-2 text-red-600 text-sm">
                  <ExclamationTriangleIcon className="w-4 h-4" />
                  <span>{errors.password.message}</span>
                </div>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  {...register("remember")}
                  className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                />
                <span className="text-sm text-gray-600">تذكرني</span>
              </label>
              <button
                type="button"
                className="text-sm text-purple-600 hover:text-purple-800 transition-colors"
              >
                نسيت كلمة المرور؟
              </button>
            </div>

            {/* Security Notice */}
            <div className="bg-purple-50 border border-purple-200 text-purple-700 px-4 py-3 rounded-xl flex items-center space-x-2">
              <ShieldCheckIcon className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm">
                هذا حساب إداري محمي. يرجى التأكد من أنك مخول للوصول إلى هذا النظام.
              </p>
            </div>

            {/* Error Message */}
            {(isError || errorMessage) && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center space-x-2">
                <ExclamationTriangleIcon className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm">
                  {errorMessage || "خطأ في تسجيل الدخول. يرجى التحقق من بيانات الاعتماد الخاصة بك."}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button 
              type="submit" 
              onClick={() => console.log('🖱️ Submit button clicked')}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>جاري تسجيل الدخول...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <CheckIcon className="w-5 h-5" />
                  <span>تسجيل دخول الموظف</span>
                </div>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              ليس لديك حساب موظف؟{' '}
              <button className="text-purple-600 hover:text-purple-800 font-medium transition-colors">
                اتصل بالإدارة
              </button>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            بتسجيل الدخول، فإنك توافق على{' '}
            <button className="text-purple-600 hover:text-purple-800">شروط الخدمة</button>
            {' '}و{' '}
            <button className="text-purple-600 hover:text-purple-800">سياسة الخصوصية</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLoginPage;
