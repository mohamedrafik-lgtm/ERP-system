"use client";

import { useState } from "react";
import StudentSidebar from "@/components/ui/StudentSidebar";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Target,
  Award,
  Calendar,
  Clock,
  BookOpen,
  CheckCircle,
  XCircle,
  Star,
  Download,
  Share,
  Filter,
  RefreshCw
} from "lucide-react";

const StudentStats = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [timeRange, setTimeRange] = useState("month");
  const [refreshKey, setRefreshKey] = useState(0);

  const stats = {
    overall: {
      attendanceRate: 85,
      averageScore: 78,
      completedAssignments: 12,
      totalAssignments: 15,
      studyHours: 45,
      targetHours: 60
    },
    monthly: {
      attendanceRate: 90,
      averageScore: 82,
      completedAssignments: 4,
      totalAssignments: 5,
      studyHours: 18,
      targetHours: 20
    },
    weekly: {
      attendanceRate: 100,
      averageScore: 85,
      completedAssignments: 2,
      totalAssignments: 2,
      studyHours: 8,
      targetHours: 10
    }
  };

  const currentStats = stats[timeRange as keyof typeof stats];

  const subjects = [
    {
      name: "أساسيات البرمجة",
      progress: 85,
      averageScore: 82,
      attendanceRate: 90,
      completedLessons: 8,
      totalLessons: 10,
      color: "blue"
    },
    {
      name: "البرمجة الكائنية",
      progress: 70,
      averageScore: 75,
      attendanceRate: 85,
      completedLessons: 7,
      totalLessons: 10,
      color: "green"
    },
    {
      name: "قواعد البيانات",
      progress: 60,
      averageScore: 78,
      attendanceRate: 80,
      completedLessons: 6,
      totalLessons: 10,
      color: "purple"
    },
    {
      name: "تطوير الويب",
      progress: 45,
      averageScore: 70,
      attendanceRate: 75,
      completedLessons: 4,
      totalLessons: 10,
      color: "orange"
    }
  ];

  const achievements = [
    {
      id: 1,
      title: "الطالب المثالي",
      description: "حضور ممتاز لـ 10 جلسات متتالية",
      date: "2024-01-15",
      icon: "🏆",
      earned: true
    },
    {
      id: 2,
      title: "متفوق أكاديمياً",
      description: "حصول على معدل أعلى من 80%",
      date: "2024-01-10",
      icon: "⭐",
      earned: true
    },
    {
      id: 3,
      title: "منجز المهام",
      description: "إتمام 5 واجبات في الوقت المحدد",
      date: "2024-01-08",
      icon: "✅",
      earned: true
    },
    {
      id: 4,
      title: "باحث نشط",
      description: "قراءة 20 مقالة تعليمية",
      date: null,
      icon: "📚",
      earned: false
    },
    {
      id: 5,
      title: "مشارك نشط",
      description: "المشاركة في 10 مناقشات",
      date: null,
      icon: "💬",
      earned: false
    }
  ];

  const recentActivities = [
    {
      id: 1,
      title: "إتمام واجب البرمجة الكائنية",
      type: "assignment",
      date: "2024-01-15",
      score: 85,
      status: "completed"
    },
    {
      id: 2,
      title: "حضور محاضرة قواعد البيانات",
      type: "attendance",
      date: "2024-01-14",
      score: null,
      status: "present"
    },
    {
      id: 3,
      title: "تسليم مشروع التطوير",
      type: "project",
      date: "2024-01-12",
      score: 92,
      status: "completed"
    },
    {
      id: 4,
      title: "امتحان أساسيات البرمجة",
      type: "exam",
      date: "2024-01-10",
      score: 78,
      status: "completed"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'text-blue-600 bg-blue-100';
      case 'green':
        return 'text-green-600 bg-green-100';
      case 'purple':
        return 'text-purple-600 bg-purple-100';
      case 'orange':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600';
    if (progress >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

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
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">إحصائياتي</h1>
                <p className="text-gray-600">تتبع تقدمك وأداءك الأكاديمي</p>
              </div>
              <div className="flex items-center space-x-4">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="week">هذا الأسبوع</option>
                  <option value="month">هذا الشهر</option>
                  <option value="overall">الإجمالي</option>
                </select>
                <button
                  onClick={handleRefresh}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>تحديث</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-2xl font-bold text-green-600">{currentStats.attendanceRate}%</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">معدل الحضور</h3>
              <p className="text-gray-600 text-sm">حضور الجلسات</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-2xl font-bold text-blue-600">{currentStats.averageScore}%</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">المعدل العام</h3>
              <p className="text-gray-600 text-sm">متوسط النتائج</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-2xl font-bold text-purple-600">
                  {currentStats.completedAssignments}/{currentStats.totalAssignments}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">الواجبات</h3>
              <p className="text-gray-600 text-sm">مكتمل/إجمالي</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <span className="text-2xl font-bold text-orange-600">
                  {currentStats.studyHours}/{currentStats.targetHours}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">ساعات الدراسة</h3>
              <p className="text-gray-600 text-sm">ساعة/الهدف</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Subjects Progress */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">تقدم المواد</h3>
                <button className="flex items-center space-x-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <Filter className="w-4 h-4" />
                  <span>فلتر</span>
                </button>
              </div>
              
              <div className="space-y-4">
                {subjects.map((subject, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">{subject.name}</h4>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getColorClasses(subject.color)}`}>
                        {subject.progress}%
                      </span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          subject.color === 'blue' ? 'bg-blue-500' :
                          subject.color === 'green' ? 'bg-green-500' :
                          subject.color === 'purple' ? 'bg-purple-500' :
                          'bg-orange-500'
                        }`}
                        style={{ width: `${subject.progress}%` }}
                      ></div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <p className="text-gray-600">المعدل</p>
                        <p className={`font-semibold ${getProgressColor(subject.averageScore)}`}>
                          {subject.averageScore}%
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-600">الحضور</p>
                        <p className={`font-semibold ${getProgressColor(subject.attendanceRate)}`}>
                          {subject.attendanceRate}%
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-600">الدروس</p>
                        <p className="font-semibold text-gray-900">
                          {subject.completedLessons}/{subject.totalLessons}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">الإنجازات</h3>
                <button className="flex items-center space-x-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <Award className="w-4 h-4" />
                  <span>جميع الإنجازات</span>
                </button>
              </div>
              
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className={`p-4 rounded-xl border-2 ${
                    achievement.earned 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                        {achievement.date && (
                          <p className="text-xs text-gray-500 mt-1">
                            تم الحصول عليه في {formatDate(achievement.date)}
                          </p>
                        )}
                      </div>
                      {achievement.earned ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      ) : (
                        <XCircle className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">النشاطات الأخيرة</h3>
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>تصدير</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                  <Share className="w-4 h-4" />
                  <span>مشاركة</span>
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{activity.title}</h4>
                      <p className="text-sm text-gray-600">{formatDate(activity.date)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {activity.score && (
                      <div className="text-left">
                        <p className="text-sm text-gray-600">النتيجة</p>
                        <p className="font-semibold text-blue-600">{activity.score}%</p>
                      </div>
                    )}
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      activity.status === 'completed' 
                        ? 'text-green-600 bg-green-100'
                        : 'text-blue-600 bg-blue-100'
                    }`}>
                      {activity.status === 'completed' ? 'مكتمل' : 'حاضر'}
                    </span>
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

export default StudentStats;