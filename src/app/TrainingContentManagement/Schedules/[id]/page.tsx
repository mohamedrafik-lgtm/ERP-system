"use client";
import { useParams, useRouter } from "next/navigation";
import { Calendar, ChevronLeft, ArrowLeft, RefreshCw, AlertCircle } from "lucide-react";
import { useGetProgramByIdQuery } from "@/lip/features/program/program";

const ProgramScheduleDetail = () => {
  const params = useParams();
  const router = useRouter();
  const programId = parseInt(params.id as string);

  const { data: program, isLoading, error, refetch } = useGetProgramByIdQuery(programId);

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
              <div className="w-24 h-24 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <RefreshCw className="w-12 h-12 text-blue-500 animate-spin" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">جاري التحميل...</h3>
              <p className="text-gray-600">يرجى الانتظار بينما نقوم بجلب بيانات البرنامج التدريبي</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !program) {
    return (
      <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-12 h-12 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">حدث خطأ</h3>
              <p className="text-gray-600">لم نتمكن من جلب بيانات البرنامج التدريبي</p>
              <div className="flex gap-4 justify-center mt-6">
                <button
                  onClick={() => refetch()}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  إعادة المحاولة
                </button>
                <button
                  onClick={() => router.back()}
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  العودة
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // استخدام البيانات الحقيقية من program.classrooms
  const classrooms = program.classrooms || [];

  return (
    <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
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

          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <span>لوحة التحكم</span>
            <ChevronLeft className="w-4 h-4" />
            <span>الجدول الدراسي</span>
            <ChevronLeft className="w-4 h-4" />
            <span className="text-gray-900 font-medium">{program.nameAr}</span>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-2">{program.nameAr}</h2>
          <p className="text-gray-600">اختر الفصل الدراسي لإدارة جدوله</p>
        </div>

        {classrooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {classrooms.map((classroom, index: number) => {
              // استخدام البيانات الحقيقية فقط
              const hasDateInfo = classroom.startDate && classroom.endDate;
              const daysStatus = hasDateInfo
                ? calculateDaysStatus(classroom.startDate, classroom.endDate)
                : null;

              return (
                <div
                  key={classroom.id}
                  className="group cursor-pointer"
                  onClick={() => {
                    console.log('Selected classroom:', classroom);
                  }}
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

                    <div className={`flex justify-center ${daysStatus ? 'mb-4' : 'mt-6 mb-4'}`}>
                      <div className="w-20 h-20 bg-blue-500 rounded-2xl flex flex-col items-center justify-center text-white shadow-lg">
                        <span className="text-3xl font-bold">{classroom.classNumber}</span>
                        <span className="text-xs">فصل</span>
                      </div>
                    </div>

                    <div className="px-6 pb-4">
                      <h3 className="text-xl font-bold text-gray-900 text-center mb-6">
                        {classroom.name}
                      </h3>

                      {/* Dates - فقط إذا كانت البيانات متوفرة */}
                      {hasDateInfo && (
                        <div className="space-y-3 mb-6">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-green-500" />
                              <span className="text-gray-600">البداية:</span>
                            </div>
                            <span className="font-medium text-gray-900">
                              {formatDate(classroom.startDate)}
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-red-500" />
                              <span className="text-gray-600">النهاية:</span>
                            </div>
                            <span className="font-medium text-gray-900">
                              {formatDate(classroom.endDate)}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Classroom Info */}
                      <div className="mb-6 text-sm text-gray-600 text-center">
                        <span>المحتويات التدريبية: </span>
                        <span className="font-semibold text-gray-900">{classroom._count.trainingContents}</span>
                      </div>

                      <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group-hover:bg-blue-50">
                        <span className="text-gray-700 font-medium group-hover:text-blue-600">
                          إدارة الجدول
                        </span>
                        <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:-translate-x-1 transition-all" />
                      </button>
                    </div>
                  </div>
                </div>
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
                <p className="text-gray-500 font-medium text-lg">لا توجد فصول دراسية</p>
                <p className="text-gray-400 text-sm mt-2">لم يتم إضافة أي فصول دراسية لهذا البرنامج بعد</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgramScheduleDetail;