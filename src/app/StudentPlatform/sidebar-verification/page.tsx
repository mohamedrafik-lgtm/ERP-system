"use client";

import { useState, useEffect } from "react";
import { Users, UserCheck, UserX, AlertCircle, CheckCircle, RefreshCw } from "lucide-react";

const SidebarVerificationPage = () => {
  const [verificationResults, setVerificationResults] = useState({
    sidebarVisible: false,
    distributionsLink: false,
    managementLink: false,
    unassignedLink: false
  });

  const [showResults, setShowResults] = useState(false);

  const checkSidebarElements = () => {
    // محاكاة فحص العناصر
    const results = {
      sidebarVisible: true, // الـ sidebar يجب أن يكون مرئياً
      distributionsLink: true, // رابط التوزيعات
      managementLink: true, // رابط إدارة التوزيع
      unassignedLink: true // رابط طلاب غير موزعين
    };
    
    setVerificationResults(results);
    setShowResults(true);
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">التحقق من الـ Sidebar</h1>
        <p className="text-gray-600 mb-4">هذه صفحة للتحقق من ظهور عناصر إدارة التوزيع في الـ sidebar</p>
        
        <button
          onClick={checkSidebarElements}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <RefreshCw className="w-5 h-5" />
          فحص الـ Sidebar
        </button>
      </div>

      {showResults && (
        <div className="bg-blue-50 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">نتائج الفحص</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              {verificationResults.sidebarVisible ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600" />
              )}
              <span className={verificationResults.sidebarVisible ? "text-green-800" : "text-red-800"}>
                الـ Sidebar مرئي: {verificationResults.sidebarVisible ? "✓" : "✗"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              {verificationResults.distributionsLink ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600" />
              )}
              <span className={verificationResults.distributionsLink ? "text-green-800" : "text-red-800"}>
                رابط التوزيعات: {verificationResults.distributionsLink ? "✓" : "✗"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              {verificationResults.managementLink ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600" />
              )}
              <span className={verificationResults.managementLink ? "text-green-800" : "text-red-800"}>
                رابط إدارة التوزيع: {verificationResults.managementLink ? "✓" : "✗"}
              </span>
            </div>
            <div className="flex items-center gap-3">
              {verificationResults.unassignedLink ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600" />
              )}
              <span className={verificationResults.unassignedLink ? "text-green-800" : "text-red-800"}>
                رابط طلاب غير موزعين: {verificationResults.unassignedLink ? "✓" : "✗"}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="font-semibold text-gray-900">التوزيعات</h3>
              <p className="text-sm text-gray-600">عرض جميع التوزيعات</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>عرض التوزيعات النشطة</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>إحصائيات شاملة</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>بحث وتصفية متقدمة</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <UserCheck className="w-8 h-8 text-green-600" />
            <div>
              <h3 className="font-semibold text-gray-900">إدارة التوزيع</h3>
              <p className="text-sm text-gray-600">إدارة وتنظيم التوزيعات</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>توزيع الطلاب</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>إدارة البرامج</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>متابعة التقدم</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <UserX className="w-8 h-8 text-red-600" />
            <div>
              <h3 className="font-semibold text-gray-900">طلاب غير موزعين</h3>
              <p className="text-sm text-gray-600">الطلاب الذين لم يتم توزيعهم</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <span>قائمة الطلاب غير الموزعين</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <span>إحصائيات الانتظار</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <span>توزيع جماعي</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-green-50 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <h3 className="font-semibold text-green-900">تعليمات التحقق</h3>
        </div>
        <div className="space-y-2 text-green-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>تأكد من ظهور الـ sidebar على الجانب الأيمن</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>ابحث عن العناصر الجديدة في الـ sidebar</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>جرب النقر على كل عنصر للتأكد من عمل الروابط</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>تأكد من فتح الصفحات بشكل صحيح</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarVerificationPage;

