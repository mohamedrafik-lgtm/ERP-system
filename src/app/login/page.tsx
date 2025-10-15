"use client";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const LoginPage = () => {
  const router = useRouter();

  useEffect(() => {
    // توجيه المستخدم إلى صفحة تحديد نوع الحساب
    router.replace('/account-type');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4" dir="rtl">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">جاري التوجيه...</p>
      </div>
    </div>
  );
};

export default LoginPage;

