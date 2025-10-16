"use client";

import { useState, useEffect } from "react";
import { 
  User, 
  BookOpen, 
  Calendar, 
  CreditCard, 
  FileText, 
  Clock, 
  TrendingUp,
  Award,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Star,
  Target,
  BarChart3,
  PieChart,
  Activity,
  ArrowLeft,
  Trophy,
  Zap,
  Brain,
  Users,
  Bookmark,
  Timer,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  TrendingDown,
  Minus
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/lip/features/auth/authSlice";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

// Mock data - سيتم استبدالها بالبيانات الحقيقية من API
const mockStatsData = {
  trainee: {
    id: 1,
    nameAr: "أحمد محمد علي",
    program: {
      nameAr: "برمجة الحاسوب",
      code: "CP101",
      duration: 6
    }
  },
  overview: {
    totalSessions: 24,
    attendedSessions: 20,
    missedSessions: 4,
    attendanceRate: 83,
    totalHours: 40,
    completedLessons: 15,
    totalLessons: 20,
    progressRate: 75,
    averageScore: 87,
    totalQuizzes: 8,
    passedQuizzes: 6,
    quizPassRate: 75
  },
  weeklyProgress: [
    { week: "الأسبوع 1", progress: 20, attendance: 100 },
    { week: "الأسبوع 2", progress: 35, attendance: 100 },
    { week: "الأسبوع 3", progress: 50, attendance: 80 },
    { week: "الأسبوع 4", progress: 65, attendance: 100 },
    { week: "الأسبوع 5", progress: 75, attendance: 100 },
    { week: "الأسبوع 6", progress: 75, attendance: 100 }
  ],
  recentActivities: [
    {
      id: 1,
      type: "lesson",
      title: "إكمال درس: متغيرات JavaScript",
      time: "منذ ساعتين",
      score: 95,
      status: "completed"
    },
    {
      id: 2,
      type: "quiz",
      title: "امتحان: أساسيات البرمجة",
      time: "منذ يوم",
      score: 88,
      status: "completed"
    },
    {
      id: 3,
      type: "assignment",
      title: "تسليم واجب: مشروع تطبيق ويب",
      time: "منذ 3 أيام",
      score: 92,
      status: "completed"
    },
    {
      id: 4,
      type: "session",
      title: "حضور جلسة: تطوير الواجهات",
      time: "منذ أسبوع",
      score: null,
      status: "attended"
    }
  ],
  achievements: [
    {
      id: 1,
      title: "أول خطوة",
      description: "إكمال أول درس",
      icon: "🎯",
      earned: true,
      date: "2024-01-15"
    },
    {
      id: 2,
      title: "مثابر",
      description: "حضور 10 جلسات متتالية",
      icon: "🔥",
      earned: true,
      date: "2024-02-01"
    },
    {
      id: 3,
      title: "متفوق",
      description: "الحصول على 90+ في 5 امتحانات",
      icon: "⭐",
      earned: true,
      date: "2024-02-10"
    },
    {
      id: 4,
      title: "مكمل",
      description: "إكمال 50% من البرنامج",
      icon: "🏆",
      earned: false,
      date: null
    },
    {
      id: 5,
      title: "خبير",
      description: "إكمال جميع الدروس",
      icon: "👑",
      earned: false,
      date: null
    }
  ],
  performance: {
    strengths: [
      "البرمجة الأساسية",
      "تطوير الواجهات",
      "قواعد البيانات"
    ],
    improvements: [
      "الخوارزميات المتقدمة",
      "الأمان السيبراني",
      "التحسين والأداء"
    ],
    recommendations: [
      "ركز على حل المزيد من التمارين",
      "شارك في المناقشات الجماعية",
      "اطلب المساعدة عند الحاجة"
    ]
  }
};

const MyStatsPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [statsData, setStatsData] = useState(mockStatsData);
  const [selectedPeriod, setSelectedPeriod] = useState('شهري');

  useEffect(() => {
    // محاولة جلب البيانات الحقيقية من localStorage
    const storedData = localStorage.getItem('traineeData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setStatsData(prev => ({
          ...prev,
          trainee: {
            ...prev.trainee,
            ...parsedData
          }
        }));
      } catch (error) {
        console.error('Error parsing trainee data:', error);
      }
    }
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'attended':
        return 'text-blue-600 bg-blue-100';
      case 'missed':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'مكتمل';
      case 'attended':
        return 'حاضر';
      case 'missed':
        return 'غائب';
      default:
        return status;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'lesson':
        return <BookOpen className="w-5 h-5 text-blue-600" />;
      case 'quiz':
        return <Brain className="w-5 h-5 text-purple-600" />;
      case 'assignment':
        return <FileText className="w-5 h-5 text-green-600" />;
      case 'session':
        return <Users className="w-5 h-5 text-orange-600" />;
      default:
        return <Activity className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50" dir="rtl">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>العودة</span>
              </button>
              <div className="w-px h-6 bg-gray-300"></div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">إحصائياتي الشخصية</h1>
                <p className="text-sm text-gray-600">تتبع تقدمك وأداءك</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="أسبوعي">أسبوعي</option>
                <option value="شهري">شهري</option>
                <option value="سنوي">سنوي</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">مرحباً {statsData.trainee.nameAr}</h2>
                <p className="text-blue-100 mb-4">إليك إحصائياتك الشخصية وتقدمك في البرنامج</p>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5" />
                    <span>{statsData.trainee.program.nameAr}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5" />
                    <span>كود البرنامج: {statsData.trainee.program.code}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                  <Trophy className="w-10 h-10" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Attendance Rate */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-green-600">{statsData.overview.attendanceRate}%</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">معدل الحضور</h3>
            <p className="text-gray-600 text-sm">{statsData.overview.attendedSessions} من {statsData.overview.totalSessions} جلسة</p>
          </div>

          {/* Progress Rate */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-blue-600">{statsData.overview.progressRate}%</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">تقدم البرنامج</h3>
            <p className="text-gray-600 text-sm">{statsData.overview.completedLessons} من {statsData.overview.totalLessons} درس</p>
          </div>

          {/* Average Score */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-purple-600">{statsData.overview.averageScore}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">متوسط الدرجات</h3>
            <p className="text-gray-600 text-sm">من 100 نقطة</p>
          </div>

          {/* Quiz Pass Rate */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-2xl font-bold text-orange-600">{statsData.overview.quizPassRate}%</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">معدل نجاح الامتحانات</h3>
            <p className="text-gray-600 text-sm">{statsData.overview.passedQuizzes} من {statsData.overview.totalQuizzes} امتحان</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Weekly Progress Chart */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">التقدم الأسبوعي</h3>
                <BarChart3 className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {statsData.weeklyProgress.map((week, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">{week.week}</span>
                        <span className="text-sm text-gray-600">{week.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${week.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-gray-500">الحضور: {week.attendance}%</span>
                        <span className="text-xs text-gray-500">التقدم: {week.progress}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">الأنشطة الأخيرة</h3>
                <Activity className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {statsData.recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                    <div className="flex-shrink-0">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-600">{activity.time}</p>
                    </div>
                    <div className="text-left">
                      {activity.score && (
                        <span className="text-sm font-bold text-green-600">{activity.score}%</span>
                      )}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                        {getStatusText(activity.status)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">الإنجازات</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {statsData.achievements.map((achievement) => (
              <div 
                key={achievement.id} 
                className={`p-6 rounded-2xl border-2 transition-all duration-300 ${
                  achievement.earned 
                    ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 shadow-lg' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`text-3xl ${achievement.earned ? '' : 'grayscale opacity-50'}`}>
                    {achievement.icon}
                  </div>
                  <div>
                    <h4 className={`font-bold ${achievement.earned ? 'text-gray-900' : 'text-gray-500'}`}>
                      {achievement.title}
                    </h4>
                    {achievement.earned && achievement.date && (
                      <p className="text-xs text-gray-600">{achievement.date}</p>
                    )}
                  </div>
                </div>
                <p className={`text-sm ${achievement.earned ? 'text-gray-700' : 'text-gray-500'}`}>
                  {achievement.description}
                </p>
                {achievement.earned && (
                  <div className="flex items-center space-x-1 mt-3">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-xs text-green-600 font-medium">مكتسب</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Performance Analysis */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Strengths */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-bold text-gray-900">نقاط القوة</h3>
            </div>
            <div className="space-y-2">
              {statsData.performance.strengths.map((strength, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">{strength}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Areas for Improvement */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <h3 className="text-lg font-bold text-gray-900">مجالات التحسين</h3>
            </div>
            <div className="space-y-2">
              {statsData.performance.improvements.map((improvement, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">{improvement}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Zap className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-gray-900">التوصيات</h3>
            </div>
            <div className="space-y-2">
              {statsData.performance.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">{recommendation}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyStatsPage;
