"use client";

import { useState } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  Award, 
  Clock, 
  CheckCircle, 
  XCircle,
  Star,
  Download,
  Eye,
  Filter,
  Calendar
} from "lucide-react";

const StudentAssessments = () => {
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const assessments = [
    {
      id: 1,
      title: "امتحان أساسيات البرمجة",
      type: "exam",
      subject: "أساسيات البرمجة",
      date: "2024-01-15",
      duration: "90 دقيقة",
      status: "completed",
      score: 85,
      maxScore: 100,
      grade: "ممتاز",
      instructor: "أستاذ أحمد محمد",
      notes: "أداء ممتاز في جميع الأسئلة"
    },
    {
      id: 2,
      title: "واجب البرمجة الكائنية",
      type: "assignment",
      subject: "البرمجة الكائنية",
      date: "2024-01-12",
      duration: "7 أيام",
      status: "completed",
      score: 92,
      maxScore: 100,
      grade: "ممتاز",
      instructor: "أستاذة فاطمة علي",
      notes: "تنفيذ ممتاز للمتطلبات"
    },
    {
      id: 3,
      title: "مشروع قواعد البيانات",
      type: "project",
      subject: "قواعد البيانات",
      date: "2024-01-20",
      duration: "14 يوم",
      status: "pending",
      score: null,
      maxScore: 100,
      grade: null,
      instructor: "أستاذ محمد حسن",
      notes: "لم يتم التقييم بعد"
    },
    {
      id: 4,
      title: "اختبار قصير - SQL",
      type: "quiz",
      subject: "قواعد البيانات",
      date: "2024-01-18",
      duration: "30 دقيقة",
      status: "upcoming",
      score: null,
      maxScore: 50,
      grade: null,
      instructor: "أستاذ محمد حسن",
      notes: "مقرر يوم 18 يناير"
    },
    {
      id: 5,
      title: "امتحان منتصف الفصل",
      type: "exam",
      subject: "جميع المواد",
      date: "2024-01-25",
      duration: "120 دقيقة",
      status: "upcoming",
      score: null,
      maxScore: 200,
      grade: null,
      instructor: "جميع الأساتذة",
      notes: "امتحان شامل لجميع المواد"
    }
  ];

  const filteredAssessments = assessments.filter(assessment => {
    const matchesType = filterType === "all" || assessment.type === filterType;
    const matchesStatus = filterStatus === "all" || assessment.status === filterStatus;
    return matchesType && matchesStatus;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'exam':
        return 'text-red-600 bg-red-100';
      case 'assignment':
        return 'text-blue-600 bg-blue-100';
      case 'project':
        return 'text-green-600 bg-green-100';
      case 'quiz':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'exam':
        return 'امتحان';
      case 'assignment':
        return 'واجب';
      case 'project':
        return 'مشروع';
      case 'quiz':
        return 'اختبار قصير';
      default:
        return 'تقييم';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'upcoming':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'مكتمل';
      case 'pending':
        return 'قيد التقييم';
      case 'upcoming':
        return 'قادم';
      default:
        return 'غير محدد';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'upcoming':
        return <Calendar className="w-5 h-5 text-blue-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'ممتاز':
        return 'text-green-600 bg-green-100';
      case 'جيد جداً':
        return 'text-blue-600 bg-blue-100';
      case 'جيد':
        return 'text-yellow-600 bg-yellow-100';
      case 'مقبول':
        return 'text-orange-600 bg-orange-100';
      case 'ضعيف':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Calculate statistics
  const completedAssessments = assessments.filter(a => a.status === 'completed');
  const totalScore = completedAssessments.reduce((sum, a) => sum + (a.score || 0), 0);
  const totalMaxScore = completedAssessments.reduce((sum, a) => sum + (a.maxScore || 0), 0);
  const averageScore = totalMaxScore > 0 ? Math.round((totalScore / totalMaxScore) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex" dir="rtl">
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">التقييمات</h1>
            <p className="text-gray-600">متابعة نتائجك وتقييماتك</p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-2xl font-bold text-blue-600">{averageScore}%</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">المعدل العام</h3>
              <p className="text-gray-600 text-sm">متوسط النتائج</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-2xl font-bold text-green-600">{completedAssessments.length}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">مكتمل</h3>
              <p className="text-gray-600 text-sm">عدد التقييمات المكتملة</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <span className="text-2xl font-bold text-yellow-600">
                  {assessments.filter(a => a.status === 'upcoming').length}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">قادم</h3>
              <p className="text-gray-600 text-sm">التقييمات القادمة</p>
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
                  <option value="exam">امتحانات</option>
                  <option value="assignment">واجبات</option>
                  <option value="project">مشاريع</option>
                  <option value="quiz">اختبارات قصيرة</option>
                </select>
                
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">جميع الحالات</option>
                  <option value="completed">مكتمل</option>
                  <option value="pending">قيد التقييم</option>
                  <option value="upcoming">قادم</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>تصدير</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                  <BarChart3 className="w-4 h-4" />
                  <span>إحصائيات</span>
                </button>
              </div>
            </div>
          </div>

          {/* Assessments List */}
          <div className="space-y-6">
            {filteredAssessments.map((assessment) => (
              <div key={assessment.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{assessment.title}</h3>
                        <p className="text-gray-600">{assessment.subject}</p>
                        <p className="text-sm text-gray-500">
                          {formatDate(assessment.date)} • {assessment.duration} • {assessment.instructor}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-left">
                        <div className="flex items-center space-x-2 mb-2">
                          {getStatusIcon(assessment.status)}
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(assessment.status)}`}>
                            {getStatusText(assessment.status)}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(assessment.type)}`}>
                            {getTypeText(assessment.type)}
                          </span>
                        </div>
                        
                        {assessment.status === 'completed' && assessment.score !== null && (
                          <div className="flex items-center space-x-4">
                            <div className="text-2xl font-bold text-blue-600">
                              {assessment.score}/{assessment.maxScore}
                            </div>
                            <div className="text-left">
                              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(assessment.grade || '')}`}>
                                {assessment.grade}
                              </div>
                              <div className="text-sm text-gray-600">
                                {Math.round((assessment.score / assessment.maxScore) * 100)}%
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Eye className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Download className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{assessment.notes}</p>
                  
                  {assessment.status === 'completed' && (
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-green-800 font-medium">تم التقييم</span>
                      </div>
                      <p className="text-green-700 text-sm mt-1">
                        تم تقييم هذا التقييم بنجاح. يمكنك مراجعة النتائج التفصيلية.
                      </p>
                    </div>
                  )}
                  
                  {assessment.status === 'pending' && (
                    <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-5 h-5 text-yellow-600" />
                        <span className="text-yellow-800 font-medium">قيد التقييم</span>
                      </div>
                      <p className="text-yellow-700 text-sm mt-1">
                        يتم تقييم هذا التقييم حالياً. ستظهر النتائج قريباً.
                      </p>
                    </div>
                  )}
                  
                  {assessment.status === 'upcoming' && (
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <span className="text-blue-800 font-medium">قادم</span>
                      </div>
                      <p className="text-blue-700 text-sm mt-1">
                        هذا التقييم مقرر في {formatDate(assessment.date)}. تأكد من الاستعداد.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredAssessments.length === 0 && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
              <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد تقييمات</h3>
              <p className="text-gray-600">لم يتم العثور على تقييمات تطابق معايير البحث</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentAssessments;
