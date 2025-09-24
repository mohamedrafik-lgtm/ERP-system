"use client";
import { useState, useMemo } from "react";
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
  UserPlus,
  UserCheck,
  X,
  ChevronDown,
  DollarSign
} from "lucide-react";
import { useGetMarketingTraineesQuery, useGetMarketingEmployeesQuery, useUpdateTraineeContactMutation, useAssignTraineeToEmployeeMutation } from "@/lip/features/marketers/marketersApi";
import { MarketingTraineeResponse, MarketingTraineesQueryParams, MarketingEmployeeForContact, AssignTraineeRequest } from "@/types/submissions.types";
import toast from "react-hot-toast";

const MarketingSubmissionsPage = () => {
  // State for filters and search
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [employeeFilter, setEmployeeFilter] = useState("all");
  const [unassignedFilter, setUnassignedFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  // Build query parameters
  const queryParams: MarketingTraineesQueryParams = {
    page: currentPage.toString(),
    limit: pageSize.toString(),
    search: searchTerm,
    status: statusFilter === "all" ? "" : statusFilter,
    employeeId: employeeFilter === "all" ? "" : employeeFilter,
    unassigned: unassignedFilter === "all" ? "" : unassignedFilter,
  };

  // Fetch data
  const { data: traineesData, isLoading, error, refetch } = useGetMarketingTraineesQuery(queryParams);
  const { data: marketingEmployees = [] } = useGetMarketingEmployeesQuery();

  // Mutation for updating contact assignment
  const [updateTraineeContact, { isLoading: isUpdating }] = useUpdateTraineeContactMutation();

  // Calculate statistics
  const stats = useMemo(() => {
    if (!traineesData) return { total: 0, assigned: 0, unassigned: 0 };
    
    const total = traineesData.total;
    const assigned = traineesData.data.filter(t => t.firstContactEmployeeId || t.secondContactEmployeeId).length;
    const unassigned = total - assigned;
    
    return { total, assigned, unassigned };
  }, [traineesData]);

  // Handle contact assignment
  const handleContactAssignment = async (traineeId: number, contactType: 'first' | 'second', employeeId: number | null) => {
    try {
      const updateData = contactType === 'first' 
        ? { firstContactEmployeeId: employeeId }
        : { secondContactEmployeeId: employeeId };

      await updateTraineeContact({
        id: traineeId,
        data: updateData
      }).unwrap();

      toast.success(`تم تحديث ${contactType === 'first' ? 'التواصل الأول' : 'التواصل الثاني'} بنجاح`);
      refetch();
    } catch (error: any) {
      toast.error(`خطأ في تحديث ${contactType === 'first' ? 'التواصل الأول' : 'التواصل الثاني'}: ${error?.message || 'يرجى المحاولة مرة أخرى'}`);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setEmployeeFilter("all");
    setUnassignedFilter("all");
    setCurrentPage(1);
  };

  // Get payment status color
  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'PAID': return 'text-green-600 bg-green-100';
      case 'PENDING': return 'text-yellow-600 bg-yellow-100';
      case 'PARTIAL': return 'text-blue-600 bg-blue-100';
      case 'UNPAID': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // Get payment status text
  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case 'PAID': return 'مدفوع';
      case 'PENDING': return 'في الانتظار';
      case 'PARTIAL': return 'جزئي';
      case 'UNPAID': return 'غير مدفوع';
      default: return 'غير محدد';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-indigo-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
        
        <div className="text-center p-12 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 relative z-10">
          <div className="relative mb-8">
            <div className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-purple-300 border-t-transparent rounded-full animate-spin mx-auto opacity-50" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">جاري تحميل بيانات التقديمات</h3>
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

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-red-50 to-orange-100 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-red-200/20 to-orange-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-orange-200/20 to-red-200/20 rounded-full blur-3xl"></div>
        
        <div className="text-center p-12 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 relative z-10">
          <div className="relative mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
              <AlertCircle className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
              <X className="w-4 h-4 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">حدث خطأ في التحميل</h3>
          <p className="text-lg text-gray-600 mb-6">لم نتمكن من جلب بيانات التقديمات. يرجى المحاولة مرة أخرى.</p>
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
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmMWY1ZjkiIGZpbGwtb3BhY2l0eT0iMC40Ij48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>
      
      {/* Additional decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-indigo-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-100/10 to-indigo-100/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-blue-100/10 to-purple-100/10 rounded-full blur-xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header Section */}
        <div className="bg-gradient-to-r from-white/95 via-white/90 to-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 p-8 mb-8 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100/30 to-indigo-100/30 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-100/30 to-purple-100/30 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-r from-purple-100/20 to-indigo-100/20 rounded-full blur-lg"></div>
          
          <div className="relative flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl">
                  <FileText className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <Users className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-5xl font-black bg-gradient-to-r from-gray-900 via-purple-800 to-indigo-800 bg-clip-text text-transparent mb-3">
                  إدارة التواصل مع المتدربين
                </h1>
                <p className="text-xl text-gray-600 font-medium leading-relaxed max-w-2xl">
                  تحديد موظفي التسويق للتواصل الأول والثاني مع المتدربين 
                  <span className="text-purple-600 font-semibold"> (التواصل الأول يحتسب في التارجت)</span>
                </p>
              </div>
            </div>

            {/* Enhanced Statistics Cards */}
            <div className="flex gap-4">
              <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-6 shadow-2xl text-white">
                <div className="text-center">
                  <p className="text-4xl font-bold mb-1">{stats.total}</p>
                  <p className="text-sm font-semibold opacity-90">إجمالي المتدربين</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 shadow-2xl text-white">
                <div className="text-center">
                  <p className="text-4xl font-bold mb-1">{stats.assigned}</p>
                  <p className="text-sm font-semibold opacity-90">مُعيَّن</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 shadow-2xl text-white">
                <div className="text-center">
                  <p className="text-4xl font-bold mb-1">{stats.unassigned}</p>
                  <p className="text-sm font-semibold opacity-90">غير مُعيَّن</p>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Filters and Search Section */}
          <div className="mt-8 bg-gradient-to-r from-gray-50/80 to-purple-50/80 rounded-2xl p-6 backdrop-blur-sm border border-white/50 relative overflow-hidden">
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

                {/* Enhanced First Contact Filter */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="relative appearance-none bg-white/90 backdrop-blur-sm border-2 border-green-200 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-4 focus:ring-green-300 focus:border-green-400 transition-all duration-200 font-semibold text-gray-700 min-w-[180px]"
                  >
                    <option value="all">فلترة بالتواصل الأول</option>
                    <option value="assigned">مُعيَّن</option>
                    <option value="unassigned">غير مُعيَّن</option>
                  </select>
                  <ChevronDown className="w-5 h-5 text-green-600 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Employee Filter */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                  <select
                    value={employeeFilter}
                    onChange={(e) => setEmployeeFilter(e.target.value)}
                    className="relative appearance-none bg-white/90 backdrop-blur-sm border-2 border-blue-200 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-400 transition-all duration-200 font-semibold text-gray-700 min-w-[160px]"
                  >
                    <option value="all">جميع الموظفين</option>
                    {marketingEmployees.map((employee) => (
                      <option key={employee.id} value={employee.id.toString()}>
                        {employee.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-5 h-5 text-blue-600 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Enhanced Search Input */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative">
                  <Search className="w-6 h-6 text-purple-500 absolute right-4 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="البحث في المتدربين..."
                    className="w-full lg:w-96 px-4 py-3 pr-12 bg-white/90 backdrop-blur-sm border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-400 transition-all duration-200 font-semibold text-gray-700 placeholder-gray-500"
                    dir="rtl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Main Content Section */}
        <div className="bg-gradient-to-br from-white/95 via-white/90 to-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 overflow-hidden relative">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-100/20 to-indigo-100/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-100/20 to-purple-100/20 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-r from-purple-100/10 to-indigo-100/10 rounded-full blur-lg"></div>
          
          {/* Enhanced Section Header */}
          <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 px-8 py-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
            <div className="relative flex items-center justify-between z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-1">إدارة التواصل مع المتدربين</h2>
                  <p className="text-purple-100 text-lg">تحديد وتعيين موظفي التسويق للمتدربين</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white/80 text-sm">إجمالي النتائج</p>
                <p className="text-2xl font-bold text-white">{traineesData?.total || 0}</p>
              </div>
            </div>
          </div>

          {/* Enhanced Table */}
          <div className="overflow-x-auto relative rounded-3xl">
            {/* Table Shadow Effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-100/20 to-indigo-100/20 rounded-3xl blur-2xl -z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100/10 to-purple-100/10 rounded-3xl blur-xl -z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-100/5 to-purple-100/5 rounded-3xl blur-lg -z-10"></div>
            
            <table className="w-full relative rounded-3xl overflow-hidden shadow-2xl border border-white/20">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200 sticky top-0 z-10 backdrop-blur-md">
                <tr>
                  <th className="text-right py-6 px-6 font-bold text-gray-800 text-lg">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-purple-600" />
                      المتدرب
                    </div>
                  </th>
                  <th className="text-center py-6 px-6 font-bold text-gray-800 text-lg">
                    <div className="flex items-center justify-center gap-3">
                      <FileText className="w-5 h-5 text-blue-600" />
                      البرنامج
                    </div>
                  </th>
                  <th className="text-center py-6 px-6 font-bold text-gray-800 text-lg">
                    <div className="flex items-center justify-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      المبلغ المدفوع
                    </div>
                  </th>
                  <th className="text-center py-6 px-6 font-bold text-white text-lg bg-gradient-to-r from-green-500 to-emerald-600">
                    <div className="flex items-center justify-center gap-3">
                      <UserPlus className="w-5 h-5" />
                      التواصل الأول يحتسب في التارجت
                    </div>
                  </th>
                  <th className="text-center py-6 px-6 font-bold text-white text-lg bg-gradient-to-r from-blue-500 to-cyan-600">
                    <div className="flex items-center justify-center gap-3">
                      <UserCheck className="w-5 h-5" />
                      التواصل الثاني لا يحتسب في التارجت
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white/80 backdrop-blur-sm">
                {traineesData?.data.map((trainee, index) => (
                  <tr key={trainee.id} className={`border-b border-gray-100 hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-indigo-50/50 transition-all duration-300 group ${index % 2 === 0 ? 'bg-white/90' : 'bg-gray-50/40'}`}>
                    {/* Trainee Info - Fixed Height */}
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
                          <p className="font-bold text-gray-900 text-lg mb-1 truncate">{trainee.name}</p>
                          <p className="text-xs text-gray-600 font-medium mb-1 bg-gray-100 rounded px-2 py-1 inline-block truncate">الرقم القومي: {trainee.nationalId}</p>
                          <p className="text-xs text-gray-500 flex items-center gap-1 bg-green-50 rounded px-2 py-1">
                            <Phone className="w-3 h-3 text-green-500" />
                            <span className="font-medium truncate">{trainee.phone}</span>
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Program - Fixed Height */}
                    <td className="py-4 px-4 w-64">
                      <div className="h-32 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200/50 flex flex-col justify-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                            <FileText className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-xs font-bold text-blue-800">البرنامج</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900 text-center block">{trainee.program.nameAr}</span>
                        <div className="mt-1 text-xs text-blue-600 font-medium bg-white/60 rounded px-2 py-1 text-center">
                          {trainee.program.nameEn}
                        </div>
                      </div>
                    </td>

                    {/* Payment Status - Fixed Height */}
                    <td className="py-4 px-4 w-64">
                      <div className="h-32 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200/50 flex flex-col justify-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                            <DollarSign className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-xs font-bold text-green-800">حالة الدفع</span>
                        </div>
                        <div className="space-y-2">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${getPaymentStatusColor(trainee.paymentStatus)}`}>
                            {getPaymentStatusText(trainee.paymentStatus)}
                          </span>
                          <div className="bg-white/90 rounded-lg p-2 border border-green-200">
                            <span className="text-sm font-bold text-gray-900">{trainee.amountPaid}</span>
                            <span className="text-xs text-gray-600 mr-1">{trainee.currency}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* First Contact Assignment - Fixed Height */}
                    <td className="py-4 px-4 w-80">
                      <div className="h-32 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-200/60 flex flex-col justify-center">
                        <div className="flex items-center justify-center gap-2 mb-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                            <UserPlus className="w-4 h-4 text-white" />
                          </div>
                          <div className="text-center">
                            <h3 className="text-sm font-bold text-green-800">التواصل الأول</h3>
                            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                              يحتسب في التارجت
                            </div>
                          </div>
                        </div>
                        <div className="relative">
                          <select
                            value={trainee.firstContactEmployeeId || ""}
                            onChange={(e) => handleContactAssignment(trainee.id, 'first', e.target.value ? parseInt(e.target.value) : null)}
                            disabled={isUpdating}
                            className="w-full appearance-none bg-white/95 border border-green-300 rounded-lg px-3 py-2 text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                          >
                            <option value="">اختر موظف التسويق</option>
                            {marketingEmployees.map((employee) => (
                              <option key={employee.id} value={employee.id}>
                                {employee.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        {trainee.firstContactEmployee && (
                          <div className="mt-2 bg-green-100 rounded-lg p-2 border border-green-200">
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-2 h-2 text-white" />
                              </div>
                              <span className="text-xs font-bold text-green-800 truncate">
                                {trainee.firstContactEmployee.name}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Second Contact Assignment - Fixed Height */}
                    <td className="py-4 px-4 w-80">
                      <div className="h-32 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border-2 border-blue-200/60 flex flex-col justify-center">
                        <div className="flex items-center justify-center gap-2 mb-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                            <UserCheck className="w-4 h-4 text-white" />
                          </div>
                          <div className="text-center">
                            <h3 className="text-sm font-bold text-blue-800">التواصل الثاني</h3>
                            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                              لا يحتسب في التارجت
                            </div>
                          </div>
                        </div>
                        <div className="relative">
                          <select
                            value={trainee.secondContactEmployeeId || ""}
                            onChange={(e) => handleContactAssignment(trainee.id, 'second', e.target.value ? parseInt(e.target.value) : null)}
                            disabled={isUpdating}
                            className="w-full appearance-none bg-white/95 border border-blue-300 rounded-lg px-3 py-2 text-xs font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                          >
                            <option value="">اختر موظف التسويق</option>
                            {marketingEmployees.map((employee) => (
                              <option key={employee.id} value={employee.id}>
                                {employee.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        {trainee.secondContactEmployee && (
                          <div className="mt-2 bg-blue-100 rounded-lg p-2 border border-blue-200">
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-2 h-2 text-white" />
                              </div>
                              <span className="text-xs font-bold text-blue-800 truncate">
                                {trainee.secondContactEmployee.name}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Enhanced Pagination */}
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
                    <ChevronLeft className="w-4 h-4" />
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
                    <ChevronRight className="w-4 h-4" />
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

export default MarketingSubmissionsPage;
