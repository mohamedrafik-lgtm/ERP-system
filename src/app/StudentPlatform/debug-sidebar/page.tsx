"use client";

import { useState } from "react";
import { Users, UserCheck, UserX, AlertCircle, CheckCircle } from "lucide-react";

const DebugSidebarPage = () => {
  const [showDebug, setShowDebug] = useState(false);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">تشخيص الـ Sidebar</h1>
        <p className="text-gray-600 mb-4">هذه صفحة لتشخيص مشكلة عدم ظهور عناصر إدارة التوزيع</p>
        
        <button
          onClick={() => setShowDebug(!showDebug)}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          {showDebug ? 'إخفاء' : 'إظهار'} معلومات التشخيص
        </button>
      </div>

      {showDebug && (
        <div className="bg-red-50 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-red-900 mb-4">معلومات التشخيص</h2>
          <div className="space-y-3 text-red-800">
            <div className="flex items-start gap-3">
              <span className="font-bold">1.</span>
              <span>تأكد من ظهور الـ sidebar على الجانب الأيمن</span>
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
              <span>إذا لم تظهر العناصر، تحقق من:</span>
            </div>
            <div className="mr-6 space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                <span>تحديث الصفحة (F5)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                <span>مسح ذاكرة التخزين المؤقت</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                <span>إعادة تشغيل الخادم</span>
              </div>
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

      <div className="mt-8 bg-yellow-50 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="w-6 h-6 text-yellow-600" />
          <h3 className="font-semibold text-yellow-900">خطوات الحل</h3>
        </div>
        <div className="space-y-2 text-yellow-800">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
            <span>تحديث الصفحة (F5)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
            <span>مسح ذاكرة التخزين المؤقت (Ctrl+Shift+R)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
            <span>إعادة تشغيل الخادم (npm run dev)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
            <span>التحقق من أن الـ sidebar يظهر على الجانب الأيمن</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebugSidebarPage;

