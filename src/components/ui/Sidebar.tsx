"use client";
import { useState, useCallback, useMemo, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectCurrentUser } from "@/lip/features/auth/authSlice";
import { useRouter, usePathname } from "next/navigation";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import img from "@/img/502585454_122235753458244801_413190920156398012_n-removebg-preview.png";

interface MenuItem {
  name: string;
  svg: React.ReactNode;
  url: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["المتدربين"]));
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const currentUser = useSelector(selectCurrentUser);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    router.push("/login");
    if (typeof window !== "undefined") {
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  }, [dispatch, router]);

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(title)) {
        newSet.delete(title);
      } else {
        newSet.add(title);
      }
      return newSet;
    });
  };

  // Menu Sections
  const menuSections: MenuSection[] = useMemo(
    () => [
      {
        title: "المتدربين",
        items: [
          {
            name: "إضافة متدرب",
            svg: (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
              </svg>
            ),
            url: "/AddStudent",
          },
          {
            name: "البحث في المتدربين",
            svg: (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            ),
            url: "/AllStudent",
          },
          {
            name: "إدارة المحتوى التدريبي",
            svg: (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
              </svg>
            ),
            url: "/TrainingContentManagement",
          },
          {
            name: "السكاشن",
            svg: (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
              </svg>
            ),
            url: "/StudentSections",
          },
          {
            name: "أرشيف المتدربين",
            svg: (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
              </svg>
            ),
            url: "/TraineesArchive",
          },
        ],
      },
      {
        title: "المستخدمين والصلاحيات",
        items: [
          {
            name: "المستخدمين",
            svg: (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
              </svg>
            ),
            url: "/EmployeeManagement",
          },
          {
            name: "الصلاحيات",
            svg: (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
              </svg>
            ),
            url: "/Roles",
          },
        ],
      },
      {
        title: "التسويق",
        items: [
          {
            name: "المسوقين",
            svg: (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
              </svg>
            ),
            url: "/Marketing",
          },
          {
            name: "إضافة مسوق",
            svg: (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            ),
            url: "/Marketing/AddMarketer",
          },
          {
            name: "تحديد التارجت",
            svg: (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 12.75H18M7.757 9.879l-1.59-1.59m0 0-1.591 1.59m1.59-1.59H4.5m0 0v1.5m0-1.5v-1.5" />
              </svg>
            ),
            url: "/Marketing/target",
          },
          {
            name: "الحملات التسويقية",
            svg: (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
              </svg>
            ),
            url: "/Marketing/campaigns",
          },
          {
            name: "العمولات",
            svg: (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            ),
            url: "/Commissions",
          },
        ],
      },
      {
        title: "المالية",
        items: [
          {
            name: "رسوم المتدربين",
            svg: (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
              </svg>
            ),
            url: "/TraineeFees",
          },
          {
            name: "المدفوعات",
            svg: (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
              </svg>
            ),
            url: "/TraineePayments",
          },
          {
            name: "شجرة القيود المالية",
            svg: (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
              </svg>
            ),
            url: "/FinancialConstraintsTree",
          },
          {
            name: "البيانات المالية",
            svg: (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
              </svg>
            ),
            url: "/FinancialStatements",
          },
          {
            name: "تقارير المتدربين المالية",
            svg: (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
            ),
            url: "/StudentFinancialReportsid",
          },
          {
            name: "طلبات الصرف والدفع",
            svg: (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
              </svg>
            ),
            url: "/ExchangeAndPaymentRequests",
          },
        ],
      },
      {
        title: "إدارة الكرنيهات",
        items: [
          {
            name: "إدارة الكرنيهات",
            svg: (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
              </svg>
            ),
            url: "/CardsManagement",
          },
          {
            name: "إحصائيات الكرنيهات",
            svg: (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
              </svg>
            ),
            url: "/CardsStats",
          },
          {
            name: "طباعة الكرنيهات",
            svg: (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
              </svg>
            ),
            url: "/CardsPrinting",
          },
          {
            name: "تصميمات الكرنيهات",
            svg: (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
              </svg>
            ),
            url: "/id-card-designs",
          },
        ],
      },
      {
        title: "منصة المتدربين",
        items: [
          {
            name: "إدارة حسابات المتدربين",
            svg: (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
              </svg>
            ),
            url: "/AccountManagement",
          },
          {
            name: "إحصائيات المنصة الشاملة",
            svg: (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
              </svg>
            ),
            url: "/PlatformStatistics",
          },
          {
            name: "إحصائيات منصة المتدربين",
            svg: (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
              </svg>
            ),
            url: "/StudentPlatform/Statistics",
          },
        ],
      },
    ],
    []
  );

  const isActive = (url: string) => pathname === url;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
      >
        {isMobileMenuOpen ? (
          <XMarkIcon className="w-6 h-6 text-gray-700" />
        ) : (
          <Bars3Icon className="w-6 h-6 text-gray-700" />
        )}
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 border-l border-gray-200/60 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.1)] transition-all duration-300 z-40 flex flex-col ${
          isOpen ? "w-80" : "w-20"
        } ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}`}
        dir="rtl"
      >
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-blue-500/5 pointer-events-none" />
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-orange-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-blue-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        {/* Logo & Toggle */}
        <div className="relative p-5 border-b border-gray-200/50 flex items-center justify-between bg-white/50 backdrop-blur-md">
          {isOpen && (
            <Link href="/" className="flex items-center gap-3 group relative z-10">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-blue-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity" />
                <Image
                  src={img}
                  alt="Logo"
                  width={45}
                  height={45}
                  className="relative rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg"
                />
              </div>
              <div>
                <span className="font-bold text-xl bg-gradient-to-r from-orange-600 via-orange-500 to-blue-600 bg-clip-text text-transparent drop-shadow-sm">
                  ERP System
                </span>
                <p className="text-xs text-gray-500 font-medium">نظام إدارة متكامل</p>
              </div>
            </Link>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-10 p-2.5 rounded-xl bg-gradient-to-br from-orange-50 to-blue-50 hover:from-orange-100 hover:to-blue-100 transition-all duration-300 hidden lg:flex items-center justify-center group shadow-sm hover:shadow-md"
          >
            <ChevronLeftIcon
              className={`w-5 h-5 text-gray-700 transition-transform duration-300 group-hover:scale-110 ${
                isOpen ? "" : "rotate-180"
              }`}
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="relative flex-1 overflow-y-auto py-4 px-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {/* Home Link */}
          <Link
            href="/"
            className={`relative flex items-center gap-3 px-4 py-3 mb-3 rounded-xl transition-all duration-300 group overflow-hidden ${
              isActive("/")
                ? "bg-gradient-to-r from-orange-500 via-orange-600 to-blue-500 text-white shadow-lg shadow-orange-500/30"
                : "text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50/50 hover:shadow-md"
            }`}
          >
            {!isActive("/") && (
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/0 to-blue-500/0 group-hover:from-orange-500/5 group-hover:via-orange-500/5 group-hover:to-blue-500/5 transition-all duration-300" />
            )}
            <HomeIcon className={`w-5 h-5 flex-shrink-0 relative z-10 transition-transform duration-300 ${isActive("/") ? "" : "group-hover:scale-110"}`} />
            {isOpen && <span className="font-semibold relative z-10">الرئيسية</span>}
            {isActive("/") && isOpen && (
              <div className="mr-auto">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              </div>
            )}
          </Link>

          {/* Menu Sections */}
          {menuSections.map((section, index) => (
            <div key={section.title} className="mb-3">
              <button
                onClick={() => toggleSection(section.title)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 font-bold text-sm group relative overflow-hidden ${
                  expandedSections.has(section.title)
                    ? "bg-gradient-to-r from-orange-50 to-blue-50 text-gray-800 shadow-sm"
                    : "text-gray-600 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50/30"
                } ${!isOpen && "justify-center"}`}
              >
                {!expandedSections.has(section.title) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 to-blue-500/0 group-hover:from-orange-500/5 group-hover:to-blue-500/5 transition-all duration-300" />
                )}
                {isOpen ? (
                  <>
                    <span className="relative z-10 flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        expandedSections.has(section.title) 
                          ? "bg-gradient-to-r from-orange-500 to-blue-500" 
                          : "bg-gray-400 group-hover:bg-gray-500"
                      }`} />
                      {section.title}
                    </span>
                    <ChevronDownIcon
                      className={`w-4 h-4 relative z-10 transition-all duration-300 ${
                        expandedSections.has(section.title) ? "rotate-180 text-orange-600" : "group-hover:scale-110"
                      }`}
                    />
                  </>
                ) : (
                  <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    expandedSections.has(section.title)
                      ? "bg-gradient-to-r from-orange-500 to-blue-500 scale-125"
                      : "bg-gray-400"
                  }`} />
                )}
              </button>

              {/* Submenu Items */}
              {expandedSections.has(section.title) && (
                <div className={`mt-2 space-y-1.5 ${isOpen ? "mr-3 border-r-2 border-gray-200/50 pr-3" : ""}`}>
                  {section.items.map((item, itemIndex) => (
                    <Link
                      key={item.url}
                      href={item.url}
                      className={`relative flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group overflow-hidden ${
                        isActive(item.url)
                          ? "bg-gradient-to-r from-orange-500 via-orange-600 to-blue-500 text-white shadow-lg shadow-orange-500/20 scale-[1.02]"
                          : "text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-md hover:scale-[1.01]"
                      } ${!isOpen && "justify-center"}`}
                      title={!isOpen ? item.name : undefined}
                      style={{
                        animationDelay: `${itemIndex * 50}ms`,
                      }}
                    >
                      {/* Hover gradient effect */}
                      {!isActive(item.url) && (
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/0 to-blue-500/0 group-hover:from-orange-500/10 group-hover:via-orange-500/5 group-hover:to-blue-500/10 transition-all duration-300 rounded-xl" />
                      )}
                      
                      {/* Icon */}
                      <div className={`flex-shrink-0 relative z-10 transition-all duration-300 ${
                        isActive(item.url) ? "" : "group-hover:scale-110 group-hover:rotate-3"
                      }`}>
                        {item.svg}
                      </div>
                      
                      {/* Text */}
                      {isOpen && (
                        <span className="text-sm font-semibold truncate relative z-10">{item.name}</span>
                      )}
                      
                      {/* Active indicator */}
                      {isActive(item.url) && isOpen && (
                        <div className="mr-auto flex gap-1">
                          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                          <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                        </div>
                      )}
                      
                      {/* Border accent for active */}
                      {isActive(item.url) && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/50 rounded-r-full" />
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* User Section */}
        <div className="relative p-5 border-t border-gray-200/50 bg-gradient-to-br from-white/80 via-white/60 to-blue-50/40 backdrop-blur-md">
          {isOpen ? (
            <div className="space-y-3">
              {/* User Info Card */}
              <div className="relative group overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-3.5 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex items-center gap-3 relative z-10">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur opacity-30 animate-pulse" />
                    <UserCircleIcon className="w-10 h-10 text-blue-600 relative" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate flex items-center gap-2">
                      {currentUser?.name || "المستخدم"}
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" title="متصل" />
                    </p>
                    <p className="text-xs text-gray-600 truncate font-medium">
                      {currentUser?.email || "user@example.com"}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-50 to-red-100 text-red-600 rounded-xl hover:from-red-100 hover:to-red-200 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 font-bold text-sm group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 to-red-500/0 group-hover:from-red-500/10 group-hover:to-red-500/5 transition-all duration-300" />
                <ArrowRightOnRectangleIcon className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                <span className="relative z-10">تسجيل الخروج</span>
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center p-3 bg-gradient-to-br from-red-50 to-red-100 text-red-600 rounded-xl hover:from-red-100 hover:to-red-200 hover:shadow-lg transition-all duration-300 group"
              title="تسجيل الخروج"
            >
              <ArrowRightOnRectangleIcon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
            </button>
          )}
        </div>
      </aside>

      {/* Spacer for content */}
      <div className={`${isOpen ? "w-80" : "w-20"} transition-all duration-300 hidden lg:block`} />
    </>
  );
};

export default Sidebar;

