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
import { useGetTraineeProfileQuery } from "@/lip/features/trainee-auth/traineeAuthApi";


const StudentDashboard = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // استخدام API call بدلاً من static data
  const { 
    data: profileData, 
    isLoading, 
    error, 
    refetch 
  } = useGetTraineeProfileQuery();

  // التحقق من وجود البيانات الأساسية
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-red-600 text-lg">حدث خطأ في تحميل البيانات</p>
          <button
            onClick={() => refetch()}
            className="mt-4 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mx-auto"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  if (!profileData?.trainee) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <p className="text-gray-600 text-lg">لا توجد بيانات متاحة</p>
        </div>
      </div>
    );
  }

  const traineeData = profileData.trainee;

  // تحديث الوقت كل دقيقة
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // دالة تسجيل الخروج
  const handleLogout = () => {
    try {
      // حذف الـ token من الـ cookies
      Cookies.remove('token');
      Cookies.remove('refreshToken');
      
      // إرسال action لتسجيل الخروج
      dispatch(logout());
      
      // إظهار رسالة نجاح
      toast.success('تم تسجيل الخروج بنجاح');
      
      // التوجيه إلى صفحة تسجيل الدخول
      router.push('/login/student');
    } catch (error) {
      console.error('Error during logout:', error);
      toast.error('حدث خطأ أثناء تسجيل الخروج');
    }
  };

  // دالة تنسيق التاريخ
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('ar-EG');
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  // دالة تنسيق الوقت
  const formatTime = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleTimeString('ar-EG', {
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Error formatting time:', error);
      return '';
    }
  };

  // دالة الحصول على لون حالة الحضور
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PRESENT':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'ABSENT':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'LATE':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // دالة الحصول على نص حالة الحضور
  const getStatusText = (status: string) => {
    switch (status) {
      case 'PRESENT':
        return 'حاضر';
      case 'ABSENT':
        return 'غائب';
      case 'LATE':
        return 'متأخر';
      default:
        return 'غير محدد';
    }
  };

  // دالة الحصول على لون حالة الدفع
  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'PAID':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'OVERDUE':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // دالة الحصول على نص حالة الدفع
  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case 'PAID':
        return 'مدفوع';
      case 'PENDING':
        return 'معلق';
      case 'OVERDUE':
        return 'متأخر';
      default:
        return 'غير محدد';
    }
  };

  // حساب إجمالي الجلسات
  const totalSessions = traineeData.attendanceRecords?.length || 0;
  const presentSessions = traineeData.attendanceRecords?.filter(record => record.status === 'PRESENT').length || 0;
  const attendanceRate = totalSessions > 0 ? Math.round((presentSessions / totalSessions) * 100) : 0;

  // حساب المبلغ المعلق
  const pendingAmount = traineeData.traineePayments?.reduce((sum, payment) => {
    try {
      if (payment.status === 'PENDING' || payment.status === 'OVERDUE') {
        return sum + (payment.amount || 0);
      }
      return sum;
    } catch (error) {
      console.error('Error calculating pending amount:', error);
      return sum;
    }
  }, 0) || 0;

  return (
    <div className="p-6">
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
                <p className="text-sm text-gray-600">
                  {currentTime.toLocaleDateString('ar-EG', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p className="text-sm text-gray-500">
                  {currentTime.toLocaleTimeString('ar-EG')}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut size={20} />
                تسجيل الخروج
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">مرحباً {traineeData.nameAr}</h2>
              <p className="text-blue-100">
                {traineeData.program?.nameAr || 'برنامج غير محدد'} - 
                كود البرنامج: {traineeData.program?.code || 'غير محدد'}
              </p>
              <p className="text-blue-100 text-sm mt-1">
                1.5 من {traineeData.program?.duration || 0} أشهر
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{attendanceRate}%</div>
              <div className="text-blue-100">معدل الحضور</div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Attendance Stats */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-800">{presentSessions}</div>
                <div className="text-sm text-gray-600">من {totalSessions}</div>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">سجل الحضور</h3>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${attendanceRate}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">معدل الحضور: {attendanceRate}%</p>
          </div>

          {/* Program Progress */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <BookOpen className="text-blue-600" size={24} />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-800">25%</div>
                <div className="text-sm text-gray-600">مكتمل</div>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">تقدم البرنامج</h3>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full transition-all duration-300" style={{ width: '25%' }}></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">1.5 من 6 أشهر</p>
          </div>

          {/* Pending Payments */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <CreditCard className="text-yellow-600" size={24} />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-800">{pendingAmount.toLocaleString()}</div>
                <div className="text-sm text-gray-600">جنيه</div>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">المبالغ المعلقة</h3>
            <p className="text-sm text-gray-600">يجب سدادها قريباً</p>
          </div>

          {/* Documents Status */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <FileText className="text-purple-600" size={24} />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-800">{traineeData.documents?.length || 0}</div>
                <div className="text-sm text-gray-600">مستند</div>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">المستندات</h3>
            <p className="text-sm text-gray-600">تم رفعها</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Attendance */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Calendar className="text-blue-600" size={20} />
              سجل الحضور الأخير
            </h3>
            <div className="space-y-3">
              {traineeData.attendanceRecords?.slice(0, 3).map((record) => (
                <div key={record.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">{formatDate(record.date)}</p>
                    <p className="text-sm text-gray-600">{record.subject}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(record.status)}`}>
                    {getStatusText(record.status)}
                  </span>
                </div>
              )) || (
                <p className="text-gray-500 text-center py-4">لا توجد سجلات حضور</p>
              )}
            </div>
          </div>

          {/* Recent Payments */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <CreditCard className="text-green-600" size={20} />
              المدفوعات الأخيرة
            </h3>
            <div className="space-y-3">
              {traineeData.traineePayments?.slice(0, 3).map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">{payment.description}</p>
                    <p className="text-sm text-gray-600">{payment.amount.toLocaleString()} جنيه</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPaymentStatusColor(payment.status)}`}>
                    {getPaymentStatusText(payment.status)}
                  </span>
                </div>
              )) || (
                <p className="text-gray-500 text-center py-4">لا توجد مدفوعات</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;