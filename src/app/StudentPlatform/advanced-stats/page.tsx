"use client";

import React, { useState } from 'react';
import { useAdvancedStats } from '@/hooks/useAdvancedStats';
import { ActivityType } from '@/types/advancedStats';
import { 
  BarChart3, 
  Clock, 
  Monitor, 
  Download, 
  Play, 
  FileText, 
  MessageSquare, 
  Calendar,
  TrendingUp,
  Users,
  Activity,
  RefreshCw,
  Eye,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const AdvancedStatsPage = () => {
  const { statsData, loading, error, refetch } = useAdvancedStats();
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'all'>('week');

  const getActivityTypeText = (type: ActivityType) => {
    const types = {
      [ActivityType.PAGE_VIEW]: 'عرض الصفحات',
      [ActivityType.DOWNLOAD]: 'التحميلات',
      [ActivityType.VIDEO_WATCH]: 'مشاهدة الفيديوهات',
      [ActivityType.QUIZ_ATTEMPT]: 'محاولات الاختبارات',
      [ActivityType.ASSIGNMENT_SUBMIT]: 'تسليم الواجبات',
      [ActivityType.DISCUSSION_POST]: 'منشورات النقاش',
      [ActivityType.OTHER]: 'أخرى'
    };
    return types[type] || 'غير محدد';
  };

  const getActivityTypeIcon = (type: ActivityType) => {
    const icons = {
      [ActivityType.PAGE_VIEW]: Eye,
      [ActivityType.DOWNLOAD]: Download,
      [ActivityType.VIDEO_WATCH]: Play,
      [ActivityType.QUIZ_ATTEMPT]: CheckCircle,
      [ActivityType.ASSIGNMENT_SUBMIT]: FileText,
      [ActivityType.DISCUSSION_POST]: MessageSquare,
      [ActivityType.OTHER]: Activity
    };
    return icons[type] || Activity;
  };

  const getActivityTypeColor = (type: ActivityType) => {
    const colors = {
      [ActivityType.PAGE_VIEW]: 'bg-blue-100 text-blue-800 border-blue-200',
      [ActivityType.DOWNLOAD]: 'bg-green-100 text-green-800 border-green-200',
      [ActivityType.VIDEO_WATCH]: 'bg-purple-100 text-purple-800 border-purple-200',
      [ActivityType.QUIZ_ATTEMPT]: 'bg-orange-100 text-orange-800 border-orange-200',
      [ActivityType.ASSIGNMENT_SUBMIT]: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      [ActivityType.DISCUSSION_POST]: 'bg-pink-100 text-pink-800 border-pink-200',
      [ActivityType.OTHER]: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[type] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}س ${mins}د`;
    }
    return `${mins}د`;
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('ar-EG', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري تحميل الإحصائيات...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-red-600 text-lg">{error}</p>
          <button
            onClick={() => refetch()}
            className="mt-4 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mx-auto"
          >
            <RefreshCw size={16} />
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  if (!statsData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">لا توجد إحصائيات متاحة</p>
          <p className="text-gray-500 text-sm mt-2">يرجى التواصل مع الإدارة للحصول على الإحصائيات</p>
        </div>
      </div>
    );
  }

  const { stats, recentSessions, activityCounts, dailyStats } = statsData;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">الإحصائيات المتقدمة</h1>
            <p className="text-gray-600">إحصائيات مفصلة عن نشاطك في المنصة</p>
          </div>
          <button
            onClick={() => refetch()}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw size={20} />
            تحديث الإحصائيات
          </button>
        </div>

        {/* Period Selector */}
        <div className="flex gap-2">
          {[
            { key: 'week', label: 'هذا الأسبوع' },
            { key: 'month', label: 'هذا الشهر' },
            { key: 'all', label: 'جميع الأوقات' }
          ].map((period) => (
            <button
              key={period.key}
              onClick={() => setSelectedPeriod(period.key as any)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedPeriod === period.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Total Sessions */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Monitor className="text-blue-600" size={24} />
            </div>
            <TrendingUp className="text-green-500" size={20} />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{stats.totalSessions}</h3>
          <p className="text-gray-600 text-sm">إجمالي الجلسات</p>
          <div className="mt-2 text-xs text-gray-500">
            هذا الأسبوع: {stats.thisWeekSessions} | هذا الشهر: {stats.thisMonthSessions}
          </div>
        </div>

        {/* Total Time */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Clock className="text-green-600" size={24} />
            </div>
            <TrendingUp className="text-green-500" size={20} />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{formatDuration(stats.totalTimeSpent)}</h3>
          <p className="text-gray-600 text-sm">إجمالي الوقت</p>
          <div className="mt-2 text-xs text-gray-500">
            متوسط الجلسة: {formatDuration(stats.averageSessionTime)}
          </div>
        </div>

        {/* Page Views */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Eye className="text-purple-600" size={24} />
            </div>
            <TrendingUp className="text-green-500" size={20} />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{stats.totalPageViews}</h3>
          <p className="text-gray-600 text-sm">عرض الصفحات</p>
        </div>

        {/* Downloads */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Download className="text-orange-600" size={24} />
            </div>
            <TrendingUp className="text-green-500" size={20} />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">{stats.totalDownloads}</h3>
          <p className="text-gray-600 text-sm">التحميلات</p>
        </div>
      </div>

      {/* Activity Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Activity Types */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Activity className="text-blue-600" size={24} />
            أنواع النشاط
          </h3>
          <div className="space-y-3">
            {activityCounts.map((activity, index) => {
              const Icon = getActivityTypeIcon(activity.activityType);
              const total = activityCounts.reduce((sum, a) => sum + a._count.activityType, 0);
              const percentage = Math.round((activity._count.activityType / total) * 100);
              
              return (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${getActivityTypeColor(activity.activityType)}`}>
                      <Icon size={16} />
                    </div>
                    <span className="font-medium text-gray-700">
                      {getActivityTypeText(activity.activityType)}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-800">{activity._count.activityType}</div>
                    <div className="text-xs text-gray-500">{percentage}%</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Sessions */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Calendar className="text-green-600" size={24} />
            الجلسات الأخيرة
          </h3>
          <div className="space-y-4">
            {recentSessions.slice(0, 5).map((session, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium text-gray-800">
                      {formatDate(session.loginAt)}
                    </p>
                    <p className="text-sm text-gray-600">
                      {session.device}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-600">
                      {formatDuration(session.duration || 0)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {session.activities.length} نشاط
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {session.activities.slice(0, 3).map((activity, actIndex) => {
                    const Icon = getActivityTypeIcon(activity.activityType);
                    return (
                      <div
                        key={actIndex}
                        className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getActivityTypeColor(activity.activityType)}`}
                      >
                        <Icon size={12} />
                        {getActivityTypeText(activity.activityType)}
                      </div>
                    );
                  })}
                  {session.activities.length > 3 && (
                    <div className="px-2 py-1 rounded-full text-xs bg-gray-200 text-gray-600">
                      +{session.activities.length - 3} أخرى
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Daily Stats */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <BarChart3 className="text-purple-600" size={24} />
          الإحصائيات اليومية
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
          {Object.entries(dailyStats).map(([date, dayStats]) => (
            <div key={date} className="p-4 bg-gray-50 rounded-lg text-center">
              <div className="text-sm font-medium text-gray-600 mb-2">
                {new Date(date).toLocaleDateString('ar-EG', { weekday: 'short' })}
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">
                {dayStats.sessions}
              </div>
              <div className="text-xs text-gray-500">
                {formatDuration(dayStats.totalTime)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Login Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">أول تسجيل دخول</h3>
          <p className="text-gray-600">
            {stats.firstLogin ? formatDate(stats.firstLogin) : 'غير محدد'}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">آخر تسجيل دخول</h3>
          <p className="text-gray-600">
            {stats.lastLogin ? formatDate(stats.lastLogin) : 'غير محدد'}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">آخر نشاط</h3>
          <p className="text-gray-600">
            {stats.lastActivity ? formatDate(stats.lastActivity) : 'غير محدد'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdvancedStatsPage;
