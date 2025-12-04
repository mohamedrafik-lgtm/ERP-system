"use client";

import { useState, useEffect } from 'react';
import { X, Plus, Trash2, Calendar, Clock, BookOpen, AlertCircle } from 'lucide-react';
import { useCreateQuizMutation } from '@/lip/features/quiz/quizApi';
import { useGetTrainengContentQuery } from '@/lip/features/TraningContetn/Traning';
import { useGetProgramsQuery } from '@/lip/features/program/program';
import { CreateQuizRequest, QuizQuestion } from '@/types/quiz.types';
import toast from 'react-hot-toast';

interface CreateQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateQuizModal({ isOpen, onClose, onSuccess }: CreateQuizModalProps) {
  const [createQuiz, { isLoading }] = useCreateQuizMutation();
  
  // Fetch programs and training contents from API
  const { data: programs, isLoading: isLoadingPrograms } = useGetProgramsQuery();
  const { data: trainingContents, isLoading: isLoadingContents } = useGetTrainengContentQuery();
  
  // Form state
  const [formData, setFormData] = useState<Partial<CreateQuizRequest>>({
    title: '',
    description: '',
    instructions: '',
    trainingContentId: 0,
    duration: 60,
    passingScore: 50,
    maxAttempts: 3,
    startDate: '',
    endDate: '',
    shuffleQuestions: false,
    shuffleAnswers: false,
    showResults: true,
    showCorrectAnswers: false,
    isActive: true,
    isPublished: false,
    questions: [],
  });

  const [selectedProgramId, setSelectedProgramId] = useState<number>(0);

  const [newQuestion, setNewQuestion] = useState<QuizQuestion>({
    questionId: 0,
    order: 1,
    points: 1,
  });

  // Mock data for questions (replace with actual API call when available)
  const [availableQuestions] = useState([
    { id: 1, questionText: 'ما هي لغة البرمجة؟', type: 'multiple-choice' },
    { id: 2, questionText: 'اشرح مفهوم OOP', type: 'essay' },
    { id: 3, questionText: 'ما هو SQL؟', type: 'true-false' },
  ]);

  const handleInputChange = (field: keyof CreateQuizRequest, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddQuestion = () => {
    if (newQuestion.questionId === 0) {
      toast.error('الرجاء اختيار سؤال');
      return;
    }

    const questions = formData.questions || [];
    
    // Check if question already exists
    if (questions.some(q => q.questionId === newQuestion.questionId)) {
      toast.error('هذا السؤال موجود بالفعل');
      return;
    }

    setFormData(prev => ({
      ...prev,
      questions: [...(prev.questions || []), { ...newQuestion }],
    }));

    // Reset new question
    setNewQuestion({
      questionId: 0,
      order: (questions.length || 0) + 2,
      points: 1,
    });

    toast.success('تم إضافة السؤال');
  };

  const handleRemoveQuestion = (questionId: number) => {
    setFormData(prev => ({
      ...prev,
      questions: (prev.questions || []).filter(q => q.questionId !== questionId),
    }));
    toast.success('تم حذف السؤال');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.title?.trim()) {
      toast.error('الرجاء إدخال عنوان الاختبار');
      return;
    }

    if (!formData.trainingContentId || formData.trainingContentId === 0) {
      toast.error('الرجاء اختيار المحتوى التدريبي');
      return;
    }

    if (!formData.startDate) {
      toast.error('الرجاء تحديد تاريخ البداية');
      return;
    }

    if (!formData.endDate) {
      toast.error('الرجاء تحديد تاريخ النهاية');
      return;
    }

    if (!formData.questions || formData.questions.length === 0) {
      toast.error('الرجاء إضافة سؤال واحد على الأقل');
      return;
    }

    if (formData.duration! < 1) {
      toast.error('مدة الاختبار يجب أن تكون دقيقة واحدة على الأقل');
      return;
    }

    try {
      await createQuiz(formData as CreateQuizRequest).unwrap();
      toast.success('تم إنشاء الاختبار بنجاح');
      onSuccess();
      onClose();
      resetForm();
    } catch (error: any) {
      toast.error(error?.data?.message || 'حدث خطأ أثناء إنشاء الاختبار');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      instructions: '',
      trainingContentId: 0,
      duration: 60,
      passingScore: 50,
      maxAttempts: 3,
      startDate: '',
      endDate: '',
      shuffleQuestions: false,
      shuffleAnswers: false,
      showResults: true,
      showCorrectAnswers: false,
      isActive: true,
      isPublished: false,
      questions: [],
    });
    setNewQuestion({
      questionId: 0,
      order: 1,
      points: 1,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" dir="rtl">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">إضافة اختبار جديد</h2>
                <p className="text-blue-100 text-sm">أنشئ اختباراً مصغراً للمتدربين</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Body */}
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  المعلومات الأساسية
                </h3>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    عنوان الاختبار <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="مثال: اختبار البرمجة الأساسية"
                    required
                  />
                </div>

                {/* Program Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    البرنامج التدريبي <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedProgramId}
                    onChange={(e) => {
                      const programId = Number(e.target.value);
                      setSelectedProgramId(programId);
                      // Reset training content when program changes
                      handleInputChange('trainingContentId', 0);
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    disabled={isLoadingPrograms}
                  >
                    <option value={0}>
                      {isLoadingPrograms ? 'جاري التحميل...' : 'اختر البرنامج التدريبي'}
                    </option>
                    {programs && programs.map(program => (
                      <option key={program.id} value={program.id}>
                        {program.nameAr} ({program.code})
                      </option>
                    ))}
                  </select>
                  {isLoadingPrograms && (
                    <p className="text-xs text-gray-500 mt-1">جاري تحميل البرامج التدريبية...</p>
                  )}
                </div>

                {/* Training Content (filtered by program) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    المحتوى التدريبي (المادة) <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.trainingContentId}
                    onChange={(e) => handleInputChange('trainingContentId', Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                    disabled={isLoadingContents || selectedProgramId === 0}
                  >
                    <option value={0}>
                      {selectedProgramId === 0
                        ? 'اختر البرنامج التدريبي أولاً'
                        : 'اختر المحتوى التدريبي (المادة)'}
                    </option>
                    {trainingContents &&
                      trainingContents
                        .filter(content => content.programId === selectedProgramId)
                        .map(content => (
                          <option key={content.id} value={content.id}>
                            {content.name} ({content.code})
                          </option>
                        ))
                    }
                  </select>
                  {selectedProgramId === 0 && (
                    <p className="text-xs text-amber-600 mt-1">يجب اختيار البرنامج التدريبي أولاً</p>
                  )}
                  {selectedProgramId !== 0 && trainingContents &&
                    trainingContents.filter(c => c.programId === selectedProgramId).length === 0 && (
                    <p className="text-xs text-red-600 mt-1">لا توجد مواد تدريبية لهذا البرنامج</p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الوصف
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="وصف مختصر للاختبار..."
                  />
                </div>

                {/* Instructions */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    التعليمات
                  </label>
                  <textarea
                    value={formData.instructions}
                    onChange={(e) => handleInputChange('instructions', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={2}
                    placeholder="تعليمات الاختبار للمتدربين..."
                  />
                </div>
              </div>

              {/* Dates & Duration */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  التواريخ والمدة
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Start Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      تاريخ البداية <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="datetime-local"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* End Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      تاريخ النهاية <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="datetime-local"
                      value={formData.endDate}
                      onChange={(e) => handleInputChange('endDate', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Duration */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      المدة (بالدقائق) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.duration}
                      onChange={(e) => handleInputChange('duration', Number(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Passing Score */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      درجة النجاح (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={formData.passingScore}
                      onChange={(e) => handleInputChange('passingScore', Number(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Max Attempts */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      عدد المحاولات المسموح بها
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.maxAttempts}
                      onChange={(e) => handleInputChange('maxAttempts', Number(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Questions */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-4">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-600" />
                  الأسئلة <span className="text-red-500">*</span>
                </h3>

                {/* Add Question */}
                <div className="bg-white rounded-lg p-4 border-2 border-dashed border-gray-300">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div className="md:col-span-2">
                      <select
                        value={newQuestion.questionId}
                        onChange={(e) => setNewQuestion(prev => ({ ...prev, questionId: Number(e.target.value) }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      >
                        <option value={0}>اختر سؤال من بنك الأسئلة</option>
                        {availableQuestions.map(q => (
                          <option key={q.id} value={q.id}>
                            {q.questionText}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <input
                        type="number"
                        min="1"
                        value={newQuestion.points}
                        onChange={(e) => setNewQuestion(prev => ({ ...prev, points: Number(e.target.value) }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        placeholder="الدرجة"
                      />
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={handleAddQuestion}
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <Plus className="w-4 h-4" />
                        إضافة
                      </button>
                    </div>
                  </div>
                </div>

                {/* Questions List */}
                {formData.questions && formData.questions.length > 0 && (
                  <div className="space-y-2">
                    {formData.questions.map((q, index) => {
                      const question = availableQuestions.find(aq => aq.id === q.questionId);
                      return (
                        <div key={index} className="bg-white rounded-lg p-3 flex items-center justify-between border border-gray-200">
                          <div className="flex items-center gap-3 flex-1">
                            <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
                              {index + 1}
                            </span>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">{question?.questionText}</p>
                              <p className="text-xs text-gray-500">الدرجة: {q.points}</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveQuestion(q.questionId)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Settings */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <h3 className="font-bold text-gray-900">الإعدادات</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.shuffleQuestions}
                      onChange={(e) => handleInputChange('shuffleQuestions', e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">خلط ترتيب الأسئلة</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.shuffleAnswers}
                      onChange={(e) => handleInputChange('shuffleAnswers', e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">خلط ترتيب الإجابات</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.showResults}
                      onChange={(e) => handleInputChange('showResults', e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">عرض النتائج للمتدرب</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.showCorrectAnswers}
                      onChange={(e) => handleInputChange('showCorrectAnswers', e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">عرض الإجابات الصحيحة</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => handleInputChange('isActive', e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">الاختبار نشط</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isPublished}
                      onChange={(e) => handleInputChange('isPublished', e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">نشر الاختبار</span>
                  </label>
                </div>
              </div>
            </div>
          </form>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6 bg-gray-50 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              disabled={isLoading}
            >
              إلغاء
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Clock className="w-4 h-4 animate-spin" />
                  جاري الإنشاء...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  إنشاء الاختبار
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}