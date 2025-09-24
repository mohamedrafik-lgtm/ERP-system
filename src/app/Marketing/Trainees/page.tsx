"use client";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  Search,
  Filter,
  RefreshCw,
  User,
  Phone,
  Mail,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  GraduationCap,
  MapPin,
  Briefcase,
  UserCheck,
  TrendingUp,
  BarChart3,
  Download,
  Eye,
  Edit,
  Trash2,
  ArrowRight,
  UserPlus
} from "lucide-react";
import { useGetMarketingEmployeesQuery } from "@/lip/features/marketers/marketersApi";
import { MarketingEmployeeResponse } from "@/types/marketer.types";
import Link from "next/link";
import toast from "react-hot-toast";

const MarketingTraineesPage = () => {
  const router = useRouter();

  // State for search
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch marketing employees
  const { data: marketingEmployees = [], isLoading: employeesLoading, error: employeesError, refetch } = useGetMarketingEmployeesQuery();

  // Filter employees based on search
  const filteredEmployees = useMemo(() => {
    if (!searchTerm) return marketingEmployees;
    return marketingEmployees.filter(employee => 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.phone.includes(searchTerm) ||
      (employee.email && employee.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [marketingEmployees, searchTerm]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalEmployees = marketingEmployees.length;
    const activeEmployees = marketingEmployees.filter(emp => emp.isActive).length;
    const totalTrainees = marketingEmployees.reduce((sum, emp) => sum + emp.totalAssignedTrainees, 0);
    
    return {
      totalEmployees,
      activeEmployees,
      totalTrainees,
      averageTraineesPerEmployee: totalEmployees > 0 ? Math.round(totalTrainees / totalEmployees) : 0
    };
  }, [marketingEmployees]);

  // Clear filters function
  const clearFilters = () => {
    setSearchTerm("");
  };

  if (employeesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100 relative overflow-hidden">
        <div className="text-center p-12 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 relative z-10">
          <div className="relative mb-8">
            <div className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-purple-300 border-t-transparent rounded-full animate-spin mx-auto opacity-50" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">جاري تحميل بيانات المسوقين</h3>
          <p className="text-lg text-gray-600 mb-4">يرجى الانتظار بينما نقوم بجلب البيانات...</p>
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    );
  }

  if (employeesError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-red-50 to-orange-100 relative overflow-hidden">
        <div className="text-center p-12 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 relative z-10">
          <div className="relative mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
              <AlertCircle className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
              <AlertCircle className="w-4 h-4 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">حدث خطأ في التحميل</h3>
          <p className="text-lg text-gray-600 mb-6">لم نتمكن من جلب بيانات المسوقين. يرجى المحاولة مرة أخرى.</p>
          <button
            onClick={() => refetch()}
            className="px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <RefreshCw className="w-5 h-5 inline-block ml-2" />
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmMWY1ZjkiIGZpbGwtb3BhY2l0eT0iMC40Ij48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-indigo-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-white/95 via-white/90 to-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100/30 to-indigo-100/30 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-100/30 to-purple-100/30 rounded-full blur-xl"></div>
          
          <div className="relative flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-sm font-bold text-white">{stats.total}</span>
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">متدربي المسوقين</h1>
                <p className="text-lg text-gray-600">
                  اختر مسوق لعرض متدربيه
                </p>
                <p className="text-sm text-purple-600 font-semibold">
                  عرض جميع المتدربين الذين تم جلبهم بواسطة كل مسوق
                </p>
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="flex gap-4">
              <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-6 shadow-2xl text-white">
                <div className="text-center">
                  <p className="text-4xl font-bold mb-1">{stats.totalEmployees}</p>
                  <p className="text-sm font-semibold opacity-90">إجمالي المسوقين</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 shadow-2xl text-white">
                <div className="text-center">
                  <p className="text-4xl font-bold mb-1">{stats.activeEmployees}</p>
                  <p className="text-sm font-semibold opacity-90">المسوقين النشطين</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 shadow-2xl text-white">
                <div className="text-center">
                  <p className="text-4xl font-bold mb-1">{stats.totalTrainees}</p>
                  <p className="text-sm font-semibold opacity-90">إجمالي المتدربين</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 shadow-2xl text-white">
                <div className="text-center">
                  <p className="text-4xl font-bold mb-1">{stats.averageTraineesPerEmployee}</p>
                  <p className="text-sm font-semibold opacity-90">متوسط المتدربين</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search Section */}
        <div className="bg-gradient-to-r from-gray-50/80 to-purple-50/80 rounded-2xl p-6 backdrop-blur-sm border border-white/50 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-100/20 to-indigo-100/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-blue-100/20 to-purple-100/20 rounded-full blur-lg"></div>
          <div className="relative flex flex-col lg:flex-row gap-6 items-center justify-between z-10">
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={clearFilters}
                className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold"
              >
                <Filter className="w-5 h-5" />
                مسح الفلاتر
              </button>

              {/* Search */}
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="البحث في المسوقين..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-64"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => refetch()}
                className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-sm"
              >
                <RefreshCw className="w-4 h-4" />
                تحديث
              </button>
            </div>
          </div>
        </div>

        {/* Marketing Employees Grid */}
        <div className="bg-gradient-to-br from-white/95 via-white/90 to-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-100/20 to-indigo-100/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-100/20 to-purple-100/20 rounded-full blur-xl"></div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredEmployees.map((employee, index) => (
                <div key={employee.id} className="group relative">
                  <div className="bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                    {/* Employee Avatar */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <User className="w-8 h-8 text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-white">{index + 1}</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 text-lg mb-1 truncate">{employee.name}</h3>
                        <p className="text-sm text-gray-600 truncate">{employee.phone}</p>
                        {employee.email && (
                          <p className="text-xs text-gray-500 truncate">{employee.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Employee Stats */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-600">المتدربين المخصصين</span>
                        <span className="text-lg font-bold text-purple-600">{employee.totalAssignedTrainees}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-600">التواصل الأول</span>
                        <span className="text-lg font-bold text-green-600">{employee.monthlyFirstContact}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-600">التواصل الثاني</span>
                        <span className="text-lg font-bold text-blue-600">{employee.monthlySecondContact}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-600">الحالة</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          employee.isActive 
                            ? 'text-green-600 bg-green-100' 
                            : 'text-red-600 bg-red-100'
                        }`}>
                          {employee.isActive ? 'نشط' : 'غير نشط'}
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Link 
                      href={`/Marketing/Trainees/${employee.id}`}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      <UserPlus className="w-4 h-4" />
                      عرض المتدربين
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredEmployees.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">لا توجد نتائج</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm ? 'لم نجد مسوقين يطابقون البحث' : 'لا يوجد مسوقين في النظام'}
                </p>
                {searchTerm && (
                  <button
                    onClick={clearFilters}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    مسح البحث
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingTraineesPage;
