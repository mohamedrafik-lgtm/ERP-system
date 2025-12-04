"use client";

import { useState, useMemo } from 'react';
import {
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Calendar,
  BookOpen,
  Users,
  Eye,
  EyeOff,
  RefreshCw,
  Filter,
  TrendingUp,
  Award,
  Plus
} from 'lucide-react';
import { useGetQuizzesQuery, useGetQuizStatsQuery } from '@/lip/features/quiz/quizApi';
import { Quiz } from '@/types/quiz.types';
import CreateQuizModal from '@/components/Quizzes/CreateQuizModal';

export default function QuizzesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [publishFilter, setPublishFilter] = useState<string>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Fetch data from API
  const { data: quizzesData, isLoading, error, refetch } = useGetQuizzesQuery({
    page: 1,
    limit: 100,
  });
  const { data: statsData } = useGetQuizStatsQuery();

  // Filter quizzes on client side
  const filteredQuizzes = useMemo(() => {
    if (!quizzesData?.data) return [];
    
    return quizzesData.data.filter((quiz: Quiz) => {
      const matchesSearch = 
        quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.trainingContent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.trainingContent.program.nameAr.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || 
        (statusFilter === 'active' && quiz.isActive) ||
        (statusFilter === 'inactive' && !quiz.isActive);
      
      const matchesPublish = publishFilter === 'all' ||
        (publishFilter === 'published' && quiz.isPublished) ||
        (publishFilter === 'unpublished' && !quiz.isPublished);
      
      return matchesSearch && matchesStatus && matchesPublish;
    });
  }, [quizzesData, searchTerm, statusFilter, publishFilter]);

  // Statistics
  const stats = {
    total: statsData?.totalQuizzes || 0,
    published: statsData?.publishedQuizzes || 0,
    active: statsData?.activeQuizzes || 0,
    totalQuestions: statsData?.totalQuestions || 0,
    totalAttempts: statsData?.totalAttempts || 0,
  };

  // Status badge
  const getStatusBadge = (isActive: boolean) => {
    return isActive ? (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
        <CheckCircle className="w-4 h-4" />
        نشط
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
        <XCircle className="w-4 h-4" />
        غير نشط
      </span>
    );
  };

  // Publish badge
  const getPublishBadge = (isPublished: boolean) => {
    return isPublished ? (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
        <Eye className="w-3 h-3" />
        منشور
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
        <EyeOff className="w-3 h-3" />
        مسودة
      </span>
    );
  };

  // Format date
  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Check if quiz is active now
  const isQuizActiveNow = (quiz: Quiz) => {
    const now = new Date();
    const start = new Date(quiz.startDate);
    const end = new Date(quiz.endDate);
    return now >= start && now <= end;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">جاري تحميل الاختبارات...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 text-lg mb-2">حدث خطأ في تحميل البيانات</p>
          <p className="text-gray-500 mb-4">تأكد من تشغيل الباك إند</p>
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

  return (
    <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              الاختبارات المصغرة
            </h1>
            <p className="text-gray-600">
              إدارة ومتابعة جميع الاختبارات المصغرة في النظام
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-colors shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              إضافة اختبار
            </button>
            <button
              onClick={() => refetch()}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              تحديث
            </button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border-r-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">إجمالي الاختبارات</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <FileText className="w-12 h-12 text-blue-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border-r-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">منشور</p>
                <p className="text-3xl font-bold text-gray-900">{stats.published}</p>
              </div>
              <Eye className="w-12 h-12 text-green-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border-r-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">نشط</p>
                <p className="text-3xl font-bold text-gray-900">{stats.active}</p>
              </div>
              <CheckCircle className="w-12 h-12 text-purple-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border-r-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">إجمالي الأسئلة</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalQuestions}</p>
              </div>
              <BookOpen className="w-12 h-12 text-orange-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border-r-4 border-pink-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">إجمالي المحاولات</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalAttempts}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-pink-500 opacity-20" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="البحث بالعنوان أو المحتوى أو البرنامج..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="all">جميع الحالات</option>
                <option value="active">نشط</option>
                <option value="inactive">غير نشط</option>
              </select>
            </div>

            {/* Publish Filter */}
            <div className="relative">
              <select
                value={publishFilter}
                onChange={(e) => setPublishFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="all">جميع حالات النشر</option>
                <option value="published">منشور</option>
                <option value="unpublished">مسودة</option>
              </select>
            </div>
          </div>
        </div>

        {/* Quizzes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.length === 0 ? (
            <div className="col-span-full bg-white rounded-lg shadow-sm p-12 text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">لا توجد اختبارات</p>
              <p className="text-gray-400 text-sm mt-2">جرب تغيير معايير البحث</p>
            </div>
          ) : (
            filteredQuizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-200"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-white line-clamp-2">
                      {quiz.title}
                    </h3>
                    {getPublishBadge(quiz.isPublished)}
                  </div>
                  {quiz.description && (
                    <p className="text-blue-50 text-sm line-clamp-2">
                      {quiz.description}
                    </p>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-4 space-y-3">
                  {/* Training Content */}
                  <div className="flex items-start gap-2">
                    <BookOpen className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {quiz.trainingContent.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {quiz.trainingContent.program.nameAr}
                      </p>
                    </div>
                  </div>

                  {/* Classroom */}
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <p className="text-sm text-gray-600 truncate">
                      {quiz.trainingContent.classroom.name}
                    </p>
                  </div>

                  {/* Duration & Passing Score */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{quiz.duration} دقيقة</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{quiz.passingScore}%</span>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(quiz.startDate)}</span>
                    <span>-</span>
                    <span>{formatDate(quiz.endDate)}</span>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-900">{quiz._count.questions}</p>
                      <p className="text-xs text-gray-500">سؤال</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-900">{quiz._count.attempts}</p>
                      <p className="text-xs text-gray-500">محاولة</p>
                    </div>
                    <div className="text-center">
                      {getStatusBadge(quiz.isActive)}
                    </div>
                  </div>

                  {/* Active Now Indicator */}
                  {isQuizActiveNow(quiz) && quiz.isActive && quiz.isPublished && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-2 flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-700 font-medium">نشط الآن</span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Results Count */}
        {filteredQuizzes.length > 0 && quizzesData && (
          <div className="mt-6 text-center text-sm text-gray-600">
            عرض {filteredQuizzes.length} من {quizzesData.data.length} اختبار
          </div>
        )}

        {/* Create Quiz Modal */}
        <CreateQuizModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSuccess={() => {
            refetch();
            setIsCreateModalOpen(false);
          }}
        />
      </div>
    </div>
  );
}