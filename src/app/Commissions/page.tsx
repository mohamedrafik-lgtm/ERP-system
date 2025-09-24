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
  useCreateCommissionMutation
} from "@/lip/features/commissions/commissionsApi";
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

  const handlePayCommission = async (commission: Commission) => {
    try {
      const paidBy = prompt("أدخل اسم من قام بالدفع:");
      if (paidBy) {
        // هنا يمكن إضافة API call منفصل لدفع العمولة
        console.log(`Paying commission ${commission.id} by ${paidBy}`);
        // يمكن إضافة fetch مباشر هنا إذا لزم الأمر
        alert(`تم دفع العمولة ${commission.amount} ج.م بواسطة ${paidBy}`);
      }
    } catch (error) {
      console.error('Error paying commission:', error);
    }
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmMWY1ZjkiIGZpbGwtb3BhY2l0eT0iMC40Ij48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-60"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header Section */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div className="flex items-center gap-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <DollarSign className="w-10 h-10 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-black bg-gradient-to-r from-gray-900 via-green-800 to-emerald-800 bg-clip-text text-transparent mb-2">
                  عمولات المسوقين
                </h1>
                <p className="text-lg text-gray-600 font-medium">
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
                  className="p-3 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border border-gray-200/50"
                  title="تصدير البيانات"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button
                  onClick={handleRefresh}
                  className="p-3 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border border-gray-200/50"
                  title="تحديث البيانات"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
                <button className="p-3 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border border-gray-200/50">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
              <button
                onClick={handleCreateCommission}
                disabled={isCreating}
                className="inline-flex items-center gap-3 px-8 py-4 text-white bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 hover:from-green-600 hover:via-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300 rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCreating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>جاري الإنشاء...</span>
                  </>
                ) : (
                  <>
                    <DollarSign className="w-5 h-5" />
                    <span>حساب عمولة جديدة</span>
                  </>
                )}
              </button>
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
    </div>
  );
};

export default Commissions;
