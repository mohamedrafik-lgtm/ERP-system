"use client";
import { useGetProgramsQuery, useDeleteProgramMutation } from "@/lip/features/program/program";
import ProgramTableSkeleton from "./ProgramTableSkeleton";
import UpdateProgramContentModel from "./UpdateModle";
import { Edit, Trash2, Eye, DollarSign, BookOpen, FileText } from "lucide-react";

const ProgramTable = () => {
  const { data: programs, error, isLoading } = useGetProgramsQuery();
  const [deleteProgram, { isLoading: isDeleting }] = useDeleteProgramMutation();

  if (isLoading) return <ProgramTableSkeleton />;
  if (error) return <p className="text-red-500">حدث خطأ أثناء تحميل البيانات.</p>;

  const handleDelete = async (id: number) => {
    try {
      await deleteProgram(id).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">قائمة البرامج</h3>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <BookOpen className="w-4 h-4" />
          <span>{programs?.length || 0} برنامج</span>
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
                  الاسم باللغة العربية
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">الاسم باللغة الانجليزية</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-500" />
                  السعر
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-500" />
                  الوصف
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {programs && programs.length > 0 ? (
                programs.map((program, index) => (
                  <tr key={program.id} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{program.nameAr}</p>
                          <p className="text-sm text-gray-500">ID: #{program.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-700 font-medium">{program.nameEn}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {program.price} ج.م
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-600 text-sm max-w-xs truncate" title={program.description}>
                        {program.description}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200" title="عرض التفاصيل">
                          <Eye className="w-4 h-4" />
                        </button>
                        <UpdateProgramContentModel 
                          data={{
                            nameAr: program.nameAr,
                            nameEn: program.nameEn,
                            price: program.price,
                            description: program.description,
                          }} 
                          id={program.id}
                        />
                        <button
                          onClick={() => handleDelete(program.id)}
                          disabled={isDeleting}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          title="حذف البرنامج"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-12">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                        <BookOpen className="w-8 h-8 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-gray-500 font-medium">لا توجد برامج تدريبية حالياً</p>
                        <p className="text-gray-400 text-sm">ابدأ بإضافة برنامج تدريبي جديد</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProgramTable;
