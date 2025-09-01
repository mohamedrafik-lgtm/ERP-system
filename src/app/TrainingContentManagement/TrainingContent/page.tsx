import { TrainingContentTable } from "@/components/TrainingContent/TrainingContentTable";
import { FileText, BookOpen, Users, TrendingUp, Plus } from "lucide-react";

const TrainingContent = () => {
    const stats = [
        { label: "إجمالي المحتوى", value: "156", icon: FileText, color: "from-blue-500 to-blue-600" },
        { label: "المحتوى النشط", value: "142", icon: BookOpen, color: "from-green-500 to-green-600" },
        { label: "المحاضرات", value: "1,234", icon: Users, color: "from-purple-500 to-purple-600" },
        { label: "الأسئلة", value: "5,678", icon: TrendingUp, color: "from-orange-500 to-orange-600" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                                المحتوى التدريبي
                            </h1>
                            <p className="text-gray-600">إدارة وتنظيم جميع المحتوى التعليمي والتدريبي</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2">
                                <Plus className="w-5 h-5" />
                                إضافة محتوى جديد
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

                {/* Training Content Table */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800">قائمة المحتوى التدريبي</h2>
                        <p className="text-gray-600 text-sm mt-1">جميع المحتوى التعليمي والتدريبي المتاح في النظام</p>
                    </div>
                    <div className="p-6">
                        <TrainingContentTable/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TrainingContent;