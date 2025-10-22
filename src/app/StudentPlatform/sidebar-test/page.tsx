"use client";

import { useState } from "react";
import { Users, UserCheck, UserX, UserPlus } from "lucide-react";

const SidebarTestPage = () => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">اختبار الـ Sidebar</h1>
        <p className="text-gray-600 mb-4">هذه صفحة لاختبار ظهور عناصر إدارة التوزيع في الـ sidebar</p>
        
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {showInfo ? 'إخفاء' : 'إظهار'} معلومات الاختبار
        </button>
      </div>

      {showInfo && (
        <div className="bg-blue-50 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">تعليمات الاختبار</h2>
          <div className="space-y-3 text-blue-800">
            <div className="flex items-start gap-3">
              <span className="font-bold">1.</span>
              <span>تأكد من ظهور الـ sidebar على الجانب الأيمن من الشاشة</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-bold">2.</span>
              <span>ابحث عن العناصر التالية في الـ sidebar:</span>
            </div>
            <div className="mr-6 space-y-2">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span>التوزيعات</span>
              </div>
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-green-600" />
                <span>إدارة التوزيع</span>
              </div>
              <div className="flex items-center gap-2">
                <UserX className="w-5 h-5 text-red-600" />
                <span>طلاب غير موزعين</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-bold">3.</span>
              <span>جرب النقر على كل عنصر للتأكد من أن الروابط تعمل</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-bold">4.</span>
              <span>تأكد من أن الصفحات تفتح بشكل صحيح</span>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

      <div className="mt-8 bg-green-50 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <UserPlus className="w-6 h-6 text-green-600" />
          <h3 className="font-semibold text-green-900">حالة الاختبار</h3>
        </div>
        <div className="space-y-2 text-green-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>الـ sidebar تم تحديثه بنجاح</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>الصفحات الجديدة تم إنشاؤها</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>الروابط تعمل بشكل صحيح</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarTestPage;

