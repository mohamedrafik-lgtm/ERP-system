"use client";
import { useState, useMemo } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  Target,
  Phone,
  UserCheck,
  Award,
  Calendar,
  RefreshCw,
  Download,
  Filter,
  ChevronDown,
  Star,
  Trophy,
  AlertCircle,
  CheckCircle,
  Clock,
  Activity
} from "lucide-react";
import { useGetMarketingStatsQuery } from "@/lip/features/marketers/marketersApi";
import { MarketingStatsResponse, MarketingEmployeeStats, MarketingTopPerformer } from "@/types/marketing-stats.types";
import toast from "react-hot-toast";

const MarketingStatsPage = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Fetch marketing statistics
  const { data: statsData, isLoading, error, refetch } = useGetMarketingStatsQuery({
    month: selectedMonth,
    year: selectedYear
  });

  // Get month name in Arabic
  const getMonthName = (month: number) => {
    const months = [
      "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
      "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
    ];
    return months[month - 1] || "غير محدد";
  };

  // Get achievement color based on percentage
  const getAchievementColor = (rate: number) => {
    if (rate >= 100) return "text-green-600 bg-green-100";
    if (rate >= 75) return "text-blue-600 bg-blue-100";
    if (rate >= 50) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  // Get achievement background color for progress bars
  const getAchievementBgColor = (rate: number) => {
    if (rate >= 100) return "from-green-400 to-green-500";
    if (rate >= 75) return "from-blue-400 to-blue-500";
    if (rate >= 50) return "from-yellow-400 to-yellow-500";
    return "from-red-400 to-red-500";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100 relative overflow-hidden">
        <div className="text-center p-12 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 relative z-10">
          <div className="relative mb-8">
            <div className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-purple-300 border-t-transparent rounded-full animate-spin mx-auto opacity-50" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">جاري تحميل الإحصائيات</h3>
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
          <p className="text-lg text-gray-600 mb-6">لم نتمكن من جلب الإحصائيات. يرجى المحاولة مرة أخرى.</p>
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
                  <BarChart3 className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">إحصائيات التسويق</h1>
                <p className="text-lg text-gray-600">
                  تحليل أداء فريق التسويق في التواصل الأول مع المتدربين
                </p>
                <p className="text-sm text-purple-600 font-semibold">
                  {getMonthName(selectedMonth)} {selectedYear}
                </p>
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-500" />
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                    <option key={month} value={month}>{getMonthName(month)}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => refetch()}
                className="p-3 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-sm"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Monthly First Contact */}
          <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl p-8 shadow-2xl text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Phone className="w-6 h-6" />
                </div>
                <TrendingUp className="w-8 h-8 opacity-80" />
              </div>
              <h3 className="text-lg font-semibold mb-2">التواصل الأول الشهري</h3>
              <p className="text-4xl font-bold mb-2">{statsData?.overview.firstContactTrainees || 0}</p>
              <p className="text-sm opacity-90">يحقق في التاريخ</p>
            </div>
          </div>

          {/* First Contact Rate */}
          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl p-8 shadow-2xl text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Target className="w-6 h-6" />
                </div>
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">%</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">معدل التواصل الأول</h3>
              <p className="text-4xl font-bold mb-2">{Math.round(statsData?.overview.firstContactRate || 0)}%</p>
              <p className="text-sm opacity-90">التواصل الأول</p>
            </div>
          </div>

          {/* Marketing Employees */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 shadow-2xl text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">موظفي التسويق</h3>
              <p className="text-4xl font-bold mb-2">{statsData?.overview.totalEmployees || 0}</p>
              <p className="text-sm opacity-90">إجمالي الموظفين</p>
            </div>
          </div>
        </div>

        {/* Top Performers Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top 5 Employees */}
          <div className="bg-gradient-to-br from-white/95 via-white/90 to-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-100/20 to-emerald-100/20 rounded-full blur-xl"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">أفضل 5 موظفين هذا الشهر</h2>
              </div>
              
              <div className="space-y-4">
                {statsData?.topPerformers.slice(0, 5).map((performer, index) => (
                  <div key={performer.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl hover:shadow-lg transition-all duration-200">
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white' :
                        index === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-white' :
                        index === 2 ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white' :
                        'bg-gradient-to-r from-blue-400 to-blue-500 text-white'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{performer.name}</p>
                        <p className="text-sm text-gray-600">{performer.monthlyFirstContact} من أصل {performer.monthlyTarget}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">{Math.round(performer.achievementRate)}%</p>
                      <p className="text-xs text-gray-500">من الهدف</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Worst 5 Employees */}
          <div className="bg-gradient-to-br from-white/95 via-white/90 to-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-red-100/20 to-orange-100/20 rounded-full blur-xl"></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-600 rounded-2xl flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">أسوأ 5 موظفين هذا الشهر</h2>
              </div>
              
              <div className="space-y-4">
                {statsData?.employees
                  .filter(emp => emp.achievementRate < 50)
                  .sort((a, b) => a.achievementRate - b.achievementRate)
                  .slice(0, 5)
                  .map((employee, index) => (
                    <div key={employee.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl hover:shadow-lg transition-all duration-200">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-400 to-orange-500 flex items-center justify-center font-bold text-sm text-white">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{employee.name}</p>
                          <p className="text-sm text-gray-600">{employee.monthlyFirstContact} من أصل {employee.monthlyTarget}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-red-600">{Math.round(employee.achievementRate)}%</p>
                        <p className="text-xs text-gray-500">من الهدف</p>
                      </div>
                    </div>
                  ))}
                
                {(!statsData?.employees.filter(emp => emp.achievementRate < 50).length || statsData?.employees.filter(emp => emp.achievementRate < 50).length === 0) && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-8 h-8 text-white rotate-180" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">لا يوجد بيانات أداء ضعيف</h3>
                    <p className="text-gray-500">سيتم عرض الموظفين بأقل أداء هنا</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Employee Performance Details */}
        <div className="bg-gradient-to-br from-white/95 via-white/90 to-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100/20 to-indigo-100/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-100/20 to-purple-100/20 rounded-full blur-xl"></div>
          
          <div className="relative">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">أداء موظفي التسويق</h2>
                <p className="text-gray-600">تفاصيل أداء كل موظف مع إحصائيات التواصل الأول والثاني</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {statsData?.employees.map((employee) => (
                <div key={employee.id} className="bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="text-center mb-4">
                    <h3 className="font-bold text-gray-900 text-lg mb-2">{employee.name}</h3>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${getAchievementColor(employee.achievementRate)}`}>
                      {Math.round(employee.achievementRate)}% من الهدف
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-600">التواصل الأول</span>
                        <span className="text-sm font-bold text-gray-900">
                          {employee.monthlyFirstContact}/{employee.monthlyTarget}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`bg-gradient-to-r ${getAchievementBgColor(employee.achievementRate)} h-2 rounded-full transition-all duration-300`}
                          style={{ width: `${Math.min(employee.achievementRate, 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">التواصل الثاني</span>
                        <span className="text-sm font-bold text-gray-900">{employee.totalAssigned}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">لا يوجد في التاريخ</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketingStatsPage;
