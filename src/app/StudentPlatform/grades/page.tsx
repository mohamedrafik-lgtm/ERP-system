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

  // Enhanced empty state with improved design and user experience
  if (!filteredData || !filteredData.classrooms || filteredData.classrooms.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center" dir="rtl">
        <div className="text-center bg-white rounded-3xl shadow-2xl p-16 max-w-2xl mx-4">
          {/* Large animated icon with gradient background and hover effects */}
          <div className="mx-auto w-32 h-32 bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mb-8 shadow-2xl transform hover:scale-110 transition-transform duration-300">
            <Award className="w-16 h-16 text-white" />
          </div>
          
          {/* Gradient title with text clipping effect */}
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            لا توجد درجات متاحة
          </h2>
          
          {/* Descriptive message with better typography */}
          <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto leading-relaxed">
            لم يتم العثور على أي درجات مسجلة لك في الوقت الحالي. قد تكون لم تبدأ البرنامج التدريبي بعد أو لم يتم تسجيل أي درجات.
          </p>
          
          {/* Action buttons with enhanced styling and interactions */}
          <div className="flex justify-center gap-4">
            {/* Refresh button with gradient and hover effects */}
            <button
              onClick={() => refetch()}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              تحديث البيانات
            </button>
            
            {/* Home button with subtle styling */}
            <button
              onClick={() => window.location.href = '/StudentPlatform'}
              className="px-8 py-4 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
            >
              <BookOpen className="w-5 h-5" />
              العودة للرئيسية
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6" dir="rtl">
      {/* Enhanced Header with modern design */}
      <div className="mb-8">
        <div className="flex items-center justify-between bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
          <div className="flex items-center gap-4">
            {/* Large icon with gradient background */}
            <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
              <Award className="w-8 h-8 text-white" />
            </div>
            <div>
              {/* Gradient title with text clipping */}
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-1">
                درجاتي
              </h1>
              {/* Animated status indicator */}
              <p className="text-gray-600 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                عرض تفصيلي لجميع درجاتك في البرنامج التدريبي
              </p>
            </div>
          </div>
          {/* Enhanced refresh button with hover effects */}
          <button
            onClick={() => refetch()}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <RefreshCw className="w-5 h-5" />
            <span className="font-semibold">تحديث</span>
          </button>
        </div>
      </div>

      {/* Enhanced Statistics Cards with modern gradients and animations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Overall Grade Card with progress bar */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-lg border border-blue-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-700 mb-2">المعدل الإجمالي</p>
              <p className="text-4xl font-bold text-blue-600">
                {filteredData.overallStats.percentage.toFixed(1)}%
              </p>
              <div className="mt-2 text-sm text-blue-600">
                {filteredData.overallStats.totalEarned} / {filteredData.overallStats.totalMax}
              </div>
            </div>
            {/* Large icon with gradient background */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 shadow-lg">
              <Award className="w-8 h-8 text-white" />
            </div>
          </div>
          {/* Animated progress bar */}
          <div className="mt-4">
            <div className="w-full bg-blue-100 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-cyan-600 h-3 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${filteredData.overallStats.percentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl shadow-lg border border-purple-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-700 mb-2">عدد المحتويات</p>
              <p className="text-4xl font-bold text-purple-600">
                {filteredData.overallStats.totalContents}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 shadow-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg border border-green-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-700 mb-2">عدد الفصول</p>
              <p className="text-4xl font-bold text-green-600">
                {filteredData.classrooms.length}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl shadow-lg border border-orange-200 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-700 mb-2">الحالة</p>
              <p className={`text-2xl font-bold ${getGradeStatus(filteredData.overallStats.percentage).color}`}>
                {getGradeStatus(filteredData.overallStats.percentage).text}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 shadow-lg">
              {(() => {
                const StatusIcon = getGradeStatus(filteredData.overallStats.percentage).icon;
                return <StatusIcon className="w-8 h-8 text-white" />;
              })()}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Filters Section with improved styling */}
      <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          {/* Filter icon with gradient background */}
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
            <Filter className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">الفلاتر</h3>
        </div>
        <div>
          {/* Enhanced label with icon */}
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-blue-600" />
            الفصل
          </label>
          {/* Enhanced select with better styling and emojis */}
          <select
            value={filterClassroom}
            onChange={(e) => setFilterClassroom(e.target.value)}
            className="w-full max-w-md px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 hover:bg-white font-medium"
          >
            <option value="all">🏫 جميع الفصول</option>
            {filteredData.classrooms.map((classroom) => (
              <option key={classroom.classroom.id} value={classroom.classroom.id.toString()}>
                📚 {classroom.classroom.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Enhanced Classrooms Section with modern card design */}
      <div className="space-y-6">
        {filteredData.classrooms.map((classroomGroup) => (
          <div key={classroomGroup.classroom.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden group">
            {/* Enhanced Classroom Header with hover effects */}
            <div
              className="p-6 border-b border-gray-100 cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300"
              onClick={() => setExpandedClassroom(
                expandedClassroom === classroomGroup.classroom.id.toString() 
                  ? null 
                  : classroomGroup.classroom.id.toString()
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Large classroom icon with gradient */}
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    {/* Classroom name with hover color change */}
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {classroomGroup.classroom.name}
                    </h3>
                    {/* Content count with status indicator */}
                    <p className="text-gray-600 flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      {classroomGroup.contents.length} محتوى تدريبي
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  {/* Grade percentage with progress bar */}
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-600 mb-1">معدل الفصل</p>
                    <p className={`text-3xl font-bold ${getGradeColor(classroomGroup.stats.percentage)}`}>
                      {classroomGroup.stats.percentage.toFixed(1)}%
                    </p>
                    <div className="mt-2 w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${classroomGroup.stats.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  {/* Total marks display */}
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-600 mb-1">المجموع</p>
                    <p className="text-lg font-bold text-gray-900">
                      {classroomGroup.stats.totalEarned} / {classroomGroup.stats.totalMax}
                    </p>
                  </div>
                  {/* Expand/collapse button with gradient hover */}
                  <div className="p-3 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-blue-100 group-hover:to-indigo-100 transition-all duration-300">
                    {expandedClassroom === classroomGroup.classroom.id.toString() ? (
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-gray-600" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Classroom Content with gradient background */}
            {expandedClassroom === classroomGroup.classroom.id.toString() && (
              <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="space-y-4">
                  {classroomGroup.contents.map((contentGrade) => (
                    <div key={contentGrade.content.id} className="bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group">
                      {/* Content header with enhanced styling */}
                      <div
                        className="p-4 cursor-pointer hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-300"
                        onClick={() => setExpandedContent(
                          expandedContent === contentGrade.content.id.toString()
                            ? null
                            : contentGrade.content.id.toString()
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            {/* Content icon with gradient background */}
                            <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
                              <Target className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              {/* Content name with hover color change */}
                              <h4 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                                {contentGrade.content.name}
                              </h4>
                              {/* Content code with status indicator */}
                              <p className="text-sm text-gray-600 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                كود: {contentGrade.content.code}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            {/* Grade percentage with mini progress bar */}
                            <div className="text-center">
                              <p className="text-sm font-medium text-gray-600 mb-1">النسبة</p>
                              <p className={`text-2xl font-bold ${getGradeColor(contentGrade.percentage)}`}>
                                {contentGrade.percentage.toFixed(1)}%
                              </p>
                              <div className="mt-1 w-16 bg-gray-200 rounded-full h-1.5">
                                <div
                                  className="bg-gradient-to-r from-green-500 to-emerald-600 h-1.5 rounded-full transition-all duration-500"
                                  style={{ width: `${contentGrade.percentage}%` }}
                                ></div>
                              </div>
                            </div>
                            {/* Total marks display */}
                            <div className="text-center">
                              <p className="text-sm font-medium text-gray-600 mb-1">المجموع</p>
                              <p className="text-lg font-bold text-gray-900">
                                {contentGrade.grades.totalMarks} / {contentGrade.maxMarks.total}
                              </p>
                            </div>
                            {/* Expand/collapse button with gradient hover */}
                            <div className="p-3 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-green-100 group-hover:to-emerald-100 transition-all duration-300">
                              {expandedContent === contentGrade.content.id.toString() ? (
                                <TrendingUp className="w-4 h-4 text-green-600" />
                              ) : (
                                <TrendingDown className="w-4 h-4 text-gray-600" />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Enhanced Detailed Grades with colorful cards */}
                      {expandedContent === contentGrade.content.id.toString() && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {/* Final Exam Card - Blue Theme */}
                            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="p-1.5 rounded-lg bg-blue-500">
                                    <Award className="w-4 h-4 text-white" />
                                  </div>
                                  <span className="text-sm font-medium text-blue-700">الدرجة النهائية</span>
                                </div>
                                <span className="font-bold text-blue-900">
                                  {contentGrade.grades.finalExamMarks} / {contentGrade.maxMarks.finalExamMarks}
                                </span>
                              </div>
                            </div>
                            {/* Practical Card - Green Theme */}
                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="p-1.5 rounded-lg bg-green-500">
                                    <Target className="w-4 h-4 text-white" />
                                  </div>
                                  <span className="text-sm font-medium text-green-700">العملي</span>
                                </div>
                                <span className="font-bold text-green-900">
                                  {contentGrade.grades.practicalMarks} / {contentGrade.maxMarks.practicalMarks}
                                </span>
                              </div>
                            </div>
                            {/* Written Card - Purple Theme */}
                            <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-4 border border-purple-200">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="p-1.5 rounded-lg bg-purple-500">
                                    <BookOpen className="w-4 h-4 text-white" />
                                  </div>
                                  <span className="text-sm font-medium text-purple-700">النظري</span>
                                </div>
                                <span className="font-bold text-purple-900">
                                  {contentGrade.grades.writtenMarks} / {contentGrade.maxMarks.writtenMarks}
                                </span>
                              </div>
                            </div>
                            {/* Attendance Card - Orange Theme */}
                            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-200">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="p-1.5 rounded-lg bg-orange-500">
                                    <CheckCircle className="w-4 h-4 text-white" />
                                  </div>
                                  <span className="text-sm font-medium text-orange-700">الحضور</span>
                                </div>
                                <span className="font-bold text-orange-900">
                                  {contentGrade.grades.attendanceMarks} / {contentGrade.maxMarks.attendanceMarks}
                                </span>
                              </div>
                            </div>
                            {/* Quizzes Card - Pink Theme */}
                            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-4 border border-pink-200">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="p-1.5 rounded-lg bg-pink-500">
                                    <BarChart3 className="w-4 h-4 text-white" />
                                  </div>
                                  <span className="text-sm font-medium text-pink-700">الاختبارات</span>
                                </div>
                                <span className="font-bold text-pink-900">
                                  {contentGrade.grades.quizzesMarks} / {contentGrade.maxMarks.quizzesMarks}
                                </span>
                              </div>
                            </div>
                            {/* Year Work Card - Indigo Theme */}
                            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-4 border border-indigo-200">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="p-1.5 rounded-lg bg-indigo-500">
                                    <Star className="w-4 h-4 text-white" />
                                  </div>
                                  <span className="text-sm font-medium text-indigo-700">أعمال السنة</span>
                                </div>
                                <span className="font-bold text-indigo-900">
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
