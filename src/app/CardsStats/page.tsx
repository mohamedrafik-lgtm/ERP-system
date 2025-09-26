"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import PageHeader from "@/app/components/PageHeader";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  CreditCard,
  Printer,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Eye,
  FileText,
  PieChart,
  Activity,
} from "lucide-react";

export default function CardsStatsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedProgram, setSelectedProgram] = useState("all");

  // Mock data for statistics
  const stats = {
    totalCards: 1247,
    activeCards: 892,
    expiredCards: 234,
    pendingCards: 121,
    printedThisMonth: 156,
    printedThisWeek: 42,
    printedToday: 8,
    averagePrintTime: 2.5,
  };

  const monthlyStats = [
    { month: "يناير", printed: 120, active: 850, expired: 45 },
    { month: "فبراير", printed: 135, active: 870, expired: 38 },
    { month: "مارس", printed: 142, active: 885, expired: 42 },
    { month: "أبريل", printed: 156, active: 892, expired: 35 },
    { month: "مايو", printed: 168, active: 910, expired: 28 },
    { month: "يونيو", printed: 175, active: 925, expired: 32 },
  ];

  const programStats = [
    { program: "Frontend Development", total: 320, active: 280, printed: 45 },
    { program: "Backend Development", total: 280, active: 250, printed: 38 },
    { program: "Full Stack Development", total: 250, active: 220, printed: 42 },
    { program: "Mobile Development", total: 200, active: 180, printed: 28 },
    { program: "DevOps", total: 150, active: 130, printed: 20 },
    { program: "Data Science", total: 120, active: 100, printed: 15 },
  ];

  const recentActivity = [
    {
      id: 1,
      action: "طباعة كرنيه",
      trainee: "أحمد محمد علي",
      program: "Frontend Development",
      time: "منذ 5 دقائق",
      status: "success",
    },
    {
      id: 2,
      action: "إنشاء كرنيه جديد",
      trainee: "فاطمة أحمد حسن",
      program: "Backend Development",
      time: "منذ 15 دقيقة",
      status: "success",
    },
    {
      id: 3,
      action: "تحديث كرنيه",
      trainee: "محمد سعد الدين",
      program: "Full Stack Development",
      time: "منذ 30 دقيقة",
      status: "warning",
    },
    {
      id: 4,
      action: "انتهاء صلاحية كرنيه",
      trainee: "سارة أحمد محمد",
      program: "Mobile Development",
      time: "منذ ساعة",
      status: "error",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <PageHeader
        title="إحصائيات الكرنيهات"
        description="إحصائيات وتحليلات شاملة لكرنيهات المتدربين"
        breadcrumbs={[
          { label: 'لوحة التحكم', href: '/' },
          { label: 'إدارة الكرنيهات', href: '/CardsManagement' },
          { label: 'إحصائيات الكرنيهات', href: '/CardsStats' },
        ]}
        actions={
          <div className="flex items-center gap-3">
            <Button variant="outline" className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              تحديث
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              تصدير التقرير
            </Button>
          </div>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Section */}
        <Card className="bg-white/95 backdrop-blur-md border-white/50 shadow-2xl mb-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <Filter className="w-6 h-6 text-gray-600" />
                <span className="font-semibold text-gray-900">فلترة البيانات:</span>
              </div>
              
              <div className="flex items-center gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">الفترة الزمنية</label>
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="today">اليوم</option>
                    <option value="week">هذا الأسبوع</option>
                    <option value="month">هذا الشهر</option>
                    <option value="quarter">هذا الربع</option>
                    <option value="year">هذا العام</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">البرنامج</label>
                  <select
                    value={selectedProgram}
                    onChange={(e) => setSelectedProgram(e.target.value)}
                    className="py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">جميع البرامج</option>
                    <option value="frontend">Frontend Development</option>
                    <option value="backend">Backend Development</option>
                    <option value="fullstack">Full Stack Development</option>
                    <option value="mobile">Mobile Development</option>
                    <option value="devops">DevOps</option>
                    <option value="datascience">Data Science</option>
                  </select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/90 backdrop-blur-sm border-white/50 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">إجمالي الكرنيهات</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalCards.toLocaleString()}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+12% من الشهر الماضي</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-white/50 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">الكرنيهات النشطة</p>
                  <p className="text-3xl font-bold text-green-600">{stats.activeCards.toLocaleString()}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+8% من الشهر الماضي</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-white/50 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">مطبوعة هذا الشهر</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.printedThisMonth.toLocaleString()}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">+15% من الشهر الماضي</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Printer className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-white/50 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-1">متوسط وقت الطباعة</p>
                  <p className="text-3xl font-bold text-purple-600">{stats.averagePrintTime} دقيقة</p>
                  <div className="flex items-center mt-2">
                    <TrendingDown className="w-4 h-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-600">-0.5 دقيقة من الشهر الماضي</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Trends Chart */}
          <Card className="bg-white/95 backdrop-blur-md border-white/50 shadow-2xl">
            <CardHeader className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">الاتجاهات الشهرية</h3>
                  <p className="text-gray-600">إحصائيات الكرنيهات خلال الأشهر الماضية</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="space-y-4">
                {monthlyStats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{stat.month}</p>
                        <p className="text-sm text-gray-600">2024</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-lg font-bold text-blue-600">{stat.printed}</p>
                        <p className="text-xs text-gray-500">مطبوعة</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-green-600">{stat.active}</p>
                        <p className="text-xs text-gray-500">نشطة</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-red-600">{stat.expired}</p>
                        <p className="text-xs text-gray-500">منتهية</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Program Statistics */}
          <Card className="bg-white/95 backdrop-blur-md border-white/50 shadow-2xl">
            <CardHeader className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <PieChart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">إحصائيات البرامج</h3>
                  <p className="text-gray-600">توزيع الكرنيهات حسب البرامج التدريبية</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="space-y-4">
                {programStats.map((program, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">{program.program}</h4>
                      <span className="text-sm text-gray-500">إجمالي: {program.total}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-lg font-bold text-green-600">{program.active}</p>
                        <p className="text-xs text-gray-500">نشطة</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-blue-600">{program.printed}</p>
                        <p className="text-xs text-gray-500">مطبوعة</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-gray-600">{program.total - program.active}</p>
                        <p className="text-xs text-gray-500">غير نشطة</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="bg-white/95 backdrop-blur-md border-white/50 shadow-2xl">
          <CardHeader className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">النشاط الأخير</h3>
                <p className="text-gray-600">آخر العمليات على الكرنيهات</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.status === 'success' ? 'bg-green-100' :
                      activity.status === 'warning' ? 'bg-orange-100' : 'bg-red-100'
                    }`}>
                      {activity.status === 'success' ? (
                        <Printer className="w-5 h-5 text-green-600" />
                      ) : activity.status === 'warning' ? (
                        <FileText className="w-5 h-5 text-orange-600" />
                      ) : (
                        <CreditCard className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.trainee} - {activity.program}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{activity.time}</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      activity.status === 'success' ? 'bg-green-100 text-green-800' :
                      activity.status === 'warning' ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {activity.status === 'success' ? 'نجح' :
                       activity.status === 'warning' ? 'تحذير' : 'خطأ'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
