"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/lip/features/auth/authSlice";
import { useRouter } from "next/navigation";

export default function StudentPlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = useSelector(selectCurrentUser);
  const router = useRouter();

  useEffect(() => {
    // التحقق من أن المستخدم مسجل دخول وأنه طالب
    if (!currentUser) {
      router.push('/login/student');
      return;
    }

    if (currentUser.role !== 'trainee') {
      // إذا لم يكن طالب، توجيهه إلى الصفحة المناسبة
      if (currentUser.role === 'admin' || currentUser.role === 'employee') {
        router.push('/');
      } else {
        router.push('/account-type');
      }
      return;
    }
  }, [currentUser, router]);

  // إذا لم يكن هناك مستخدم، لا تعرض المحتوى
  if (!currentUser || currentUser.role !== 'trainee') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">جاري التحقق...</h3>
          <p className="text-gray-600">يرجى الانتظار</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
