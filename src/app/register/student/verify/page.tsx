"use client";
import { Input } from "@/components/input";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { VerifyTraineeSchema } from "@/Schema/traineeAuth";
import { useVerifyTraineeMutation } from "@/lip/features/trainee-auth/traineeAuthApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  UserIcon,
  CalendarIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  AcademicCapIcon,
  ArrowLeftIcon,
  IdentificationIcon
} from '@heroicons/react/24/outline';

interface VerifyInputs {
  nationalId: string;
  birthDate: string;
}

const VerifyTraineePage = () => {
  const [verifyTrainee, { isLoading }] = useVerifyTraineeMutation();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyInputs>({
    resolver: yupResolver(VerifyTraineeSchema),
  });

  const onSubmit: SubmitHandler<VerifyInputs> = async (formData) => {
    setErrorMessage(null);
    try {
      const response = await verifyTrainee({
        nationalId: formData.nationalId,
        birthDate: formData.birthDate,
      }).unwrap();

      console.log('Verify trainee response:', response);
      toast.success('تم التحقق من بياناتك بنجاح');

      // التحقق إذا كان المتدرب لديه حساب بالفعل
      if (response.hasAccount) {
        toast.info('لديك حساب بالفعل، يمكنك تسجيل الدخول');
        router.push('/login/student');
      } else {
        // الانتقال إلى المرحلة الثانية (التحقق من رقم الهاتف)
        // سنقوم بتخزين بيانات التحقق في sessionStorage للمرحلة التالية
        sessionStorage.setItem('traineeVerification', JSON.stringify(response));
        router.push('/register/student/create-account');
      }
    } catch (err: any) {
      console.error('Verify trainee failed:', err);
      
      if (err && typeof err === 'object' && 'status' in err) {
        if (err.status === 404) {
          setErrorMessage('لم يتم العثور على متدرب بهذه البيانات. يرجى التحقق من البيانات المدخلة.');
        } else if (err.status === 400) {
          setErrorMessage(err.data?.message || 'البيانات المدخلة غير صحيحة. يرجى التحقق من البيانات.');
        } else if (err.status === 429) {
          setErrorMessage('تم تجاوز عدد المحاولات. يرجى المحاولة مرة أخرى لاحقًا.');
        } else {
          setErrorMessage(err.data?.message || 'حدث خطأ أثناء التحقق من البيانات. يرجى المحاولة مرة أخرى.');
        }
      } else {
        setErrorMessage('حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.');
      }
    }
  };

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
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl flex items-center justify-center mb-4">
              <AcademicCapIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">إنشاء حساب متدرب</h1>
            <p className="text-gray-600">المرحلة 1 من 3: التحقق من بياناتك</p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-2">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                  1
                </div>
                <span className="mr-2 text-sm font-medium text-green-600">التحقق</span>
              </div>
              <div className="w-16 h-1 bg-gray-200"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                  2
                </div>
                <span className="mr-2 text-sm font-medium text-gray-500">إنشاء الحساب</span>
              </div>
              <div className="w-16 h-1 bg-gray-200"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                  3
                </div>
                <span className="mr-2 text-sm font-medium text-gray-500">تأكيد</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* National ID Input */}
            <div className="space-y-2">
              <label htmlFor="nationalId" className="text-sm font-medium text-gray-700">
                الرقم القومي
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <IdentificationIcon className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="text"
                  {...register("nationalId")}
                  placeholder="أدخل الرقم القومي (14 رقم)"
                  id="nationalId"
                  maxLength={14}
                  onFocus={() => setIsFocused('nationalId')}
                  onBlur={() => setIsFocused(null)}
                  className={`w-full pr-10 pl-4 py-3 border-2 rounded-xl transition-all duration-200 ${
                    isFocused === 'nationalId' 
                      ? 'border-green-500 ring-4 ring-green-100' 
                      : 'border-gray-200 hover:border-gray-300'
                  } ${errors.nationalId ? 'border-red-500 ring-4 ring-red-100' : ''}`}
                />
              </div>
              {errors.nationalId?.message && (
                <div className="flex items-center space-x-2 text-red-600 text-sm">
                  <ExclamationTriangleIcon className="w-4 h-4" />
                  <span>{errors.nationalId.message}</span>
                </div>
              )}
            </div>

            {/* Birth Date Input */}
            <div className="space-y-2">
              <label htmlFor="birthDate" className="text-sm font-medium text-gray-700">
                تاريخ الميلاد
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="date"
                  {...register("birthDate")}
                  id="birthDate"
                  onFocus={() => setIsFocused('birthDate')}
                  onBlur={() => setIsFocused(null)}
                  className={`w-full pr-10 pl-4 py-3 border-2 rounded-xl transition-all duration-200 ${
                    isFocused === 'birthDate' 
                      ? 'border-green-500 ring-4 ring-green-100' 
                      : 'border-gray-200 hover:border-gray-300'
                  } ${errors.birthDate ? 'border-red-500 ring-4 ring-red-100' : ''}`}
                />
              </div>
              {errors.birthDate?.message && (
                <div className="flex items-center space-x-2 text-red-600 text-sm">
                  <ExclamationTriangleIcon className="w-4 h-4" />
                  <span>{errors.birthDate.message}</span>
                </div>
              )}
            </div>

            {/* Info Notice */}
            <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-xl flex items-start space-x-2">
              <ExclamationTriangleIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium mb-1">ملاحظة هامة:</p>
                <p>يرجى إدخال الرقم القومي وتاريخ الميلاد المسجلين في النظام بشكل صحيح.</p>
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
                  <span>التحقق من البيانات</span>
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

export default VerifyTraineePage;

