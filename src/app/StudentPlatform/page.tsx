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
  Activity
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/lip/features/auth/authSlice";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

// Mock data - سيتم استبدالها بالبيانات الحقيقية من API
const mockTraineeData = {
  id: 1,
  nameAr: "أحمد محمد علي",
  nameEn: "Ahmed Mohamed Ali",
  nationalId: "12345678901234",
  phone: "01012345678",
  email: "ahmed@example.com",
  program: {
    id: 1,
    nameAr: "برمجة الحاسوب",
    nameEn: "Computer Programming",
    code: "CP101",
    duration: 6,
    description: "برنامج شامل لتعلم البرمجة وتطوير التطبيقات"
  },
  attendanceRecords: [
    {
      id: 1,
      status: "PRESENT",
      createdAt: "2024-01-15T09:00:00Z",
      session: {
        id: 1,
        title: "مقدمة في البرمجة",
        startTime: "2024-01-15T09:00:00Z",
        endTime: "2024-01-15T11:00:00Z",
        content: {
          id: 1,
          name: "أساسيات البرمجة",
          code: "PROG101"
        }
      }
    },
    {
      id: 2,
      status: "PRESENT",
      createdAt: "2024-01-17T09:00:00Z",
      session: {
        id: 2,
        title: "متغيرات وأنواع البيانات",
        startTime: "2024-01-17T09:00:00Z",
        endTime: "2024-01-17T11:00:00Z",
        content: {
          id: 1,
          name: "أساسيات البرمجة",
          code: "PROG101"
        }
      }
    },
    {
      id: 3,
      status: "ABSENT",
      createdAt: "2024-01-19T09:00:00Z",
      session: {
        id: 3,
        title: "الهياكل الشرطية",
        startTime: "2024-01-19T09:00:00Z",
        endTime: "2024-01-19T11:00:00Z",
        content: {
          id: 1,
          name: "أساسيات البرمجة",
          code: "PROG101"
        }
      }
    }
  ],
  traineePayments: [
    {
      id: 1,
      amount: 500,
      paymentDate: "2024-01-01T00:00:00Z",
      status: "PAID",
      fee: {
        id: 1,
        name: "رسوم التسجيل",
        amount: 500,
        dueDate: "2024-01-01T00:00:00Z"
      }
    },
    {
      id: 2,
      amount: 1000,
      paymentDate: "2024-01-15T00:00:00Z",
      status: "PAID",
      fee: {
        id: 2,
        name: "القسط الأول",
        amount: 1000,
        dueDate: "2024-01-15T00:00:00Z"
      }
    },
    {
      id: 3,
      amount: 1000,
      paymentDate: null,
      status: "PENDING",
      fee: {
        id: 3,
        name: "القسط الثاني",
        amount: 1000,
        dueDate: "2024-02-15T00:00:00Z"
      }
    }
  ],
  documents: [
    {
      id: 1,
      documentType: "شهادة الميلاد",
      fileName: "birth_certificate.pdf",
      fileUrl: "/documents/birth_certificate.pdf",
      isVerified: true,
      uploadedAt: "2024-01-01T00:00:00Z"
    },
    {
      id: 2,
      documentType: "صورة شخصية",
      fileName: "profile_photo.jpg",
      fileUrl: "/documents/profile_photo.jpg",
      isVerified: true,
      uploadedAt: "2024-01-01T00:00:00Z"
    },
    {
      id: 3,
      documentType: "شهادة المؤهل",
      fileName: "qualification_certificate.pdf",
      fileUrl: "/documents/qualification_certificate.pdf",
      isVerified: false,
      uploadedAt: "2024-01-05T00:00:00Z"
    }
  ]
};

const StudentDashboard = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [traineeData, setTraineeData] = useState(mockTraineeData);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // تحديث الوقت كل دقيقة
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // محاولة جلب البيانات الحقيقية من localStorage
    const storedData = localStorage.getItem('traineeData');
    if (storedData) {
      try {
        setTraineeData(JSON.parse(storedData));
      } catch (error) {
        console.error('Error parsing trainee data:', error);
      }
    }

    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    // مسح البيانات من localStorage
    localStorage.removeItem('traineeData');
    
    // مسح الكوكيز
    Cookies.remove('access_token');
    Cookies.remove('auth_token');
    Cookies.remove('user_data');
    
    // تسجيل الخروج من Redux
    dispatch(logout());
    
    // توجيه إلى صفحة تسجيل الدخول
    router.push('/login/student');
    
    toast.success('تم تسجيل الخروج بنجاح');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('ar-EG', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PRESENT':
        return 'text-green-600 bg-green-100';
      case 'ABSENT':
        return 'text-red-600 bg-red-100';
      case 'LATE':
        return 'text-yellow-600 bg-yellow-100';
      case 'EXCUSED':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PRESENT':
        return 'حاضر';
      case 'ABSENT':
        return 'غائب';
      case 'LATE':
        return 'متأخر';
      case 'EXCUSED':
        return 'معذور';
      default:
        return status;
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'PAID':
        return 'text-green-600 bg-green-100';
      case 'PENDING':
        return 'text-yellow-600 bg-yellow-100';
      case 'OVERDUE':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case 'PAID':
        return 'مدفوع';
      case 'PENDING':
        return 'معلق';
      case 'OVERDUE':
        return 'متأخر';
      default:
        return status;
    }
  };

  // حساب الإحصائيات
  const totalSessions = traineeData.attendanceRecords.length;
  const presentSessions = traineeData.attendanceRecords.filter(record => record.status === 'PRESENT').length;
  const attendanceRate = totalSessions > 0 ? Math.round((presentSessions / totalSessions) * 100) : 0;
  
  const totalPayments = traineeData.traineePayments.reduce((sum, payment) => sum + payment.amount, 0);
  const paidAmount = traineeData.traineePayments
    .filter(payment => payment.status === 'PAID')
    .reduce((sum, payment) => sum + payment.amount, 0);
  const pendingAmount = traineeData.traineePayments
    .filter(payment => payment.status === 'PENDING')
    .reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50" dir="rtl">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">منصة الطالب</h1>
                <p className="text-sm text-gray-600">مرحباً {traineeData.nameAr}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">الوقت الحالي</p>
                <p className="text-lg font-semibold text-gray-900">
                  {currentTime.toLocaleTimeString('ar-EG', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    second: '2-digit'
                  })}
                </p>
              </div>
              
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-xl transition-all duration-300"
              >
                <LogOut className="w-5 h-5" />
                <span>تسجيل الخروج</span>
              </button>
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
                <h2 className="text-3xl font-bold mb-2">مرحباً {traineeData.nameAr}</h2>
                <p className="text-blue-100 mb-4">مرحباً بك في منصة التدريب الإلكترونية</p>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5" />
                    <span>{traineeData.program.nameAr}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5" />
                    <span>كود البرنامج: {traineeData.program.code}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Attendance Rate */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-green-600">{attendanceRate}%</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">معدل الحضور</h3>
            <p className="text-gray-600 text-sm">{presentSessions} من {totalSessions} جلسة</p>
          </div>

          {/* Program Progress */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-blue-600">25%</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">تقدم البرنامج</h3>
            <p className="text-gray-600 text-sm">1.5 من {traineeData.program.duration} أشهر</p>
          </div>

          {/* Payments */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-purple-600">{paidAmount} ج.م</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">المبلغ المدفوع</h3>
            <p className="text-gray-600 text-sm">من أصل {totalPayments} ج.م</p>
          </div>

          {/* Documents */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-2xl font-bold text-orange-600">{traineeData.documents.length}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">المستندات</h3>
            <p className="text-gray-600 text-sm">مستندات مرفوعة</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Attendance */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">سجل الحضور الأخير</h3>
                <Calendar className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {traineeData.attendanceRecords.slice(0, 5).map((record) => (
                  <div key={record.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(record.status).split(' ')[1]}`}></div>
                      <div>
                        <p className="font-semibold text-gray-900">{record.session.title}</p>
                        <p className="text-sm text-gray-600">{formatDate(record.createdAt)}</p>
                      </div>
                    </div>
                    <div className="text-left">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(record.status)}`}>
                        {getStatusText(record.status)}
                      </span>
                      <p className="text-sm text-gray-600 mt-1">
                        {formatTime(record.session.startTime)} - {formatTime(record.session.endTime)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Payment Status */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">حالة المدفوعات</h3>
                <CreditCard className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {traineeData.traineePayments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-semibold text-gray-900">{payment.fee.name}</p>
                      <p className="text-sm text-gray-600">{formatDate(payment.fee.dueDate)}</p>
                    </div>
                    <div className="text-left">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusColor(payment.status)}`}>
                        {getPaymentStatusText(payment.status)}
                      </span>
                      <p className="text-sm text-gray-600 mt-1">{payment.amount} ج.م</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">الإجراءات السريعة</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button 
              onClick={() => router.push('/StudentPlatform/MyAccount')}
              className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <User className="w-6 h-6 text-blue-600" />
              <div className="text-right">
                <p className="font-semibold text-gray-900">حسابي الشخصي</p>
                <p className="text-sm text-gray-600">إدارة البيانات الشخصية</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <BookOpen className="w-6 h-6 text-green-600" />
              <div className="text-right">
                <p className="font-semibold text-gray-900">المحتوى التدريبي</p>
                <p className="text-sm text-gray-600">عرض الدروس والمواد</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
              <Calendar className="w-6 h-6 text-purple-600" />
              <div className="text-right">
                <p className="font-semibold text-gray-900">الجدول الزمني</p>
                <p className="text-sm text-gray-600">عرض الجدول</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button 
              onClick={() => router.push('/StudentPlatform/MyStats')}
              className="flex items-center space-x-3 p-4 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <BarChart3 className="w-6 h-6 text-orange-600" />
              <div className="text-right">
                <p className="font-semibold text-gray-900">إحصائياتي</p>
                <p className="text-sm text-gray-600">تتبع تقدمي وأدائي</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
