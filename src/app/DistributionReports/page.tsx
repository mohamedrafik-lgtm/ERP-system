"use client";

import { useState } from "react";
import { useGetUndistributedTraineesQuery } from "@/lip/features/distribution/undistributedTraineesApi";
import Image from "next/image";
import { 
  MagnifyingGlassIcon,
  ArrowPathIcon,
  UserGroupIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";

export default function UndistributedTraineesPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const { data, isLoading, error, refetch } = useGetUndistributedTraineesQuery({
    page,
    limit,
  });

  const handleDistribute = (traineeId: number) => {
    // سيتم تنفيذها لاحقاً
    console.log('Distribute trainee:', traineeId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">الطلاب غير الموزعين</h1>
              <p className="text-gray-600">قائمة المتدربين الذين لم يتم توزيعهم على المجموعات بعد</p>
            </div>
            <button
              onClick={() => refetch()}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              <ArrowPathIcon className="w-5 h-5" />
              تحديث
            </button>
          </div>
        </div>

        {/* Stats */}
        {data && (
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-6 mb-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <UserGroupIcon className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-blue-100 text-sm">إجمالي الطلاب غير الموزعين</p>
                  <p className="text-4xl font-bold">{data.pagination.total}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-blue-100 text-sm">الصفحة {data.pagination.page} من {data.pagination.totalPages}</p>
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">#</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">المتدرب</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">الرقم القومي</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">البرنامج</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                      </div>
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-red-600">
                      حدث خطأ في تحميل البيانات
                    </td>
                  </tr>
                ) : data?.trainees.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      لا يوجد طلاب غير موزعين
                    </td>
                  </tr>
                ) : (
                  data?.trainees.map((trainee, index) => (
                    <tr key={trainee.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="text-gray-600 font-medium">{((page - 1) * limit) + index + 1}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {trainee.photoUrl ? (
                            <Image
                              src={trainee.photoUrl}
                              alt={trainee.nameAr}
                              width={48}
                              height={48}
                              className="rounded-full object-cover border-2 border-gray-200"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                              {trainee.nameAr.charAt(0)}
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-gray-900">{trainee.nameAr}</p>
                            <p className="text-sm text-gray-600">{trainee.nameEn}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-mono text-gray-700">{trainee.nationalId}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          {trainee.program.nameAr}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDistribute(trainee.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                        >
                          <ArrowRightIcon className="w-4 h-4" />
                          توزيع
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {data && data.pagination.totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                عرض {((page - 1) * limit) + 1} - {Math.min(page * limit, data.pagination.total)} من {data.pagination.total}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={!data.pagination.hasPrev}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  السابق
                </button>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={!data.pagination.hasNext}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  التالي
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}