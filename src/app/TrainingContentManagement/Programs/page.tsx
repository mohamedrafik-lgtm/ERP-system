import AddProgramContentModel from "@/components/Program/AddContentModal";
import ProgramTable from "@/components/Program/ProgramTable";
import Paginator from "@/components/ui/paginator";
import { BookOpen, Plus, TrendingUp, Users } from "lucide-react";

const AddProgram = () => {
    const stats = [
        { label: "إجمالي البرامج", value: "24", icon: BookOpen, color: "from-blue-500 to-blue-600" },
        { label: "البرامج النشطة", value: "18", icon: TrendingUp, color: "from-green-500 to-green-600" },
        { label: "المتدربين المسجلين", value: "456", icon: Users, color: "from-purple-500 to-purple-600" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                                البرامج التدريبية
                            </h1>
                            <p className="text-gray-600">إدارة وتنظيم جميع البرامج التدريبية المتاحة</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <AddProgramContentModel/>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100">
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                                    <p className="text-sm text-gray-600">{stat.label}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Programs Table */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800">قائمة البرامج</h2>
                        <p className="text-gray-600 text-sm mt-1">جميع البرامج التدريبية المتاحة في النظام</p>
                    </div>
                    <div className="p-6">
                        <ProgramTable/>
                    </div>
                </div>

                {/* Pagination */}
                <div className="mt-6 flex justify-center">
                    <Paginator totalPages={2} />
                </div>
            </div>
        </div>
    );
}
export default AddProgram;