"use client";

import { usePathname, useRouter } from "next/navigation";
import AuthGuard from "@/components/ui/AuthGuard";
import { Navbar } from "@/components/ui/Navbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthState, selectIsAuthenticated } from "@/lip/features/auth/authSlice";
import Cookies from 'js-cookie';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [isClient, setIsClient] = useState(false);

  // صفحات لا تحتاج إلى مصادقة
  const publicPaths = [
    "/login", 
    "/account-type", 
    "/login/student", 
    "/login/employee",
    "/register/student/verify",
    "/register/student/create-account",
    "/register/student/create-password",
    "/register/student/confirm"
  ];
  
  // صفحات منصة الطالب (لا تحتاج إلى navbar إداري)
  const studentPlatformPaths = [
    "/StudentPlatform",
    "/StudentPlatform/AccountManagement",
    "/StudentPlatform/Statistics",
    "/StudentPlatform/schedule",
    "/StudentPlatform/profile",
    "/StudentPlatform/program",
    "/StudentPlatform/attendance",
    "/StudentPlatform/payments",
    "/StudentPlatform/documents",
    "/StudentPlatform/assessments",
    "/StudentPlatform/messages",
    "/StudentPlatform/reports",
    "/StudentPlatform/settings"
  ];
  
  // التحقق إذا كانت الصفحة الحالية هي صفحة عامة
  const isPublicPath = publicPaths.includes(pathname);
  
  // التحقق إذا كانت الصفحة الحالية هي صفحة منصة الطالب
  const isStudentPlatformPath = studentPlatformPaths.includes(pathname) || pathname.startsWith('/StudentPlatform');
  
  console.log('Protected layout - pathname:', pathname, 'isPublicPath:', isPublicPath, 'isStudentPlatformPath:', isStudentPlatformPath);

  useEffect(() => {
    // تعليم أننا في الـ client لتجنب مشاكل الـ hydration
    setIsClient(true);
    
    // تحديث حالة المصادقة من الكوكيز
    dispatch(checkAuthState());

    // إذا كانت الصفحة الحالية ليست صفحة عامة وليس هناك توكن
    if (!isPublicPath && isClient) {
      const token = Cookies.get('auth_token');
      if (!token) {
        console.log('No token found, redirecting to account-type from:', pathname);
        router.push('/account-type');
      }
    }

    // إذا كان المستخدم مصادقًا وهو على صفحة تسجيل الدخول، وجهه إلى الصفحة الرئيسية
    if (isAuthenticated && isPublicPath && isClient) {
      router.push('/');
    }
  }, [dispatch, isAuthenticated, isPublicPath, router, isClient]);

  if (!isClient) {
    return null; // لا تعرض أي شيء أثناء الـ hydration
  }

  if (isPublicPath) {
    // إذا كانت صفحة عامة مثل تسجيل الدخول، اعرض المحتوى فقط بدون شريط التنقل
    return <>{children}</>;
  }

  if (isStudentPlatformPath) {
    // إذا كانت صفحة منصة الطالب، اعرض المحتوى فقط بدون navbar إداري
    return <>{children}</>;
  }

  // لباقي الصفحات، اعرض شريط التنقل مع المحتوى داخل AuthGuard
  return (
    <AuthGuard>
      <Navbar />
      <main>{children}</main>
    </AuthGuard>
  );
};

export default ProtectedLayout; 