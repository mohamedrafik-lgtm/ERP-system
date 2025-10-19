"use client";

import { useState, useMemo } from "react";
import { useGetTraineePaymentsQuery } from "@/lip/features/trainee-auth/traineeAuthApi";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/lip/features/auth/authSlice";
import {
  CreditCard,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Download,
  Eye,
  Filter,
  Search,
  RefreshCw,
  DollarSign,
  Calendar,
  Receipt,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { PaymentStatus, FeeType } from "@/types/payments";

const MyPayments = () => {
  const currentUser = useSelector(selectCurrentUser);
  const traineeId = currentUser?.id || 0;
  
  const { data: paymentsData, isLoading, error, refetch } = useGetTraineePaymentsQuery(traineeId);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<any>(null);

  // Filter and search payments
  const filteredPayments = useMemo(() => {
    if (!paymentsData) return [];
    
    return paymentsData.filter((payment) => {
      const matchesStatus = filterStatus === "all" || payment.status === filterStatus;
      const matchesType = filterType === "all" || payment.fee.type === filterType;
      const matchesSearch = payment.fee.name.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesStatus && matchesType && matchesSearch;
    });
  }, [paymentsData, filterStatus, filterType, searchTerm]);

  // Calculate statistics
  const stats = useMemo(() => {
    if (!paymentsData) return { total: 0, paid: 0, pending: 0, remaining: 0 };
    
    const total = paymentsData.reduce((sum, p) => sum + p.amount, 0);
    const paid = paymentsData.reduce((sum, p) => sum + p.paidAmount, 0);
    const pending = paymentsData.filter(p => p.status === PaymentStatus.PENDING).length;
    const remaining = total - paid;
    
    return { total, paid, pending, remaining };
  }, [paymentsData]);

  // Get status info
  const getStatusInfo = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.PAID:
        return { text: "مدفوع", color: "text-green-600 bg-green-50 border-green-200", icon: CheckCircle };
      case PaymentStatus.PARTIALLY_PAID:
        return { text: "مدفوع جزئياً", color: "text-yellow-600 bg-yellow-50 border-yellow-200", icon: AlertCircle };
      case PaymentStatus.PENDING:
        return { text: "قيد الانتظار", color: "text-orange-600 bg-orange-50 border-orange-200", icon: Clock };
      case PaymentStatus.CANCELLED:
        return { text: "ملغي", color: "text-red-600 bg-red-50 border-red-200", icon: XCircle };
      default:
        return { text: "غير محدد", color: "text-gray-600 bg-gray-50 border-gray-200", icon: AlertCircle };
    }
  };

  // Get fee type info
  const getFeeTypeInfo = (type: FeeType) => {
    switch (type) {
      case FeeType.TUITION:
        return { text: "رسوم دراسية", color: "bg-blue-100 text-blue-700" };
      case FeeType.SERVICES:
        return { text: "رسوم خدمات", color: "bg-purple-100 text-purple-700" };
      case FeeType.TRAINING:
        return { text: "رسوم تدريب", color: "bg-green-100 text-green-700" };
      case FeeType.ADDITIONAL:
        return { text: "رسوم إضافية", color: "bg-orange-100 text-orange-700" };
      default:
        return { text: "غير محدد", color: "bg-gray-100 text-gray-700" };
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-EG', {
      style: 'currency',
      currency: 'EGP'
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return "غير محدد";
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 font-semibold">جاري تحميل المدفوعات...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center" dir="rtl">
        <div className="text-center bg-white rounded-3xl shadow-2xl p-12 max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">خطأ في تحميل البيانات</h2>
          <p className="text-gray-600 mb-6">حدث خطأ أثناء تحميل المدفوعات</p>
          <button
            onClick={() => refetch()}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  if (!paymentsData || paymentsData.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center" dir="rtl">
        <div className="text-center bg-white rounded-3xl shadow-2xl p-12 max-w-md">
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-3xl flex items-center justify-center mb-6">
            <CreditCard className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">لا توجد مدفوعات</h2>
          <p className="text-gray-600">لم يتم العثور على أي مدفوعات مسجلة</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6" dir="rtl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
              <Wallet className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-1">
                مدفوعاتي
              </h1>
              <p className="text-gray-600 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                عرض وإدارة مدفوعاتك الشخصية
              </p>
            </div>
          </div>
          <button
            onClick={() => refetch()}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <RefreshCw className="w-5 h-5" />
            <span className="font-semibold">تحديث</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-lg border border-blue-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-700 mb-2">إجمالي المدفوعات</p>
              <p className="text-3xl font-bold text-blue-600">
                {formatCurrency(stats.total)}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg border border-green-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-700 mb-2">المبلغ المدفوع</p>
              <p className="text-3xl font-bold text-green-600">
                {formatCurrency(stats.paid)}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl shadow-lg border border-orange-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-700 mb-2">المتبقي</p>
              <p className="text-3xl font-bold text-orange-600">
                {formatCurrency(stats.remaining)}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 shadow-lg">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl shadow-lg border border-purple-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-700 mb-2">قيد الانتظار</p>
              <p className="text-3xl font-bold text-purple-600">
                {stats.pending}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 shadow-lg">
              <Clock className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
            <Filter className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">الفلاتر والبحث</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Search className="w-4 h-4 text-blue-600" />
              البحث
            </label>
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="ابحث في المدفوعات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-11 pl-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              الحالة
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white font-medium"
            >
              <option value="all">جميع الحالات</option>
              <option value={PaymentStatus.PAID}>✅ مدفوع</option>
              <option value={PaymentStatus.PARTIALLY_PAID}>⚠️ مدفوع جزئياً</option>
              <option value={PaymentStatus.PENDING}>🕐 قيد الانتظار</option>
              <option value={PaymentStatus.CANCELLED}>❌ ملغي</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Receipt className="w-4 h-4 text-blue-600" />
              نوع الرسوم
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white font-medium"
            >
              <option value="all">جميع الأنواع</option>
              <option value={FeeType.TUITION}>📚 رسوم دراسية</option>
              <option value={FeeType.SERVICES}>🛠️ رسوم خدمات</option>
              <option value={FeeType.TRAINING}>🎓 رسوم تدريب</option>
              <option value={FeeType.ADDITIONAL}>➕ رسوم إضافية</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payments List */}
      {filteredPayments.length === 0 ? (
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-2xl border-2 border-blue-100 p-16">
          <div className="text-center">
            <div className="mx-auto w-32 h-32 bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mb-8 shadow-2xl">
              <CreditCard className="w-16 h-16 text-white" />
            </div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
              لا توجد مدفوعات
            </h3>
            <p className="text-gray-600 text-lg mb-8">
              لم يتم العثور على مدفوعات تطابق معايير البحث
            </p>
            <button
              onClick={() => {
                setFilterStatus("all");
                setFilterType("all");
                setSearchTerm("");
              }}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg"
            >
              🔄 إعادة تعيين الفلاتر
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPayments.map((payment) => {
            const statusInfo = getStatusInfo(payment.status);
            const feeTypeInfo = getFeeTypeInfo(payment.fee.type);
            const StatusIcon = statusInfo.icon;
            const percentage = (payment.paidAmount / payment.amount) * 100;

            return (
              <div key={payment.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden group">
                {/* Progress Bar */}
                <div className="h-2 bg-gray-200">
                  <div
                    className={`h-full transition-all duration-500 ${
                      payment.status === PaymentStatus.PAID ? 'bg-gradient-to-r from-green-400 to-green-600' :
                      payment.status === PaymentStatus.PARTIALLY_PAID ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                      'bg-gradient-to-r from-gray-300 to-gray-400'
                    }`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2 rounded-xl ${statusInfo.color} border-2`}>
                          <StatusIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {payment.fee.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${feeTypeInfo.color}`}>
                              {feeTypeInfo.text}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold border-2 ${statusInfo.color}`}>
                              {statusInfo.text}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                        <div className="bg-blue-50 px-4 py-3 rounded-xl">
                          <p className="text-xs text-blue-600 font-medium mb-1">المبلغ الكلي</p>
                          <p className="text-lg font-bold text-blue-700">{formatCurrency(payment.amount)}</p>
                        </div>
                        <div className="bg-green-50 px-4 py-3 rounded-xl">
                          <p className="text-xs text-green-600 font-medium mb-1">المبلغ المدفوع</p>
                          <p className="text-lg font-bold text-green-700">{formatCurrency(payment.paidAmount)}</p>
                        </div>
                        <div className="bg-orange-50 px-4 py-3 rounded-xl">
                          <p className="text-xs text-orange-600 font-medium mb-1">المتبقي</p>
                          <p className="text-lg font-bold text-orange-700">{formatCurrency(payment.amount - payment.paidAmount)}</p>
                        </div>
                        <div className="bg-purple-50 px-4 py-3 rounded-xl">
                          <p className="text-xs text-purple-600 font-medium mb-1">النسبة</p>
                          <p className="text-lg font-bold text-purple-700">{percentage.toFixed(0)}%</p>
                        </div>
                      </div>

                      {payment.paidAt && (
                        <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>تاريخ الدفع: {formatDate(payment.paidAt)}</span>
                        </div>
                      )}

                      {payment.notes && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700">
                            <span className="font-semibold">ملاحظات:</span> {payment.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Receipt className="w-4 h-4" />
                      <span>العام الدراسي: {payment.fee.academicYear}</span>
                    </div>

                    <button
                      onClick={() => setSelectedPayment(payment)}
                      className="flex items-center gap-2 px-4 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200 font-medium"
                    >
                      <Eye className="w-4 h-4" />
                      عرض التفاصيل
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Payment Details Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">تفاصيل الدفع</h3>
                <button
                  onClick={() => setSelectedPayment(null)}
                  className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                  <h4 className="font-bold text-gray-900 text-lg mb-4">{selectedPayment.fee.name}</h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">المبلغ الكلي</p>
                      <p className="text-2xl font-bold text-blue-600">{formatCurrency(selectedPayment.amount)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">المبلغ المدفوع</p>
                      <p className="text-2xl font-bold text-green-600">{formatCurrency(selectedPayment.paidAmount)}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">الحالة</p>
                    <p className="font-semibold">{getStatusInfo(selectedPayment.status).text}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">نوع الرسوم</p>
                    <p className="font-semibold">{getFeeTypeInfo(selectedPayment.fee.type).text}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">العام الدراسي</p>
                    <p className="font-semibold">{selectedPayment.fee.academicYear}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">تاريخ الدفع</p>
                    <p className="font-semibold">{formatDate(selectedPayment.paidAt)}</p>
                  </div>
                </div>

                {selectedPayment.transactions && selectedPayment.transactions.length > 0 && (
                  <div>
                    <h5 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Receipt className="w-5 h-5" />
                      المعاملات ({selectedPayment.transactions.length})
                    </h5>
                    <div className="space-y-2">
                      {selectedPayment.transactions.map((transaction: any) => (
                        <div key={transaction.id} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-gray-900">{transaction.type}</p>
                            <p className="text-sm text-gray-600">{formatDate(transaction.createdAt)}</p>
                            {transaction.description && (
                              <p className="text-sm text-gray-500 mt-1">{transaction.description}</p>
                            )}
                          </div>
                          <p className="text-lg font-bold text-green-600">{formatCurrency(transaction.amount)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button
                    onClick={() => setSelectedPayment(null)}
                    className="px-6 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors font-medium"
                  >
                    إغلاق
                  </button>
                  <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    تحميل الإيصال
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPayments;

