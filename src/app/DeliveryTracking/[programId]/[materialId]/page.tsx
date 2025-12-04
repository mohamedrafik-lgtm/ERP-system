"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useGetDeliveriesListQuery } from "@/lip/features/studyTools/studyToolsApi";
import {
  ArrowRight,
  Search,
  Filter,
  User,
  Phone,
  Calendar,
  CheckCircle,
  Clock,
  RefreshCw,
  AlertCircle,
  XCircle,
  Package,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Eye,
  ClipboardList
} from "lucide-react";
import { DeliveryStatus } from "@/types/studyTools";

export default function DeliveriesListPage() {
  const router = useRouter();
  const params = useParams();
  const programId = params.programId as string;
  const materialId = params.materialId as string;

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<DeliveryStatus | ''>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch deliveries with filters
  const { data, isLoading, error, refetch } = useGetDeliveriesListQuery({
    studyMaterialId: materialId,
    search: searchQuery || undefined,
    status: statusFilter || undefined,
    page: currentPage,
    limit: 20,
  });

  const deliveries = data?.deliveries || [];
  const pagination = data?.pagination;
  const materialName = deliveries[0]?.studyMaterial?.name || 'الأداة الدراسية';
  const programName = deliveries[0]?.studyMaterial?.program?.nameAr || 'البرنامج';

  // Status badge styling
  const getStatusBadge = (status: DeliveryStatus) => {
    const styles = {
      PENDING: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-800',
        icon: Clock,
        label: 'قيد الانتظار'
      },
      DELIVERED: {
        bg: 'bg-green-100',
        text: 'text-green-800',
        icon: CheckCircle,
        label: 'تم التسليم'
      },
      RETURNED: {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        icon: RefreshCw,
        label: 'تم الإرجاع'
      },
      LOST: {
        bg: 'bg-red-100',
        text: 'text-red-800',
        icon: AlertCircle,
        label: 'مفقود'
      }
    };

    const style = styles[status];
    const Icon = style.icon;

    return (
      <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold ${style.bg} ${style.text}`}>
        <Icon className="w-4 h-4" />
        {style.label}
      </span>
    );
  };

  // Format date
  const formatDate = (date: Date | string | null) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Handle search
  const handleSearch = () => {
    setCurrentPage(1);
  };

  // Clear filters
  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-3 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 rounded-xl shadow-lg border border-gray-200/50 transition-all duration-300 hover:scale-105 mb-6"
          >
            <ArrowRight className="w-5 h-5" />
            <span className="font-semibold">رجوع للأدوات</span>
          </button>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Package className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-black bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-1">
                    قائمة التسليمات
                  </h1>
                  <p className="text-gray-600 font-medium">{materialName}</p>
                  <p className="text-sm text-gray-500">البرنامج: {programName}</p>
                  {pagination && (
                    <p className="text-sm text-blue-600 font-semibold mt-1">
                      إجمالي التسليمات: {pagination.total}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => refetch()}
                  className="p-3 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 rounded-xl shadow-lg border border-gray-200/50 transition-all duration-300 hover:scale-105"
                  title="تحديث"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold shadow-lg transition-all duration-300 hover:scale-105 ${
                    showFilters
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white'
                      : 'bg-white/80 backdrop-blur-sm text-gray-700 border border-gray-200/50'
                  }`}
                >
                  <Filter className="w-5 h-5" />
                  {showFilters ? 'إخفاء الفلاتر' : 'إظهار الفلاتر'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Search */}
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  البحث في المتدربين
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="ابحث بالاسم أو الرقم القومي..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                  />
                  <button
                    onClick={handleSearch}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 hover:scale-105 shadow-lg font-bold"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  حالة التسليم
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value as DeliveryStatus | '');
                    setCurrentPage(1);
                  }}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 font-medium"
                >
                  <option value="">الكل</option>
                  <option value="PENDING">قيد الانتظار</option>
                  <option value="DELIVERED">تم التسليم</option>
                  <option value="RETURNED">تم الإرجاع</option>
                  <option value="LOST">مفقود</option>
                </select>
              </div>
            </div>

            {/* Clear Filters */}
            {(searchQuery || statusFilter) && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all duration-300 hover:scale-105 font-semibold"
                >
                  <XCircle className="w-5 h-5" />
                  مسح الفلاتر
                </button>
              </div>
            )}
          </div>
        )}

        {/* Deliveries List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : error ? (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-12 text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-12 h-12 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">حدث خطأ في تحميل البيانات</h3>
            <p className="text-gray-600 mb-6">يرجى المحاولة مرة أخرى</p>
            <button
              onClick={() => refetch()}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 hover:scale-105 shadow-lg font-bold"
            >
              إعادة المحاولة
            </button>
          </div>
        ) : deliveries.length === 0 ? (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-12 text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">لا توجد تسليمات</h3>
            <p className="text-gray-600">لم يتم العثور على أي تسليمات لهذه الأداة</p>
          </div>
        ) : (
          <>
            {/* Table */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
              {/* Table Header */}
              <div className="bg-gradient-to-r from-gray-50 via-blue-50 to-indigo-50 px-8 py-6 border-b border-gray-200/50">
                <div className="grid grid-cols-12 gap-6 items-center text-sm font-bold text-gray-700">
                  <div className="col-span-3 text-center">المتدرب</div>
                  <div className="col-span-2 text-center">الرقم القومي</div>
                  <div className="col-span-2 text-center">رقم الهاتف</div>
                  <div className="col-span-1 text-center">الكمية</div>
                  <div className="col-span-2 text-center">الحالة</div>
                  <div className="col-span-2 text-center">التواريخ</div>
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-200/50">
                {deliveries.map((delivery) => (
                  <div
                    key={delivery.id}
                    className="px-8 py-6 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-300"
                  >
                    <div className="grid grid-cols-12 gap-6 items-center">
                      {/* Trainee Info */}
                      <div className="col-span-3">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            {delivery.trainee.photoUrl ? (
                              <div className="relative w-14 h-14">
                                <img
                                  src={`http://localhost:4000${delivery.trainee.photoUrl}`}
                                  alt={delivery.trainee.nameAr}
                                  className="w-14 h-14 rounded-2xl object-cover border-3 border-white shadow-lg"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    target.nextElementSibling?.classList.remove('hidden');
                                  }}
                                />
                                <div className="hidden w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center border-3 border-white shadow-lg">
                                  <User className="w-7 h-7 text-blue-600" />
                                </div>
                              </div>
                            ) : (
                              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center border-3 border-white shadow-lg">
                                <User className="w-7 h-7 text-blue-600" />
                              </div>
                            )}
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 text-base">{delivery.trainee.nameAr}</h3>
                            {delivery.trainee.nameEn && (
                              <p className="text-xs text-gray-500">{delivery.trainee.nameEn}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* National ID */}
                      <div className="col-span-2 text-center">
                        <p className="text-sm text-gray-900 font-mono font-semibold">
                          {delivery.trainee.nationalId}
                        </p>
                      </div>

                      {/* Phone */}
                      <div className="col-span-2 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-700 font-medium">{delivery.trainee.phone}</span>
                        </div>
                      </div>

                      {/* Quantity */}
                      <div className="col-span-1 text-center">
                        <span className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 text-purple-800 rounded-xl text-sm font-bold shadow-sm">
                          {delivery.quantity}
                        </span>
                      </div>

                      {/* Status */}
                      <div className="col-span-2 text-center">
                        {getStatusBadge(delivery.status)}
                      </div>

                      {/* Dates */}
                      <div className="col-span-2 text-center">
                        <div className="space-y-2">
                          <div className="flex items-center justify-center gap-2 text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm font-medium">{formatDate(delivery.deliveryDate)}</span>
                          </div>
                          {delivery.returnDate && (
                            <div className="flex items-center justify-center gap-2 text-blue-600">
                              <RefreshCw className="w-4 h-4" />
                              <span className="text-sm font-medium">{formatDate(delivery.returnDate)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Notes (if any) */}
                    {delivery.notes && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">ملاحظات:</span> {delivery.notes}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="mt-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600 font-medium">
                    صفحة <span className="font-bold text-gray-900">{pagination.page}</span> من{' '}
                    <span className="font-bold text-gray-900">{pagination.totalPages}</span>
                    {' '}({pagination.total} تسليم)
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={!pagination.hasPrev}
                      className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 font-bold shadow-sm"
                    >
                      <ChevronRight className="w-5 h-5" />
                      السابق
                    </button>
                    <button
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={!pagination.hasNext}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 font-bold shadow-lg"
                    >
                      التالي
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}