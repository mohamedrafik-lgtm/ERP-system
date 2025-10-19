"use client";

import { useState } from "react";
import { 
  Download, 
  FileText, 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Filter,
  Eye,
  Share,
  Print,
  Mail,
  Clock,
  CheckCircle
} from "lucide-react";

const StudentReports = () => {
  const [filterType, setFilterType] = useState("all");
  const [filterPeriod, setFilterPeriod] = useState("all");

  const reports = [
    {
      id: 1,
      title: "تقرير الحضور الشهري",
      type: "attendance",
      description: "تقرير شامل لحضورك وغيابك خلال الشهر",
      date: "2024-01-15",
      status: "ready",
      size: "2.3 MB",
      format: "PDF",
      downloadCount: 3,
      lastDownload: "2024-01-14"
    },
    {
      id: 2,
      title: "تقرير النتائج الأكاديمية",
      type: "academic",
      description: "تقرير مفصل لجميع نتائجك وتقييماتك",
      date: "2024-01-10",
      status: "ready",
      size: "1.8 MB",
      format: "PDF",
      downloadCount: 5,
      lastDownload: "2024-01-12"
    },
    {
      id: 3,
      title: "تقرير المدفوعات",
      type: "financial",
      description: "تقرير شامل لحالة مدفوعاتك ورسومك",
      date: "2024-01-08",
      status: "ready",
      size: "1.2 MB",
      format: "Excel",
      downloadCount: 2,
      lastDownload: "2024-01-09"
    },
    {
      id: 4,
      title: "تقرير التقدم الأكاديمي",
      type: "progress",
      description: "تقرير يوضح تقدمك في البرنامج التدريبي",
      date: "2024-01-05",
      status: "generating",
      size: null,
      format: "PDF",
      downloadCount: 0,
      lastDownload: null
    },
    {
      id: 5,
      title: "تقرير الشهادة",
      type: "certificate",
      description: "شهادة إتمام البرنامج التدريبي",
      date: "2024-01-01",
      status: "ready",
      size: "3.1 MB",
      format: "PDF",
      downloadCount: 1,
      lastDownload: "2024-01-02"
    }
  ];

  const filteredReports = reports.filter(report => {
    const matchesType = filterType === "all" || report.type === filterType;
    const matchesPeriod = filterPeriod === "all" || report.date.startsWith(filterPeriod);
    return matchesType && matchesPeriod;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'attendance':
        return 'text-blue-600 bg-blue-100';
      case 'academic':
        return 'text-green-600 bg-green-100';
      case 'financial':
        return 'text-yellow-600 bg-yellow-100';
      case 'progress':
        return 'text-purple-600 bg-purple-100';
      case 'certificate':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'attendance':
        return 'حضور';
      case 'academic':
        return 'أكاديمي';
      case 'financial':
        return 'مالي';
      case 'progress':
        return 'تقدم';
      case 'certificate':
        return 'شهادة';
      default:
        return 'تقرير';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready':
        return 'text-green-600 bg-green-100';
      case 'generating':
        return 'text-yellow-600 bg-yellow-100';
      case 'error':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ready':
        return 'جاهز';
      case 'generating':
        return 'قيد الإنشاء';
      case 'error':
        return 'خطأ';
      default:
        return 'غير محدد';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'generating':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatFileSize = (size: string | null) => {
    if (!size) return 'غير محدد';
    return size;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex" dir="rtl">
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">التقارير</h1>
            <p className="text-gray-600">تحميل وإدارة التقارير الخاصة بك</p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-2xl font-bold text-blue-600">
                  {reports.filter(r => r.status === 'ready').length}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">تقارير جاهزة</h3>
              <p className="text-gray-600 text-sm">يمكن تحميلها الآن</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <span className="text-2xl font-bold text-yellow-600">
                  {reports.filter(r => r.status === 'generating').length}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">قيد الإنشاء</h3>
              <p className="text-gray-600 text-sm">سيتم إشعارك عند الانتهاء</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Download className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-2xl font-bold text-green-600">
                  {reports.reduce((sum, r) => sum + r.downloadCount, 0)}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">إجمالي التحميلات</h3>
              <p className="text-gray-600 text-sm">عدد مرات التحميل</p>
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
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">جميع الأنواع</option>
                  <option value="attendance">حضور</option>
                  <option value="academic">أكاديمي</option>
                  <option value="financial">مالي</option>
                  <option value="progress">تقدم</option>
                  <option value="certificate">شهادة</option>
                </select>
                
                <select
                  value={filterPeriod}
                  onChange={(e) => setFilterPeriod(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">جميع الفترات</option>
                  <option value="2024-01">يناير 2024</option>
                  <option value="2024-02">فبراير 2024</option>
                  <option value="2024-03">مارس 2024</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                  <BarChart3 className="w-4 h-4" />
                  <span>إحصائيات</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                  <TrendingUp className="w-4 h-4" />
                  <span>تحليل</span>
                </button>
              </div>
            </div>
          </div>

          {/* Reports List */}
          <div className="space-y-6">
            {filteredReports.map((report) => (
              <div key={report.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{report.title}</h3>
                        <p className="text-gray-600">{report.description}</p>
                        <p className="text-sm text-gray-500">
                          {formatDate(report.date)} • {formatFileSize(report.size)} • {report.format}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-left">
                        <div className="flex items-center space-x-2 mb-2">
                          {getStatusIcon(report.status)}
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(report.status)}`}>
                            {getStatusText(report.status)}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(report.type)}`}>
                            {getTypeText(report.type)}
                          </span>
                        </div>
                        
                        <div className="text-sm text-gray-600">
                          <p>تحميلات: {report.downloadCount}</p>
                          {report.lastDownload && (
                            <p>آخر تحميل: {formatDate(report.lastDownload)}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {report.status === 'ready' && (
                          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            <Download className="w-4 h-4" />
                            <span>تحميل</span>
                          </button>
                        )}
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Share className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Print className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Mail className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {report.status === 'ready' && (
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-green-800 font-medium">جاهز للتحميل</span>
                      </div>
                      <p className="text-green-700 text-sm mt-1">
                        يمكنك تحميل هذا التقرير الآن. سيتم حفظه في مجلد التحميلات.
                      </p>
                    </div>
                  )}
                  
                  {report.status === 'generating' && (
                    <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-5 h-5 text-yellow-600" />
                        <span className="text-yellow-800 font-medium">قيد الإنشاء</span>
                      </div>
                      <p className="text-yellow-700 text-sm mt-1">
                        يتم إنشاء هذا التقرير حالياً. سيتم إشعارك عند الانتهاء.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredReports.length === 0 && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد تقارير</h3>
              <p className="text-gray-600">لم يتم العثور على تقارير تطابق معايير البحث</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentReports;
