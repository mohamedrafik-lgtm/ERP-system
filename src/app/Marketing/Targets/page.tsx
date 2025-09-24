"use client";
import { useState, useMemo } from "react";
import {
  Target,
  Plus,
  Calendar,
  Users,
  TrendingUp,
  Edit,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Filter,
  Search,
  BarChart3,
  Award,
  Clock,
  User,
  Phone,
  Mail,
  Activity
} from "lucide-react";
import { useGetMarketingEmployeesQuery, useGetMarketingTargetsQuery } from "@/lip/features/marketers/marketersApi";
import { MarketingEmployeeResponse, MarketingTargetResponse } from "@/types/marketer.types";
import CreateTargetModal from "@/components/Marketing/CreateTargetModal";
import EditTargetModal from "@/components/Marketing/EditTargetModal";
import Link from "next/link";
import toast from "react-hot-toast";

// Mock data for targets (will be replaced with API data)
const mockTargets = [
  {
    id: 1,
    employeeId: 1,
    employeeName: "يوسف جاد",
    phone: "01208846374",
    month: 9,
    year: 2025,
    firstContactTarget: 0,
    secondContactTarget: 0,
    firstContactAchieved: 0,
    secondContactAchieved: 0,
    hasTarget: false
  },
  {
    id: 2,
    employeeId: 2,
    employeeName: "طيبة المنصورة تقديمات",
    phone: "01026858591",
    month: 9,
    year: 2025,
    firstContactTarget: 0,
    secondContactTarget: 0,
    firstContactAchieved: 13,
    secondContactAchieved: 1,
    hasTarget: false
  },
  {
    id: 3,
    employeeId: 3,
    employeeName: "اسراء مصطفى",
    phone: "01220239060",
    month: 9,
    year: 2025,
    firstContactTarget: 0,
    secondContactTarget: 0,
    firstContactAchieved: 1,
    secondContactAchieved: 1,
    hasTarget: false
  }
];

const MarketingTargets = () => {
  const [selectedMonth, setSelectedMonth] = useState(9);
  const [selectedYear, setSelectedYear] = useState(2025);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [isCreateTargetModalOpen, setIsCreateTargetModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState<MarketingTargetResponse | null>(null);

  // Fetch marketing employees from API
  const { data: marketingEmployees = [], isLoading: employeesLoading, error: employeesError, refetch: refetchEmployees } = useGetMarketingEmployeesQuery();
  
  // Fetch marketing targets from API
  const { data: marketingTargets = [], isLoading: targetsLoading, error: targetsError, refetch: refetchTargets } = useGetMarketingTargetsQuery({
    month: selectedMonth,
    year: selectedYear
  });

  // Filter employees based on search
  const filteredEmployees = useMemo(() => {
    return marketingEmployees.filter(employee =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.phone.includes(searchTerm)
    );
  }, [marketingEmployees, searchTerm]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalEmployees = marketingEmployees.length;
    const employeesWithTargets = marketingTargets.length;
    const totalTargetAmount = marketingTargets.reduce((sum, t) => sum + t.targetAmount, 0);
    const totalAchievedAmount = marketingTargets.reduce((sum, t) => sum + t.achievedAmount, 0);
    
    return {
      totalEmployees,
      employeesWithTargets,
      totalTargetAmount,
      totalAchievedAmount,
      achievement: totalTargetAmount > 0 ? 
        Math.round((totalAchievedAmount / totalTargetAmount) * 100) : 0
    };
  }, [marketingEmployees, marketingTargets]);

  const handleRefresh = () => {
    console.log("Refreshing targets data...");
    refetchEmployees();
    refetchTargets();
  };

  const handleSetNewTarget = () => {
    setIsCreateTargetModalOpen(true);
  };

  const handleTargetCreated = () => {
    setIsCreateTargetModalOpen(false);
    refetchTargets(); // إعادة جلب البيانات بعد إنشاء الهدف
  };

  const handleEditTarget = (employeeId: number) => {
    // Find the target for this employee
    const target = marketingTargets.find(t => t.employeeId === employeeId);
    if (target) {
      setSelectedTarget(target);
      setIsEditModalOpen(true);
    } else {
      toast.error("لم يتم العثور على هدف لهذا الموظف");
    }
  };

  const handleEditSuccess = () => {
    refetchTargets(); // إعادة جلب البيانات بعد التحديث
  };

  const getMonthName = (month: number) => {
    const months = [
      "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
      "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
    ];
    return months[month - 1] || "غير محدد";
  };

  const getAchievementColor = (achieved: number, target: number) => {
    if (target === 0) return "text-gray-500";
    const percentage = (achieved / target) * 100;
    if (percentage >= 100) return "text-green-600";
    if (percentage >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  if (employeesLoading || targetsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="text-center p-8 bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50">
          <RefreshCw className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">جاري تحميل بيانات الأهداف...</h3>
          <p className="text-gray-600">يرجى الانتظار بينما نقوم بجلب البيانات.</p>
        </div>
      </div>
    );
  }

  if (employeesError || targetsError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="text-center p-8 bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">حدث خطأ</h3>
          <p className="text-gray-600">لم نتمكن من جلب بيانات الأهداف. يرجى المحاولة مرة أخرى.</p>
          <button
            onClick={handleRefresh}
            className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmMWY1ZjkiIGZpbGwtb3BhY2l0eT0iMC40Ij48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-60"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 p-8 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-black bg-gradient-to-r from-gray-900 via-orange-800 to-red-800 bg-clip-text text-transparent mb-2">
                  تحديد التارجت
                </h1>
                <p className="text-lg text-gray-600 font-medium">
                  تحديد ومتابعة أهداف المتدربين المطلوب جلبهم لفريق التسويق
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  استخدم زر تحديد هدف جديد لإضافة أهداف جديدة أو زر "تعديل" لتحديث الأهداف الموجودة
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Period Selection */}
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-gray-200/50">
                <Calendar className="w-5 h-5 text-gray-600" />
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                  className="bg-transparent border-none outline-none text-gray-700 font-semibold"
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {getMonthName(i + 1)}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="bg-transparent border-none outline-none text-gray-700 font-semibold"
                >
                  {Array.from({ length: 5 }, (_, i) => {
                    const year = new Date().getFullYear() + i;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleRefresh}
                  className="p-3 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border border-gray-200/50"
                  title="تحديث البيانات"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
                <button
                  onClick={handleSetNewTarget}
                  className="inline-flex items-center gap-3 px-6 py-3 text-white bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 hover:from-blue-600 hover:via-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 font-bold"
                >
                  <Plus className="w-5 h-5" />
                  <span>تحديد هدف جديد</span>
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
                <p className="text-sm font-semibold text-gray-600 mb-1">إجمالي الموظفين</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalEmployees}</p>
                <p className="text-xs text-gray-500 mt-1">{stats.employeesWithTargets} لديهم أهداف</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">إجمالي الأهداف</p>
                <p className="text-3xl font-bold text-green-600">{stats.totalTargetAmount}</p>
                <p className="text-xs text-gray-500 mt-1">عدد التقديمات المطلوبة</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">المحقق</p>
                <p className="text-3xl font-bold text-purple-600">{stats.totalAchievedAmount}</p>
                <p className="text-xs text-gray-500 mt-1">عدد التقديمات المحققة</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">معدل الإنجاز</p>
                <p className="text-3xl font-bold text-orange-600">{stats.achievement}%</p>
                <p className="text-xs text-gray-500 mt-1">نسبة تحقيق الأهداف</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="ابحث عن موظف بالاسم أو رقم الهاتف..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-3 px-5 pr-12 text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    viewMode === "grid"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <BarChart3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    viewMode === "table"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  <Activity className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              أهداف الموظفين - {getMonthName(selectedMonth)} {selectedYear}
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <BarChart3 className="w-4 h-4" />
              <span>إجمالي: {filteredEmployees.length} موظف</span>
            </div>
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEmployees.map((employee) => {
                const target = marketingTargets.find(t => t.employeeId === employee.id);
                const hasTarget = !!target;
                const targetAmount = target?.targetAmount || 0;
                const achievedAmount = target?.achievedAmount || 0;

                return (
                  <div key={employee.id} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    {/* Employee Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900">{employee.name}</h3>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {employee.phone}
                        </p>
                      </div>
                    </div>

                    {/* Target Content */}
                    {!hasTarget ? (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Target className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-600 font-medium mb-2">لم يتم تحديد هدف لهذا الشهر</p>
                        <p className="text-sm text-gray-500">استخدم زر "تحديد هدف جديد" في الأعلى لتحديد الأهداف</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {/* Target Summary */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <p className="text-sm text-gray-600 mb-1">الهدف (تقديمات)</p>
                            <p className="text-2xl font-bold text-gray-900">{targetAmount}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-600 mb-1">المحقق</p>
                            <p className={`text-2xl font-bold ${getAchievementColor(achievedAmount, targetAmount)}`}>
                              {achievedAmount}
                            </p>
                          </div>
                        </div>

                        {/* Achievement Details */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span className="text-sm font-semibold text-green-800">التقديمات المحققة</span>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-green-600">{achievedAmount}</p>
                              <p className="text-xs text-green-600">من {targetAmount} هدف</p>
                            </div>
                          </div>

                          {target?.notes && (
                            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                              <p className="text-sm text-blue-800">
                                <strong>ملاحظات:</strong> {target.notes}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Achievement Percentage */}
                        <div className="text-center">
                          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
                            <span className="text-sm font-semibold text-gray-600">الإنجاز:</span>
                            <span className={`text-lg font-bold ${getAchievementColor(achievedAmount, targetAmount)}`}>
                              {targetAmount > 0 ? Math.round((achievedAmount / targetAmount) * 100) : 0}%
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex justify-center gap-3 mt-6 pt-4 border-t border-gray-200">
                      <Link
                        href={`/Marketing/Targets/${employee.id}`}
                        className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2"
                        title="عرض أهداف الموظف"
                      >
                        <BarChart3 className="w-4 h-4" />
                        عرض الأهداف
                      </Link>
                      {hasTarget ? (
                        <button
                          onClick={() => handleEditTarget(employee.id)}
                          className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2"
                        >
                          <Edit className="w-4 h-4" />
                          تعديل
                        </button>
                      ) : (
                        <button
                          onClick={handleSetNewTarget}
                          className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          تحديد هدف
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-right py-4 px-6 font-semibold text-gray-900">الموظف</th>
                    <th className="text-right py-4 px-6 font-semibold text-gray-900">الهاتف</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-900">الهدف</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-900">المحقق</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-900">الإنجاز</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-900">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map((employee) => {
                    const target = marketingTargets.find(t => t.employeeId === employee.id);
                    const hasTarget = !!target;
                    const targetAmount = target?.targetAmount || 0;
                    const achievedAmount = target?.achievedAmount || 0;
                    const achievement = targetAmount > 0 ? Math.round((achievedAmount / targetAmount) * 100) : 0;

                    return (
                      <tr key={employee.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{employee.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <p className="text-gray-600 flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {employee.phone}
                          </p>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className="text-lg font-bold text-gray-900">{targetAmount}</span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className={`text-lg font-bold ${getAchievementColor(achievedAmount, targetAmount)}`}>
                            {achievedAmount}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                            achievement >= 100 ? 'bg-green-100 text-green-800' :
                            achievement >= 75 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {achievement}%
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <div className="flex justify-center gap-2">
                            <Link
                              href={`/Marketing/Targets/${employee.id}`}
                              className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                              title="عرض أهداف الموظف"
                            >
                              <BarChart3 className="w-4 h-4" />
                            </Link>
                            {hasTarget ? (
                              <button
                                onClick={() => handleEditTarget(employee.id)}
                                className="p-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                                title="تعديل الهدف"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                            ) : (
                              <button
                                onClick={handleSetNewTarget}
                                className="p-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                                title="تحديد هدف"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Create Target Modal */}
      <CreateTargetModal
        isOpen={isCreateTargetModalOpen}
        onClose={() => setIsCreateTargetModalOpen(false)}
        employees={marketingEmployees}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        onSuccess={handleTargetCreated}
      />

      {/* Edit Target Modal */}
      <EditTargetModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedTarget(null);
        }}
        target={selectedTarget}
        onSuccess={handleEditSuccess}
      />
    </div>
  );
};

export default MarketingTargets;
