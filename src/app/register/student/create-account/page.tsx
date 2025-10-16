"use client";
import { Input } from "@/components/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { VerifyPhoneSchema } from "@/Schema/traineeAuth";
import { useVerifyPhoneMutation } from "@/lip/features/trainee-auth/traineeAuthApi";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  PhoneIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  AcademicCapIcon,
  ArrowLeftIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

interface VerifyPhoneInputs {
  phone: string;
}

const VerifyPhonePage = () => {
  const [verifyPhone, { isLoading }] = useVerifyPhoneMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState<string | null>(null);
  const [traineeData, setTraineeData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // استرجاع بيانات التحقق من المرحلة الأولى
    const storedData = sessionStorage.getItem('traineeVerification');
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
  } = useForm<VerifyPhoneInputs>({
    resolver: yupResolver(VerifyPhoneSchema),
  });

  const onSubmit: SubmitHandler<VerifyPhoneInputs> = async (formData) => {
    if (!traineeData) return;

    setErrorMessage(null);
    try {
      const response = await verifyPhone({
        nationalId: traineeData.nationalId,
        phone: formData.phone,
      }).unwrap();

      console.log('Verify phone response:', response);
      toast.success('تم التحقق من رقم الهاتف بنجاح');

      // حفظ رقم الهاتف في sessionStorage
      const updatedData = { ...traineeData, phone: formData.phone };
      sessionStorage.setItem('traineeVerification', JSON.stringify(updatedData));

      // الانتقال إلى المرحلة الثالثة (إنشاء كلمة المرور)
      console.log('Redirecting to create-password page...');
      router.push('/register/student/create-password');
    } catch (err: any) {
      console.error('Verify phone failed:', err);
      
      if (err && typeof err === 'object' && 'status' in err) {
        if (err.status === 404) {
          setErrorMessage('رقم الهاتف غير مطابق للرقم المسجل في النظام.');
        } else if (err.status === 400) {
          setErrorMessage(err.data?.message || 'رقم الهاتف غير صحيح. يرجى التحقق من الرقم المدخل.');
        } else if (err.status === 429) {
          setErrorMessage('تم تجاوز عدد المحاولات. يرجى المحاولة مرة أخرى لاحقًا.');
        } else {
          setErrorMessage(err.data?.message || 'حدث خطأ أثناء التحقق من رقم الهاتف. يرجى المحاولة مرة أخرى.');
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
            onClick={() => router.push('/register/student/verify')}
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
            <p className="text-gray-600">المرحلة 2 من 3: التحقق من رقم الهاتف</p>
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
                  2
                </div>
                <span className="mr-2 text-sm font-medium text-green-600">رقم الهاتف</span>
              </div>
              <div className="w-16 h-1 bg-gray-200"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                  3
                </div>
                <span className="mr-2 text-sm font-medium text-gray-500">كلمة المرور</span>
              </div>
            </div>
          </div>

          {/* Trainee Info */}
          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-xl mb-6">
            <div className="flex items-start space-x-2">
              <InformationCircleIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium mb-1">مرحباً {traineeData.name}</p>
                {traineeData.phoneHint && (
                  <p>رقم الهاتف المسجل: {traineeData.phoneHint}</p>
                )}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Phone Input */}
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                رقم الهاتف
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <PhoneIcon className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="text"
                  {...register("phone")}
                  placeholder="01012345678"
                  id="phone"
                  maxLength={11}
                  onFocus={() => setIsFocused('phone')}
                  onBlur={() => setIsFocused(null)}
                  className={`w-full pr-10 pl-4 py-3 border-2 rounded-xl transition-all duration-200 ${
                    isFocused === 'phone' 
                      ? 'border-green-500 ring-4 ring-green-100' 
                      : 'border-gray-200 hover:border-gray-300'
                  } ${errors.phone ? 'border-red-500 ring-4 ring-red-100' : ''}`}
                />
              </div>
              {errors.phone?.message && (
                <div className="flex items-center space-x-2 text-red-600 text-sm">
                  <ExclamationTriangleIcon className="w-4 h-4" />
                  <span>{errors.phone.message}</span>
                </div>
              )}
              <p className="text-xs text-gray-500">
                يجب أن يبدأ رقم الهاتف بـ 010 أو 011 أو 012 أو 015
              </p>
            </div>

            {/* Info Notice */}
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-xl flex items-start space-x-2">
              <ExclamationTriangleIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium mb-1">ملاحظة هامة:</p>
                <p>يرجى إدخال رقم الهاتف المسجل في النظام بشكل صحيح.</p>
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
                  <span>جاري التحقق...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2">
                  <CheckIcon className="w-5 h-5" />
                  <span>التالي</span>
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

export default VerifyPhonePage;

