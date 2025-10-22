"use client";

import { useState } from "react";
import { 
  Users, 
  Download, 
  Eye, 
  Edit, 
  Trash2,
  Plus,
  Calendar,
  MapPin,
  Clock,
  UserCheck,
  AlertCircle
} from "lucide-react";

// Mock data للبيانات
const mockDistributions = [
  {
    id: 1,
    name: "توزيع برنامج الذكاء الاصطناعي",
    program: "الذكاء الاصطناعي",
    instructor: "د. أحمد محمد",
    students: 25,
    maxStudents: 30,
    status: "active",
    startDate: "2024-01-15",
    endDate: "2024-07-15",
    location: "القاعة الرئيسية",
    schedule: "السبت - الثلاثاء 10:00-12:00"
  },
  {
    id: 2,
    name: "توزيع برنامج تطوير الويب",
    program: "تطوير الويب",
    instructor: "م. سارة أحمد",
    students: 20,
    maxStudents: 25,
    status: "active",
    startDate: "2024-02-01",
    endDate: "2024-08-01",
    location: "معمل الحاسوب",
    schedule: "الأحد - الأربعاء 14:00-16:00"
  },
  {
    id: 3,
    name: "توزيع برنامج البيانات",
    program: "علوم البيانات",
    instructor: "د. محمد علي",
    students: 15,
    maxStudents: 20,
    status: "completed",
    startDate: "2023-09-01",
    endDate: "2024-03-01",
    location: "القاعة الفرعية",
    schedule: "الاثنين - الخميس 09:00-11:00"
  }
];

const DistributionsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedDistribution, setSelectedDistribution] = useState(null);

  const filteredDistributions = mockDistributions.filter(distribution => {
    const matchesSearch = distribution.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         distribution.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         distribution.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || distribution.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "نشط";
      case "completed":
        return "مكتمل";
      case "pending":
        return "معلق";
      default:
        return "غير محدد";
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-600" />
              التوزيعات
            </h1>
            <p className="text-gray-600 mt-2">إدارة وعرض جميع التوزيعات التدريبية</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
            <Plus className="w-5 h-5" />
            إضافة توزيع جديد
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="البحث في التوزيعات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-4 pl-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="lg:w-64">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">جميع الحالات</option>
              <option value="active">نشط</option>
              <option value="completed">مكتمل</option>
              <option value="pending">معلق</option>
            </select>
          </div>

          {/* Export Button */}
          <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
            <Download className="w-5 h-5" />
            تصدير
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">إجمالي التوزيعات</p>
              <p className="text-2xl font-bold text-gray-900">{mockDistributions.length}</p>
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
              <p className="text-2xl font-bold text-green-600">
                {mockDistributions.filter(d => d.status === 'active').length}
              </p>
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
              <p className="text-2xl font-bold text-purple-600">
                {mockDistributions.reduce((sum, d) => sum + d.students, 0)}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Distributions Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">اسم التوزيع</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">البرنامج</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">المدرب</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">الطلاب</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">الحالة</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">التاريخ</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredDistributions.map((distribution) => (
                <tr key={distribution.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{distribution.name}</p>
                      <p className="text-sm text-gray-500">{distribution.location}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-900">{distribution.program}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-900">{distribution.instructor}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-900">{distribution.students}/{distribution.maxStudents}</span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${(distribution.students / distribution.maxStudents) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(distribution.status)}`}>
                      {getStatusText(distribution.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      <p>{distribution.startDate}</p>
                      <p className="text-gray-500">{distribution.schedule}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setSelectedDistribution(distribution)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="عرض التفاصيل"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="تعديل">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="حذف">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredDistributions.length === 0 && (
        <div className="text-center py-12">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد توزيعات</h3>
          <p className="text-gray-500">لم يتم العثور على توزيعات تطابق معايير البحث</p>
        </div>
      )}
    </div>
  );
};

export default DistributionsPage;