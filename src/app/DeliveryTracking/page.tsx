"use client";

import { useState, useMemo } from 'react';
import {
  Package,
  CheckCircle,
  Clock,
  XCircle,
  Search,
  Calendar,
  User,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import {
  useGetDeliveriesQuery,
  useGetDeliveryStatsQuery
} from '@/lip/features/studyTools/studyToolsApi';
import { DeliveryTrackingFilters } from '@/types/studyTools';

export default function DeliveryTrackingPage() {
  const [filters, setFilters] = useState<DeliveryTrackingFilters>({
    page: 1,
    limit: 50,
  });

  // Fetch data from API
  const { data: deliveriesData, isLoading, error, refetch } = useGetDeliveriesQuery(filters);
  const { data: statsData } = useGetDeliveryStatsQuery();

  // Local filters for client-side filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Filter deliveries on client side
  const filteredDeliveries = useMemo(() => {
    if (!deliveriesData?.data) return [];
    
    return deliveriesData.data.filter(delivery => {
      const matchesSearch =
        delivery.trainee.nameAr.toLowerCase().includes(searchTerm.toLowerCase()) ||
        delivery.trainee.id.toString().includes(searchTerm) ||
        delivery.studyTool.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || delivery.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [deliveriesData, searchTerm, statusFilter]);

  // Statistics
  const stats = {
    total: statsData?.totalDeliveries || 0,
    delivered: statsData?.activeDeliveries || 0,
    returned: statsData?.returnedDeliveries || 0,
    overdue: statsData?.overdueDeliveries || 0,
  };

  // Status badge
  const getStatusBadge = (status: 'delivered' | 'returned' | 'overdue') => {
    const statusConfig = {
      delivered: { label: 'تم التسليم', color: 'bg-green-100 text-green-800', icon: CheckCircle },
      returned: { label: 'تم الإرجاع', color: 'bg-blue-100 text-blue-800', icon: Package },
      overdue: { label: 'متأخر', color: 'bg-red-100 text-red-800', icon: AlertCircle },
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        <Icon className="w-4 h-4" />
        {config.label}
      </span>
    );
  };

  // Format date
  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 text-lg mb-2">حدث خطأ في تحميل البيانات</p>
          <p className="text-gray-500 mb-4">تأكد من تشغيل الباك إند</p>
          <button
            onClick={() => refetch()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              تتبع تسليم الأدوات الدراسية
            </h1>
            <p className="text-gray-600">
              إدارة ومتابعة تسليم الكتب والمعدات والمواد التدريبية للمتدربين
            </p>
          </div>
          <button
            onClick={() => refetch()}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            تحديث
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border-r-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">إجمالي العمليات</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Package className="w-12 h-12 text-blue-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border-r-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">تم التسليم</p>
                <p className="text-3xl font-bold text-gray-900">{stats.delivered}</p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border-r-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">تم الإرجاع</p>
                <p className="text-3xl font-bold text-gray-900">{stats.returned}</p>
              </div>
              <Package className="w-12 h-12 text-blue-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border-r-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">متأخر</p>
                <p className="text-3xl font-bold text-gray-900">{stats.overdue}</p>
              </div>
              <AlertCircle className="w-12 h-12 text-red-500 opacity-20" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="البحث بالاسم أو رقم المتدرب أو اسم الأداة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="all">جميع الحالات</option>
                <option value="delivered">تم التسليم</option>
                <option value="returned">تم الإرجاع</option>
                <option value="overdue">متأخر</option>
              </select>
            </div>
          </div>
        </div>

        {/* Deliveries Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المتدرب
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الأداة
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    البرنامج
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الكمية
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    تاريخ التسليم
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    تاريخ الإرجاع
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الحالة
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ملاحظات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDeliveries.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center">
                      <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg">لا توجد عمليات تسليم</p>
                      <p className="text-gray-400 text-sm mt-2">جرب تغيير معايير البحث</p>
                    </td>
                  </tr>
                ) : (
                  filteredDeliveries.map((delivery) => (
                    <tr key={delivery.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{delivery.trainee.nameAr}</p>
                            <p className="text-sm text-gray-500">{delivery.trainee.phone}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">{delivery.studyTool.name}</p>
                        <p className="text-sm text-gray-500">{delivery.studyTool.category}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-700">{delivery.trainee.program.nameAr}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-900 font-medium">{delivery.quantity}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{formatDate(delivery.deliveryDate)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {delivery.returnDate ? (
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">{formatDate(delivery.returnDate)}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(delivery.status)}
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-600 max-w-xs truncate">
                          {delivery.notes || '-'}
                        </p>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Results Count */}
        {filteredDeliveries.length > 0 && deliveriesData && (
          <div className="mt-4 text-center text-sm text-gray-600">
            عرض {filteredDeliveries.length} من {deliveriesData.meta.total} عملية
          </div>
        )}
      </div>
    </div>
  );
}