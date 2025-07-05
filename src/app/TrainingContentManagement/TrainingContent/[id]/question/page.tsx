'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import {
  useDeleteQuestionMutation,
  useGetQuestionsInTrainengContentQuery
} from '@/lip/features/question/question';
import { IQuestionsResponce, IAddQuestions } from '@/interface';
import {
  Pencil,
  Trash2,
  PlusCircle,
  Book,
  Brain,
  Target,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { useGetContentQuery } from '@/lip/features/TraningContetn/Traning';
import AddQuestionModal from '@/components/questionBank/AddQuestionModal';

export default function QuestionsPage() {
  const params = useParams();
  const contentId = Number(params.id);

  // جلب بيانات الأسئلة
  const { data, isLoading, isError } = useGetQuestionsInTrainengContentQuery({
    id: contentId,
  });
  const { data: trainingContent } = useGetContentQuery({ id: contentId });
  const questionsList: IQuestionsResponce[] = Array.isArray(data) ? data : [];

  const [DeleteQuestion, { isLoading: Loading }] = useDeleteQuestionMutation();

  // // للتحكم في المودال
  // const [isEditOpen, setIsEditOpen] = useState(false);
  // const [selectedQuestion, setSelectedQuestion] = useState<IAddQuestions | null>(null);

  if (isLoading) return <p>جارٍ تحميل الأسئلة...</p>;
  if (isError) return <p>حدث خطأ أثناء التحميل.</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">
            📚 بنك أسئلة مادة - {trainingContent?.name}
          </h1>
          <p className="text-gray-500">
            مدرس المادة - {trainingContent?.instructor.email}
          </p>
        </div>
        <AddQuestionModal
          ButtonContent={
            <>
              <PlusCircle size={20} /> إضافة سؤال جديد
            </>
          }
          contentId={contentId}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        />
      </div>

      {/* Empty State */}
      {questionsList.length === 0 ? (
        <div className="flex flex-col items-center mt-14 justify-center text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
          <div className="flex items-center justify-center w-20 h-20 mb-4 bg-green-50 rounded-full">
            <Book size={40} className="text-green-500" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-gray-700">لا توجد أسئلة حتى الآن</h3>
          <p className="text-gray-500 mb-4">
            يمكنك إضافة أسئلة جديدة لتبدأ في بناء بنك الأسئلة الخاص بهذه المادة.
          </p>
          <AddQuestionModal
            ButtonContent={
              <>
                <PlusCircle size={20} /> إضافة سؤال جديد
              </>
            }
            contentId={contentId}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {questionsList.map((question, idx) => (
            <div
              key={question.id}
              className="flex flex-col justify-between h-full bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition p-6"
            >
              {/* Header */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-orange-600 text-white w-8 h-8 flex items-center justify-center rounded-full font-bold">
                    {idx + 1}
                  </div>
                  <h2 className="text-lg font-semibold">{question.text}</h2>
                </div>
              </div>

              {/* Meta Data */}
              <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Book size={16} /> النوع: {question.type}
                </div>
                <div className="flex items-center gap-1">
                  <Brain size={16} /> المهارة: {question.skill}
                </div>
                <div className="flex items-center gap-1">
                  <Target size={16} /> الصعوبة: {question.difficulty}
                </div>
                <div className="flex items-center gap-1">
                  <Layers size={16} /> الفصل: {question.chapter}
                </div>
              </div>

              {/* Options */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2 mb-4">
                <p className="font-semibold text-sm mb-1">الاختيارات:</p>
                {question.options.map((opt, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md ${
                      opt.isCorrect
                        ? 'bg-green-50 border border-green-200 text-green-700 font-medium'
                        : 'bg-white'
                    }`}
                  >
                    {opt.isCorrect && (
                      <CheckCircle2 size={16} className="text-green-600" />
                    )}
                    <span>{opt.text}</span>
                  </div>
                ))}
              </div>

              {/* Footer Actions */}
              <div className="flex justify-end gap-2">
                <button
                  className="flex items-center gap-1 px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition"
                >
                  <Pencil size={16} /> تعديل
                </button>

                <button
                  onClick={() => DeleteQuestion({ id: question.id })}
                  className={`flex items-center gap-1 px-4 py-2 text-sm ${
                    Loading ? 'cursor-not-allowed opacity-50' : ''
                  } text-red-600 border border-red-600 rounded-lg hover:bg-red-600 hover:text-white transition`}
                >
                  {Loading ? 'جاري الحذف' : (
                    <>
                      <Trash2 size={16} /> حذف
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
