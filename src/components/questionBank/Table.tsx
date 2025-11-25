import Link from "next/link";
import { BookOpen, Brain, Settings, ArrowLeft, Clock, User, Hash, Plus } from "lucide-react";
import { IQuestionsResponce, IType, IDifficulty, ISkill } from "@/interface";

interface QuestionBankTableProps {
  questions?: IQuestionsResponce[];
}

const QuestionBankTable = ({ questions = [] }: QuestionBankTableProps) => {
    // استخدام البيانات من API فقط
    const displayQuestions = questions;

    const getDifficultyColor = (difficulty: IDifficulty) => {
        switch (difficulty) {
            case IDifficulty.EASY:
                return "bg-green-100 text-green-800";
            case IDifficulty.MEDIUM:
                return "bg-yellow-100 text-yellow-800";
            case IDifficulty.HARD:
                return "bg-orange-100 text-orange-800";
            case IDifficulty.VERY_HARD:
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getTypeText = (type: IType) => {
        switch (type) {
            case IType.MULTIPLE_CHOICE:
                return "اختيار من متعدد";
            case IType.TRUE_FALSE:
                return "صح أو خطأ";
            default:
                return "غير محدد";
        }
    };

    const getSkillText = (skill: ISkill) => {
        switch (skill) {
            case ISkill.RECALL:
                return "استدعاء";
            case ISkill.COMPREHENSION:
                return "فهم";
            case ISkill.DEDUCTION:
                return "استنتاج";
            default:
                return "غير محدد";
        }
    };
    return (
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">قائمة الأسئلة</h3>
            <p className="text-gray-600">إدارة وتنظيم الأسئلة في النظام</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-lg">
              <Brain className="w-5 h-5 text-blue-500" />
              <span className="font-semibold">{displayQuestions.length} سؤال</span>
            </div>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2">
              <Plus className="w-4 h-4" />
              إضافة سؤال
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-blue-50 to-purple-50">
                <tr>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <Hash className="w-4 h-4 text-blue-500" />
                      السؤال
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">
                    <div className="flex items-center justify-center gap-2">
                      <BookOpen className="w-4 h-4 text-green-500" />
                      النوع
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">
                    <div className="flex items-center justify-center gap-2">
                      <Brain className="w-4 h-4 text-purple-500" />
                      الصعوبة
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">
                    <div className="flex items-center justify-center gap-2">
                      <User className="w-4 h-4 text-orange-500" />
                      المنشئ
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">
                    <div className="flex items-center justify-center gap-2">
                      <Settings className="w-4 h-4 text-purple-500" />
                      الإجراءات
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {displayQuestions.map((question, index) => (
                  <tr key={question.id} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200">
                    <td className="px-6 py-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-lg">{question.id}</span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 leading-relaxed mb-2">
                            {question.text}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                              الفصل: {question.chapter}
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                              المحتوى {question.contentId}
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                              {getSkillText(question.skill)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <div className="flex justify-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                          {getTypeText(question.type)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <div className="flex justify-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(question.difficulty)}`}>
                          {question.difficulty === 'EASY' && 'سهل'}
                          {question.difficulty === 'MEDIUM' && 'متوسط'}
                          {question.difficulty === 'HARD' && 'صعب'}
                          {question.difficulty === 'VERY_HARD' && 'صعب جداً'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {question.createdById.charAt(0) || 'U'}
                          </span>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium text-gray-900">مستخدم {question.createdById}</p>
                          <p className="text-xs text-gray-500 truncate max-w-24">مستخدم</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link href={`/TrainingContentManagement/QuestionBank/${question.id}`}>
                          <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2 text-sm">
                            <Settings className="w-4 h-4" />
                            إدارة
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
        {displayQuestions.length === 0 && (
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
    );
}

export default QuestionBankTable;