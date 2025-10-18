"use client";

import { useState } from "react";
import StudentSidebar from "@/components/ui/StudentSidebar";
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
  Eye
} from "lucide-react";

const StudentAttendance = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filterMonth, setFilterMonth] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const attendanceRecords = [
    {
      id: 1,
      date: "2024-01-15",
      session: "أساسيات البرمجة",
      startTime: "09:00",
      endTime: "11:00",
      status: "present",
      instructor: "أستاذ أحمد محمد",
      notes: "حضور ممتاز"
    },
    {
      id: 2,
      date: "2024-01-14",
      session: "البرمجة الكائنية",
      startTime: "09:00",
      endTime: "11:00",
      status: "present",
      instructor: "أستاذة فاطمة علي",
      notes: "مشاركة نشطة"
    },
    {
      id: 3,
      date: "2024-01-13",
      session: "قواعد البيانات",
      startTime: "09:00",
      endTime: "11:00",
      status: "late",
      instructor: "أستاذ محمد حسن",
      notes: "تأخر 15 دقيقة"
    },
    {
      id: 4,
      date: "2024-01-12",
      session: "أساسيات البرمجة",
      startTime: "09:00",
      endTime: "11:00",
      status: "absent",
      instructor: "أستاذ أحمد محمد",
      notes: "غياب بدون عذر"
    },
    {
      id: 5,
      date: "2024-01-11",
      session: "البرمجة الكائنية",
      startTime: "09:00",
      endTime: "11:00",
      status: "excused",
      instructor: "أستاذة فاطمة علي",
      notes: "غياب بعذر طبي"
    },
    {
      id: 6,
      date: "2024-01-10",
      session: "قواعد البيانات",
      startTime: "09:00",
      endTime: "11:00",
      status: "present",
      instructor: "أستاذ محمد حسن",
      notes: "حضور ممتاز"
    }
  ];

  const filteredRecords = attendanceRecords.filter(record => {
    const matchesStatus = filterStatus === "all" || record.status === filterStatus;
    const matchesMonth = filterMonth === "all" || record.date.startsWith(filterMonth);
    return matchesStatus && matchesMonth;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'text-green-600 bg-green-100';
      case 'late':
        return 'text-yellow-600 bg-yellow-100';
      case 'absent':
        return 'text-red-600 bg-red-100';
      case 'excused':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'present':
        return 'حاضر';
      case 'late':
        return 'متأخر';
      case 'absent':
        return 'غائب';
      case 'excused':
        return 'معذور';
      default:
        return 'غير محدد';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'late':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'absent':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'excused':
        return <AlertCircle className="w-5 h-5 text-blue-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  // Calculate statistics
  const totalSessions = attendanceRecords.length;
  const presentSessions = attendanceRecords.filter(r => r.status === 'present').length;
  const lateSessions = attendanceRecords.filter(r => r.status === 'late').length;
  const absentSessions = attendanceRecords.filter(r => r.status === 'absent').length;
  const excusedSessions = attendanceRecords.filter(r => r.status === 'excused').length;
  
  const attendanceRate = totalSessions > 0 ? Math.round((presentSessions / totalSessions) * 100) : 0;
  const punctualityRate = totalSessions > 0 ? Math.round(((presentSessions + lateSessions) / totalSessions) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex" dir="rtl">
      {/* Student Sidebar */}
      <StudentSidebar 
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">سجل الحضور</h1>
            <p className="text-gray-600">متابعة حضورك وغيابك</p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-2xl font-bold text-green-600">{attendanceRate}%</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">معدل الحضور</h3>
              <p className="text-gray-600 text-sm">{presentSessions} من {totalSessions} جلسة</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-2xl font-bold text-blue-600">{punctualityRate}%</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">معدل الحضور الكامل</h3>
              <p className="text-gray-600 text-sm">يشمل الحضور والتأخير</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <span className="text-2xl font-bold text-yellow-600">{lateSessions}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">جلسات متأخرة</h3>
              <p className="text-gray-600 text-sm">عدد المرات المتأخرة</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
                <span className="text-2xl font-bold text-red-600">{absentSessions}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">جلسات غائبة</h3>
              <p className="text-gray-600 text-sm">بدون عذر</p>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <Filter className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">فلتر:</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">جميع الحالات</option>
                  <option value="present">حاضر</option>
                  <option value="late">متأخر</option>
                  <option value="absent">غائب</option>
                  <option value="excused">معذور</option>
                </select>
                
                <select
                  value={filterMonth}
                  onChange={(e) => setFilterMonth(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">جميع الأشهر</option>
                  <option value="2024-01">يناير 2024</option>
                  <option value="2024-02">فبراير 2024</option>
                  <option value="2024-03">مارس 2024</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>تصدير</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                  <BarChart3 className="w-4 h-4" />
                  <span>إحصائيات</span>
                </button>
              </div>
            </div>
          </div>

          {/* Attendance Records */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">سجل الحضور</h3>
            </div>
            
            <div className="divide-y divide-gray-100">
              {filteredRecords.map((record) => (
                <div key={record.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{record.session}</h4>
                        <p className="text-gray-600">{formatDate(record.date)}</p>
                        <p className="text-sm text-gray-500">
                          {formatTime(record.startTime)} - {formatTime(record.endTime)} • {record.instructor}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-left">
                        <div className="flex items-center space-x-2 mb-2">
                          {getStatusIcon(record.status)}
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(record.status)}`}>
                            {getStatusText(record.status)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{record.notes}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Download className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Empty State */}
          {filteredRecords.length === 0 && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد سجلات</h3>
              <p className="text-gray-600">لم يتم العثور على سجلات حضور تطابق معايير البحث</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentAttendance;
