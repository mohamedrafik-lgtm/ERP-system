"use client";

import Link from "next/link";
import RoleModel from "./RoleModel";
import { RoleResponse } from "@/types/role.types";

interface RolesPermissionsTableProps {
  roles: RoleResponse[];
  isLoading?: boolean;
}

const RolesPermissionsTable = ({ roles, isLoading }: RolesPermissionsTableProps) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="mr-3 text-gray-600">جاري التحميل...</span>
        </div>
      </div>
    );
  }

  if (!roles || roles.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="text-center text-gray-500">
          لا توجد صلاحيات متاحة
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="space-y-4">
      {/* عنوان الأعمدة */}
      <div className="grid grid-cols-6 bg-white font-bold text-sm p-4 rounded-xl shadow-sm border border-gray-200">
        <div>م</div>
        <div>الاسم</div>
        <div>المستخدمين</div>
        <div className="text-center">الصلاحيات</div>
        <div className="text-center">إدارة</div>
        <div className="text-center">تحكم</div>
      </div>

      {/* صفوف البيانات */}
      {roles.map((role, idx) => {
        const roleId = typeof role.id === 'string' ? role.id : String(role.id);
        const roleName = role.nameAr || role.nameEn || role.name || 'بدون اسم';
        const userCount = role.userCount || role._count?.users || 0;
        
        return (
          <div
            key={roleId}
            className="grid grid-cols-6 items-center bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200"
          >
            <div className="text-sm font-semibold text-gray-900">{idx + 1}</div>
            <div className="text-sm font-medium text-gray-900">{roleName}</div>
            <div className="text-sm">
              <div className="w-fit px-3 py-1.5 flex items-center gap-2 bg-blue-50 text-blue-700 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                </svg>
                <span className="font-semibold">{userCount}</span>
              </div>
            </div>
  
            {/* عرض عدد الصلاحيات */}
            <div className="text-center">
              <span className="px-3 py-1.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-50 text-purple-700 ring-1 ring-purple-200">
                {role.permissions?.length || 0} صلاحيات
              </span>
            </div>

            {/* زر إدارة */}
            <div className="flex justify-center">
              <Link
                href={`#`}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm flex items-center gap-1"
              >
                إدارة
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </Link>
            </div>

            {/* تحكم */}
            <div className="flex justify-center gap-2">
              <RoleModel 
                title="تعديل الصلاحية" 
                btContent={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
                } 
                className="bg-white hover:bg-gray-100 px-3 py-1.5 rounded-md text-sm transition-colors border border-gray-200"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
  
  export default RolesPermissionsTable;
  