"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Plus,
  BarChart3,
  Users,
  Building2,
  Calendar,
  BookOpen,
  GraduationCap,
  ArrowLeft,
  ArrowRight,
  Settings,
  Eye,
  Edit,
  Trash2,
  RefreshCw,
  Filter,
  Search,
  Download,
  Upload,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp
} from "lucide-react";

const DistributionManagementPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'create' | 'manage'>('overview');

  // Mock data for demonstration
  const recentDistributions = [
    {
      id: "dist-1",
      programName: "تطوير الويب",
      type: "THEORY",
      rooms: 3,
      trainees: 45,
      date: "2024-01-15",
      status: "completed"
    },
    {
      id: "dist-2", 
      programName: "الذكاء الاصطناعي",
      type: "PRACTICAL",
      rooms: 2,
      trainees: 30,
      date: "2024-01-14",
      status: "in-progress"
    },
    {
      id: "dist-3",
      programName: "أمن المعلومات", 
      type: "THEORY",
      rooms: 4,
      trainees: 60,
      date: "2024-01-13",
      status: "completed"
    }
  ];

  const quickStats = [
    {
      title: "إجمالي التوزيعات",
      value: "12",
      change: "+2 هذا الشهر",
      icon: BarChart3,
      color: "blue"
    },
    {
      title: "المتدربون الموزعون",
      value: "485",
      change: "+45 هذا الأسبوع",
      icon: Users,
      color: "green"
    },
    {
      title: "القاعات المستخدمة",
      value: "28",
      change: "+3 هذا الشهر",
      icon: Building2,
      color: "purple"
    },
    {
      title: "البرامج النشطة",
      value: "8",
      change: "مستقر",
      icon: BookOpen,
      color: "orange"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'مكتمل';
      case 'in-progress':
        return 'قيد التنفيذ';
      case 'pending':
        return 'معلق';
      default:
        return 'غير محدد';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'THEORY' ? (
      <BookOpen className="w-4 h-4" />
    ) : (
      <GraduationCap className="w-4 h-4" />
    );
  };

  const getTypeColor = (type: string) => {
    return type === 'THEORY' 
      ? 'bg-blue-100 text-blue-700' 
      : 'bg-purple-100 text-purple-700';
  };

  const getTypeLabel = (type: string) => {
    return type === 'THEORY' ? 'نظري' : 'عملي';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">إدارة التوزيع</h1>
            <p className="text-gray-600">إدارة توزيع الطلاب على القاعات والبرامج التدريبية</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/DistributionManagement/create')}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              إنشاء توزيع جديد
            </button>
            <button
              onClick={() => router.push('/DistributionStatistics')}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <BarChart3 className="w-4 h-4" />
              عرض الإحصائيات
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${
                  stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                  stat.color === 'green' ? 'bg-green-100 text-green-600' :
                  stat.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                  'bg-orange-100 text-orange-600'
                }`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600">{stat.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Distributions */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">التوزيعات الأخيرة</h2>
              <button
                onClick={() => router.push('/DistributionStatistics')}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
              >
                <span className="text-sm">عرض الكل</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              {recentDistributions.map((distribution) => (
                <div key={distribution.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${getTypeColor(distribution.type)}`}>
                      {getTypeIcon(distribution.type)}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{distribution.programName}</h3>
                      <p className="text-sm text-gray-600">
                        {getTypeLabel(distribution.type)} • {distribution.rooms} قاعات • {distribution.trainees} متدرب
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(distribution.status)}`}>
                      {getStatusLabel(distribution.status)}
                    </span>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">الإجراءات السريعة</h3>
              <div className="space-y-3">
                <button
                  onClick={() => router.push('/DistributionManagement/create')}
                  className="w-full flex items-center gap-3 p-3 text-right border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Plus className="w-5 h-5 text-blue-600" />
                  <span>إنشاء توزيع جديد</span>
                </button>
                <button
                  onClick={() => router.push('/DistributionReports')}
                  className="w-full flex items-center gap-3 p-3 text-right border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Users className="w-5 h-5 text-green-600" />
                  <span>طلاب غير موزعين</span>
                </button>
                <button
                  onClick={() => router.push('/DistributionStatistics')}
                  className="w-full flex items-center gap-3 p-3 text-right border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  <span>تقارير التوزيع</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-right border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download className="w-5 h-5 text-orange-600" />
                  <span>تصدير البيانات</span>
                </button>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">حالة النظام</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-700">خادم قاعدة البيانات</span>
                  </div>
                  <span className="text-sm text-green-600 font-medium">متصل</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-700">خدمة التوزيع</span>
                  </div>
                  <span className="text-sm text-green-600 font-medium">نشط</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-yellow-600" />
                    <span className="text-sm text-gray-700">آخر تحديث</span>
                  </div>
                  <span className="text-sm text-gray-600">منذ 5 دقائق</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">النشاط الأخير</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">تم إنشاء توزيع جديد لبرنامج "تطوير الويب"</p>
                <p className="text-xs text-gray-500">منذ ساعتين • 3 قاعات • 45 متدرب</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">تم توزيع 30 متدرب على القاعات العملية</p>
                <p className="text-xs text-gray-500">منذ 4 ساعات • برنامج الذكاء الاصطناعي</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart3 className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">تم تحديث إحصائيات التوزيع</p>
                <p className="text-xs text-gray-500">منذ 6 ساعات • 12 توزيع نشط</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistributionManagementPage;