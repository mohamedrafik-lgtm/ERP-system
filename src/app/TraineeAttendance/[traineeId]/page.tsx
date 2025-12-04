"use client";

import { useRouter, useParams } from "next/navigation";
import { useGetTraineeAttendanceQuery } from "@/lip/features/attendance/attendanceApi";
import {
  ArrowRight,
  User,
  Phone,
  Mail,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  RefreshCw,
  GraduationCap,
  BookOpen,
  TrendingUp,
  TrendingDown,
  BarChart3
} from "lucide-react";
import { AttendanceStatus } from "@/types/attendance";

export default function TraineeAttendancePage() {
  const router = useRouter();
  const params = useParams();
  const traineeId = parseInt(params.traineeId as string);

  const { data, isLoading, error, refetch } = useGetTraineeAttendanceQuery(traineeId);

  const getStatusBadge = (status: AttendanceStatus) => {
    const styles = {
      PRESENT: {
        bg: 'bg-green-100',
        text: 'text-green-800',
        icon: CheckCircle,
        label: 'حاضر'
      },
      ABSENT: {
        bg: 'bg-red-100',
        text: 'text-red-800',
        icon: XCircle,
        label: 'غائب'
      },
      LATE: {
        bg: 'bg-yellow-100',
        text: 'text-yellow-800',
        icon: Clock,
        label: 'متأخر'
      },
      EXCUSED: {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        icon: AlertCircle,
        label: 'غياب بعذر'
      }
    };

    const style = styles[status];
    const Icon = style.icon;

    return (
      <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold ${style.bg} ${style.text}`}>
        <Icon className="w-4 h-4" />
        {style.label}
      </span>
    );
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (time: string) => {
    return time;
  };

  const calculatePercentage = (value: number, total: number) => {
    if (total === 0) return 0;
    return ((value / total) * 100).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-3 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 rounded-xl shadow-lg border border-gray-200/50 transition-all duration-300 hover:scale-105 mb-6"
          >
            <ArrowRight className="w-5 h-5" />
            <span className="font-semibold">رجوع</span>
          </button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : error ? (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-12 text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-12 h-12 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">حدث خطأ في تحميل البيانات</h3>
            <p className="text-gray-600 mb-6">يرجى المحاولة مرة أخرى</p>
            <button
              onClick={() => refetch()}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 hover:scale-105 shadow-lg font-bold"
            >
              إعادة المحاولة
            </button>
          </div>
        ) : data ? (
          <>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8 mb-8">
              <div className="flex items-center gap-6">
                <div className="relative">
                  {data.trainee.photoUrl && typeof data.trainee.photoUrl === 'string' && data.trainee.photoUrl.startsWith('/uploads') ? (
                    <div className="relative w-24 h-24">
                      <img
                        src={`http://localhost:4000${data.trainee.photoUrl}`}
                        alt={data.trainee.nameAr}
                        className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-lg"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.parentElement?.querySelector('.fallback-avatar');
                          if (fallback) {
                            fallback.classList.remove('hidden');
                          }
                        }}
                      />
                      <div className="fallback-avatar hidden w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center border-4 border-white shadow-lg absolute top-0 left-0">
                        <User className="w-12 h-12 text-blue-600" />
                      </div>
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center border-4 border-white shadow-lg">
                      <User className="w-12 h-12 text-blue-600" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-black bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-2">
                    {data.trainee.nameAr}
                  </h1>
                  {data.trainee.nameEn && (
                    <p className="text-gray-600 font-medium mb-3">{data.trainee.nameEn}</p>
                  )}
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm font-medium">{data.trainee.phone}</span>
                    </div>
                    {data.trainee.email && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm font-medium">{data.trainee.email}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-semibold text-purple-800">{data.trainee.program.nameAr}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => refetch()}
                  className="p-3 bg-white/80 backdrop-blur-sm hover:bg-white text-gray-700 rounded-xl shadow-lg border border-gray-200/50 transition-all duration-300 hover:scale-105"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50">
                <p className="text-sm text-gray-600 mb-2">إجمالي الجلسات</p>
                <p className="text-4xl font-extrabold text-gray-900">{data.stats.total}</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 shadow-xl border border-green-200/50">
                <p className="text-sm text-green-700 mb-2">حاضر</p>
                <p className="text-4xl font-extrabold text-green-700">{data.stats.present}</p>
                <p className="text-xs text-green-600 mt-1">{calculatePercentage(data.stats.present, data.stats.total)}%</p>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-6 shadow-xl border border-red-200/50">
                <p className="text-sm text-red-700 mb-2">غائب</p>
                <p className="text-4xl font-extrabold text-red-700">{data.stats.absent}</p>
                <p className="text-xs text-red-600 mt-1">{calculatePercentage(data.stats.absent, data.stats.total)}%</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-6 shadow-xl border border-yellow-200/50">
                <p className="text-sm text-yellow-700 mb-2">متأخر</p>
                <p className="text-4xl font-extrabold text-yellow-700">{data.stats.late}</p>
                <p className="text-xs text-yellow-600 mt-1">{calculatePercentage(data.stats.late, data.stats.total)}%</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-xl border border-blue-200/50">
                <p className="text-sm text-blue-700 mb-2">غياب بعذر</p>
                <p className="text-4xl font-extrabold text-blue-700">{data.stats.excused}</p>
                <p className="text-xs text-blue-600 mt-1">{calculatePercentage(data.stats.excused, data.stats.total)}%</p>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">الحضور حسب المواد الدراسية</h2>
              
              {data.byContent.map((content) => (
                <div key={content.content.id} className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
                  <div className="bg-gradient-to-r from-gray-50 via-blue-50 to-indigo-50 px-8 py-6 border-b border-gray-200/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                          <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{content.content.name}</h3>
                          {content.content.code && (
                            <p className="text-sm text-gray-600">كود: {content.content.code}</p>
                          )}
                          {content.classroom && (
                            <p className="text-sm text-gray-500">الفصل: {content.classroom.name}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="text-center">
                          <p className="text-sm text-gray-600">الحضور</p>
                          <p className="text-2xl font-bold text-green-600">{content.stats.present}/{content.stats.total}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-600">النسبة</p>
                          <p className="text-2xl font-bold text-blue-600">{calculatePercentage(content.stats.present, content.stats.total)}%</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="divide-y divide-gray-200/50">
                    {content.records.map((record) => (
                      <div key={record.id} className="px-8 py-4 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-300">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Calendar className="w-5 h-5 text-gray-400" />
                            <div>
                              <p className="font-semibold text-gray-900">{formatDate(record.session.date)}</p>
                              <p className="text-sm text-gray-600">
                                {formatTime(record.session.startTime)} - {formatTime(record.session.endTime)}
                              </p>
                              <p className="text-xs text-gray-500">
                                {record.session.scheduleSlot.type === 'THEORY' ? 'نظري' : 'عملي'}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            {getStatusBadge(record.status)}
                            {record.notes && (
                              <p className="text-sm text-gray-600 max-w-xs truncate" title={record.notes}>
                                {record.notes}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}