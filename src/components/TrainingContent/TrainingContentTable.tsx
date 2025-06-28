"use client";
import { useGetTrainingContentsWithCountQuery } from "@/lip/features/TraningContetn/Traning";
import ProgramTableSkeleton from "../Program/ProgramTableSkeleton";
import AddQuestionModal from "../questionBank/AddQuestionModal";
import { useGetQuestionsInTrainengContentQuery } from "@/lip/features/question/question";
import { useRouter } from "next/navigation";


export const TrainingContentTable = () => {
  const { data, isLoading, isError } = useGetTrainingContentsWithCountQuery();
  // استخراج القائمة الحقيقية من المحتوى التدريبي
  const router = useRouter();
  const trainingList = Array.isArray(data) ? data : [];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="hidden sm:grid grid-cols-9 gap-4 font-semibold bg-white backdrop-blur p-3 rounded-lg border border-gray-300">
        <div className="text-center">الكود</div>
        <div className="text-center">اسم المحتوي</div>
        <div className="text-center">الفصل الدراسي</div>
        <div className="text-center">الفرقة</div>
        <div className="text-center">أستاذ المادة</div>
        <div className="text-center">عدد الأسئلة</div>
        <div className="text-center col-span-3">الإجراء</div>
      </div>

      {/* حالة التحميل */}
      {isLoading && <ProgramTableSkeleton/>}

      {/* حالة الخطأ */}
      {isError && <p className="text-center text-red-500">حدث خطأ أثناء تحميل البيانات.</p>}

      {/* محتوى التدريب */}
      {trainingList.map((content, idx) => (
        <div
          key={idx}
          className="grid grid-cols-1 sm:grid-cols-9 gap-4 items-center bg-white/80 hover:bg-white/20 backdrop-blur-md rounded-xl p-4 shadow transition"
        >
          <div className="font-bold text-center">#{content.code}</div>
          <div className="text-center">{content.name}</div>
          <div className="text-center">{content.semester}</div>
          <div className="text-center px-2 py-1 border border-indigo-500 rounded-md text-indigo-500">{content.year}</div>
          <div className="text-center">{content.instructor?.name || "غير محدد"}</div>
          <div className="text-center">{content._count?.questions}</div>
          <div className="flex  justify-between col-span-3">
            <button className=" text-blue-500 transition-all duration-300 hover:bg-blue-500 hover:text-white py-1 border border-blue-500 px-2 rounded-md">
              تعديل
            </button>
            <button className=" text-green-500 transition-all duration-300 hover:bg-green-500 hover:text-white py-1 border border-green-500 px-2 rounded-md"
            onClick={()=> router.push(`/TrainingContentManagement/TrainingContent/${content.id}/Lecture`)}>
              المحاضرات
            </button>
            <button 
            className=" text-indigo-500 transition-all duration-300 hover:bg-indigo-500 hover:text-white py-1 border border-indigo-500 px-2 rounded-md"
            onClick={()=> router.push(`/TrainingContentManagement/TrainingContent/${content.id}/question`)}>
               الاسأله  ({content._count?.questions})
            </button>
            <AddQuestionModal ButtonContent={'اضافه سؤال'}
            contentId={content.id}
            className="text-green-500 transition-all duration-300 hover:bg-green-500 hover:text-white py-1 border border-green-500 px-2 rounded-md"/>
            <button className=" text-red-500 transition-all duration-300 hover:bg-red-500 hover:text-white py-1 border border-red-500 px-2 rounded-md">
              حذف
            </button>
          </div>
        </div>
      ))}

      {/* لا توجد بيانات */}
      {!isLoading && trainingList.length === 0 && (
        <p className="text-center text-gray-500">لا توجد بيانات لعرضها.</p>
      )}
    </div>
  );
};
