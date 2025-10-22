"use client";

import { useState } from "react";
import { Users, UserCheck, UserX } from "lucide-react";

const TestSidebarPage = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">اختبار الـ Sidebar</h1>
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {showSidebar ? 'إخفاء' : 'إظهار'} الـ Sidebar
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">عناصر إدارة التوزيع</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <Users className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="font-semibold text-gray-900">التوزيعات</h3>
              <p className="text-sm text-gray-600">عرض جميع التوزيعات</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <UserCheck className="w-8 h-8 text-green-600" />
            <div>
              <h3 className="font-semibold text-gray-900">إدارة التوزيع</h3>
              <p className="text-sm text-gray-600">إدارة وتنظيم التوزيعات</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <UserX className="w-8 h-8 text-red-600" />
            <div>
              <h3 className="font-semibold text-gray-900">طلاب غير موزعين</h3>
              <p className="text-sm text-gray-600">الطلاب الذين لم يتم توزيعهم</p>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">تعليمات الاختبار:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>1. تأكد من ظهور الـ sidebar على الجانب الأيمن</li>
            <li>2. ابحث عن قسم "إدارة التوزيع" في الـ sidebar</li>
            <li>3. جرب النقر على العناصر الجديدة</li>
            <li>4. تأكد من أن الروابط تعمل بشكل صحيح</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TestSidebarPage;

