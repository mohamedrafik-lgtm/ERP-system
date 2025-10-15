"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  UserGroupIcon, 
  AcademicCapIcon,
  ArrowRightIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

const AccountTypePage = () => {
  const router = useRouter();

  const handleAccountTypeSelect = (type: 'student' | 'employee') => {
    console.log('Selected account type:', type);
    if (type === 'student') {
      router.push('/login/student');
    } else {
      router.push('/login/employee');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4" dir="rtl">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mb-6">
            <UserGroupIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">مرحباً بك في منصتنا</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            اختر نوع حسابك للوصول إلى الخدمات المناسبة لك
          </p>
        </div>

        {/* Account Type Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Student Card */}
          <div 
            onClick={() => handleAccountTypeSelect('student')}
            className="group cursor-pointer bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 hover:shadow-3xl transition-all duration-300 hover:scale-105"
          >
            <div className="text-center">
              {/* Icon */}
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <AcademicCapIcon className="w-8 h-8 text-white" />
              </div>
              
              {/* Title */}
              <h2 className="text-2xl font-bold text-gray-900 mb-4">طالب</h2>
              
              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                الوصول إلى الدورات التدريبية، المواد التعليمية، التقييمات، والتقدم الأكاديمي
              </p>
              
              {/* Features */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>الوصول إلى الدورات التدريبية</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>تتبع التقدم الأكاديمي</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>الوصول إلى المواد التعليمية</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>التقييمات والاختبارات</span>
                </div>
              </div>
              
              {/* Action Button */}
              <div className="flex items-center justify-center space-x-2 text-blue-600 font-semibold group-hover:text-blue-800 transition-colors">
                <span>تسجيل دخول الطالب</span>
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Employee Card */}
          <div 
            onClick={() => handleAccountTypeSelect('employee')}
            className="group cursor-pointer bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8 hover:shadow-3xl transition-all duration-300 hover:scale-105"
          >
            <div className="text-center">
              {/* Icon */}
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <UserGroupIcon className="w-8 h-8 text-white" />
              </div>
              
              {/* Title */}
              <h2 className="text-2xl font-bold text-gray-900 mb-4">موظف</h2>
              
              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                الوصول إلى لوحة التحكم الإدارية، إدارة الطلاب، التقارير، والإحصائيات
              </p>
              
              {/* Features */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>لوحة التحكم الإدارية</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>إدارة الطلاب والمتدربين</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>التقارير والإحصائيات</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>إدارة النظام</span>
                </div>
              </div>
              
              {/* Action Button */}
              <div className="flex items-center justify-center space-x-2 text-purple-600 font-semibold group-hover:text-purple-800 transition-colors">
                <span>تسجيل دخول الموظف</span>
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            تحتاج مساعدة؟{' '}
            <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
              اتصل بنا
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountTypePage;
