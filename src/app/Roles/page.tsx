"use client";

import RolesPermissionsTable from "@/components/Roles/PowersTable";
import RoleModel from "@/components/Roles/RoleModel";
import Paginator from "@/components/ui/paginator";
import { useGetRolesQuery } from "@/lip/features/roles/rolesApi";
import { useState, useMemo } from "react";

const Powers = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const limit = 10;

  const { data: roles = [], isLoading, error, refetch } = useGetRolesQuery();

  // Filter and paginate roles
  const filteredRoles = useMemo(() => {
    if (!Array.isArray(roles)) return [];
    
    let filtered = roles;
    
    if (searchTerm) {
      filtered = filtered.filter(role =>
        role.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        role.nameAr?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        role.nameEn?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [roles, searchTerm]);

  const paginatedRoles = useMemo(() => {
    const startIndex = (page - 1) * limit;
    return filteredRoles.slice(startIndex, startIndex + limit);
  }, [filteredRoles, page, limit]);

  const totalPages = Math.ceil(filteredRoles.length / limit);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">الصلاحيات</h1>
          <p className="text-gray-600">يمكنك التحكم في الصلاحيات وإنشاء أي صلاحية تريدها.</p>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <RoleModel btContent={'+ إضافة جديد'} title="إضافة صلاحية جديدة" />
          
          {/* Search */}
          <div className="w-64">
            <input
              type="text"
              placeholder="البحث في الصلاحيات..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1); // Reset to first page when searching
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <span className="mr-3 text-gray-600">جاري تحميل البيانات...</span>
            </div>
          </div>
        ) : error ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="text-center">
              <div className="text-red-500 text-lg font-medium mb-2">خطأ في تحميل البيانات</div>
              <p className="text-gray-600 mb-4">حدث خطأ أثناء جلب بيانات الصلاحيات</p>
              <button 
                onClick={() => refetch()}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                إعادة المحاولة
              </button>
            </div>
          </div>
        ) : (
          <>
            <RolesPermissionsTable roles={paginatedRoles} isLoading={isLoading} />
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center">
                <Paginator 
                  totalPages={totalPages}
                  currentPage={page}
                  onPageChange={setPage}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Powers;