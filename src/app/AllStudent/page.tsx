"use client";
import { useGetTraineesStatsQuery } from "@/lip/features/trainees/traineesApi";
import { RefreshCw } from "lucide-react";

export default function TraineesArchivePage() {
  const { data, isLoading, error, refetch } = useGetTraineesStatsQuery();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-black bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">أرشيف المتدربين</h1>
          <button onClick={() => refetch()} className="p-3 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 rounded-xl shadow-lg border border-gray-200/50">
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-white/90 rounded-2xl shadow animate-pulse" />
            ))}
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
            حدث خطأ أثناء جلب الإحصائيات
          </div>
        )}

        {data && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50">
              <p className="text-sm text-gray-600">إجمالي المتدربين</p>
              <p className="text-4xl font-extrabold text-gray-900">{data.totalTrainees}</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50">
              <p className="text-sm text-gray-600">النشطون</p>
              <p className="text-4xl font-extrabold text-blue-700">{data.activeTrainees}</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50">
              <p className="text-sm text-gray-600">الجدد هذا الشهر</p>
              <p className="text-4xl font-extrabold text-emerald-700">{data.newTrainees}</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50">
              <p className="text-sm text-gray-600">المتخرجون</p>
              <p className="text-4xl font-extrabold text-purple-700">{data.graduates}</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50">
              <p className="text-sm text-gray-600">نسبة التخرج</p>
              <p className="text-4xl font-extrabold text-orange-700">{data.graduationRate}%</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";
import FilterButton from "@/components/ui/filterButton";
import { Input } from "@/components/input";
import StudentTable from "@/components/AllStudent/studentTable";
import Paginator from "@/components/ui/paginator";
import { NavigationButton } from "@/components/ui/NavigationButton";
import { memo, useState, useMemo } from "react";
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  Eye, 
  Edit, 
  Trash2, 
  MoreVertical,
  Plus,
  RefreshCw,
  Settings,
  BarChart3,
  Calendar,
  UserCheck,
  UserX,
  GraduationCap
} from "lucide-react";

const AllStudent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for statistics
  const stats = useMemo(() => ({
    total: 1247,
    active: 892,
    graduated: 234,
    pending: 121,
    thisMonth: 45,
    thisWeek: 12
  }), []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate search
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleExport = () => {
    console.log("Exporting data...");
  };

  const handleImport = () => {
    console.log("Importing data...");
  };

  return(
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
                  جميع المتدربين
                </h1>
                <p className="text-lg text-gray-600 font-medium">
                  إدارة وعرض جميع المتدربين المسجلين في النظام
                </p>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>نظام إدارة المتدربين</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <BarChart3 className="w-4 h-4" />
                    <span>إجمالي: {stats.total} متدرب</span>
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
                  onClick={handleImport}
                  className="p-3 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border border-gray-200/50"
                  title="استيراد البيانات"
                >
                  <Upload className="w-5 h-5" />
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="p-3 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border border-gray-200/50"
                  title="تحديث البيانات"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>
              <NavigationButton 
                name="إضافة متدرب جديد" 
                url="/AddStudent" 
                className="inline-flex items-center gap-3 px-8 py-4 text-white bg-gradient-to-r from-orange-500 via-red-500 to-pink-600 hover:from-orange-600 hover:via-red-600 hover:to-pink-700 focus:outline-none focus:ring-4 focus:ring-orange-300 transition-all duration-300 rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 font-bold text-lg"
              />
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">إجمالي المتدربين</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">نشط</p>
                <p className="text-3xl font-bold text-green-600">{stats.active.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">متخرج</p>
                <p className="text-3xl font-bold text-purple-600">{stats.graduated.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">في الانتظار</p>
                <p className="text-3xl font-bold text-orange-600">{stats.pending.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <UserX className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">هذا الشهر</p>
                <p className="text-3xl font-bold text-indigo-600">+{stats.thisMonth}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">هذا الأسبوع</p>
                <p className="text-3xl font-bold text-pink-600">+{stats.thisWeek}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Search Section */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Search className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">البحث المتقدم</h3>
              <p className="text-gray-600">ابحث عن المتدربين باستخدام معايير متعددة</p>
            </div>
          </div>
          
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-2xl blur-sm group-hover:blur-md transition-all duration-300"></div>
                <div className="relative">
                  <Input 
                    type="text" 
                    placeholder="ابحث بالاسم، الرقم القومي، الهاتف، أو البريد الإلكتروني..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full py-4 px-6 text-gray-700 placeholder-gray-400 bg-white/80 backdrop-blur-sm border-2 border-gray-200/50 rounded-2xl focus:ring-4 focus:ring-orange-100/50 focus:border-orange-500 transition-all duration-300 text-lg"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <Search className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors duration-200" />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 py-4 px-8 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-2xl hover:from-orange-600 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-orange-300 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>جاري البحث...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      <span>بحث</span>
                    </>
                  )}
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

        {/* Enhanced Filter Section */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 p-8 mb-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Filter className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">فلتر البيانات</h3>
                <p className="text-gray-600">قم بتصفية المتدربين حسب المعايير المطلوبة</p>
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
                  <Users className="w-5 h-5" />
                </button>
              </div>
              
              <button className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all duration-200 hover:scale-105">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3">
              <label className="block text-sm font-bold text-gray-700">البرنامج التدريبي</label>
              <FilterButton 
                label="اختر البرنامج"
                options={["Frontend", "Backend", "Fullstack", "Mobile", "DevOps", "Data Science"]}
                paramKey="program"
                className="w-full px-4 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200/50 rounded-2xl hover:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-100/50 transition-all duration-300 shadow-lg hover:shadow-xl text-gray-700 font-medium"
              />
            </div>
            
            <div className="space-y-3">
              <label className="block text-sm font-bold text-gray-700">حالة المتدرب</label>
              <FilterButton
                label="اختر الحالة"
                paramKey="status"
                options={["نشط", "في الانتظار", "متخرج", "معلق", "منسحب"]}
                className="w-full px-4 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200/50 rounded-2xl hover:border-green-500 focus:outline-none focus:ring-4 focus:ring-green-100/50 transition-all duration-300 shadow-lg hover:shadow-xl text-gray-700 font-medium"
              />
            </div>
            
            <div className="space-y-3">
              <label className="block text-sm font-bold text-gray-700">تاريخ التسجيل</label>
              <FilterButton
                label="ترتيب حسب التاريخ"
                paramKey="date"
                options={["الأحدث", "الأقدم", "هذا الشهر", "هذا العام"]}
                className="w-full px-4 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200/50 rounded-2xl hover:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100/50 transition-all duration-300 shadow-lg hover:shadow-xl text-gray-700 font-medium"
              />
            </div>
            
            <div className="space-y-3">
              <label className="block text-sm font-bold text-gray-700">نوع القيد</label>
              <FilterButton
                label="نوع القيد"
                paramKey="enrollment"
                options={["عادي", "مؤجل", "منتظم", "مسائي"]}
                className="w-full px-4 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200/50 rounded-2xl hover:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-100/50 transition-all duration-300 shadow-lg hover:shadow-xl text-gray-700 font-medium"
              />
            </div>
          </div>
          
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                تطبيق الفلاتر
              </button>
              <button className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all duration-300 hover:scale-105">
                مسح الكل
              </button>
            </div>
            
            <div className="text-sm text-gray-500">
              <span className="font-semibold">النتائج:</span> 1,247 متدرب
            </div>
          </div>
        </div>

        {/* Enhanced Table Section */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 overflow-hidden mb-8">
          <div className="p-8 border-b border-gray-200/50 bg-gradient-to-r from-gray-50/50 to-blue-50/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">قائمة المتدربين</h3>
                  <p className="text-gray-600">عرض وإدارة جميع المتدربين المسجلين</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="text-sm text-gray-500">
                  عرض <span className="font-bold text-gray-900">1-10</span> من <span className="font-bold text-gray-900">1,247</span> متدرب
                </div>
                <div className="h-6 w-px bg-gray-300"></div>
                <button className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-200 hover:scale-105">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <StudentTable />
          </div>
        </div>

        {/* Enhanced Pagination Section */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-white/50 p-6">
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                عرض <span className="font-bold text-gray-900">10</span> متدرب في الصفحة
              </div>
              <div className="h-6 w-px bg-gray-300"></div>
              <Paginator totalPages={5} />
            </div>
          </div>
        </div>

        {/* Quick Actions Footer */}
        <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl p-8 border border-white/50">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">إجراءات سريعة</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2">
                <Download className="w-5 h-5" />
                تصدير Excel
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2">
                <Upload className="w-5 h-5" />
                استيراد بيانات
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                تقرير إحصائي
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                إعدادات العرض
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(AllStudent);