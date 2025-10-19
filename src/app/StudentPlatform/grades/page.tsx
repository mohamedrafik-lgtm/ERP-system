"use client";

import { useState, useMemo } from "react";
import { useGetMyGradesQuery } from "@/lip/features/trainee-auth/traineeAuthApi";
import {
  Award,
  TrendingUp,
  TrendingDown,
  Target,
  BookOpen,
  BarChart3,
  Download,
  Eye,
  Filter,
  RefreshCw,
  Calculator,
  Star,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react";

const StudentGrades = () => {
  const { data: gradesData, isLoading, error, refetch } = useGetMyGradesQuery();
  const [filterClassroom, setFilterClassroom] = useState("all");
  const [expandedClassroom, setExpandedClassroom] = useState<string | null>(null);
  const [expandedContent, setExpandedContent] = useState<string | null>(null);

  // Filter and process data
  const filteredData = useMemo(() => {
    if (!gradesData) return null;

    let filteredClassrooms = gradesData.classrooms;
    
    if (filterClassroom !== "all") {
      filteredClassrooms = gradesData.classrooms.filter(
        (classroom) => classroom.classroom.id.toString() === filterClassroom
      );
    }

    return {
      ...gradesData,
      classrooms: filteredClassrooms,
    };
  }, [gradesData, filterClassroom]);

  // Grade color helper
  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600 bg-green-50";
    if (percentage >= 80) return "text-blue-600 bg-blue-50";
    if (percentage >= 70) return "text-yellow-600 bg-yellow-50";
    if (percentage >= 60) return "text-orange-600 bg-orange-50";
    return "text-red-600 bg-red-50";
  };

  // Grade status helper
  const getGradeStatus = (percentage: number) => {
    if (percentage >= 90) return { text: "ممتاز", icon: Star, color: "text-green-600" };
    if (percentage >= 80) return { text: "جيد جداً", icon: CheckCircle, color: "text-blue-600" };
    if (percentage >= 70) return { text: "جيد", icon: TrendingUp, color: "text-yellow-600" };
    if (percentage >= 60) return { text: "مقبول", icon: AlertCircle, color: "text-orange-600" };
    return { text: "ضعيف", icon: TrendingDown, color: "text-red-600" };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري تحميل الدرجات...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">خطأ في تحميل البيانات</h2>
          <p className="text-gray-600 mb-4">حدث خطأ أثناء تحميل الدرجات</p>
          <button
            onClick={() => refetch()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  if (!filteredData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="text-gray-500 text-6xl mb-4">📊</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">لا توجد درجات متاحة</h2>
          <p className="text-gray-600">لم يتم العثور على أي درجات للمتدرب</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">درجاتي</h1>
            <p className="text-gray-600">
              عرض تفصيلي لجميع درجاتك في البرنامج التدريبي
            </p>
          </div>
          <button
            onClick={() => refetch()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            تحديث
          </button>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">المعدل الإجمالي</p>
              <p className="text-2xl font-bold text-gray-900">
                {filteredData.overallStats.percentage.toFixed(1)}%
              </p>
            </div>
            <div className={`p-3 rounded-full ${getGradeColor(filteredData.overallStats.percentage)}`}>
              <Award className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>المجموع</span>
              <span>{filteredData.overallStats.totalEarned} / {filteredData.overallStats.totalMax}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${filteredData.overallStats.percentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">عدد المحتويات</p>
              <p className="text-2xl font-bold text-gray-900">
                {filteredData.overallStats.totalContents}
              </p>
            </div>
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <BookOpen className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">عدد الفصول</p>
              <p className="text-2xl font-bold text-gray-900">
                {filteredData.classrooms.length}
              </p>
            </div>
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <BarChart3 className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">الحالة</p>
              <p className={`text-lg font-bold ${getGradeStatus(filteredData.overallStats.percentage).color}`}>
                {getGradeStatus(filteredData.overallStats.percentage).text}
              </p>
            </div>
            <div className={`p-3 rounded-full ${getGradeColor(filteredData.overallStats.percentage)}`}>
              {(() => {
                const StatusIcon = getGradeStatus(filteredData.overallStats.percentage).icon;
                return <StatusIcon className="w-6 h-6" />;
              })()}
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <h3 className="text-lg font-semibold text-gray-900">الفلاتر</h3>
        </div>
        <div className="mt-4 flex flex-wrap gap-4">
          <select
            value={filterClassroom}
            onChange={(e) => setFilterClassroom(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">جميع الفصول</option>
            {filteredData.classrooms.map((classroom) => (
              <option key={classroom.classroom.id} value={classroom.classroom.id.toString()}>
                {classroom.classroom.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Classrooms */}
      <div className="space-y-6">
        {filteredData.classrooms.map((classroomGroup) => (
          <div key={classroomGroup.classroom.id} className="bg-white rounded-xl shadow-sm border">
            {/* Classroom Header */}
            <div
              className="p-6 border-b cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => setExpandedClassroom(
                expandedClassroom === classroomGroup.classroom.id.toString() 
                  ? null 
                  : classroomGroup.classroom.id.toString()
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {classroomGroup.classroom.name}
                    </h3>
                    <p className="text-gray-600">
                      {classroomGroup.contents.length} محتوى تدريبي
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">معدل الفصل</p>
                    <p className={`text-2xl font-bold ${getGradeColor(classroomGroup.stats.percentage)}`}>
                      {classroomGroup.stats.percentage.toFixed(1)}%
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">المجموع</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {classroomGroup.stats.totalEarned} / {classroomGroup.stats.totalMax}
                    </p>
                  </div>
                  <div className="p-2 rounded-full bg-gray-100">
                    {expandedClassroom === classroomGroup.classroom.id.toString() ? (
                      <TrendingUp className="w-5 h-5 text-gray-600" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-gray-600" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Classroom Content */}
            {expandedClassroom === classroomGroup.classroom.id.toString() && (
              <div className="p-6">
                <div className="space-y-4">
                  {classroomGroup.contents.map((contentGrade) => (
                    <div key={contentGrade.content.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => setExpandedContent(
                          expandedContent === contentGrade.content.id.toString()
                            ? null
                            : contentGrade.content.id.toString()
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-full bg-green-100 text-green-600">
                            <Target className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {contentGrade.content.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              كود: {contentGrade.content.code}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm text-gray-600">النسبة</p>
                            <p className={`text-lg font-bold ${getGradeColor(contentGrade.percentage)}`}>
                              {contentGrade.percentage.toFixed(1)}%
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">المجموع</p>
                            <p className="text-lg font-semibold text-gray-900">
                              {contentGrade.grades.totalMarks} / {contentGrade.maxMarks.total}
                            </p>
                          </div>
                          <div className="p-2 rounded-full bg-gray-100">
                            {expandedContent === contentGrade.content.id.toString() ? (
                              <TrendingUp className="w-4 h-4 text-gray-600" />
                            ) : (
                              <TrendingDown className="w-4 h-4 text-gray-600" />
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Detailed Grades */}
                      {expandedContent === contentGrade.content.id.toString() && (
                        <div className="mt-4 pt-4 border-t">
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="bg-gray-50 rounded-lg p-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">الدرجة النهائية</span>
                                <span className="font-semibold text-gray-900">
                                  {contentGrade.grades.finalExamMarks} / {contentGrade.maxMarks.finalExamMarks}
                                </span>
                              </div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">العملي</span>
                                <span className="font-semibold text-gray-900">
                                  {contentGrade.grades.practicalMarks} / {contentGrade.maxMarks.practicalMarks}
                                </span>
                              </div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">النظري</span>
                                <span className="font-semibold text-gray-900">
                                  {contentGrade.grades.writtenMarks} / {contentGrade.maxMarks.writtenMarks}
                                </span>
                              </div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">الحضور</span>
                                <span className="font-semibold text-gray-900">
                                  {contentGrade.grades.attendanceMarks} / {contentGrade.maxMarks.attendanceMarks}
                                </span>
                              </div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">الاختبارات</span>
                                <span className="font-semibold text-gray-900">
                                  {contentGrade.grades.quizzesMarks} / {contentGrade.maxMarks.quizzesMarks}
                                </span>
                              </div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">أعمال السنة</span>
                                <span className="font-semibold text-gray-900">
                                  {contentGrade.grades.yearWorkMarks} / {contentGrade.maxMarks.yearWorkMarks}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentGrades;
