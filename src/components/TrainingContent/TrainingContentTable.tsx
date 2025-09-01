"use client";
import { useDeleteTrainingContentMutation, useGetTrainingContentsWithCountQuery } from "@/lip/features/TraningContetn/Traning";
import ProgramTableSkeleton from "../Program/ProgramTableSkeleton";
import AddQuestionModal from "../questionBank/AddQuestionModal";
import { useRouter } from "next/navigation";
import Spinner from "../ui/Spinner";
import { FileText, Edit, BookOpen, Brain, Trash2, Plus, Eye, Settings } from "lucide-react";


export const TrainingContentTable = () => {
  const { data, isLoading, isError } = useGetTrainingContentsWithCountQuery();
  const [deleteTrainengContent,{isLoading:Loading,isSuccess}] = useDeleteTrainingContentMutation()
  // استخراج القائمة الحقيقية من المحتوى التدريبي
  const router = useRouter();
  const trainingList = Array.isArray(data) ? data : [];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">قائمة المحتوى التدريبي</h3>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FileText className="w-4 h-4" />
          <span>{trainingList.length} محتوى</span>
        </div>
      </div>

      {/* حالة التحميل */}
      {isLoading && <ProgramTableSkeleton/>}

      {/* حالة الخطأ */}
      {isError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-600 text-sm flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            حدث خطأ أثناء تحميل البيانات
          </p>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
              <tr>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">الكود</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">اسم المحتوى</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">الفصل الدراسي</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">الفرقة</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">أستاذ المادة</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-purple-500" />
                  عدد الأسئلة
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {trainingList.map((content, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">#{content.code}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-semibold text-gray-800">{content.name}</p>
                      <p className="text-sm text-gray-500">ID: #{content.id}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {content.semester}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {content.year}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <p className="text-gray-700 font-medium">{content.instructor?.name || "غير محدد"}</p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {content._count?.questions || 0} سؤال
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2 flex-wrap">
                      <button
                        onClick={() => router.push(`/TrainingContentManagement/TrainingContent/${content.id}/UpdateTrainengContent`)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                        title="تعديل المحتوى"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors duration-200"
                        onClick={() => router.push(`/TrainingContentManagement/TrainingContent/${content.id}/Lecture`)}
                        title="المحاضرات"
                      >
                        <BookOpen className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors duration-200"
                        onClick={() => router.push(`/TrainingContentManagement/TrainingContent/${content.id}/question`)}
                        title="الأسئلة"
                      >
                        <Brain className="w-4 h-4" />
                      </button>
                      <AddQuestionModal 
                        ButtonContent={<Plus className="w-4 h-4" />}
                        contentId={content.id}
                        className="p-2 text-orange-600 hover:bg-orange-100 rounded-lg transition-colors duration-200"
                      />
                      <button
                        onClick={() => deleteTrainengContent({id: content.id})}
                        disabled={Loading}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        title="حذف المحتوى"
                      >
                        {Loading ? <Spinner Color="text-red-500"/> : <Trash2 className="w-4 h-4" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {!isLoading && trainingList.length === 0 && (
        <div className="text-center py-12">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <div>
              <p className="text-gray-500 font-medium">لا توجد محتوى تدريبي حالياً</p>
              <p className="text-gray-400 text-sm">ابدأ بإضافة محتوى تدريبي جديد</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
