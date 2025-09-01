"use client";

import { studentActions } from "@/data";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useCallback, useMemo, memo } from "react";

// دالة مساعدة للتعامل مع روابط الصور
const getImageUrl = (photo: any): string => {
  if (!photo) return '/placeholder-avatar.png';
  
  // التعامل مع كائن File
  if (photo instanceof File || (typeof photo === 'object' && photo.toString() === '[object File]')) {
    return '/placeholder-avatar.png';
  }
  
  // إذا كان الراجع هو مسار (string)
  if (typeof photo === 'string') {
    const url = photo.trim();
    // إذا كان المسار يبدأ بـ /uploads، نستخدمه مباشرة
    if (url.startsWith('/uploads')) {
      return url;
    }
  }
  
  return '/placeholder-avatar.png';
};
import InlineMenu from "../ui/MenuReport";
import { useGetStudentsQuery } from "@/lip/features/student/student";
import { Input } from "../input";
import { RowCardSkeleton } from "../ui/Skeleton";

const StudentTable = () => {
  const router = useRouter();
  const { data, isError, isLoading, isSuccess } = useGetStudentsQuery();
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);

   if(isLoading) return <RowCardSkeleton/>;

  return (
    <div className="space-y-4">
      {/* Payment Form */}
      {selectedStudentId && (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-gray-800">دفع قسط للمتدرب المحدد</h4>
          </div>
          <form className="flex items-center gap-4">
            <label htmlFor="installmentAmount" className="text-sm font-semibold text-gray-700 whitespace-nowrap">
              قيمة القسط
            </label>
            <Input
              id="installmentAmount"
              type="number"
              placeholder="أدخل قيمة القسط"
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200"
            />
            <button 
              type="submit" 
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-200 hover:scale-105 shadow-lg"
            >
              دفع القسط
            </button>
          </form>
        </div>
      )}

      {/* Table Header */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-9 bg-gradient-to-r from-gray-50 to-gray-100 font-bold text-sm p-6 rounded-xl border border-gray-200">
        <div className="text-center text-gray-700">الصورة</div>
        <div className="text-center text-gray-700">الاسم</div>
        <div className="text-center text-gray-700">رقم الملف</div>
        <div className="text-center text-gray-700">الهاتف الأرضي</div>
        <div className="text-center text-gray-700">التخصص</div>
        <div className="text-center text-gray-700">الهاتف المحمول</div>
        <div className="text-center text-gray-700">الفرقة</div>
        <div className="text-center text-gray-700 col-span-2">الإجراءات</div>
      </div>

      {/* Table Rows */}
      {data?.map((student, idx) => (
        <div
          key={idx}
          className="bg-white hover:bg-gray-50 rounded-xl p-4 shadow-sm hover:shadow-md border border-gray-100 transition-all duration-200"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-9 items-center gap-4">
            {/* Student Photo */}
            <div className="flex justify-center">
              <div className="w-12 h-12 relative">
                {typeof student.photoUrl === 'string' && student.photoUrl.startsWith('/uploads') ? (
                  <div className="relative w-12 h-12">
                    <img
                      src={`http://localhost:4000${student.photoUrl}`}
                      alt={student.nameEn || "صورة الطالب"}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder-avatar.png';
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center border-2 border-gray-200">
                    <svg
                      className="w-6 h-6 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Student Name */}
            <div className="text-center">
              <span className="font-semibold text-gray-800 bg-gray-100 px-3 py-1 rounded-lg">
                {student.nameAr}
              </span>
            </div>

            {/* Student ID */}
            <div className="text-center">
              <span className="text-sm font-medium text-gray-600 bg-blue-50 px-3 py-1 rounded-lg">
                #{student.id}
              </span>
            </div>

            {/* Landline */}
            <div className="text-center">
              <span className="text-sm text-gray-600">{student.landline || 'غير محدد'}</span>
            </div>

            {/* Program */}
            <div className="text-center">
              <span className="text-sm font-medium text-gray-700 bg-purple-50 px-3 py-1 rounded-lg">
                {student.program?.nameAr || 'غير محدد'}
              </span>
            </div>

            {/* Phone */}
            <div className="text-center">
              <span className="text-sm text-gray-600">{student.phone || 'غير محدد'}</span>
            </div>

            {/* Group */}
            <div className="text-center">
              <span className="text-sm font-medium text-gray-700 bg-orange-50 px-3 py-1 rounded-lg">
                1
              </span>
            </div>

            {/* Actions */}
            <div
              className="flex justify-center gap-2 col-span-2"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Menu Button */}
              <InlineMenu
                name=""
                items={studentActions.map((action) => ({
                  name: action,
                  value: action,
                }))}
                svg={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1-.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                }
              />

              {/* Edit Button */}
              <button
                onClick={() => router.push(`/AllStudent/${student.id}`)}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
                title="تعديل بيانات المتدرب"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </button>

              {/* Select Button */}
              <button
                onClick={() => {
                  if (selectedStudentId === student.id) {
                    setSelectedStudentId(null);
                  } else if (selectedStudentId === null) {
                    setSelectedStudentId(student.id);
                  } else {
                    alert("يجب إلغاء التحديد الحالي أولاً قبل اختيار طالب آخر.");
                  }
                }}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 hover:scale-105 ${
                  selectedStudentId === student.id
                    ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg"
                    : "bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white shadow-sm hover:shadow-md"
                }`}
              >
                {selectedStudentId === student.id ? "تم التحديد" : "تحديد"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(StudentTable) ;