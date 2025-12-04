"use client";

import { useGetProgramsQuery } from "@/lip/features/program/program";
import { Calendar, ChevronLeft, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SchedulesPage = () => {
  const { data: programs = [], isLoading, error } = useGetProgramsQuery();
  const router = useRouter();

  // دالة لحساب الأيام المتبقية أو المنقضية
  const calculateDaysStatus = (startDate: string, endDate: string) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (now < start) {
      const daysUntilStart = Math.ceil((start.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return {
        status: 'upcoming',
        text: `يبدأ بعد ${daysUntilStart} يوم`,
        color: 'bg-yellow-100 text-yellow-800'
      };
    } else if (now > end) {
      const daysSinceEnd = Math.ceil((now.getTime() - end.getTime()) / (1000 * 60 * 60 * 24));
      return {
        status: 'ended',
        text: `يبدأ بعد ${daysSinceEnd} يوم`,
        color: 'bg-yellow-100 text-yellow-800'
      };
    } else {
      const daysRemaining = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return {
        status: 'active',
        text: `${daysRemaining} يوم متبقي`,
        color: 'bg-green-100 text-green-800'
      };
    }
  };

  // دالة لتنسيق التاريخ
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">جاري تحميل البرامج التدريبية...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">خطأ في تحميل البيانات</h3>
              <p className="text-gray-600">حدث خطأ أثناء تحميل البرامج التدريبية</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">العودة للبرامج</h1>
            </div>
          </div>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <span>لوحة التحكم</span>
            <ChevronLeft className="w-4 h-4" />
            <span className="text-gray-900 font-medium">الجدول الدراسي</span>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-2">الجدول الدراسي</h2>
          <p className="text-gray-600">اختر البرنامج التدريبي لعرض الفصول الدراسية</p>
        </div>

        {/* Programs Grid */}
        {programs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program, index) => {
              // استخدام البيانات الحقيقية من program إذا كانت متوفرة
              const hasDateInfo = program.createdAt && program.updatedAt;
              const daysStatus = hasDateInfo
                ? calculateDaysStatus(program.createdAt, program.updatedAt)
                : null;

              return (
                <Link
                  key={program.id}
                  href={`/TrainingContentManagement/Schedules/${program.id}`}
                  className="group"
                >
                  <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200">
                    {/* Status Badge - فقط إذا كانت البيانات متوفرة */}
                    {daysStatus && (
                      <div className="p-4 flex justify-center">
                        <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium ${daysStatus.color}`}>
                          {daysStatus.text}
                        </span>
                      </div>
                    )}

                    {/* Program Number */}
                    <div className={`flex justify-center ${daysStatus ? 'mb-4' : 'mt-6 mb-4'}`}>
                      <div className="w-20 h-20 bg-blue-500 rounded-2xl flex flex-col items-center justify-center text-white shadow-lg">
                        <span className="text-3xl font-bold">{index + 1}</span>
                        <span className="text-xs">برنامج</span>
                      </div>
                    </div>

                    {/* Program Title */}
                    <div className="px-6 pb-4">
                      <h3 className="text-xl font-bold text-gray-900 text-center mb-6">
                        {program.nameAr}
                      </h3>

                      {/* Dates - فقط إذا كانت البيانات متوفرة */}
                      {hasDateInfo && (
                        <div className="space-y-3 mb-6">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-green-500" />
                              <span className="text-gray-600">تاريخ الإنشاء:</span>
                            </div>
                            <span className="font-medium text-gray-900">
                              {formatDate(program.createdAt)}
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-blue-500" />
                              <span className="text-gray-600">آخر تحديث:</span>
                            </div>
                            <span className="font-medium text-gray-900">
                              {formatDate(program.updatedAt)}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Program Info */}
                      <div className="space-y-2 mb-6 text-sm text-gray-600">
                        <div className="flex items-center justify-between">
                          <span>السعر:</span>
                          <span className="font-semibold text-gray-900">₪ {program.price}</span>
                        </div>
                        {program._count?.trainees !== undefined && (
                          <div className="flex items-center justify-between">
                            <span>عدد المتدربين:</span>
                            <span className="font-semibold text-gray-900">{program._count.trainees}</span>
                          </div>
                        )}
                      </div>

                      {/* Action Button */}
                      <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group-hover:bg-blue-50">
                        <span className="text-gray-700 font-medium group-hover:text-blue-600">
                          عرض الفصول الدراسية
                        </span>
                        <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:-translate-x-1 transition-all" />
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="flex flex-col items-center gap-4">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                <Calendar className="w-10 h-10 text-gray-400" />
              </div>
              <div>
                <p className="text-gray-500 font-medium text-lg">لا توجد برامج تدريبية</p>
                <p className="text-gray-400 text-sm mt-2">قم بإضافة برنامج تدريبي أولاً</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchedulesPage;
