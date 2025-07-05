"use client";

import { useGetMarketersQuery } from "@/lip/features/Marketer/Marketer";
import Image from "next/image";

const MarketerTable = () => {
  const { data } = useGetMarketersQuery();

  return (
    <div className="space-y-4">
      {/* عنوان الأعمدة */}
      <div className="grid grid-cols-5 bg-white font-bold text-sm p-2 rounded-md">
        <div className="text-center">الاسم</div>
        <div className="text-center">رقم الهاتف الاساسي</div>
        <div className="text-center">رقم الهاتف الثاني</div>
        <div className="text-center">عدد الطلاب</div>
        <div className="text-center">الاجراءات</div>
      </div>

      {/* صفوف البيانات */}
      {data?.map((marketer) => (
        <div
          key={marketer.id}
          className="grid grid-cols-5 items-center bg-white hover:text-white backdrop-blur-md rounded-xl p-2 shadow-sm hover:shadow-md hover:bg-orange-600 transition-all duration-200"
        >
          <div className="flex items-center justify-center gap-2">
          <Image
  src={
    marketer.photoUrl
      ? marketer.photoUrl.startsWith("http")
        ? marketer.photoUrl
        : marketer.photoUrl.startsWith("/")
          ? marketer.photoUrl
          : "/default-avatar.png"
      : "/default-avatar.png"
  }
  alt={`صورة ${marketer.name}`}
  width={40}
  height={40}
  className="w-10 h-10 rounded-full object-cover"
/>


            <span className="text-sm">{marketer.name}</span>
          </div>

          <div className="text-sm text-center">{marketer.primaryPhone}</div>
          <div className="text-sm text-center">{marketer.secondaryPhone}</div>
          <div className="text-sm text-center">{ 0}</div>

          <div className="flex justify-center gap-2">
            <button className="bg-orange-500 text-white px-4 py-1.5 rounded-md hover:bg-orange-600 transition-all duration-200 text-xs">
              تعديل
            </button>
            <button className="bg-red-500 text-white px-4 py-1.5 rounded-md hover:bg-red-600 transition-all duration-200 text-xs">
              حذف
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MarketerTable;
