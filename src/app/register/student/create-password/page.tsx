"use client";
import { Input } from "@/components/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreatePasswordSchema } from "@/Schema/traineeAuth";
import { useCreatePasswordMutation } from "@/lip/features/trainee-auth/traineeAuthApi";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  AcademicCapIcon,
  ArrowLeftIcon,
  InformationCircleIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

interface CreatePasswordInputs {
  password: string;
  confirmPassword: string;
}

const CreatePasswordPage = () => {
  const [createPassword, { isLoading }] = useCreatePasswordMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [traineeData, setTraineeData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // استرجاع بيانات التحقق من المراحل السابقة
    const storedData = sessionStorage.getItem('traineeVerification');
    console.log('Create password page - stored data:', storedData);
    if (!storedData) {
      toast.error('يرجى البدء من المرحلة الأولى');
      router.push('/register/student/verify');
      return;
    }
    setTraineeData(JSON.parse(storedData));
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CreatePasswordInputs>({
    resolver: yupResolver(CreatePasswordSchema),
  });

  const password = watch('password');

  const onSubmit: SubmitHandler<CreatePasswordInputs> = async (formData) => {
    if (!traineeData) return;

    setErrorMessage(null);
    
    // Debug: Log the trainee data
    console.log('Trainee data from sessionStorage:', traineeData);
    console.log('Birth date value:', traineeData.birthDate);
    console.log('Birth date type:', typeof traineeData.birthDate);
    
    // Check if birthDate exists
    if (!traineeData.birthDate) {
      setErrorMessage('تاريخ الميلاد غير موجود. يرجى البدء من المرحلة الأولى.');
      return;
    }
    
    try {
      // Ensure birthDate is in correct format (YYYY-MM-DD)
      let formattedBirthDate = traineeData.birthDate;
      
      // If birthDate is a Date object, convert to ISO string and extract date part
      if (traineeData.birthDate instanceof Date) {
        formattedBirthDate = traineeData.birthDate.toISOString().split('T')[0];
      }
      // If birthDate is an ISO string, extract date part
      else if (typeof traineeData.birthDate === 'string' && traineeData.birthDate.includes('T')) {
        formattedBirthDate = traineeData.birthDate.split('T')[0];
      }
      // If birthDate is already in YYYY-MM-DD format, use as is
      else if (typeof traineeData.birthDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(traineeData.birthDate)) {
        formattedBirthDate = traineeData.birthDate;
      }
      
      console.log('Formatted birth date:', formattedBirthDate);
      
      const response = await createPassword({
        nationalId: traineeData.nationalId,
        birthDate: formattedBirthDate,
        password: formData.password,
      }).unwrap();

      console.log('Create password response:', response);
      toast.success('تم إنشاء حسابك بنجاح!');

      // مسح البيانات المؤقتة
      sessionStorage.removeItem('traineeVerification');

      // توجيه إلى صفحة تسجيل الدخول
      router.push('/login/student');
    } catch (err: any) {
      console.error('Create password failed:', err);
      
      if (err && typeof err === 'object' && 'status' in err) {
        if (err.status === 400) {
          setErrorMessage(err.data?.message || 'البيانات المدخلة غير صحيحة. يرجى التحقق من البيانات.');
        } else if (err.status === 409) {
          setErrorMessage('كلمة المرور هذه مستخدمة من قبل. يرجى اختيار كلمة مرور أخرى.');
        } else if (err.status === 429) {
          setErrorMessage('تم تجاوز عدد المحاولات. يرجى المحاولة مرة أخرى لاحقًا.');
        } else {
          setErrorMessage(err.data?.message || 'حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى.');
        }
      } else {
        setErrorMessage('حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.');
      }
    }
  };

  if (!traineeData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4" dir="rtl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4" dir="rtl">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => router.push('/register/student/create-account')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>العودة للمرحلة السابقة</span>
          </button>
        </div>

        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl flex items-center justify-center mb-4">
              <AcademicCapIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">إنشاء حساب متدرب</h1>
            <p className="text-gray-600">المرحلة 3 من 3: إنشاء كلمة المرور</p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-2">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                  ✓
                </div>
                <span className="mr-2 text-sm font-medium text-green-600">التحقق</span>
              </div>
              <div className="w-16 h-1 bg-green-600"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                  ✓
                </div>
                <span className="mr-2 text-sm font-medium text-green-600">رقم الهاتف</span>
              </div>
              <div className="w-16 h-1 bg-green-600"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                  3
                </div>
                <span className="mr-2 text-sm font-medium text-green-600">كلمة المرور</span>
              </div>
            </div>
          </div>

          {/* Trainee Info */}
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6">
            <div className="flex items-start space-x-2">
              <ShieldCheckIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium mb-1">مرحباً {traineeData.name}</p>
                <p>الآن يمكنك إنشاء كلمة مرور آمنة لحسابك</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                  placeholder="أدخل كلمة المرور"
                  id="password"
                  onFocus={() => setIsFocused('password')}
                  onBlur={() => setIsFocused(null)}
                  className={`w-full pr-10 pl-4 py-3 border-2 rounded-xl transition-all duration-200 ${
                    isFocused === 'password' 
                      ? 'border-green-500 ring-4 ring-green-100' 
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

            {/* Confirm Password Input */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                تأكيد كلمة المرور
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  placeholder="أعد إدخال كلمة المرور"
                  id="confirmPassword"
                  onFocus={() => setIsFocused('confirmPassword')}
                  onBlur={() => setIsFocused(null)}
                  className={`w-full pr-10 pl-4 py-3 border-2 rounded-xl transition-all duration-200 ${
                    isFocused === 'confirmPassword' 
                      ? 'border-green-500 ring-4 ring-green-100' 
                      : 'border-gray-200 hover:border-gray-300'
                  } ${errors.confirmPassword ? 'border-red-500 ring-4 ring-red-100' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 left-0 pl-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.confirmPassword?.message && (
                <div className="flex items-center space-x-2 text-red-600 text-sm">
                  <ExclamationTriangleIcon className="w-4 h-4" />
                  <span>{errors.confirmPassword.message}</span>
                </div>
              )}
            </div>

            {/* Password Requirements */}
            <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-xl">
              <div className="flex items-start space-x-2">
                <InformationCircleIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium mb-2">متطلبات كلمة المرور:</p>
                  <ul className="space-y-1 text-xs">
                    <li className={`flex items-center space-x-2 ${password && password.length >= 6 ? 'text-green-600' : 'text-gray-500'}`}>
                      <CheckIcon className="w-3 h-3" />
                      <span>6 أحرف على الأقل</span>
                    </li>
                    <li className={`flex items-center space-x-2 ${password && /[A-Za-z]/.test(password) ? 'text-green-600' : 'text-gray-500'}`}>
                      <CheckIcon className="w-3 h-3" />
                      <span>تحتوي على أحرف</span>
                    </li>
                    <li className={`flex items-center space-x-2 ${password && /\d/.test(password) ? 'text-green-600' : 'text-gray-500'}`}>
                      <CheckIcon className="w-3 h-3" />
                      <span>تحتوي على أرقام</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center space-x-2">
                <ExclamationTriangleIcon className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm">{errorMessage}</p>
              </div>
            )}

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold rounded-xl hover:from-green-700 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-green-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>جاري إنشاء الحساب...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <CheckIcon className="w-5 h-5" />
                  <span>إنشاء الحساب</span>
                </div>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              لديك حساب بالفعل؟{' '}
              <button 
                onClick={() => router.push('/login/student')}
                className="text-green-600 hover:text-green-800 font-medium transition-colors"
              >
                تسجيل الدخول
              </button>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            بإنشاء حساب، فإنك توافق على{' '}
            <button className="text-green-600 hover:text-green-800">شروط الخدمة</button>
            {' '}و{' '}
            <button className="text-green-600 hover:text-green-800">سياسة الخصوصية</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreatePasswordPage;
