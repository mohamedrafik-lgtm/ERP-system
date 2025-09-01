"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, ChevronLeft, ChevronRight, Menu, BookOpen, GraduationCap, FileText, Settings, Sparkles } from "lucide-react";

interface NavItem {
  label: string;
  url: string;
  icon: ReactNode;
}

interface AsideProps {
  items: NavItem[];
}

const Aside = ({ items }: AsideProps) => {
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* زر فتح في الموبايل */}
      <button
        className="md:hidden fixed top-20 right-4 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        onClick={() => setIsOpenMobile(true)}
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* سايدبار للموبايل */}
      {isOpenMobile && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300" 
            onClick={() => setIsOpenMobile(false)} 
          />
          <div className="fixed top-0 right-0 w-80 h-full bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white z-50 p-6 shadow-2xl transform transition-transform duration-300">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  إدارة المحتوى
                </span>
              </div>
              <button 
                onClick={() => setIsOpenMobile(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Items */}
            <ul className="space-y-3">
              {items.map((item, index) => {
                const isActive = pathname === item.url;
                return (
                  <li key={index}>
                    <Link href={item.url} onClick={() => setIsOpenMobile(false)}>
                      <div className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group ${
                        isActive 
                          ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 shadow-lg' 
                          : 'hover:bg-white/10 hover:scale-105'
                      }`}>
                        <div className={`p-2 rounded-lg transition-colors duration-200 ${
                          isActive 
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' 
                            : 'bg-white/10 text-blue-300 group-hover:bg-white/20'
                        }`}>
                          {item.icon}
                        </div>
                        <span className={`font-medium transition-colors duration-200 ${
                          isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'
                        }`}>
                          {item.label}
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Footer */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">نظام إدارة التدريب</p>
                    <p className="text-xs text-gray-400">الإصدار 2.0</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* سايدبار للديسكتوب */}
      <aside
        className={`hidden md:flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 border-l border-gray-200/50 transition-all duration-500 ease-in-out h-full shadow-xl ${
          isCollapsed ? "w-20" : "w-72"
        }`}
      >
        {/* Header */}
        <div className={`p-6 flex items-center ${isCollapsed ? "justify-center" : "justify-between"} border-b border-gray-200/50`}>
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  إدارة المحتوى
                </h2>
                <p className="text-sm text-gray-500">نظام التدريب المتقدم</p>
              </div>
            </div>
          )}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-white/50 rounded-lg transition-all duration-200 hover:scale-110 group"
          >
            {isCollapsed ? (
              <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
            )}
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 p-4">
          <ul className="space-y-2">
            {items.map((item, index) => {
              const isActive = pathname === item.url;
              return (
                <li key={index}>
                  <Link href={item.url}>
                    <div className={`group flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                      isCollapsed ? "justify-center" : "justify-start"
                    } ${
                      isActive 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105' 
                        : 'hover:bg-white/70 hover:shadow-md hover:scale-105 text-gray-700'
                    }`}>
                      <div className={`p-2 rounded-lg transition-all duration-200 ${
                        isActive 
                          ? 'bg-white/20' 
                          : 'bg-gray-100 group-hover:bg-blue-100'
                      }`}>
                        {item.icon}
                      </div>
                      {!isCollapsed && (
                        <span className={`font-medium transition-all duration-200 ${
                          isActive ? 'text-white' : 'text-gray-700 group-hover:text-blue-600'
                        }`}>
                          {item.label}
                        </span>
                      )}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Footer */}
        {!isCollapsed && (
          <div className="p-4 border-t border-gray-200/50">
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-4 border border-blue-200/30">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">نظام إدارة التدريب</p>
                  <p className="text-xs text-gray-500">الإصدار 2.0 - 2024</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Aside;
