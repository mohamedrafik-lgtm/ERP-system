"use client";

import { useState } from "react";
import { useGetDistributionsQuery, useDeleteDistributionMutation } from "@/lip/features/distribution/distributionApi";
import { Distribution } from "@/types/distribution";
import { 
  PlusIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  TrashIcon,
  ArrowPathIcon,
  FunnelIcon
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function DistributionManagementPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'ALL' | 'THEORY' | 'PRACTICAL'>('ALL');

  const { data: distributions, isLoading, error, refetch } = useGetDistributionsQuery();
  const [deleteDistribution, { isLoading: isDeleting }] = useDeleteDistributionMutation();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [distributionToDelete, setDistributionToDelete] = useState<string | null>(null);

  const openDeleteModal = (id: string) => {
    setDistributionToDelete(id);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setDistributionToDelete(null);
  };

  const confirmDelete = async () => {
    if (!distributionToDelete) return;
    
    try {
      await deleteDistribution(distributionToDelete).unwrap();
      toast.success('تم حذف التوزيع بنجاح');
      closeDeleteModal();
      refetch();
    } catch (error) {
      toast.error('حدث خطأ أثناء حذف التوزيع');
    }
  };

  // فلترة البيانات
  const filteredDistributions = distributions?.filter(dist => {
    // فلترة حسب النوع
    if (filterType !== 'ALL' && dist.type !== filterType) {
      return false;
    }
    
    // فلترة حسب البحث
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      return (
        dist.program.nameAr.toLowerCase().includes(searchLower) ||
        dist.academicYear.includes(searchQuery)
      );
    }
    
    return true;
  }) || [];

  // حساب إجمالي المتدربين في التوزيع
  const getTotalTrainees = (dist: Distribution) => {
    return dist.rooms.reduce((total, room) => total + room._count.assignments, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">توزيع المتدربين على المجموعات</h1>
              <p className="text-gray-600">إدارة توزيع المتدربين على المجموعات الدراسية</p>
            </div>
            <button
              onClick={() => router.push('/DistributionManagement/create')}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-lg font-medium"
            >
              <PlusIcon className="w-5 h-5" />
              توزيع جديد
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="flex-1 w-full">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="بحث بالبرنامج أو العام الدراسي..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Type Filter */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilterType('ALL')}
                className={`px-4 py-2 rounded-xl font-medium transition-all ${
                  filterType === 'ALL'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                جميع البرامج
              </button>
              <button
                onClick={() => setFilterType('THEORY')}
                className={`px-4 py-2 rounded-xl font-medium transition-all ${
                  filterType === 'THEORY'
                    ? 'bg-green-100 text-green-800 border-2 border-green-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                نظري
              </button>
              <button
                onClick={() => setFilterType('PRACTICAL')}
                className={`px-4 py-2 rounded-xl font-medium transition-all ${
                  filterType === 'PRACTICAL'
                    ? 'bg-purple-100 text-purple-800 border-2 border-purple-300'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                عملي
              </button>
              <button
                onClick={() => refetch()}
                className="p-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                title="تحديث"
              >
                <ArrowPathIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Distributions Grid */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              التوزيعات ({filteredDistributions.length})
            </h2>
            <p className="text-sm text-gray-600">تصفية حسب البرنامج</p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-600">
              حدث خطأ في تحميل البيانات
            </div>
          ) : filteredDistributions.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              لا توجد توزيعات
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredDistributions.map((distribution) => (
                <div
                  key={distribution.id}
                  className={`bg-white rounded-2xl shadow-lg border-2 p-6 hover:shadow-xl transition-all ${
                    distribution.type === 'THEORY' 
                      ? 'border-green-200' 
                      : 'border-blue-200'
                  }`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        distribution.type === 'THEORY' 
                          ? 'bg-green-100' 
                          : 'bg-blue-100'
                      }`}>
                        <span className={`text-sm font-bold ${
                          distribution.type === 'THEORY' 
                            ? 'text-green-700' 
                            : 'text-blue-700'
                        }`}>
                          {distribution.type === 'THEORY' ? '📚 عملي' : '🔬 نظري'}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{distribution.program.nameAr}</h3>
                        <p className="text-sm text-gray-600">العام الدراسي: {distribution.academicYear}</p>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">عدد المجموعات</p>
                      <p className="text-2xl font-bold text-gray-900">{distribution._count.rooms}</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">إجمالي المتدربين</p>
                      <p className="text-2xl font-bold text-gray-900">{getTotalTrainees(distribution)}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => router.push(`/DistributionManagement/${distribution.id}`)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium"
                    >
                      <EyeIcon className="w-4 h-4" />
                      عرض وتعديل
                    </button>
                    <button
                      onClick={() => openDeleteModal(distribution.id)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium"
                    >
                      <TrashIcon className="w-4 h-4" />
                      حذف
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrashIcon className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">تأكيد الحذف</h3>
              <p className="text-gray-600">هل أنت متأكد من حذف هذا التوزيع؟</p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-red-800">
                <strong>تحذير:</strong> سيتم حذف جميع المجموعات والتخصيصات المرتبطة بهذا التوزيع.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={closeDeleteModal}
                disabled={isDeleting}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
              >
                إلغاء
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    جاري الحذف...
                  </>
                ) : (
                  <>
                    <TrashIcon className="w-5 h-5" />
                    حذف التوزيع
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}