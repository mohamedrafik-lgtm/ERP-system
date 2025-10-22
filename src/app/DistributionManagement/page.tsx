"use client";

import { useState } from "react";
import { 
  Users, 
  UserCheck, 
  UserX, 
  Plus, 
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2
} from "lucide-react";

const DistributionManagementPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data
  const stats = {
    totalDistributions: 15,
    activeDistributions: 8,
    totalStudents: 245,
    unassignedStudents: 23
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <UserCheck className="w-8 h-8 text-blue-600" />
              إدارة التوزيع
            </h1>
            <p className="text-gray-600 mt-2">إدارة وتنظيم توزيع المتدربين على البرامج التدريبية</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
            <Plus className="w-5 h-5" />
            إضافة توزيع جديد
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">إجمالي التوزيعات</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalDistributions}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">التوزيعات النشطة</p>
              <p className="text-2xl font-bold text-green-600">{stats.activeDistributions}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">إجمالي الطلاب</p>
              <p className="text-2xl font-bold text-purple-600">{stats.totalStudents}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">طلاب غير موزعين</p>
              <p className="text-2xl font-bold text-red-600">{stats.unassignedStudents}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <UserX className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "overview"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              نظرة عامة
            </button>
            <button
              onClick={() => setActiveTab("distributions")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "distributions"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              التوزيعات
            </button>
            <button
              onClick={() => setActiveTab("unassigned")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "unassigned"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              طلاب غير موزعين
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "overview" && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">نظرة عامة على التوزيعات</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">التوزيعات النشطة</h4>
                  <p className="text-sm text-gray-600 mb-4">عدد التوزيعات التي تعمل حالياً</p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">برنامج الذكاء الاصطناعي</span>
                      <span className="text-sm font-medium text-gray-900">25 طالب</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">برنامج تطوير الويب</span>
                      <span className="text-sm font-medium text-gray-900">30 طالب</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">برنامج علوم البيانات</span>
                      <span className="text-sm font-medium text-gray-900">20 طالب</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">الطلاب غير الموزعين</h4>
                  <p className="text-sm text-gray-600 mb-4">الطلاب الذين لم يتم توزيعهم بعد</p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">في الانتظار</span>
                      <span className="text-sm font-medium text-yellow-600">12 طالب</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">جدد</span>
                      <span className="text-sm font-medium text-green-600">8 طلاب</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">عاجل</span>
                      <span className="text-sm font-medium text-red-600">3 طلاب</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "distributions" && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">جميع التوزيعات</h3>
              <p className="text-gray-600">قائمة بجميع التوزيعات النشطة والمكتملة</p>
            </div>
          )}

          {activeTab === "unassigned" && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">الطلاب غير الموزعين</h3>
              <p className="text-gray-600">قائمة بالطلاب الذين لم يتم توزيعهم على أي برنامج</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">إجراءات سريعة</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Plus className="w-5 h-5 text-blue-600" />
            <div className="text-right">
              <p className="font-medium text-gray-900">إضافة توزيع جديد</p>
              <p className="text-sm text-gray-500">إنشاء توزيع جديد للطلاب</p>
            </div>
          </button>

          <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <UserCheck className="w-5 h-5 text-green-600" />
            <div className="text-right">
              <p className="font-medium text-gray-900">توزيع طلاب</p>
              <p className="text-sm text-gray-500">توزيع الطلاب على البرامج</p>
            </div>
          </button>

          <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Download className="w-5 h-5 text-purple-600" />
            <div className="text-right">
              <p className="font-medium text-gray-900">تصدير التقارير</p>
              <p className="text-sm text-gray-500">تحميل تقارير التوزيعات</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DistributionManagementPage;

