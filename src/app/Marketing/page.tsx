"use client";
import { useState, useMemo } from "react";
import {
  Users,
  Plus,
  Search,
  Filter,
  Download,
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
  Trash2,
  MoreVertical,
  Phone,
  Mail,
  MapPin,
  Calendar,
  TrendingUp,
  UserPlus,
  Activity
} from "lucide-react";
import Link from "next/link";
import { useGetMarketingEmployeesQuery } from "@/lip/features/marketers/marketersApi";
import { MarketingEmployeeResponse } from "@/types/marketer.types";
import { DeleteMarketingEmployeeDialog } from "@/components/Marketing/DeleteMarketingEmployeeDialog";

// Mock data for marketers
const mockMarketers = [
  {
    id: 1,
    nameAr: "أحمد محمد علي",
    nameEn: "Ahmed Mohamed Ali",
    email: "ahmed.marketing@company.com",
    phone: "+201234567890",
    position: "مدير التسويق",
    status: "active",
    photoUrl: "/placeholder-avatar.png",
    city: "القاهرة",
    joinDate: "2024-01-15",
    totalCommissions: 15000,
    pendingCommissions: 5000,
    paidCommissions: 10000,
    totalTrainees: 25,
    performance: 95
  },
  {
    id: 2,
    nameAr: "فاطمة أحمد حسن",
    nameEn: "Fatma Ahmed Hassan",
    email: "fatma.marketing@company.com",
    phone: "+201234567891",
    position: "مسوق أول",
    status: "active",
    photoUrl: "/placeholder-avatar.png",
    city: "الإسكندرية",
    joinDate: "2024-02-20",
    totalCommissions: 12000,
    pendingCommissions: 3000,
    paidCommissions: 9000,
    totalTrainees: 18,
    performance: 88
  },
  {
    id: 3,
    nameAr: "محمد سعد الدين",
    nameEn: "Mohamed Saad Eldin",
    email: "mohamed.marketing@company.com",
    phone: "+201234567892",
    position: "مسوق",
    status: "inactive",
    photoUrl: "/placeholder-avatar.png",
    city: "الجيزة",
    joinDate: "2023-11-10",
    totalCommissions: 8000,
    pendingCommissions: 2000,
    paidCommissions: 6000,
    totalTrainees: 12,
    performance: 75
  }
];

const Marketing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<MarketingEmployeeResponse | null>(null);

  // Fetch marketing employees from API
  const { data: marketingEmployees = [], isLoading, error, refetch } = useGetMarketingEmployeesQuery();

  // Filter marketing employees based on search and filters
  const filteredMarketers = useMemo(() => {
    return marketingEmployees.filter(employee => {
      const matchesSearch = 
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (employee.email && employee.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        employee.phone.includes(searchTerm);
      
      const matchesStatus = selectedStatus === "all" || 
        (selectedStatus === "active" && employee.isActive) ||
        (selectedStatus === "inactive" && !employee.isActive);
      
      return matchesSearch && matchesStatus;
    });
  }, [marketingEmployees, searchTerm, selectedStatus]);

  // Calculate statistics
  const stats = useMemo(() => {
    const activeMarketers = marketingEmployees.filter(m => m.isActive).length;
    const totalTrainees = marketingEmployees.reduce((sum, m) => sum + m.totalAssignedTrainees, 0);
    const totalFirstContact = marketingEmployees.reduce((sum, m) => sum + m.monthlyFirstContact, 0);
    const totalSecondContact = marketingEmployees.reduce((sum, m) => sum + m.monthlySecondContact, 0);
    
    return {
      totalMarketers: marketingEmployees.length,
      activeMarketers,
      totalTrainees,
      totalFirstContact,
      totalSecondContact,
      averagePerformance: marketingEmployees.length > 0 ? 
        Math.round(marketingEmployees.reduce((sum, m) => sum + (m.totalAssignedTrainees * 10), 0) / marketingEmployees.length) : 0
    };
  }, [marketingEmployees]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by filteredMarketers
  };

  const handleExport = () => {
    // Export functionality
    console.log("Exporting marketers data...");
  };

  const handleRefresh = () => {
    console.log("Refreshing marketing employees data...");
    refetch();
  };

  const handleDeleteClick = (employee: MarketingEmployeeResponse) => {
    setEmployeeToDelete(employee);
    setDeleteDialogOpen(true);
  };

  const handleDeleteSuccess = () => {
    setDeleteDialogOpen(false);
    setEmployeeToDelete(null);
    refetch(); // إعادة جلب البيانات بعد الحذف
  };

  const getStatusStyles = (isActive: boolean) => {
    if (isActive) {
      return {
        label: 'نشط',
        color: 'text-green-800',
        bgColor: 'bg-green-100',
        icon: CheckCircle
      };
    } else {
      return {
        label: 'غير نشط',
        color: 'text-red-800',
        bgColor: 'bg-red-100',
        icon: AlertCircle
      };
    }
  };

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-10 h-10 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-black bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-2">
                  إدارة المسوقين
                </h1>
                <p className="text-lg text-gray-600 font-medium">
                  إدارة وعرض جميع المسوقين في النظام
                </p>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span>نظام إدارة المسوقين</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <BarChart3 className="w-4 h-4" />
                    <span>إجمالي: {stats.totalMarketers} مسوق</span>
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
              </div>
              <Link
                href="/Marketing/AddMarketer"
                className="inline-flex items-center gap-3 px-8 py-4 text-white bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 hover:from-blue-600 hover:via-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 font-bold text-lg"
              >
                <UserPlus className="w-6 h-6" />
                <span>إضافة مسوق جديد</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">إجمالي المسوقين</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalMarketers}</p>
                <p className="text-xs text-gray-500 mt-1">{stats.activeMarketers} نشط</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">إجمالي الاتصالات الأولى</p>
                <p className="text-3xl font-bold text-green-600">{stats.totalFirstContact}</p>
                <p className="text-xs text-gray-500 mt-1">هذا الشهر</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">إجمالي المتدربين</p>
                <p className="text-3xl font-bold text-purple-600">{stats.totalTrainees}</p>
                <p className="text-xs text-gray-500 mt-1">من جميع المسوقين</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">الاتصالات الثانية</p>
                <p className="text-3xl font-bold text-orange-600">{stats.totalSecondContact}</p>
                <p className="text-xs text-gray-500 mt-1">هذا الشهر</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Search className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">البحث المتقدم</h3>
              <p className="text-gray-600">ابحث عن المسوقين باستخدام معايير متعددة</p>
            </div>
          </div>

          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-sm group-hover:blur-md transition-all duration-300"></div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="ابحث بالاسم، البريد الإلكتروني، أو رقم الهاتف..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full py-4 px-6 text-gray-700 placeholder-gray-400 bg-white/80 backdrop-blur-sm border-2 border-gray-200/50 rounded-2xl focus:ring-4 focus:ring-blue-100/50 focus:border-blue-500 transition-all duration-300 text-lg"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <Search className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  className="flex-1 py-4 px-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-2xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center justify-center gap-3"
                >
                  <Search className="w-5 h-5" />
                  <span>بحث</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="p-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl transition-all duration-200 hover:scale-105"
                  title="مسح البحث"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Filter Section */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 p-8 mb-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Filter className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">فلتر البيانات</h3>
                <p className="text-gray-600">قم بتصفية المسوقين حسب المعايير المطلوبة</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("table")}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === "table"
                      ? "bg-white shadow-md text-blue-600"
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
                      ? "bg-white shadow-md text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  title="عرض شبكة"
                >
                  <PieChart className="w-5 h-5" />
                </button>
              </div>

              <button className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all duration-200 hover:scale-105">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full py-4 px-6 bg-white/80 backdrop-blur-sm border-2 border-gray-200/50 rounded-2xl focus:ring-4 focus:ring-blue-100/50 focus:border-blue-500 transition-all duration-300 text-lg"
            >
              <option value="all">جميع الحالات</option>
              <option value="active">نشط</option>
              <option value="inactive">غير نشط</option>
            </select>

            <div className="flex items-center gap-4">
              <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                تطبيق الفلاتر
              </button>
              <button className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all duration-300 hover:scale-105">
                مسح الكل
              </button>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              <span className="font-semibold">النتائج:</span> {filteredMarketers.length} مسوق
            </div>
          </div>
        </div>

        {/* Marketers Table */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 overflow-hidden mb-8">
          <div className="p-8 border-b border-gray-200/50 bg-gradient-to-r from-gray-50/50 to-blue-50/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">قائمة المسوقين</h3>
                  <p className="text-gray-600">عرض وإدارة جميع المسوقين المسجلين</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-sm text-gray-500">
                  عرض <span className="font-bold text-gray-900">1-{Math.min(10, filteredMarketers.length)}</span> من <span className="font-bold text-gray-900">{filteredMarketers.length}</span> مسوق
                </div>
                <div className="h-6 w-px bg-gray-300"></div>
                <button className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-200 hover:scale-105">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <RefreshCw className="w-12 h-12 text-blue-500 animate-spin" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">جاري التحميل...</h3>
                <p className="text-gray-600">يرجى الانتظار بينما نقوم بجلب بيانات المسوقين</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-12 h-12 text-red-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">حدث خطأ</h3>
                <p className="text-gray-600">لم نتمكن من جلب بيانات المسوقين</p>
                <button
                  onClick={handleRefresh}
                  className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  إعادة المحاولة
                </button>
              </div>
            ) : filteredMarketers.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Users className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد مسوقين</h3>
                <p className="text-gray-600">لم يتم العثور على أي مسوقين</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredMarketers.map((employee) => {
                  const statusStyles = getStatusStyles(employee.isActive);
                  const StatusIcon = statusStyles.icon;

                  return (
                    <div
                      key={employee.id}
                      className="bg-white hover:bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md border border-gray-100 transition-all duration-200"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 items-center gap-6">
                        {/* Employee Info */}
                        <div className="col-span-3 flex items-center gap-4">
                          <div className="relative w-16 h-16">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                              {employee.name.charAt(0).toUpperCase()}
                            </div>
                            <span className={`absolute bottom-0 right-0 w-4 h-4 ${employee.isActive ? 'bg-green-500' : 'bg-red-500'} rounded-full border-2 border-white`}></span>
                          </div>
                          <div>
                            <p className="font-bold text-lg text-gray-800">{employee.name}</p>
                            <p className="text-sm text-gray-600">موظف تسويق</p>
                            <p className="text-xs text-gray-500">ID: {employee.id}</p>
                          </div>
                        </div>

                        {/* Contact Info */}
                        <div className="col-span-3">
                          {employee.email && (
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                              <Mail className="w-4 h-4 text-gray-400" />
                              <span>{employee.email}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span>{employee.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span>انضم: {formatDate(employee.createdAt)}</span>
                          </div>
                        </div>

                        {/* Performance Stats */}
                        <div className="col-span-2 text-center">
                          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
                            <p className="text-2xl font-bold text-gray-900">{employee.totalAssignedTrainees}</p>
                            <p className="text-xs text-gray-600">المتدربين</p>
                          </div>
                        </div>

                        {/* Contact Stats */}
                        <div className="col-span-2 text-center">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">الاتصالات الأولى:</span>
                              <span className="font-semibold text-green-600">{employee.monthlyFirstContact}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">الاتصالات الثانية:</span>
                              <span className="font-semibold text-blue-600">{employee.monthlySecondContact}</span>
                            </div>
                          </div>
                        </div>

                        {/* Status */}
                        <div className="col-span-1 text-center">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusStyles.bgColor} ${statusStyles.color}`}>
                            <StatusIcon className="w-3 h-3 ml-1" />
                            {statusStyles.label}
                          </span>
                          <p className="text-xs text-gray-500 mt-1">الهدف: {employee.marketingTargets.length}</p>
                        </div>

                        {/* Actions */}
                        <div className="col-span-1 flex justify-center gap-2">
                          <Link
                            href={`/Marketing/${employee.id}`}
                            className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                            title="عرض التفاصيل"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <Link
                            href={`/Marketing/${employee.id}`}
                            className="p-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                            title="تعديل المسوق"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button 
                            onClick={() => handleDeleteClick(employee)}
                            className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                            title="حذف المسوق"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-200">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions Footer */}
        <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 rounded-3xl p-8 border border-white/50">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">إجراءات سريعة</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/Marketing/AddMarketer"
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
              >
                <UserPlus className="w-5 h-5" />
                إضافة مسوق جديد
              </Link>
              <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2">
                <Download className="w-5 h-5" />
                تصدير Excel
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                تقرير إحصائي
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2">
                <Activity className="w-5 h-5" />
                تحليل الأداء
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Dialog */}
      <DeleteMarketingEmployeeDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        employee={employeeToDelete}
        onSuccess={handleDeleteSuccess}
      />
    </div>
  );
};

export default Marketing;
