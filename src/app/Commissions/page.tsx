"use client";
import { useState, useMemo, useEffect } from "react";
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Calendar, 
  Download, 
  Filter, 
  Search,
  BarChart3,
  PieChart,
  Target,
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Settings,
  Eye,
  Edit,
  MoreVertical
} from "lucide-react";
import CommissionsTable from "@/components/Commissions/CommissionsTable";
import { 
  useGetCommissionsQuery,
  useCreateCommissionMutation,
  usePayoutCommissionMutation
} from "@/lip/features/commissions/commissionsApi";
import { useGetFinanceQuery } from "@/lip/features/Lockers/safe";
import { Commission } from "@/types/commission.types";

const Commissions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("currentMonth");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  // RTK Query hooks
  const {
    data: commissionsResponse,
    isLoading,
    error,
    refetch: refetchCommissions
  } = useGetCommissionsQuery();

  const [createCommission, { isLoading: isCreating }] = useCreateCommissionMutation();
  const [payoutCommission, { isLoading: isPaying }] = usePayoutCommissionMutation();
  const { data: safes = [] } = useGetFinanceQuery();
  const [isPayDialogOpen, setIsPayDialogOpen] = useState(false);
  const [selectedCommission, setSelectedCommission] = useState<Commission | null>(null);

  // Derived state
  const commissions = commissionsResponse?.data || [];

  // طباعة البيانات في الكونسول
  console.log("=== بيانات العمولات من API ===");
  console.log("commissionsResponse:", commissionsResponse);
  console.log("commissions:", commissions);
  console.log("isLoading:", isLoading);
  console.log("error:", error);
  console.log("================================");
  
  // Mock stats للعرض (يمكن استبدالها بـ API منفصل لاحقاً)
  const stats = {
    totalCommissions: commissions.length,
    totalAmount: commissions.reduce((sum, c) => sum + c.amount, 0),
    paidCommissions: commissions.filter(c => c.status === 'PAID').length,
    paidAmount: commissions.filter(c => c.status === 'PAID').reduce((sum, c) => sum + c.amount, 0),
    pendingCommissions: commissions.filter(c => c.status === 'PENDING').length,
    pendingAmount: commissions.filter(c => c.status === 'PENDING').reduce((sum, c) => sum + c.amount, 0),
    firstContactCommissions: commissions.filter(c => c.type === 'FIRST_CONTACT').length,
    secondContactCommissions: commissions.filter(c => c.type === 'SECOND_CONTACT').length,
    totalMarketingEmployees: new Set(commissions.map(c => c.marketingEmployeeId)).size,
    activeMarketingEmployees: new Set(commissions.filter(c => c.status === 'PAID').map(c => c.marketingEmployeeId)).size
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // RTK Query will automatically refetch when filters change
  };

  const handleExport = async () => {
    try {
      // تصدير البيانات المحلية إلى CSV
      const csvContent = generateCSV(commissions);
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `commissions-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error exporting commissions:', error);
    }
  };

  // دالة مساعدة لإنشاء CSV
  const generateCSV = (data: Commission[]) => {
    const headers = ['ID', 'المسوق', 'المتدرب', 'النوع', 'المبلغ', 'الحالة', 'تاريخ الإنشاء'];
    const rows = data.map(commission => [
      commission.id,
      commission.marketingEmployee.name,
      commission.trainee.nameAr,
      commission.type === 'FIRST_CONTACT' ? 'أول اتصال' : 'ثاني اتصال',
      commission.amount,
      commission.status === 'PAID' ? 'مدفوع' : 'معلق',
      new Date(commission.createdAt).toLocaleDateString('ar-EG')
    ]);
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  };

  const handleRefresh = () => {
    refetchCommissions();
  };

  const handleViewCommission = (commission: Commission) => {
    console.log("Viewing commission:", commission);
    // Navigate to commission details page
  };

  const handleEditCommission = (commission: Commission) => {
    console.log("Editing commission:", commission);
    // Open edit modal or navigate to edit page
  };

  const handleDeleteCommission = (commission: Commission) => {
    console.log("Deleting commission:", commission);
    // Show confirmation dialog and delete
  };

  const handlePayCommission = (commission: Commission) => {
    setSelectedCommission(commission);
    setIsPayDialogOpen(true);
  };

  const handleCreateCommission = async () => {
    try {
      // مثال على إنشاء عمولة جديدة
      const newCommission = {
        marketingEmployeeId: 1, // يمكن جعل هذا من form
        traineeId: 1, // يمكن جعل هذا من form
        type: 'FIRST_CONTACT' as const,
        amount: 500,
        description: 'عمولة أول اتصال'
      };

      console.log("Creating new commission:", newCommission);
      const result = await createCommission(newCommission).unwrap();
      console.log("Commission created successfully:", result);
      alert("تم إنشاء العمولة بنجاح!");
    } catch (error) {
      console.error('Error creating commission:', error);
      alert("حدث خطأ في إنشاء العمولة");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header Section */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">
                  عمولات المسوقين
                </h1>
                <p className="text-sm text-gray-600">
                  إدارة وحساب عمولات المسوقين والمبيعات
                </p>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>نظام العمولات الذكي</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <BarChart3 className="w-4 h-4" />
                    <span>إجمالي: {stats?.totalMarketingEmployees || 0} مسوق</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleExport}
                  className="px-3 py-2 bg-white text-gray-700 rounded-lg border border-gray-200 hover:bg-gray-50"
                  title="تصدير البيانات"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button
                  onClick={handleRefresh}
                  className="px-3 py-2 bg-white text-gray-700 rounded-lg border border-gray-200 hover:bg-gray-50"
                  title="تحديث البيانات"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
                <button className="px-3 py-2 bg-white text-gray-700 rounded-lg border border-gray-200 hover:bg-gray-50">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">إجمالي العمولات</p>
                <p className="text-3xl font-bold text-gray-900">
                  {isLoading ? "..." : stats?.totalAmount?.toLocaleString() || "0"} ج.م
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {stats?.totalCommissions || 0} عمولة
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">العمولات المدفوعة</p>
                <p className="text-3xl font-bold text-blue-600">
                  {isLoading ? "..." : stats?.paidAmount?.toLocaleString() || "0"} ج.م
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {stats?.paidCommissions || 0} عمولة
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">العمولات المعلقة</p>
                <p className="text-3xl font-bold text-orange-600">
                  {isLoading ? "..." : stats?.pendingAmount?.toLocaleString() || "0"} ج.م
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {stats?.pendingCommissions || 0} عمولة
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">المسوقين النشطين</p>
                <p className="text-3xl font-bold text-purple-600">
                  {isLoading ? "..." : stats?.activeMarketingEmployees || 0}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  من أصل {stats?.totalMarketingEmployees || 0} مسوق
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Search className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">البحث والفلترة</h3>
              <p className="text-gray-600">ابحث عن المسوقين وفلتر العمولات حسب المعايير المطلوبة</p>
            </div>
          </div>
          
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl blur-sm group-hover:blur-md transition-all duration-300"></div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="ابحث بالاسم، الإيميل، أو رقم الهاتف..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full py-4 px-6 text-gray-700 placeholder-gray-400 bg-white/80 backdrop-blur-sm border-2 border-gray-200/50 rounded-2xl focus:ring-4 focus:ring-green-100/50 focus:border-green-500 transition-all duration-300 text-lg"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <Search className="w-5 h-5 text-gray-400 group-hover:text-green-500 transition-colors duration-200" />
                  </div>
                </div>
              </div>
              
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="w-full py-4 px-6 bg-white/80 backdrop-blur-sm border-2 border-gray-200/50 rounded-2xl focus:ring-4 focus:ring-blue-100/50 focus:border-blue-500 transition-all duration-300 text-lg"
              >
                <option value="currentMonth">هذا الشهر</option>
                <option value="lastMonth">الشهر الماضي</option>
                <option value="last3Months">آخر 3 أشهر</option>
                <option value="last6Months">آخر 6 أشهر</option>
                <option value="lastYear">العام الماضي</option>
                <option value="all">جميع الفترات</option>
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full py-4 px-6 bg-white/80 backdrop-blur-sm border-2 border-gray-200/50 rounded-2xl focus:ring-4 focus:ring-purple-100/50 focus:border-purple-500 transition-all duration-300 text-lg"
              >
                <option value="all">جميع الحالات</option>
                <option value="PENDING">معلق</option>
                <option value="PAID">مدفوع</option>
              </select>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full py-4 px-6 bg-white/80 backdrop-blur-sm border-2 border-gray-200/50 rounded-2xl focus:ring-4 focus:ring-indigo-100/50 focus:border-indigo-500 transition-all duration-300 text-lg"
              >
                <option value="all">جميع الأنواع</option>
                <option value="FIRST_CONTACT">أول اتصال</option>
                <option value="SECOND_CONTACT">ثاني اتصال</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-2xl hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center gap-3"
              >
                <Search className="w-5 h-5" />
                <span>بحث</span>
              </button>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode("table")}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      viewMode === "table" 
                        ? "bg-white shadow-md text-green-600" 
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    title="عرض جدول"
                  >
                    <BarChart3 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      viewMode === "grid" 
                        ? "bg-white shadow-md text-green-600" 
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    title="عرض شبكة"
                  >
                    <Users className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Commissions Table */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 overflow-hidden mb-8">
          <div className="p-8 border-b border-gray-200/50 bg-gradient-to-r from-gray-50/50 to-green-50/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">قائمة العمولات</h3>
                  <p className="text-gray-600">عرض وإدارة عمولات جميع المسوقين</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="text-sm text-gray-500">
                  عرض <span className="font-bold text-gray-900">1-10</span> من <span className="font-bold text-gray-900">{commissions.length}</span> مسوق
                </div>
                <div className="h-6 w-px bg-gray-300"></div>
                <button className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-200 hover:scale-105">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            {error && (
              <div className="mb-6 p-4 bg-red-100 border border-red-200 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <span className="text-red-700 font-medium">
                      {error && 'data' in error 
                        ? `خطأ في API: ${(error as any).data?.message || 'خطأ غير معروف'}`
                        : `خطأ في الشبكة: ${(error as any).message || 'خطأ غير معروف'}`
                      }
                    </span>
                  </div>
                  {(error as any)?.status === 401 && (
                    <button
                      onClick={() => window.location.href = '/login'}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm font-medium"
                    >
                      تسجيل الدخول
                    </button>
                  )}
                </div>
              </div>
            )}
            
            <CommissionsTable
              commissions={commissions}
              isLoading={isLoading}
              onView={handleViewCommission}
              onEdit={handleEditCommission}
              onDelete={handleDeleteCommission}
              onPay={handlePayCommission}
            />
          </div>
        </div>

        {/* Quick Actions Footer */}
        <div className="bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 rounded-3xl p-8 border border-white/50">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">إجراءات سريعة</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2">
                <Download className="w-5 h-5" />
                تصدير تقرير العمولات
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                تقرير إحصائي
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                تحليل الأداء
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                إعدادات العمولات
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pay Dialog (stub) */}
      {isPayDialogOpen && selectedCommission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsPayDialogOpen(false)}></div>
          <div className="relative w-full max-w-2xl mx-4">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-white/20 bg-white">
              {/* Header */}
              <div className="relative px-6 py-5 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-white shadow-inner">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-extrabold text-white">دفع عمولة</h3>
                  </div>
                  <button onClick={() => setIsPayDialogOpen(false)} className="text-white/90 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Body */}
              <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget as HTMLFormElement;
                const formData = new FormData(form);
                const payload = {
                  amount: Number(formData.get('amount')),
                  fromSafeId: String(formData.get('fromSafeId') || ''),
                  toSafeId: String(formData.get('toSafeId') || ''),
                  description: String(formData.get('description') || '')
                };

                if (!payload.amount || payload.amount < 0.01) return;
                if (!payload.fromSafeId || !payload.toSafeId || payload.fromSafeId === payload.toSafeId) return;

                await payoutCommission({ id: selectedCommission.id, payload }).unwrap();
                setIsPayDialogOpen(false);
              }}
            >
                <div className="p-6">
                  {/* Meta */}
                  <div className="mb-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                      <p className="text-xs text-gray-500">المسوق</p>
                      <p className="text-sm font-semibold text-gray-800 truncate">{selectedCommission.marketingEmployee.name}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                      <p className="text-xs text-gray-500">المتدرب</p>
                      <p className="text-sm font-semibold text-gray-800 truncate">{selectedCommission.trainee.nameAr}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                      <p className="text-xs text-gray-500">قيمة العمولة</p>
                      <p className="text-sm font-extrabold text-emerald-700">{selectedCommission.amount} ج.م</p>
                    </div>
                  </div>

                  {/* Form */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">المبلغ</label>
                      <input name="amount" type="number" step="0.01" min="0.01" className="w-full border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 rounded-xl px-3 py-2 transition" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">الخزينة المصدر</label>
                      <select name="fromSafeId" className="w-full border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 rounded-xl px-3 py-2 transition" required>
                        <option value="">اختر خزينة</option>
                        {safes.map((s) => (
                          <option key={s.id} value={s.id}>{s.name} - {s.balance} {s.currency}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">الخزينة الهدف</label>
                      <select name="toSafeId" className="w-full border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 rounded-xl px-3 py-2 transition" required>
                        <option value="">اختر خزينة</option>
                        {safes.map((s) => (
                          <option key={s.id} value={s.id}>{s.name} - {s.balance} {s.currency}</option>
                        ))}
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-1 text-gray-700">الوصف</label>
                      <textarea name="description" className="w-full border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 rounded-xl px-3 py-2 transition" rows={3} required />
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end gap-3">
                    <button type="button" onClick={() => setIsPayDialogOpen(false)} className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition">إلغاء</button>
                    <button type="submit" disabled={isPaying} className="px-5 py-2 rounded-xl text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:opacity-50 transition">
                      {isPaying ? 'جاري التنفيذ...' : 'تأكيد الدفع'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Commissions;
