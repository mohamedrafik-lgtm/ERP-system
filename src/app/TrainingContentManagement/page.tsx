import img from "@/img/502585454_122235753458244801_413190920156398012_n-removebg-preview.png";
import Image from "next/image";
import { BookOpen, Users, FileText, Settings, Sparkles, TrendingUp } from "lucide-react";

const TrainingContentManagement = () => {
    const stats = [
        { label: "إجمالي البرامج", value: "24", icon: BookOpen, color: "from-blue-500 to-blue-600" },
        { label: "المحتوى التدريبي", value: "156", icon: FileText, color: "from-green-500 to-green-600" },
        { label: "الأسئلة المتاحة", value: "1,234", icon: Users, color: "from-purple-500 to-purple-600" },
        { label: "المتدربين النشطين", value: "89", icon: TrendingUp, color: "from-orange-500 to-orange-600" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                            <Sparkles className="w-10 h-10 text-white" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                        نظام إدارة المحتوى التدريبي
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        منصة شاملة لإدارة البرامج التدريبية والمحتوى التعليمي والاختبارات الإلكترونية
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Welcome Card */}
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                                <BookOpen className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800">مرحباً بك في النظام</h2>
                        </div>
                        <p className="text-gray-600 mb-6">
                            يمكنك من خلال هذا النظام إدارة جميع جوانب المحتوى التدريبي، من إنشاء البرامج إلى إدارة الأسئلة والاختبارات.
                        </p>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span className="text-gray-700">إدارة البرامج التدريبية</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-gray-700">إنشاء المحتوى التعليمي</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                <span className="text-gray-700">بنك الأسئلة والاختبارات</span>
                            </div>
                        </div>
                    </div>

                    {/* Logo Section */}
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 shadow-lg flex items-center justify-center">
                        <div className="text-center">
                            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 mb-6">
                                <Image 
                                    src={img.src} 
                                    width={200} 
                                    height={200} 
                                    alt="Logo" 
                                    className="mx-auto opacity-90" 
                                />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">نظام التدريب المتقدم</h3>
                            <p className="text-blue-100">منصة متكاملة لإدارة التعليم والتدريب</p>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">الإجراءات السريعة</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <BookOpen className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">إدارة البرامج</h3>
                            <p className="text-gray-600 text-sm">إنشاء وإدارة البرامج التدريبية</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <FileText className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">المحتوى التدريبي</h3>
                            <p className="text-gray-600 text-sm">إضافة وتنظيم المحتوى التعليمي</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">بنك الأسئلة</h3>
                            <p className="text-gray-600 text-sm">إنشاء وإدارة الأسئلة والاختبارات</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TrainingContentManagement;