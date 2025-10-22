
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/lip/features/auth/authSlice";
import { 
  UserGroupIcon, 
  AcademicCapIcon, 
  CurrencyDollarIcon, 
  ChartBarIcon,
  PlusIcon,
  BookOpenIcon,
  UserPlusIcon,
  DocumentTextIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  SunIcon
} from "@heroicons/react/24/outline";
import { ChartCard, NotificationCard, WeatherCard, AnalyticsCard, CalendarCard } from "@/components/dashboard";

// بيانات إحصائيات حقيقية
const dashboardStats = [
  {
    title: "إجمالي المتدربين",
    value: "1,247",
    change: "+12%",
    changeType: "positive",
    icon: UserGroupIcon,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600"
  },
  {
    title: "البرامج النشطة",
    value: "24",
    change: "+3",
    changeType: "positive",
    icon: AcademicCapIcon,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    textColor: "text-green-600"
  },
  {
    title: "الإيرادات الشهرية",
    value: "₪ 125,400",
    change: "+8.2%",
    changeType: "positive",
    icon: CurrencyDollarIcon,
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-600"
  },
  {
    title: "معدل الإنجاز",
    value: "87%",
    change: "+2.1%",
    changeType: "positive",
    icon: ChartBarIcon,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    textColor: "text-purple-600"
  }
];

// بيانات الأنشطة الحديثة
const recentActivities = [
  {
    id: 1,
    type: "enrollment",
    title: "تسجيل متدرب جديد",
    description: "أحمد محمد سعد - برنامج الذكاء الاصطناعي",
    time: "منذ 5 دقائق",
    icon: UserPlusIcon,
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    id: 2,
    type: "payment",
    title: "دفع رسوم",
    description: "سارة أحمد - مبلغ ₪ 2,400",
    time: "منذ 15 دقيقة",
    icon: CurrencyDollarIcon,
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  {
    id: 3,
    type: "completion",
    title: "إكمال برنامج",
    description: "محمد علي - برنامج تطوير الويب",
    time: "منذ ساعة",
    icon: CheckCircleIcon,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100"
  },
  {
    id: 4,
    type: "warning",
    title: "تأخير في الدفع",
    description: "فاطمة حسن - برنامج البيانات",
    time: "منذ ساعتين",
    icon: ExclamationTriangleIcon,
    color: "text-orange-600",
    bgColor: "bg-orange-100"
  }
];

// إجراءات سريعة
const quickActions = [
  {
    title: "إضافة متدرب جديد",
    description: "تسجيل متدرب في النظام",
    icon: UserPlusIcon,
    href: "/AddStudent",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600"
  },
  {
    title: "إدارة حسابات المتدربين",
    description: "عرض وإدارة حسابات المتدربين",
    icon: UserGroupIcon,
    href: "/AccountManagement",
    color: "from-indigo-500 to-indigo-600",
    bgColor: "bg-indigo-50",
    textColor: "text-indigo-600"
  },
  {
    title: "إحصائيات المنصة",
    description: "عرض إحصائيات شاملة للمنصة",
    icon: ChartBarIcon,
    href: "/PlatformStatistics",
    color: "from-cyan-500 to-cyan-600",
    bgColor: "bg-cyan-50",
    textColor: "text-cyan-600"
  },
  {
    title: "إدارة البرامج",
    description: "إضافة أو تعديل البرامج",
    icon: BookOpenIcon,
    href: "/TrainingContentManagement",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    textColor: "text-green-600"
  },
  {
    title: "المدفوعات",
    description: "إدارة مدفوعات المتدربين",
    icon: CurrencyDollarIcon,
    href: "/TraineePayments",
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-50",
    textColor: "text-emerald-600"
  },
  {
    title: "التقارير",
    description: "عرض التقارير المالية",
    icon: DocumentTextIcon,
    href: "/FinancialStatements",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    textColor: "text-purple-600"
  }
];

// بيانات الإشعارات
const notifications = [
  {
    id: 1,
    type: 'success' as const,
    title: 'تم إكمال الدفع',
    message: 'سارة أحمد أكملت دفع رسوم البرنامج',
    time: 'منذ 10 دقائق',
    isRead: false
  },
  {
    id: 2,
    type: 'warning' as const,
    title: 'تأخير في الدفع',
    message: '3 متدربين متأخرين في دفع الرسوم',
    time: 'منذ ساعة',
    isRead: false
  },
  {
    id: 3,
    type: 'info' as const,
    title: 'جلسة جديدة',
    message: 'جلسة تدريبية جديدة غداً في الساعة 10 صباحاً',
    time: 'منذ ساعتين',
    isRead: true
  }
];

// بيانات الرسوم البيانية
const chartData = {
  enrollment: {
    title: "تسجيل المتدربين",
    data: [45, 52, 38, 67, 89, 95],
    labels: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو"]
  },
  revenue: {
    title: "الإيرادات الشهرية",
    data: [12000, 15000, 18000, 22000, 25000, 28000],
    labels: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو"]
  }
};

// بيانات التقويم
const calendarEvents = [
  {
    id: 1,
    title: "جلسة تدريبية - الذكاء الاصطناعي",
    time: "10:00 - 12:00",
    location: "القاعة الرئيسية",
    attendees: 25,
    type: "training" as const
  },
  {
    id: 2,
    title: "اجتماع إدارة",
    time: "14:00 - 15:00",
    location: "قاعة الاجتماعات",
    attendees: 8,
    type: "meeting" as const
  },
  {
    id: 3,
    title: "امتحان نهائي - تطوير الويب",
    time: "16:00 - 18:00",
    location: "معمل الحاسوب",
    attendees: 30,
    type: "exam" as const
  }
];

// بيانات التحليلات
const analyticsData = [
  {
    label: "معدل الحضور",
    value: 87,
    change: 5.2,
    changeType: "positive" as const,
    trend: "up" as const
  },
  {
    label: "معدل الإنجاز",
    value: 92,
    change: 3.1,
    changeType: "positive" as const,
    trend: "up" as const
  },
  {
    label: "معدل الرضا",
    value: 94,
    change: 1.8,
    changeType: "positive" as const,
    trend: "up" as const
  }
];

// مكون البطاقة الإحصائية
const StatCard = ({ stat }: { stat: typeof dashboardStats[0] }) => {
  const Icon = stat.icon;
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
          <div className="flex items-center">
            {stat.changeType === "positive" ? (
              <ArrowTrendingUpIcon className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <ArrowTrendingDownIcon className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm font-medium ${
              stat.changeType === "positive" ? "text-green-600" : "text-red-600"
            }`}>
              {stat.change}
            </span>
            <span className="text-sm text-gray-500 mr-2">من الشهر الماضي</span>
          </div>
        </div>
        <div className={`p-3 rounded-xl ${stat.bgColor}`}>
          <Icon className={`w-8 h-8 ${stat.textColor}`} />
        </div>
      </div>
    </div>
  );
};

// مكون النشاط
const ActivityItem = ({ activity }: { activity: typeof recentActivities[0] }) => {
  const Icon = activity.icon;
  return (
    <div className="flex items-start space-x-3 p-4 hover:bg-gray-50 rounded-lg transition-colors">
      <div className={`p-2 rounded-lg ${activity.bgColor}`}>
        <Icon className={`w-5 h-5 ${activity.color}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
        <p className="text-sm text-gray-600">{activity.description}</p>
        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
      </div>
    </div>
  );
};

// مكون الإجراء السريع
const QuickActionCard = ({ action }: { action: typeof quickActions[0] }) => {
  const Icon = action.icon;
  return (
    <Link href={action.href} className="group">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300 group-hover:scale-105">
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-lg ${action.bgColor} group-hover:scale-110 transition-transform`}>
            <Icon className={`w-6 h-6 ${action.textColor}`} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {action.title}
            </h3>
            <p className="text-sm text-gray-600">{action.description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default function Home() {
  const currentUser = useSelector(selectCurrentUser);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // توجيه الطالب إلى صفحته الخاصة
  useEffect(() => {
    if (currentUser?.role === 'trainee') {
      // توجيه الطالب إلى صفحة منصة الطالب
      window.location.href = '/StudentPlatform';
    }
  }, [currentUser]);

  if (currentUser?.role === 'trainee') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">جاري التوجيه...</h3>
          <p className="text-gray-600">سيتم توجيهك إلى صفحتك الشخصية</p>
        </div>
      </div>
    );
  }

  const formatTime = (date: Date) => {
    return date.toLocaleString('ar-SA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                مرحباً، {currentUser?.name || "المدير"}
              </h1>
              <p className="text-gray-600 mt-2">
                إليك نظرة عامة على أداء أكاديميتك
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">التاريخ والوقت</p>
              <p className="text-lg font-semibold text-gray-900">
                {formatTime(currentTime)}
              </p>
            </div>
          </div>
        </div>

        {/* الإحصائيات الرئيسية */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* الإجراءات السريعة */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-bold text-gray-900 mb-6">الإجراءات السريعة</h2>
            <div className="space-y-4">
              {quickActions.map((action, index) => (
                <QuickActionCard key={index} action={action} />
              ))}
            </div>
          </div>

          {/* الأنشطة الحديثة */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">الأنشطة الحديثة</h2>
                  <Link 
                    href="/AllStudent" 
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    عرض الكل
                  </Link>
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {recentActivities.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* الرسوم البيانية والإشعارات */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* الرسوم البيانية */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <ChartCard 
              title={chartData.enrollment.title}
              data={chartData.enrollment.data}
              labels={chartData.enrollment.labels}
              color="text-blue-600"
              bgColor="bg-blue-50"
              textColor="text-blue-600"
            />
            <ChartCard 
              title={chartData.revenue.title}
              data={chartData.revenue.data}
              labels={chartData.revenue.labels}
              color="text-green-600"
              bgColor="bg-green-50"
              textColor="text-green-600"
            />
          </div>

          {/* الإشعارات والطقس */}
          <div className="space-y-6">
            <NotificationCard 
              notifications={notifications}
              onMarkAsRead={(id) => console.log('Mark as read:', id)}
              onDismiss={(id) => console.log('Dismiss:', id)}
            />
            <WeatherCard 
              temperature={28}
              condition="مشمس"
              humidity={45}
              windSpeed={12}
              icon={SunIcon}
            />
            <CalendarCard events={calendarEvents} />
          </div>
        </div>

        {/* التحليلات المتقدمة */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">التحليلات المتقدمة</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnalyticsCard 
              title="مؤشرات الأداء الرئيسية"
              data={analyticsData}
              color="text-blue-600"
              bgColor="bg-blue-50"
            />
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">ملخص الأداء</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">الجلسات النشطة</span>
                  <span className="font-bold text-blue-600">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">المهام المكتملة</span>
                  <span className="font-bold text-green-600">48</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">معدل الرضا</span>
                  <span className="font-bold text-purple-600">94%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">المتدربين النشطين</span>
                  <span className="font-bold text-orange-600">1,247</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
