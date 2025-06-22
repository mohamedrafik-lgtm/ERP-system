"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthState, selectIsAuthenticated } from "@/lip/features/auth/authSlice";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    // تعليم أننا في الـ client لتجنب مشاكل الـ hydration
    setIsClient(true);
    
    // تحديث حالة Redux بناءً على الكوكيز
    dispatch(checkAuthState());

    // التحقق من وجود التوكن في الكوكيز
    const token = Cookies.get('auth_token');
    
    // إذا لم يكن هناك توكن، قم بتوجيه المستخدم إلى صفحة تسجيل الدخول
    if (!token) {
      router.push('/login');
    }
  }, [dispatch, router]);

  // لا تعرض أي شيء أثناء الـ hydration الأولي
  if (!isClient) {
    return null;
  }

  // إذا لم يكن المستخدم مصادقًا، لا تعرض المحتوى
  if (!isAuthenticated && isClient) {
    // يمكن إضافة شاشة تحميل هنا بدلاً من عدم عرض أي شيء
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري التحقق من حالة تسجيل الدخول...</p>
        </div>
      </div>
    );
  }

  // إذا كان المستخدم مصادقًا، اعرض محتوى الصفحة
  return <>{children}</>;
};

export default AuthGuard; 