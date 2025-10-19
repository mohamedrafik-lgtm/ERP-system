"use client";

import { useState, useMemo } from "react";
import { useGetAvailableQuizzesQuery } from "@/lip/features/trainee-auth/traineeAuthApi";
import {
  FileCheck,
  Clock,
  Calendar,
  BookOpen,
  Play,
  CheckCircle,
  XCircle,
  AlertCircle,
  Filter,
  Search,
  RefreshCw,
  Eye,
  Download,
  Award,
  Timer,
  Users,
  Target,
} from "lucide-react";
import { QuizStatus } from "@/types/exams";

const StudentExams = () => {
  const { data: quizzesData, isLoading, error, refetch } = useGetAvailableQuizzesQuery();
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterSubject, setFilterSubject] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState<any>(null);

  // Filter and search quizzes
  const filteredQuizzes = useMemo(() => {
    if (!quizzesData) return [];
    
    return quizzesData.filter((quiz) => {
      const matchesStatus = filterStatus === "all" || quiz.status === filterStatus;
      const matchesSubject = filterSubject === "all" || quiz.trainingContent.name === filterSubject;
      const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (quiz.description && quiz.description.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchesStatus && matchesSubject && matchesSearch;
    });
  }, [quizzesData, filterStatus, filterSubject, searchTerm]);

  // Get status info
  const getStatusInfo = (status: QuizStatus) => {
    switch (status) {
      case "available":
        return { text: "متاح", color: "text-green-600 bg-green-50", icon: CheckCircle };
      case "upcoming":
        return { text: "قادم", color: "text-blue-600 bg-blue-50", icon: Clock };
      case "completed":
        return { text: "مكتمل", color: "text-purple-600 bg-purple-50", icon: Award };
      case "ended":
        return { text: "منتهي", color: "text-red-600 bg-red-50", icon: XCircle };
      default:
        return { text: "غير محدد", color: "text-gray-600 bg-gray-50", icon: AlertCircle };
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get unique subjects
  const subjects = useMemo(() => {
    if (!quizzesData) return [];
    return Array.from(new Set(quizzesData.map(quiz => quiz.trainingContent.name)));
  }, [quizzesData]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري تحميل الاختبارات...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">خطأ في تحميل البيانات</h2>
          <p className="text-gray-600 mb-4">حدث خطأ أثناء تحميل الاختبارات</p>
          <button
            onClick={() => refetch()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  if (!quizzesData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="text-gray-500 text-6xl mb-4">📝</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">لا توجد اختبارات متاحة</h2>
          <p className="text-gray-600">لم يتم العثور على أي اختبارات للمتدرب</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
              <FileCheck className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-1">
                الاختبارات الإلكترونية
              </h1>
              <p className="text-gray-600 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                اختباراتك المتاحة والإجابة عليها
              </p>
            </div>
          </div>
          <button
            onClick={() => refetch()}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <RefreshCw className="w-5 h-5" />
            <span className="font-semibold">تحديث</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg border border-green-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-700 mb-2">الاختبارات المتاحة</p>
              <p className="text-4xl font-bold text-green-600">
                {quizzesData.filter(quiz => quiz.status === 'available').length}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl shadow-lg border border-purple-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-700 mb-2">المكتملة</p>
              <p className="text-4xl font-bold text-purple-600">
                {quizzesData.filter(quiz => quiz.status === 'completed').length}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 shadow-lg">
              <Award className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-lg border border-blue-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-700 mb-2">المتوسط العام</p>
              <p className="text-4xl font-bold text-blue-600">
                {quizzesData.filter(quiz => quiz.result).length > 0 
                  ? (quizzesData.filter(quiz => quiz.result).reduce((sum, quiz) => sum + (quiz.result?.percentage || 0), 0) / quizzesData.filter(quiz => quiz.result).length).toFixed(1)
                  : 0}%
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg">
              <Target className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-50 to-gray-50 rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-700 mb-2">إجمالي الاختبارات</p>
              <p className="text-4xl font-bold text-slate-700">
                {quizzesData.length}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-500 to-gray-600 shadow-lg">
              <FileCheck className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
            <Filter className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">الفلاتر والبحث</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Search className="w-4 h-4 text-blue-600" />
              البحث
            </label>
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="ابحث في الاختبارات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-11 pl-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              الحالة
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white font-medium"
            >
              <option value="all">جميع الحالات</option>
              <option value="available">✅ متاح</option>
              <option value="upcoming">🕐 قادم</option>
              <option value="completed">🏆 مكتمل</option>
              <option value="ended">❌ منتهي</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              المادة
            </label>
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white font-medium"
            >
              <option value="all">📚 جميع المواد</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>📖 {subject}</option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Quizzes List */}
      {filteredQuizzes.length === 0 ? (
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-2xl border-2 border-blue-100 p-16">
          <div className="text-center">
            <div className="mx-auto w-32 h-32 bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mb-8 shadow-2xl transform hover:scale-110 transition-transform duration-300">
              <FileCheck className="w-16 h-16 text-white" />
            </div>
            <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
              لا توجد اختبارات متاحة
            </h3>
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
              لم يتم العثور على أي اختبارات متاحة في الوقت الحالي. جرب تغيير الفلاتر أو تحديث الصفحة
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setFilterStatus("all");
                  setFilterSubject("all");
                  setSearchTerm("");
                }}
                className="px-8 py-4 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                🔄 إعادة تعيين الفلاتر
              </button>
              <button
                onClick={() => refetch()}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center gap-2 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <RefreshCw className="w-5 h-5" />
                تحديث
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredQuizzes.map((quiz) => {
          const statusInfo = getStatusInfo(quiz.status);
          const StatusIcon = statusInfo.icon;

          return (
            <div key={quiz.id} className="bg-white rounded-xl shadow-sm border hover:shadow-lg transition-all duration-300 overflow-hidden group">
              {/* Color Bar */}
              <div className={`h-1.5 ${
                quiz.status === 'available' ? 'bg-gradient-to-r from-green-400 to-green-600' :
                quiz.status === 'upcoming' ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
                quiz.status === 'completed' ? 'bg-gradient-to-r from-purple-400 to-purple-600' :
                'bg-gradient-to-r from-gray-400 to-gray-600'
              }`}></div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg ${statusInfo.color}`}>
                        <StatusIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {quiz.title}
                        </h3>
                        <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${statusInfo.color}`}>
                          {statusInfo.text}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4 leading-relaxed">{quiz.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg">
                        <BookOpen className="w-4 h-4 text-blue-600" />
                        <div>
                          <p className="text-xs text-gray-500">المادة</p>
                          <p className="text-sm font-semibold text-gray-900">{quiz.trainingContent.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-purple-50 px-3 py-2 rounded-lg">
                        <Users className="w-4 h-4 text-purple-600" />
                        <div>
                          <p className="text-xs text-gray-500">الفصل</p>
                          <p className="text-sm font-semibold text-gray-900">{quiz.trainingContent.classroom.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-orange-50 px-3 py-2 rounded-lg">
                        <Timer className="w-4 h-4 text-orange-600" />
                        <div>
                          <p className="text-xs text-gray-500">المدة</p>
                          <p className="text-sm font-semibold text-gray-900">{quiz.duration} دقيقة</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg">
                        <Target className="w-4 h-4 text-green-600" />
                        <div>
                          <p className="text-xs text-gray-500">الأسئلة</p>
                          <p className="text-sm font-semibold text-gray-900">{quiz._count.questions} سؤال</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-600">تاريخ البداية</p>
                    <p className="font-semibold text-gray-900">{formatDate(quiz.startDate)}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-600">تاريخ النهاية</p>
                    <p className="font-semibold text-gray-900">{formatDate(quiz.endDate)}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-600">درجة النجاح</p>
                    <p className="font-semibold text-gray-900">{quiz.passingScore}%</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-600">آخر نتيجة</p>
                    <p className="font-semibold text-gray-900">
                      {quiz.result ? `${quiz.result.percentage}%` : "لم يتم الإجابة"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <button
                    onClick={() => setSelectedQuiz(quiz)}
                    className="flex items-center gap-2 px-4 py-2.5 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200 font-medium"
                  >
                    <Eye className="w-4 h-4" />
                    عرض التفاصيل
                  </button>

                  <div className="flex items-center gap-3">
                    {quiz.status === 'available' && quiz.canAttempt && (
                      <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2.5 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center gap-2 font-semibold shadow-md hover:shadow-lg">
                        <Play className="w-4 h-4" />
                        بدء الاختبار
                      </button>
                    )}
                    {quiz.status === 'available' && quiz.hasInProgress && (
                      <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2.5 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center gap-2 font-semibold shadow-md hover:shadow-lg">
                        <Play className="w-4 h-4" />
                        متابعة الاختبار
                      </button>
                    )}
                    {quiz.status === 'completed' && (
                      <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-2.5 rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 font-semibold shadow-md hover:shadow-lg">
                        <Award className="w-4 h-4" />
                        عرض النتائج
                      </button>
                    )}
                    {quiz.status === 'ended' && (
                      <button disabled className="bg-gray-300 text-gray-500 px-6 py-2.5 rounded-lg cursor-not-allowed flex items-center gap-2 font-semibold">
                        <XCircle className="w-4 h-4" />
                        منتهي الصلاحية
                      </button>
                    )}
                    {quiz.status === 'upcoming' && (
                      <button disabled className="bg-yellow-300 text-yellow-800 px-6 py-2.5 rounded-lg cursor-not-allowed flex items-center gap-2 font-semibold">
                        <Clock className="w-4 h-4" />
                        قادم قريباً
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        </div>
      )}

      {/* Quiz Details Modal */}
      {selectedQuiz && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">تفاصيل الاختبار</h3>
                <button
                  onClick={() => setSelectedQuiz(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{selectedQuiz.title}</h4>
                  <p className="text-gray-600">{selectedQuiz.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">المادة</p>
                    <p className="font-semibold">{selectedQuiz.trainingContent.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">الفصل</p>
                    <p className="font-semibold">{selectedQuiz.trainingContent.classroom.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">المدة</p>
                    <p className="font-semibold">{selectedQuiz.duration} دقيقة</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">عدد الأسئلة</p>
                    <p className="font-semibold">{selectedQuiz._count.questions}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">درجة النجاح</p>
                    <p className="font-semibold">{selectedQuiz.passingScore}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">الحد الأقصى للمحاولات</p>
                    <p className="font-semibold">{selectedQuiz.maxAttempts}</p>
                  </div>
                </div>

                {selectedQuiz.instructions && (
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-2">تعليمات الاختبار</h5>
                    <p className="text-gray-600">{selectedQuiz.instructions}</p>
                  </div>
                )}

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setSelectedQuiz(null)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    إغلاق
                  </button>
                  {selectedQuiz.status === 'available' && selectedQuiz.canAttempt && (
                    <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      بدء الاختبار
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentExams;
