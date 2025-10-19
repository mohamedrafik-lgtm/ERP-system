"use client";

import { useState } from "react";
import { 
  BookOpen, 
  Clock, 
  Users, 
  Award, 
  CheckCircle, 
  Circle,
  Play,
  Download,
  Star
} from "lucide-react";

const StudentProgram = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const programData = {
    name: "برمجة الحاسوب",
    code: "CP101",
    duration: 6,
    progress: 25,
    description: "برنامج شامل لتعلم البرمجة وتطوير التطبيقات",
    modules: [
      {
        id: 1,
        title: "أساسيات البرمجة",
        description: "تعلم المفاهيم الأساسية للبرمجة",
        duration: "4 أسابيع",
        status: "completed",
        lessons: [
          { title: "مقدمة في البرمجة", duration: "2 ساعة", status: "completed" },
          { title: "المتغيرات والثوابت", duration: "1.5 ساعة", status: "completed" },
          { title: "الشروط والحلقات", duration: "2.5 ساعة", status: "completed" }
        ]
      },
      {
        id: 2,
        title: "البرمجة الكائنية",
        description: "تعلم مفاهيم البرمجة الكائنية",
        duration: "6 أسابيع",
        status: "in-progress",
        lessons: [
          { title: "مقدمة في الكائنات", duration: "2 ساعة", status: "completed" },
          { title: "الكلاسات والكائنات", duration: "3 ساعة", status: "in-progress" },
          { title: "الوراثة", duration: "2.5 ساعة", status: "pending" },
          { title: "التغليف", duration: "2 ساعة", status: "pending" }
        ]
      },
      {
        id: 3,
        title: "قواعد البيانات",
        description: "تعلم إدارة قواعد البيانات",
        duration: "4 أسابيع",
        status: "pending",
        lessons: [
          { title: "مقدمة في قواعد البيانات", duration: "2 ساعة", status: "pending" },
          { title: "SQL الأساسي", duration: "3 ساعة", status: "pending" },
          { title: "التصميم", duration: "2.5 ساعة", status: "pending" }
        ]
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'in-progress':
        return 'text-blue-600 bg-blue-100';
      case 'pending':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'مكتمل';
      case 'in-progress':
        return 'قيد التقدم';
      case 'pending':
        return 'معلق';
      default:
        return 'غير محدد';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex" dir="rtl">
      {/* Student Sidebar */}
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">البرنامج التدريبي</h1>
            <p className="text-gray-600">متابعة تقدمك في البرنامج التدريبي</p>
          </div>

          {/* Program Overview */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{programData.name}</h2>
                  <p className="text-gray-600">{programData.description}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-sm text-gray-500">كود البرنامج: {programData.code}</span>
                    <span className="text-sm text-gray-500">المدة: {programData.duration} أشهر</span>
                  </div>
                </div>
              </div>
              <div className="text-left">
                <div className="text-3xl font-bold text-blue-600">{programData.progress}%</div>
                <div className="text-sm text-gray-500">مكتمل</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${programData.progress}%` }}
              ></div>
            </div>
          </div>

          {/* Modules */}
          <div className="space-y-6">
            {programData.modules.map((module, index) => (
              <div key={module.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                {/* Module Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{module.title}</h3>
                        <p className="text-gray-600">{module.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-sm text-gray-500">المدة: {module.duration}</span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(module.status)}`}>
                            {getStatusText(module.status)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <Download className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <Star className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Lessons */}
                <div className="p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">الدروس</h4>
                  <div className="space-y-3">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <div key={lessonIndex} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                            {lesson.status === 'completed' ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : lesson.status === 'in-progress' ? (
                              <Play className="w-5 h-5 text-blue-600" />
                            ) : (
                              <Circle className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{lesson.title}</p>
                            <p className="text-sm text-gray-600">المدة: {lesson.duration}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(lesson.status)}`}>
                            {getStatusText(lesson.status)}
                          </span>
                          {lesson.status === 'completed' && (
                            <button className="p-2 text-green-600 hover:text-green-700 transition-colors">
                              <Play className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProgram;
