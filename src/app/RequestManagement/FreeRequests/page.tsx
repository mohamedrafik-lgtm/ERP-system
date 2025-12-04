"use client";

import { useState } from "react";
import { useGetTraineeRequestsQuery, useUpdateTraineeRequestMutation, useDeleteTraineeRequestMutation } from "@/lip/features/traineeRequests/traineeRequestsApi";
import { TraineeRequestStatus, TraineeRequestType } from "@/types/traineeRequests";
import { 
  MagnifyingGlassIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  ClockIcon,
  EyeIcon,
  UserIcon,
  DocumentTextIcon,
  CalendarIcon,
  AcademicCapIcon,
  HeartIcon,
  ClipboardDocumentCheckIcon,
  TrashIcon,
  ExclamationTriangleIcon
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

export default function FreeRequestsPage() {
  const [statusFilter, setStatusFilter] = useState<TraineeRequestStatus | 'ALL'>('ALL');
  const [typeFilter, setTypeFilter] = useState<TraineeRequestType | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState<string | null>(null);

  const { data, isLoading, error, refetch } = useGetTraineeRequestsQuery();
  const [updateRequest] = useUpdateTraineeRequestMutation();
  const [deleteRequest, { isLoading: isDeleting }] = useDeleteTraineeRequestMutation();

  const handleApprove = async (id: string) => {
    try {
      await updateRequest({
        id,
        status: 'APPROVED',
        adminResponse: 'تم الموافقة على الطلب',
      }).unwrap();
      toast.success('تم الموافقة على الطلب بنجاح');
      refetch();
    } catch (error) {
      toast.error('حدث خطأ أثناء الموافقة على الطلب');
    }
  };

  const handleReject = async (id: string) => {
    try {
      await updateRequest({
        id,
        status: 'REJECTED',
        adminResponse: 'تم رفض الطلب',
      }).unwrap();
      toast.success('تم رفض الطلب');
      refetch();
    } catch (error) {
      toast.error('حدث خطأ أثناء رفض الطلب');
    }
  };

  const openDeleteModal = (id: string) => {
    setRequestToDelete(id);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setRequestToDelete(null);
  };

  const confirmDelete = async () => {
    if (!requestToDelete) return;
    
    try {
      await deleteRequest(requestToDelete).unwrap();
      toast.success('تم حذف الطلب بنجاح');
      closeDeleteModal();
      refetch();
    } catch (error) {
      toast.error('حدث خطأ أثناء حذف الطلب');
    }
  };

  const getRequestTypeLabel = (type: TraineeRequestType) => {
    const labels = {
      EXAM_POSTPONE: 'تأجيل اختبار',
      SICK_LEAVE: 'إجازة مرضية',
      ENROLLMENT_PROOF: 'إثبات قيد',
      CERTIFICATE: 'شهادة',
    };
    return labels[type];
  };

  const getRequestTypeIcon = (type: TraineeRequestType) => {
    const icons = {
      EXAM_POSTPONE: <CalendarIcon className="w-5 h-5" />,
      SICK_LEAVE: <HeartIcon className="w-5 h-5" />,
      ENROLLMENT_PROOF: <ClipboardDocumentCheckIcon className="w-5 h-5" />,
      CERTIFICATE: <AcademicCapIcon className="w-5 h-5" />,
    };
    return icons[type];
  };

  const getStatusBadge = (status: TraineeRequestStatus) => {
    const styles = {
      PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      APPROVED: 'bg-green-100 text-green-800 border-green-200',
      REJECTED: 'bg-red-100 text-red-800 border-red-200',
    };
    
    const labels = {
      PENDING: 'قيد المراجعة',
      APPROVED: 'مقبول',
      REJECTED: 'مرفوض',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // فلترة البيانات محلياً
  const filteredData = data?.data.filter(request => {
    // فلترة حسب الحالة
    if (statusFilter !== 'ALL' && request.status !== statusFilter) {
      return false;
    }
    
    // فلترة حسب النوع
    if (typeFilter !== 'ALL' && request.type !== typeFilter) {
      return false;
    }
    
    // فلترة حسب البحث
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      return (
        request.trainee.nameAr.toLowerCase().includes(searchLower) ||
        request.trainee.nationalId.includes(searchQuery) ||
        getRequestTypeLabel(request.type).toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  }) || [];

  // حساب الإحصائيات
  const stats = {
    total: data?.data.length || 0,
    pending: data?.data.filter(r => r.status === 'PENDING').length || 0,
    approved: data?.data.filter(r => r.status === 'APPROVED').length || 0,
    rejected: data?.data.filter(r => r.status === 'REJECTED').length || 0,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">الطلبات المجانية</h1>
          <p className="text-gray-600">إدارة طلبات المتدربين المجانية (تأجيل اختبار، إجازة مرضية، إثبات قيد، شهادة)</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm mb-1">إجمالي الطلبات</p>
                <p className="text-4xl font-bold">{stats.total}</p>
              </div>
              <div className="p-3 bg-white/20 rounded-xl">
                <DocumentTextIcon className="w-8 h-8" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border-2 border-yellow-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-600 text-sm mb-1 font-medium">قيد المراجعة</p>
                <p className="text-4xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-xl">
                <ClockIcon className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border-2 border-green-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm mb-1 font-medium">مقبول</p>
                <p className="text-4xl font-bold text-green-600">{stats.approved}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <CheckCircleIcon className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border-2 border-red-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-600 text-sm mb-1 font-medium">مرفوض</p>
                <p className="text-4xl font-bold text-red-600">{stats.rejected}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-xl">
                <XCircleIcon className="w-8 h-8 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-6">
          <div className="flex flex-col gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="بحث بالاسم، الرقم القومي، أو نوع الطلب..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <span className="text-gray-700 font-medium whitespace-nowrap">الحالة:</span>
                <button
                  onClick={() => setStatusFilter('ALL')}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    statusFilter === 'ALL'
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  الكل
                </button>
                <button
                  onClick={() => setStatusFilter('PENDING')}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    statusFilter === 'PENDING'
                      ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  قيد المراجعة
                </button>
                <button
                  onClick={() => setStatusFilter('APPROVED')}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    statusFilter === 'APPROVED'
                      ? 'bg-green-100 text-green-800 border-2 border-green-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  مقبول
                </button>
                <button
                  onClick={() => setStatusFilter('REJECTED')}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    statusFilter === 'REJECTED'
                      ? 'bg-red-100 text-red-800 border-2 border-red-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  مرفوض
                </button>
              </div>

              {/* Type Filter */}
              <div className="flex items-center gap-2">
                <span className="text-gray-700 font-medium whitespace-nowrap">النوع:</span>
                <button
                  onClick={() => setTypeFilter('ALL')}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    typeFilter === 'ALL'
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  الكل
                </button>
                <button
                  onClick={() => setTypeFilter('EXAM_POSTPONE')}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    typeFilter === 'EXAM_POSTPONE'
                      ? 'bg-blue-100 text-blue-800 border-2 border-blue-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  تأجيل اختبار
                </button>
                <button
                  onClick={() => setTypeFilter('SICK_LEAVE')}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    typeFilter === 'SICK_LEAVE'
                      ? 'bg-pink-100 text-pink-800 border-2 border-pink-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  إجازة مرضية
                </button>
                <button
                  onClick={() => setTypeFilter('ENROLLMENT_PROOF')}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    typeFilter === 'ENROLLMENT_PROOF'
                      ? 'bg-indigo-100 text-indigo-800 border-2 border-indigo-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  إثبات قيد
                </button>
                <button
                  onClick={() => setTypeFilter('CERTIFICATE')}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    typeFilter === 'CERTIFICATE'
                      ? 'bg-teal-100 text-teal-800 border-2 border-teal-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  شهادة
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Requests Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">المتدرب</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">نوع الطلب</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">التاريخ</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">الحالة</th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                      </div>
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-red-600">
                      حدث خطأ في تحميل البيانات
                    </td>
                  </tr>
                ) : filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      لا توجد طلبات
                    </td>
                  </tr>
                ) : (
                  filteredData.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-purple-100 rounded-xl">
                            <UserIcon className="w-6 h-6 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{request.trainee.nameAr}</p>
                            <p className="text-sm text-gray-600">{request.trainee.program.nameAr}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                            {getRequestTypeIcon(request.type)}
                          </div>
                          <span className="font-medium text-gray-900">{getRequestTypeLabel(request.type)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600">{formatDate(request.createdAt)}</p>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(request.status)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                            title="عرض"
                          >
                            <EyeIcon className="w-5 h-5" />
                          </button>
                          {request.status === 'PENDING' && (
                            <>
                              <button
                                onClick={() => handleApprove(request.id)}
                                className="px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium text-sm"
                              >
                                قبول
                              </button>
                              <button
                                onClick={() => handleReject(request.id)}
                                className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium text-sm"
                              >
                                رفض
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Results Count */}
          {filteredData.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                عرض {filteredData.length} من {data?.data.length || 0} طلب
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}