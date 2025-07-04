"use client";

import { studentActions } from "@/data";
import Image from "next/image";
import { useRouter } from "next/navigation";
import InlineMenu from "../ui/MenuReport";
import { useGetStudentsQuery } from "@/lip/features/student/student";
import { memo, useState } from "react";
import { Input } from "../input";
import { RowCardSkeleton } from "../ui/Skeleton";

const StudentTable = () => {
  const router = useRouter();
  const { data, isError, isLoading, isSuccess } = useGetStudentsQuery();
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);

   if(isLoading) return <RowCardSkeleton/>;


  return (
    <div className="relative overflow-visible p-4 space-y-5">
      {/* input دفع قسط */}
      {selectedStudentId && (
        <form className="flex justify-end mb-6">
          
          <div className="flex justify-center items-center space-x-5 w-full">
            <button type="submit" className='text-md text-white px-5 py-1 bg-orange-600 rounded-xl'>دفع</button>
            <Input
              id="installmentAmount"
              type="number"
              placeholder="أدخل قيمة القسط"
              className="p-2 border max-w-md border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 w-full text-end"
            />
             <label htmlFor="installmentAmount" className="mb-1 text-md w-24 font-medium text-gray-700">
              دفع قسط
            </label>
          </div>
          
        </form>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-11 bg-white font-bold text-sm p-4 rounded-xl">
        <div className="text-center">الصورة</div>
        <div className="text-center">الاسم</div>
        <div className="text-center">رقم الملف</div>
        <div className="text-center">الهاتف الأرضي</div>
        <div className="text-center ">التخصص</div>
        <div className="text-center">الهاتف المحمول</div>
        <div className="text-center">مدين</div>
        <div className="text-center">الفرقه</div>
        <div className="text-center">الرقم الثابت</div>
        <div className="text-center col-span-2">الاجراءات</div>
      </div>

      {data?.map((student, idx) => (
        <div
          key={idx}
          className="relative z-[100] bg-white backdrop-blur-md rounded-xl  p-2 shadow-sm hover:shadow-md transition-all duration-200"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-11 items-center">
            <div>
              <Image
                src={`/${student.photoUrl}`}
                alt={student.nameEn}
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
            <div className="px-4 py-3 text-center font-medium ">{student.nameAr}</div>
            <div className="px-4 py-3 text-center ">{student.id}</div>
            <div className="px-4 py-3 text-center ">{student.landline}</div>
            <div className="px-4 py-3 text-center ">{student.program?.nameAr}</div>
            <div className="px-4 py-3 text-center ">{student.phone}</div>
            <div className="px-4 py-3 text-center font-semibold ">1</div>
            <div className="px-4 py-3 text-center ">1</div>
            <div className="px-4 py-3 text-center ">{student.guardianNationalId}</div>

            <div
              className="relative px-4 py-3 flex justify-center space-x-2 col-span-2 text-sm"
              onClick={(e) => e.stopPropagation()}
            >
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
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                }
              />

              {/* زر التحديث */}
              <button
                onClick={() => router.push(`/AllStudent/${student.id}`)}
                className="bg-white/20 hover:bg-white/50 py-1 px-2 rounded-md cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </button>

              {/* زر التحديد */}
              <button
                onClick={() => {
                  if (selectedStudentId === student.id) {
                    setSelectedStudentId(null); // إلغاء التحديد
                  } else if (selectedStudentId === null) {
                    setSelectedStudentId(student.id); // تحديد الطالب
                  } else {
                    alert("يجب إلغاء التحديد الحالي أولاً قبل اختيار طالب آخر.");
                  }
                }}
                className={`py-1 px-2 rounded-md cursor-pointer transition ${
                  selectedStudentId === student.id
                    ? "bg-green-500 text-white"
                    : "hover:bg-white/50"
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
