"use client";

import QuestionBankTable from "@/components/questionBank/Table";
import { BookOpen, Users, FileText, TrendingUp, Plus, Brain, Target, Zap } from "lucide-react";
import { useGetQuestionsInTrainengContentQuery } from "@/lip/features/question/question";
import { IQuestionsResponce } from "@/interface";

const QuestionBank = () => {
    // جلب البيانات من API الموجود
    const { data: questions = [], isLoading: questionsLoading, error: questionsError } = useGetQuestionsInTrainengContentQuery({ id: 1 }); // يمكن تغيير الـ ID حسب المحتوى المطلوب

    // Debug: طباعة الأخطاء في console (إذا كان هناك أخطاء فعلية)
    if (questionsError && questionsError.status !== 'FETCH_ERROR') {
        console.error('Questions API Error:', questionsError);
    }

    // إحصائيات محسوبة من البيانات
    const calculatedStats = [
        { 
            label: "إجمالي الأسئلة", 
            value: questions.length.toString(), 
            icon: Brain, 
            color: "from-blue-500 to-blue-600" 
        },
        { 
            label: "الأسئلة النشطة", 
            value: questions.filter(q => q.type === 'MULTIPLE_CHOICE').length.toString(), 
            icon: Target, 
            color: "from-green-500 to-green-600" 
        },
        { 
            label: "المواد الدراسية", 
            value: new Set(questions.map(q => q.contentId)).size.toString(), 
            icon: BookOpen, 
            color: "from-purple-500 to-purple-600" 
        },
        { 
            label: "الاختبارات", 
            value: "89", // يمكن حسابها من API منفصل
            icon: Zap, 
            color: "from-orange-500 to-orange-600" 
        },
    ];

    // تجميع الأسئلة حسب المحتوى التدريبي
    const questionsByContent = questions.reduce((acc, question) => {
        const contentId = question.contentId;
        if (!acc[contentId]) {
            acc[contentId] = {
                content: { name: `المحتوى ${contentId}`, code: `CODE-${contentId}` },
                questions: [],
                tests: 0 // يمكن حسابها من API منفصل
            };
        }
        acc[contentId].questions.push(question);
        return acc;
    }, {} as Record<number, { content: { name: string; code: string }; questions: IQuestionsResponce[]; tests: number }>);

    const subjects = Object.values(questionsByContent).map(group => ({
        name: group.content.name,
        code: group.content.code,
        questions: group.questions.length,
        tests: group.tests
    }));

    // حالات التحميل والأخطاء
    if (questionsLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto"></div>
                            <p className="mt-4 text-gray-600">جاري تحميل بيانات الأسئلة...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // فقط إذا كان هناك أخطاء فعلية
    if (questionsError && questionsError.status !== 'FETCH_ERROR') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Brain className="w-8 h-8 text-red-500" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">خطأ في تحميل البيانات</h3>
                            <p className="text-gray-600 mb-4">
                                خطأ في تحميل الأسئلة
                            </p>
                            <div className="bg-gray-100 p-4 rounded-lg text-left">
                                <p className="text-sm text-gray-700 mb-2">
                                    <strong>تفاصيل الخطأ:</strong>
                                </p>
                                <p className="text-xs text-gray-600 font-mono">
                                    {JSON.stringify(questionsError)}
                                </p>
                            </div>
                            <button 
                                onClick={() => window.location.reload()} 
                                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                إعادة المحاولة
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

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
                    {calculatedStats.map((stat, index) => (
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
                    {subjects.length > 0 ? (
                        subjects.map((subject, index) => (
                        <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-800 mb-2">{subject.name}</h3>
                                            <p className="text-sm text-gray-500 mb-2">كود المادة: {subject.code}</p>
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
                                    <QuestionBankTable questions={questionsByContent[Object.keys(questionsByContent)[index]]?.questions || []} />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                    <BookOpen className="w-8 h-8 text-gray-400" />
                                </div>
                                <div>
                                    <p className="text-gray-500 font-medium">لا توجد أسئلة حالياً</p>
                                    <p className="text-gray-400 text-sm">ابدأ بإضافة سؤال جديد</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default QuestionBank;