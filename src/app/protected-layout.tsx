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
  const publicPaths = ["/login"];
  
  // التحقق إذا كانت الصفحة الحالية هي صفحة عامة
  const isPublicPath = publicPaths.includes(pathname);

  useEffect(() => {
    // تعليم أننا في الـ client لتجنب مشاكل الـ hydration
    setIsClient(true);
    
    // تحديث حالة المصادقة من الكوكيز
    dispatch(checkAuthState());

    // إذا كانت الصفحة الحالية ليست صفحة عامة وليس هناك توكن
    if (!isPublicPath && isClient) {
      const token = Cookies.get('auth_token');
      if (!token) {
        router.push('/login');
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

  // لباقي الصفحات، اعرض شريط التنقل مع المحتوى داخل AuthGuard
  return (
    <AuthGuard>
      <Navbar />
      <main>{children}</main>
    </AuthGuard>
  );
};

export default ProtectedLayout; 