"use client";
import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Target,
  ArrowLeft,
  Calendar,
  User,
  Phone,
  Mail,
  TrendingUp,
  Award,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  BarChart3,
  Activity,
  Clock,
  Hash,
  Edit,
  Plus
} from "lucide-react";
import { useGetMarketingEmployeeByIdQuery, useGetMarketingTargetsByEmployeeQuery } from "@/lip/features/marketers/marketersApi";
import { MarketingTargetResponse } from "@/types/marketer.types";
import EditTargetModal from "@/components/Marketing/EditTargetModal";
import Link from "next/link";
import toast from "react-hot-toast";

const EmployeeTargetsPage = () => {
  const params = useParams();
  const router = useRouter();
  const employeeId = parseInt(params.employeeId as string);
  
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState<MarketingTargetResponse | null>(null);

  // Fetch marketing employee details
  const { data: employee, isLoading: employeeLoading, error: employeeError, refetch: refetchEmployee } = useGetMarketingEmployeeByIdQuery(employeeId);
  
  // Fetch marketing targets for this employee
  const { data: targets = [], isLoading: targetsLoading, error: targetsError, refetch: refetchTargets } = useGetMarketingTargetsByEmployeeQuery({
    employeeId,
    month: selectedMonth,
    year: selectedYear
  });

  // Calculate statistics
  const stats = useMemo(() => {
    const totalTargets = targets.length;
    const totalTargetAmount = targets.reduce((sum, t) => sum + t.targetAmount, 0);
    const totalAchievedAmount = targets.reduce((sum, t) => sum + t.achievedAmount, 0);
    const averageAchievement = totalTargetAmount > 0 ? Math.round((totalAchievedAmount / totalTargetAmount) * 100) : 0;
    
    return {
      totalTargets,
      totalTargetAmount,
      totalAchievedAmount,
      averageAchievement
    };
  }, [targets]);

  const handleRefresh = () => {
    console.log("Refreshing employee targets data...");
    refetchEmployee();
    refetchTargets();
  };

  const handleEditTarget = (target: MarketingTargetResponse) => {
    setSelectedTarget(target);
    setIsEditModalOpen(true);
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

  const getAchievementBgColor = (achieved: number, target: number) => {
    if (target === 0) return "bg-gray-100 text-gray-800";
    const percentage = (achieved / target) * 100;
    if (percentage >= 100) return "bg-green-100 text-green-800";
    if (percentage >= 75) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  if (employeeLoading || targetsLoading) {
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

  if (employeeError || targetsError) {
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

  if (!employee) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="text-center p-8 bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">الموظف غير موجود</h3>
          <p className="text-gray-600">لم يتم العثور على موظف بالمعرف المطلوب.</p>
          <Link
            href="/Marketing/Targets"
            className="mt-6 inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            العودة لقائمة الأهداف
          </Link>
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
              <Link
                href="/Marketing/Targets"
                className="p-3 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border border-gray-200/50"
                title="العودة لقائمة الأهداف"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-black bg-gradient-to-r from-gray-900 via-orange-800 to-red-800 bg-clip-text text-transparent mb-2">
                  أهداف {employee.name}
                </h1>
                <p className="text-lg text-gray-600 font-medium">
                  متابعة وتتبع أهداف الموظف التسويقية
                </p>
                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Phone className="w-4 h-4" />
                    <span>{employee.phone}</span>
                  </div>
                  {employee.email && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Mail className="w-4 h-4" />
                      <span>{employee.email}</span>
                    </div>
                  )}
                </div>
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
                <Link
                  href="/Marketing/Targets"
                  className="inline-flex items-center gap-3 px-6 py-3 text-white bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 hover:from-blue-600 hover:via-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 font-bold"
                >
                  <Plus className="w-5 h-5" />
                  <span>تحديد هدف جديد</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">إجمالي الأهداف</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalTargets}</p>
                <p className="text-xs text-gray-500 mt-1">في {getMonthName(selectedMonth)} {selectedYear}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">إجمالي الهدف</p>
                <p className="text-3xl font-bold text-green-600">{stats.totalTargetAmount}</p>
                <p className="text-xs text-gray-500 mt-1">عدد التقديمات المطلوبة</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <Hash className="w-6 h-6 text-white" />
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
                <p className="text-3xl font-bold text-orange-600">{stats.averageAchievement}%</p>
                <p className="text-xs text-gray-500 mt-1">نسبة تحقيق الأهداف</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Targets List */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              أهداف {employee.name} - {getMonthName(selectedMonth)} {selectedYear}
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <BarChart3 className="w-4 h-4" />
              <span>إجمالي: {targets.length} هدف</span>
            </div>
          </div>

          {targets.length > 0 ? (
            <div className="space-y-6">
              {targets.map((target) => {
                const achievement = target.targetAmount > 0 ? Math.round((target.achievedAmount / target.targetAmount) * 100) : 0;
                
                return (
                  <div key={target.id} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                      {/* Target Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-orange-100 to-red-100 rounded-xl flex items-center justify-center">
                            <Target className="w-6 h-6 text-orange-600" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">هدف {getMonthName(target.month)} {target.year}</h3>
                            <p className="text-sm text-gray-600">
                              تم إنشاؤه: {new Date(target.createdAt).toLocaleDateString('ar-EG')}
                            </p>
                          </div>
                        </div>

                        {/* Target Details */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                            <p className="text-sm text-blue-600 mb-1">الهدف المطلوب</p>
                            <p className="text-2xl font-bold text-blue-800">{target.targetAmount}</p>
                            <p className="text-xs text-blue-600">تقديم</p>
                          </div>
                          <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                            <p className="text-sm text-green-600 mb-1">المحقق</p>
                            <p className={`text-2xl font-bold ${getAchievementColor(target.achievedAmount, target.targetAmount)}`}>
                              {target.achievedAmount}
                            </p>
                            <p className="text-xs text-green-600">تقديم</p>
                          </div>
                          <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200">
                            <p className="text-sm text-purple-600 mb-1">معدل الإنجاز</p>
                            <p className="text-2xl font-bold text-purple-800">{achievement}%</p>
                            <p className="text-xs text-purple-600">تحقيق</p>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-semibold text-gray-700">تقدم الإنجاز</span>
                            <span className={`text-sm font-bold ${getAchievementColor(target.achievedAmount, target.targetAmount)}`}>
                              {target.achievedAmount} / {target.targetAmount}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className={`h-3 rounded-full transition-all duration-500 ease-out ${
                                achievement >= 100 ? 'bg-green-500' :
                                achievement >= 75 ? 'bg-yellow-500' :
                                'bg-red-500'
                              }`}
                              style={{ width: `${Math.min(100, achievement)}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Notes */}
                        {target.notes && (
                          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                            <p className="text-sm text-gray-700">
                              <strong>ملاحظات:</strong> {target.notes}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Achievement Status */}
                      <div className="flex flex-col items-center gap-4">
                        <div className={`px-4 py-2 rounded-full text-sm font-semibold ${getAchievementBgColor(target.achievedAmount, target.targetAmount)}`}>
                          {achievement >= 100 ? 'مكتمل' : achievement >= 75 ? 'جيد' : 'يحتاج تحسين'}
                        </div>
                        <button
                          onClick={() => handleEditTarget(target)}
                          className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                          title="تعديل الهدف"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-100">
              <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد أهداف</h3>
              <p className="text-gray-600 mb-6">
                لم يتم تحديد أي أهداف لهذا الموظف في {getMonthName(selectedMonth)} {selectedYear}
              </p>
              <Link
                href="/Marketing/Targets"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg"
              >
                <Plus className="w-5 h-5" />
                تحديد هدف جديد
              </Link>
            </div>
          )}
        </div>

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
    </div>
  );
};

export default EmployeeTargetsPage;
