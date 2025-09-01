import QuestionBankTable from "@/components/questionBank/Table";
import { BookOpen, Users, FileText, TrendingUp, Plus, Brain, Target, Zap } from "lucide-react";

const QuestionBank = () => {
    const stats = [
        { label: "إجمالي الأسئلة", value: "1,234", icon: Brain, color: "from-blue-500 to-blue-600" },
        { label: "الأسئلة النشطة", value: "1,156", icon: Target, color: "from-green-500 to-green-600" },
        { label: "المواد الدراسية", value: "24", icon: BookOpen, color: "from-purple-500 to-purple-600" },
        { label: "الاختبارات", value: "89", icon: Zap, color: "from-orange-500 to-orange-600" },
    ];

    const subjects = [
        { name: "تكنولوجيا معلومات", questions: 156, tests: 12 },
        { name: "مساعد خدمات صحيه", questions: 234, tests: 18 },
        { name: "المساحه و التخطيط", questions: 189, tests: 15 },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                                بنك الأسئلة
                            </h1>
                            <p className="text-gray-600">إدارة وتنظيم الأسئلة للمواد الدراسية</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2">
                                <Plus className="w-5 h-5" />
                                إضافة سؤال جديد
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                                    <p className="text-sm text-gray-600">{stat.label}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Subjects Sections */}
                <div className="space-y-8">
                    {subjects.map((subject, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-800 mb-2">{subject.name}</h3>
                                        <div className="flex items-center gap-6 text-sm text-gray-600">
                                            <div className="flex items-center gap-2">
                                                <Brain className="w-4 h-4 text-blue-500" />
                                                <span>{subject.questions} سؤال</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Zap className="w-4 h-4 text-green-500" />
                                                <span>{subject.tests} اختبار</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors duration-200 text-sm font-medium">
                                            عرض التفاصيل
                                        </button>
                                        <button className="px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors duration-200 text-sm font-medium">
                                            إضافة سؤال
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <QuestionBankTable/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default QuestionBank;