"use client";

import { useState, useMemo } from "react";
import { useGetAttendanceRecordsQuery } from "@/lip/features/trainee-auth/traineeAuthApi";
import {
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  BarChart3,
  Filter,
  Download,
  Eye,
  RefreshCw,
  Book,
} from "lucide-react";
import {
  AttendanceStatus,
  DayOfWeek,
  SessionType,
} from "@/types/attendance";

const StudentAttendance = () => {
  const { data: attendanceData, isLoading, error, refetch } = useGetAttendanceRecordsQuery();
  const [filterMonth, setFilterMonth] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterContent, setFilterContent] = useState("all");
  const [expandedContent, setExpandedContent] = useState<number | null>(null);

  // حساب الإحصائيات
  const stats = useMemo(() => {
    if (!attendanceData?.stats) return null;
    return {
      total: attendanceData.stats.total,
      present: attendanceData.stats.present,
      absent: attendanceData.stats.absent,
      late: attendanceData.stats.late,
      excused: attendanceData.stats.excused,
      attendanceRate: attendanceData.stats.attendanceRate,
    };
  }, [attendanceData?.stats]);

  // تصفية السجلات
  const filteredContentGroups = useMemo(() => {
    if (!attendanceData?.contentGroups) return [];

    let filtered = attendanceData.contentGroups;

    // تصفية حسب المحتوى
    if (filterContent !== "all") {
      filtered = filtered.filter(
        (group) => group.content.id.toString() === filterContent
      );
    }

    // تصفية السجلات حسب الحالة والشهر
    return filtered.map((group) => ({
      ...group,
      sessions: group.sessions.filter((session) => {
        // تصفية الحالة
        if (filterStatus !== "all" && session.status !== filterStatus) {
          return false;
        }

        // تصفية الشهر
        if (filterMonth !== "all") {
          const sessionMonth = new Date(session.date).getMonth().toString();
          if (sessionMonth !== filterMonth) {
            return false;
          }
        }

        return true;
      }),
    }));
  }, [attendanceData?.contentGroups, filterMonth, filterStatus, filterContent]);

  // الحصول على الألوان والأيقونات
  const getStatusConfig = (status: AttendanceStatus) => {
    const configs: Record<AttendanceStatus, { color: string; bgColor: string; icon: React.ReactNode; text: string }> = {
      [AttendanceStatus.PRESENT]: {
        color: "text-green-600",
        bgColor: "bg-green-50",
        icon: <CheckCircle className="w-5 h-5" />,
        text: "حاضر",
      },
      [AttendanceStatus.ABSENT]: {
        color: "text-red-600",
        bgColor: "bg-red-50",
        icon: <XCircle className="w-5 h-5" />,
        text: "غائب",
      },
      [AttendanceStatus.LATE]: {
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
        icon: <Clock className="w-5 h-5" />,
        text: "متأخر",
      },
      [AttendanceStatus.EXCUSED]: {
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        icon: <AlertCircle className="w-5 h-5" />,
        text: "معذور",
      },
    };
    return configs[status];
  };

  const getSessionTypeText = (type: SessionType) => {
    return type === SessionType.THEORY ? "نظري" : "عملي";
  };

  const getSessionTypeColor = (type: SessionType) => {
    return type === SessionType.THEORY
      ? "bg-blue-100 text-blue-800 border-blue-200"
      : "bg-green-100 text-green-800 border-green-200";
  };

  const getDayOfWeekText = (day: DayOfWeek) => {
    const daysMap: Record<DayOfWeek, string> = {
      [DayOfWeek.SUNDAY]: "الأحد",
      [DayOfWeek.MONDAY]: "الاثنين",
      [DayOfWeek.TUESDAY]: "الثلاثاء",
      [DayOfWeek.WEDNESDAY]: "الأربعاء",
      [DayOfWeek.THURSDAY]: "الخميس",
      [DayOfWeek.FRIDAY]: "الجمعة",
      [DayOfWeek.SATURDAY]: "السبت",
    };
    return daysMap[day];
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري تحميل سجلات الحضور...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">⚠️</div>
          <p className="text-red-600 mb-4">حدث خطأ في تحميل سجلات الحضور</p>
          <button
            onClick={() => refetch()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="w-4 h-4" />
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6" dir="rtl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">سجل الحضور والغياب</h1>
            <p className="text-gray-600 mt-2">عرض مفصل لسجلات حضورك وغيابك</p>
          </div>
          <button
            onClick={() => refetch()}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            تحديث البيانات
          </button>
        </div>

        {/* Statistics Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Total Sessions */}
            <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-600">
              <div className="text-sm text-gray-600">إجمالي الجلسات</div>
              <div className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</div>
            </div>

            {/* Present */}
            <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-600">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">حاضر</div>
                  <div className="text-2xl font-bold text-gray-900 mt-1">{stats.present}</div>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600 opacity-50" />
              </div>
            </div>

            {/* Absent */}
            <div className="bg-white rounded-lg shadow p-4 border-l-4 border-red-600">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">غائب</div>
                  <div className="text-2xl font-bold text-gray-900 mt-1">{stats.absent}</div>
                </div>
                <XCircle className="w-8 h-8 text-red-600 opacity-50" />
              </div>
            </div>

            {/* Late */}
            <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-600">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">متأخر</div>
                  <div className="text-2xl font-bold text-gray-900 mt-1">{stats.late}</div>
                </div>
                <Clock className="w-8 h-8 text-yellow-600 opacity-50" />
              </div>
            </div>

            {/* Attendance Rate */}
            <div className="bg-white rounded-lg shadow p-4 border-l-4 border-purple-600">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">معدل الحضور</div>
                  <div className="text-2xl font-bold text-gray-900 mt-1">{stats.attendanceRate}%</div>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600 opacity-50" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6 border border-gray-200">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            {/* Status Filter */}
            <div>
              <label className="text-sm text-gray-600 mb-1 block">الحالة</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">جميع الحالات</option>
                <option value={AttendanceStatus.PRESENT}>حاضر</option>
                <option value={AttendanceStatus.ABSENT}>غائب</option>
                <option value={AttendanceStatus.LATE}>متأخر</option>
                <option value={AttendanceStatus.EXCUSED}>معذور</option>
              </select>
            </div>

            {/* Month Filter */}
            <div>
              <label className="text-sm text-gray-600 mb-1 block">الشهر</label>
              <select
                value={filterMonth}
                onChange={(e) => setFilterMonth(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">جميع الأشهر</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={i}>
                    {new Date(2024, i, 1).toLocaleDateString("ar-EG", {
                      month: "long",
                    })}
                  </option>
                ))}
              </select>
            </div>

            {/* Content Filter */}
            <div>
              <label className="text-sm text-gray-600 mb-1 block">المحتوى التدريبي</label>
              <select
                value={filterContent}
                onChange={(e) => setFilterContent(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">جميع المحتويات</option>
                {attendanceData?.contentGroups.map((group) => (
                  <option key={group.content.id} value={group.content.id}>
                    {group.content.nameAr}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
            <Download className="w-4 h-4" />
            تصدير PDF
          </button>
        </div>
      </div>

      {/* Content Groups */}
      <div className="space-y-6">
        {filteredContentGroups.map((group) => (
          <div
            key={group.content.id}
            className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden"
          >
            {/* Group Header */}
            <div
              className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 cursor-pointer hover:from-blue-100 hover:to-blue-200 transition-colors"
              onClick={() =>
                setExpandedContent(
                  expandedContent === group.content.id ? null : group.content.id
                )
              }
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Book className="w-5 h-5 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {group.content.nameAr}
                    </h3>
                    <p className="text-sm text-gray-600">{group.content.nameEn}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  {/* Mini Stats */}
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-green-600 font-medium">
                      {group.stats.present}
                    </span>
                    <span className="text-gray-500">/</span>
                    <span className="text-gray-600">{group.stats.total}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">
                      {group.stats.attendanceRate}%
                    </div>
                    <div className="text-xs text-gray-500">معدل الحضور</div>
                  </div>
                  <Eye
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      expandedContent === group.content.id ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Group Content */}
            {expandedContent === group.content.id && (
              <div className="border-t border-gray-200">
                {group.sessions.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    لا توجد سجلات لهذا الفلتر
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {group.sessions.map((session) => {
                      const statusConfig = getStatusConfig(session.status);
                      return (
                        <div
                          key={session.id}
                          className="p-4 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 flex-1">
                              {/* Date & Day */}
                              <div className="min-w-[120px]">
                                <p className="font-medium text-gray-900">
                                  {formatDate(session.date)}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {getDayOfWeekText(session.dayOfWeek)}
                                </p>
                              </div>

                              {/* Session Type */}
                              <div>
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getSessionTypeColor(
                                    session.sessionType
                                  )}`}
                                >
                                  {getSessionTypeText(session.sessionType)}
                                </span>
                              </div>

                              {/* Notes */}
                              {session.notes && (
                                <div className="flex-1">
                                  <p className="text-sm text-gray-600">
                                    {session.notes}
                                  </p>
                                </div>
                              )}

                              {/* Cancelled Badge */}
                              {session.isCancelled && (
                                <div className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded font-medium">
                                  ملغي
                                </div>
                              )}
                            </div>

                            {/* Status */}
                            <div className="flex items-center gap-2 ml-4">
                              <div
                                className={`px-3 py-1 rounded-full flex items-center gap-2 border ${statusConfig.bgColor}`}
                              >
                                <span className={statusConfig.color}>
                                  {statusConfig.icon}
                                </span>
                                <span
                                  className={`text-sm font-medium ${statusConfig.color}`}
                                >
                                  {statusConfig.text}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredContentGroups.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">لا توجد سجلات حضور</p>
          <p className="text-gray-500 text-sm mt-2">
            جرب تغيير معايير التصفية
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentAttendance;
