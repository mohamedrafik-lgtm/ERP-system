"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { 
  ClipboardList, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Play, 
  BookOpen,
  TrendingUp,
  BarChart3,
  RefreshCw,
  AlertCircle
} from "lucide-react";
import { useGetQuizzesQuery, useGetQuizStatsQuery } from "@/lip/features/quiz/quizApi";
import { QuizResponse } from "@/types/quiz.types";

const ElectronicTestsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage] = useState(1);
  const pageSize = 9;

  // Prepare query parameters
  const queryParams = useMemo(() => ({
    page: currentPage,
    limit: pageSize,
    search: searchTerm,
    status: statusFilter as 'active' | 'draft' | 'completed' | 'all',
  }), [currentPage, pageSize, searchTerm, statusFilter]);

  // Fetch quizzes data
  const { data: quizzesData, isLoading, error, refetch } = useGetQuizzesQuery(queryParams);
  const { data: statsData } = useGetQuizStatsQuery();

  // Debug logging
  console.log("🔍 Electronic Tests Debug - Query Params:", queryParams);
  console.log("🔍 Electronic Tests Debug - Quizzes Data:", quizzesData);
  console.log("🔍 Electronic Tests Debug - Stats Data:", statsData);
  console.log("🔍 Electronic Tests Debug - Is Loading:", isLoading);
  console.log("🔍 Electronic Tests Debug - Error:", error);

  // Transform quizzes data for display
  const tests: QuizResponse[] = (quizzesData?.data && Array.isArray(quizzesData.data)) ? quizzesData.data : [];

  // Calculate stats from API data
  const stats = useMemo(() => {
    if (statsData) {
      return [
        { label: "إجمالي الاختبارات", value: statsData.totalQuizzes.toString(), icon: ClipboardList, color: "from-blue-500 to-blue-600" },
        { label: "الاختبارات النشطة", value: statsData.activeQuizzes.toString(), icon: Play, color: "from-green-500 to-green-600" },
        { label: "إجمالي الأسئلة", value: statsData.totalQuestions.toString(), icon: BookOpen, color: "from-purple-500 to-purple-600" },
        { label: "معدل الإنجاز", value: `${statsData.averageCompletionRate}%`, icon: TrendingUp, color: "from-orange-500 to-orange-600" },
      ];
    }
    return [
      { label: "إجمالي الاختبارات", value: "0", icon: ClipboardList, color: "from-blue-500 to-blue-600" },
      { label: "الاختبارات النشطة", value: "0", icon: Play, color: "from-green-500 to-green-600" },
      { label: "إجمالي الأسئلة", value: "0", icon: BookOpen, color: "from-purple-500 to-purple-600" },
      { label: "معدل الإنجاز", value: "0%", icon: TrendingUp, color: "from-orange-500 to-orange-600" },
    ];
  }, [statsData]);

  const getStatusColor = (quiz: QuizResponse) => {
    if (!quiz.isActive) return 'text-gray-600 bg-gray-100';
    if (!quiz.isPublished) return 'text-yellow-600 bg-yellow-100';
    if (new Date(quiz.endDate) < new Date()) return 'text-blue-600 bg-blue-100';
    return 'text-green-600 bg-green-100';
  };

  const getStatusText = (quiz: QuizResponse) => {
    if (!quiz.isActive) return 'غير نشط';
    if (!quiz.isPublished) return 'مسودة';
    if (new Date(quiz.endDate) < new Date()) return 'منتهي';
    return 'نشط';
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getTimeRemaining = (endDate: Date) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return 'منتهي';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days} يوم`;
    if (hours > 0) return `${hours} ساعة`;
    return 'أقل من ساعة';
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">جاري تحميل الاختبارات</h3>
            <p className="text-gray-600">يرجى الانتظار...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-12 h-12 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">خطأ في تحميل البيانات</h3>
            <p className="text-gray-600 mb-6">حدث خطأ أثناء جلب الاختبارات الإلكترونية</p>
            <button 
              onClick={() => refetch()}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 mx-auto"
            >
              <RefreshCw className="w-5 h-5" />
              إعادة المحاولة
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                الاختبارات الإلكترونية
              </h1>
              <p className="text-gray-600">
                إدارة وإنشاء الاختبارات الإلكترونية للمتدربين
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => refetch()}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all duration-300"
              >
                <RefreshCw className="w-4 h-4" />
                تحديث
              </button>
              <Link 
                href="/TrainingContentManagement/ElectronicTests/CreateQuiz"
                className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <Plus className="w-5 h-5" />
                إنشاء اختبار جديد
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="البحث في الاختبارات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
                  dir="rtl"
                />
              </div>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">جميع الحالات</option>
                <option value="active">نشط</option>
                <option value="draft">مسودة</option>
                <option value="completed">مكتمل</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all duration-300">
                <Filter className="w-4 h-4" />
                فلترة متقدمة
              </button>
            </div>
          </div>
        </div>

        {/* Tests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.map((test) => (
            <div key={test.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100">
              {/* Test Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{test.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{test.description || 'لا يوجد وصف'}</p>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(test)}`}>
                      {getStatusText(test)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Eye className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Edit className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-red-100 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>

              {/* Test Details */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">المدة:</span>
                  <span className="font-medium">{test.duration} دقيقة</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">عدد الأسئلة:</span>
                  <span className="font-medium">{test._count.questions} سؤال</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">عدد المحاولات:</span>
                  <span className="font-medium">{test._count.attempts} محاولة</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">تاريخ البداية:</span>
                  <span className="font-medium">{formatDate(test.startDate)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">تاريخ النهاية:</span>
                  <span className="font-medium">{formatDate(test.endDate)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">البرنامج:</span>
                  <span className="font-medium">{test.trainingContent.program.nameAr}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">المحتوى:</span>
                  <span className="font-medium">{test.trainingContent.name}</span>
                </div>
                {test.passingScore && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">درجة النجاح:</span>
                    <span className="font-medium">{test.passingScore}%</span>
                  </div>
                )}
                {test.maxAttempts && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">أقصى محاولات:</span>
                    <span className="font-medium">{test.maxAttempts}</span>
                  </div>
                )}
              </div>

              {/* Time Remaining */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                  <span>الوقت المتبقي</span>
                  <span className="font-medium">{getTimeRemaining(test.endDate)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${Math.max(0, Math.min(100, ((new Date(test.endDate).getTime() - new Date().getTime()) / (new Date(test.endDate).getTime() - new Date(test.startDate).getTime())) * 100))}%` 
                    }}
                  ></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 text-sm font-medium">
                  <Play className="w-4 h-4" />
                  {test.isActive && test.isPublished ? 'بدء الاختبار' : 'عرض التفاصيل'}
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300 text-sm font-medium">
                  <BarChart3 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State (if no tests) */}
        {tests.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <ClipboardList className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد اختبارات</h3>
            <p className="text-gray-600 mb-6">لم يتم إنشاء أي اختبارات إلكترونية بعد</p>
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 mx-auto">
              <Plus className="w-5 h-5" />
              إنشاء أول اختبار
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ElectronicTestsPage;
