"use client";
import { useGetProgramsQuery, useDeleteProgramMutation } from "@/lip/features/program/program";
import ProgramTableSkeleton from "./ProgramTableSkeleton";
import UpdateProgramContentModel from "./UpdateModle";

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
    <div className="overflow-x-auto p-4" dir="rtl">
      <div className="rounded-lg overflow-hidden border border-gray-300">
        <table className="min-w-full text-sm">
          <thead className="text-left bg-white">
            <tr>
              <th className="px-4 py-5 text-center">الاسم باللغة العربية</th>
              <th className="px-4 py-2 text-center">الاسم باللغة الانجليزية</th>
              <th className="px-4 py-2 text-center">المصاريف</th>
              <th className="px-4 py-2 text-center">الوصف</th>
              <th className="px-4 py-2 text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {programs && programs.length > 0 ? (
              programs.map((program) => (
                <tr key={program.id} className="bg-white transition duration-200 border-t border-gray-200">
                  <td className="px-4 py-3 text-center">{program.nameAr}</td>
                  <td className="px-4 py-3 text-center">{program.nameEn}</td>
                  <td className="px-4 py-3 text-center">{program.price}</td>
                  <td className="px-4 py-3 text-center">{program.description}</td>
                  <td className="px-4 py-3 flex space-x-5 text-sm items-center justify-center">
                    <button
                      onClick={() => handleDelete(program.id)}
                      disabled={isDeleting}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md cursor-pointer disabled:opacity-50"
                    >
                      {isDeleting ? "جارٍ الحذف..." : "حذف"}
                    </button>
                    <UpdateProgramContentModel data={{
    nameAr: program.nameAr,
    nameEn: program.nameEn,
    price: program.price,
    description: program.description,
  }} id={program.id}/>
                    {/* <button className="bg-green-500 hover:bg-green-600 text-white py-1 px-2 rounded-md cursor-pointer">
                      تعديل
                    </button> */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  لا توجد برامج تدريبية حالياً.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProgramTable;
