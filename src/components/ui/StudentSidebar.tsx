"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  User, 
  BookOpen, 
  CreditCard, 
  FileText, 
  Calendar, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  BarChart3,
  MessageSquare,
  Download,
  Clock,
  TrendingUp,
  FileCheck,
  Award,
  Users,
  UserCheck,
  UserX,
  UserPlus
} from "lucide-react";

interface StudentSidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

const StudentSidebar = ({ isCollapsed = false, onToggle }: StudentSidebarProps) => {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigationItems = [
    {
      name: "الرئيسية",
      href: "/StudentPlatform",
      icon: Home,
      description: "لوحة التحكم الرئيسية"
    },
    {
      name: "الملف الشخصي",
      href: "/StudentPlatform/profile",
      icon: User,
      description: "عرض وتعديل البيانات الشخصية"
    },
    {
      name: "البرنامج التدريبي",
      href: "/StudentPlatform/program",
      icon: BookOpen,
      description: "معلومات البرنامج والمواد"
    },
    {
      name: "الجدول الدراسي",
      href: "/StudentPlatform/schedule",
      icon: Clock,
      description: "جدول المحاضرات والدروس"
    },
    {
      name: "سجل الحضور",
      href: "/StudentPlatform/attendance",
      icon: Calendar,
      description: "متابعة الحضور والغياب"
    },
    {
      name: "المدفوعات",
      href: "/StudentPlatform/my-payments",
      icon: CreditCard,
      description: "حالة المدفوعات والرسوم"
    },
    {
      name: "المستندات",
      href: "/StudentPlatform/documents",
      icon: FileText,
      description: "المستندات والملفات"
    },
    {
      name: "التقييمات",
      href: "/StudentPlatform/assessments",
      icon: BarChart3,
      description: "النتائج والتقييمات"
    },
    {
      name: "الاختبارات الإلكترونية",
      href: "/StudentPlatform/exams",
      icon: FileCheck,
      description: "الاختبارات المتاحة والإجابة عليها"
    },
    {
      name: "الدرجات",
      href: "/StudentPlatform/grades",
      icon: Award,
      description: "عرض الدرجات والمعدلات"
    },
    {
      name: "الإحصائيات المتقدمة",
      href: "/StudentPlatform/advanced-stats",
      icon: TrendingUp,
      description: "إحصائيات مفصلة عن النشاط"
    },
    {
      name: "الرسائل",
      href: "/StudentPlatform/messages",
      icon: MessageSquare,
      description: "الرسائل والإشعارات"
    },
    {
      name: "التقارير",
      href: "/StudentPlatform/reports",
      icon: Download,
      description: "تحميل التقارير"
    },
    // إدارة التوزيع
    {
      name: "التوزيعات",
      href: "/StudentPlatform/distributions",
      icon: Users,
      description: "عرض جميع التوزيعات"
    },
    {
      name: "إدارة التوزيع",
      href: "/StudentPlatform/distribution-management",
      icon: UserCheck,
      description: "إدارة وتنظيم التوزيعات"
    },
    {
      name: "طلاب غير موزعين",
      href: "/StudentPlatform/unassigned-students",
      icon: UserX,
      description: "الطلاب الذين لم يتم توزيعهم"
    }
  ];

  const isActive = (href: string) => {
    if (href === "/StudentPlatform") {
      return pathname === "/StudentPlatform";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 right-0 h-full bg-white border-l border-gray-200 shadow-xl z-50
        transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-16' : 'w-64'}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        lg:relative lg:translate-x-0 lg:z-auto lg:flex-shrink-0 lg:block
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">منصة الطالب</h2>
                <p className="text-xs text-gray-500">نظام إدارة التدريب</p>
              </div>
            </div>
          )}
          
          {/* Toggle Button */}
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            {isCollapsed ? (
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200
                  ${active 
                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border-r-4 border-blue-500' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }
                  ${isCollapsed ? 'justify-center' : ''}
                `}
                onClick={() => setIsMobileOpen(false)}
              >
                <Icon className={`w-5 h-5 ${active ? 'text-blue-600' : 'text-gray-500'}`} />
                {!isCollapsed && (
                  <div className="flex-1">
                    <span className="text-sm font-medium">{item.name}</span>
                    <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4">
          <Link
            href="/StudentPlatform/settings"
            className={`
              flex items-center space-x-3 px-3 py-3 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200
              ${isCollapsed ? 'justify-center' : ''}
            `}
          >
            <Settings className="w-5 h-5 text-gray-500" />
            {!isCollapsed && (
              <span className="text-sm font-medium">الإعدادات</span>
            )}
          </Link>
          
          <button
            className={`
              flex items-center space-x-3 px-3 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200 w-full
              ${isCollapsed ? 'justify-center' : ''}
            `}
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && (
              <span className="text-sm font-medium">تسجيل الخروج</span>
            )}
          </button>
        </div>
      </aside>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 right-4 z-40 lg:hidden p-2 bg-white rounded-lg shadow-lg border border-gray-200"
      >
        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </>
  );
};

export default StudentSidebar;
