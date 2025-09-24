"use client";
import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
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
  ArrowLeft
} from "lucide-react";
import { useGetMarketingEmployeeTraineesQuery, useGetMarketingEmployeeByIdQuery } from "@/lip/features/marketers/marketersApi";
import { MarketingEmployeeTraineesResponse, MarketingEmployeeTraineesFilters, Trainee } from "@/types/marketing-employee-trainees.types";
import Link from "next/link";
import toast from "react-hot-toast";

const MarketingEmployeeTraineesPage = () => {
  const params = useParams();
  const router = useRouter();
  const employeeId = parseInt(params.employeeId as string);

  // State for filters and search
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [programFilter, setProgramFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [enrollmentFilter, setEnrollmentFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Prepare query parameters
  const queryParams: MarketingEmployeeTraineesFilters = useMemo(() => ({
    page: currentPage,
    limit: pageSize,
    search: searchTerm,
    status: statusFilter !== 'all' ? statusFilter : undefined,
    programId: programFilter !== 'all' ? parseInt(programFilter) : undefined,
    gender: genderFilter !== 'all' ? genderFilter : undefined,
    enrollmentType: enrollmentFilter !== 'all' ? enrollmentFilter : undefined,
  }), [currentPage, pageSize, searchTerm, statusFilter, programFilter, genderFilter, enrollmentFilter]);

  // Fetch marketing employee details
  const { data: employee, isLoading: employeeLoading, error: employeeError } = useGetMarketingEmployeeByIdQuery(employeeId);

  // Fetch marketing employee trainees
  const { data: traineesData, isLoading: traineesLoading, error: traineesError, refetch } = useGetMarketingEmployeeTraineesQuery({
    employeeId,
    filters: queryParams
  });

  // Calculate statistics
  const stats = useMemo(() => {
    if (!traineesData) return { total: 0, thisMonth: 0, lastMonth: 0, growthRate: 0 };
    
    const now = new Date();
    const thisMonth = now.getMonth() + 1;
    const thisYear = now.getFullYear();
    const lastMonth = thisMonth === 1 ? 12 : thisMonth - 1;
    const lastYear = thisMonth === 1 ? thisYear - 1 : thisYear;

    const thisMonthTrainees = traineesData.data.filter(trainee => {
      const traineeDate = new Date(trainee.createdAt);
      return traineeDate.getMonth() + 1 === thisMonth && traineeDate.getFullYear() === thisYear;
    }).length;

    const lastMonthTrainees = traineesData.data.filter(trainee => {
      const traineeDate = new Date(trainee.createdAt);
      return traineeDate.getMonth() + 1 === lastMonth && traineeDate.getFullYear() === lastYear;
    }).length;

    const growthRate = lastMonthTrainees > 0 ? ((thisMonthTrainees - lastMonthTrainees) / lastMonthTrainees) * 100 : 0;

    return {
      total: traineesData.total,
      thisMonth: thisMonthTrainees,
      lastMonth: lastMonthTrainees,
      growthRate: Math.round(growthRate)
    };
  }, [traineesData]);

  // Clear filters function
  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setProgramFilter("all");
    setGenderFilter("all");
    setEnrollmentFilter("all");
    setCurrentPage(1);
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'text-green-600 bg-green-100';
      case 'INACTIVE': return 'text-red-600 bg-red-100';
      case 'PENDING': return 'text-yellow-600 bg-yellow-100';
      case 'COMPLETED': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // Get status text
  const getStatusText = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'نشط';
      case 'INACTIVE': return 'غير نشط';
      case 'PENDING': return 'في الانتظار';
      case 'COMPLETED': return 'مكتمل';
      default: return 'غير محدد';
    }
  };

  // Get gender text
  const getGenderText = (gender: string) => {
    switch (gender) {
      case 'MALE': return 'ذكر';
      case 'FEMALE': return 'أنثى';
      default: return 'غير محدد';
    }
  };

  // Get enrollment type text
  const getEnrollmentText = (type: string) => {
    switch (type) {
      case 'FULL_TIME': return 'دوام كامل';
      case 'PART_TIME': return 'دوام جزئي';
      case 'ONLINE': return 'أونلاين';
      case 'HYBRID': return 'مختلط';
      default: return 'غير محدد';
    }
  };

  if (employeeLoading || traineesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100 relative overflow-hidden">
        <div className="text-center p-12 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 relative z-10">
          <div className="relative mb-8">
            <div className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-purple-300 border-t-transparent rounded-full animate-spin mx-auto opacity-50" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">جاري تحميل بيانات المتدربين</h3>
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

  if (employeeError || traineesError) {
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
          <p className="text-lg text-gray-600 mb-6">لم نتمكن من جلب بيانات المتدربين. يرجى المحاولة مرة أخرى.</p>
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
              <Link 
                href="/Marketing/Trainees"
                className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 hover:scale-105"
                title="العودة إلى قائمة المسوقين"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </Link>
              
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-sm font-bold text-white">{stats.total}</span>
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">متدربي المسوق</h1>
                <p className="text-lg text-gray-600">
                  {employee?.name || 'جاري التحميل...'}
                </p>
                <p className="text-sm text-purple-600 font-semibold">
                  عرض جميع المتدربين الذين تم جلبهم بواسطة هذا المسوق
                </p>
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="flex gap-4">
              <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-6 shadow-2xl text-white">
                <div className="text-center">
                  <p className="text-4xl font-bold mb-1">{stats.total}</p>
                  <p className="text-sm font-semibold opacity-90">إجمالي المتدربين</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 shadow-2xl text-white">
                <div className="text-center">
                  <p className="text-4xl font-bold mb-1">{stats.thisMonth}</p>
                  <p className="text-sm font-semibold opacity-90">هذا الشهر</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 shadow-2xl text-white">
                <div className="text-center">
                  <p className="text-4xl font-bold mb-1">{stats.growthRate}%</p>
                  <p className="text-sm font-semibold opacity-90">معدل النمو</p>
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
                  placeholder="البحث في المتدربين..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-64"
                />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">جميع الحالات</option>
                <option value="ACTIVE">نشط</option>
                <option value="INACTIVE">غير نشط</option>
                <option value="PENDING">في الانتظار</option>
                <option value="COMPLETED">مكتمل</option>
              </select>

              {/* Gender Filter */}
              <select
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">جميع الأجناس</option>
                <option value="MALE">ذكر</option>
                <option value="FEMALE">أنثى</option>
              </select>
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

        {/* Trainees Table */}
        <div className="bg-gradient-to-br from-white/95 via-white/90 to-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-100/20 to-indigo-100/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-100/20 to-purple-100/20 rounded-full blur-xl"></div>
          
          <div className="overflow-x-auto relative rounded-3xl">
            <table className="w-full relative rounded-3xl overflow-hidden shadow-2xl border border-white/20">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200 sticky top-0 z-10 backdrop-blur-md">
                <tr>
                  <th className="text-right py-6 px-6 font-bold text-gray-800 text-lg">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-purple-600" />
                      المتدرب
                    </div>
                  </th>
                  <th className="text-right py-6 px-6 font-bold text-gray-800 text-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-blue-600" />
                      البرنامج
                    </div>
                  </th>
                  <th className="text-right py-6 px-6 font-bold text-gray-800 text-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      الحالة
                    </div>
                  </th>
                  <th className="text-right py-6 px-6 font-bold text-gray-800 text-lg">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-orange-600" />
                      تاريخ التسجيل
                    </div>
                  </th>
                  <th className="text-right py-6 px-6 font-bold text-gray-800 text-lg">
                    <div className="flex items-center gap-3">
                      <Briefcase className="w-5 h-5 text-indigo-600" />
                      نوع التسجيل
                    </div>
                  </th>
                  <th className="text-right py-6 px-6 font-bold text-gray-800 text-lg">
                    <div className="flex items-center gap-3">
                      <Eye className="w-5 h-5 text-gray-600" />
                      الإجراءات
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white/80 backdrop-blur-sm">
                {traineesData?.data.map((trainee, index) => (
                  <tr key={trainee.id} className={`border-b border-gray-100 hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-indigo-50/50 transition-all duration-300 group ${index % 2 === 0 ? 'bg-white/90' : 'bg-gray-50/40'}`}>
                    {/* Trainee Info */}
                    <td className="py-4 px-4 w-80">
                      <div className="h-32 flex items-center gap-4">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-white">{index + 1}</span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-gray-900 text-lg mb-1 truncate">{trainee.nameAr}</p>
                          {trainee.nameEn && (
                            <p className="text-xs text-gray-500 mb-1 truncate">{trainee.nameEn}</p>
                          )}
                          {trainee.phone && (
                            <p className="text-xs text-gray-500 flex items-center gap-1 bg-green-50 rounded px-2 py-1">
                              <Phone className="w-3 h-3 text-green-500" />
                              <span className="font-medium truncate">{trainee.phone}</span>
                            </p>
                          )}
                          {trainee.email && (
                            <p className="text-xs text-gray-500 flex items-center gap-1 bg-blue-50 rounded px-2 py-1 mt-1">
                              <Mail className="w-3 h-3 text-blue-500" />
                              <span className="font-medium truncate">{trainee.email}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Program */}
                    <td className="py-4 px-4 w-64">
                      <div className="h-32 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200/50 flex flex-col justify-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                            <FileText className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-xs font-bold text-blue-800">البرنامج</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900 text-center block">{trainee.program.nameAr}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4 w-64">
                      <div className="h-32 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200/50 flex flex-col justify-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                            <CheckCircle className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-xs font-bold text-green-800">الحالة</span>
                        </div>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(trainee.status || 'PENDING')}`}>
                          {getStatusText(trainee.status || 'PENDING')}
                        </span>
                      </div>
                    </td>

                    {/* Registration Date */}
                    <td className="py-4 px-4 w-64">
                      <div className="h-32 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200/50 flex flex-col justify-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                            <Calendar className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-xs font-bold text-orange-800">تاريخ التسجيل</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900 text-center block">
                          {new Date(trainee.createdAt).toLocaleDateString('ar-EG')}
                        </span>
                        <span className="text-xs text-gray-500 text-center block">
                          {new Date(trainee.createdAt).toLocaleTimeString('ar-EG')}
                        </span>
                      </div>
                    </td>

                    {/* Enrollment Type */}
                    <td className="py-4 px-4 w-64">
                      <div className="h-32 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-200/50 flex flex-col justify-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <Briefcase className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-xs font-bold text-indigo-800">نوع التسجيل</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900 text-center block">
                          {getEnrollmentText(trainee.enrollmentType || 'FULL_TIME')}
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 w-64">
                      <div className="h-32 flex items-center justify-center gap-2">
                        <button
                          className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                          title="عرض التفاصيل"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="p-3 bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                          title="تعديل"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                          title="حذف"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {traineesData && traineesData.totalPages > 1 && (
            <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-purple-50 border-t-2 border-gray-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-100/20 to-indigo-100/20 rounded-full blur-xl"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-blue-100/20 to-purple-100/20 rounded-full blur-lg"></div>
              <div className="relative flex flex-col lg:flex-row items-center justify-between gap-4 z-10">
                <div className="flex items-center gap-3">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-gray-200 shadow-sm">
                    <p className="text-sm font-semibold text-gray-700">
                      عرض <span className="text-purple-600 font-bold">{((currentPage - 1) * pageSize) + 1}</span> إلى <span className="text-purple-600 font-bold">{Math.min(currentPage * pageSize, traineesData.total)}</span> من <span className="text-purple-600 font-bold">{traineesData.total}</span> متدرب
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
                  >
                    السابق
                  </button>
                  
                  <div className="flex items-center gap-2">
                    {Array.from({ length: Math.min(5, traineesData.totalPages) }, (_, i) => {
                      const pageNum = i + 1;
                      const isActive = pageNum === currentPage;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-10 h-10 rounded-xl text-sm font-bold transition-all duration-300 hover:scale-110 ${
                            isActive
                              ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg'
                              : 'bg-white/80 text-gray-700 hover:bg-purple-100 border border-gray-200'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, traineesData.totalPages))}
                    disabled={currentPage === traineesData.totalPages}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed"
                  >
                    التالي
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketingEmployeeTraineesPage;
