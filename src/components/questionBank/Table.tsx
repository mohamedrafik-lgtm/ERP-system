import { Bank } from "@/data";
import Link from "next/link";
import { BookOpen, Brain, Settings, ArrowLeft } from "lucide-react";

const QuestionBankTable = () =>{
    return (
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">المواد الدراسية</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Brain className="w-4 h-4" />
            <span>{Bank.length} مادة</span>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
                <tr>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-500" />
                    المادة الدراسية
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Brain className="w-4 h-4 text-green-500" />
                    عدد الأسئلة
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Settings className="w-4 h-4 text-purple-500" />
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {Bank.map((material, index) => (
                  <tr key={material.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{material.name}</p>
                          <p className="text-sm text-gray-500">ID: #{material.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {material.QustionsCount} سؤال
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center">
                        <Link href={`/TrainingContentManagement/QuestionBank/${material.id}`}>
                          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2">
                            <Settings className="w-4 h-4" />
                            إدارة الأسئلة
                          </button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {Bank.length === 0 && (
          <div className="text-center py-12">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-gray-400" />
              </div>
              <div>
                <p className="text-gray-500 font-medium">لا توجد مواد دراسية حالياً</p>
                <p className="text-gray-400 text-sm">ابدأ بإضافة مادة دراسية جديدة</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
}

export default QuestionBankTable;