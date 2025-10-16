"use client";

import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { 
  ClipboardList, 
  Save, 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Target, 
  Settings, 
  BookOpen,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  Brain,
  CheckSquare
} from "lucide-react";
import { useCreateQuizMutation } from "@/lip/features/quiz/quizApi";
import { QuizCreateRequest } from "@/types/quiz.types";
import { useGetProgramsQuery } from "@/lip/features/program/program";
import { useGetTrainengContentQuery } from "@/lip/features/TraningContetn/Traning";
import { useGetQuestionsInTrainengContentQuery } from "@/lip/features/question/question";
import toast from "react-hot-toast";

// Schema for form validation
const quizSchema = yup.object({
  title: yup.string().required("عنوان الاختبار مطلوب").min(3, "العنوان يجب أن يكون 3 أحرف على الأقل"),
  description: yup.string().optional(),
  instructions: yup.string().optional(),
  startDate: yup.date().required("تاريخ البداية مطلوب").min(new Date(), "تاريخ البداية يجب أن يكون في المستقبل"),
  endDate: yup.date().required("تاريخ النهاية مطلوب").min(yup.ref('startDate'), "تاريخ النهاية يجب أن يكون بعد تاريخ البداية"),
  duration: yup.number().required("مدة الاختبار مطلوبة").min(1, "المدة يجب أن تكون دقيقة واحدة على الأقل").max(480, "المدة لا يمكن أن تتجاوز 8 ساعات"),
  passingScore: yup.number().optional().min(0, "درجة النجاح يجب أن تكون 0 أو أكثر").max(100, "درجة النجاح لا يمكن أن تتجاوز 100"),
  maxAttempts: yup.number().optional().min(1, "عدد المحاولات يجب أن يكون 1 على الأقل").max(10, "عدد المحاولات لا يمكن أن يتجاوز 10"),
  shuffleQuestions: yup.boolean().optional(),
  shuffleAnswers: yup.boolean().optional(),
  showResults: yup.boolean().optional(),
  showCorrectAnswers: yup.boolean().optional(),
  isActive: yup.boolean().optional(),
  isPublished: yup.boolean().optional(),
  programId: yup.number().required("البرنامج التدريبي مطلوب").min(1, "يرجى اختيار برنامج تدريبي صحيح"),
  trainingContentId: yup.number().required("المحتوى التدريبي مطلوب").min(1, "يرجى اختيار محتوى تدريبي صحيح"),
  selectedQuestions: yup.array().of(yup.number()).min(1, "يجب اختيار سؤال واحد على الأقل").required("الأسئلة مطلوبة"),
});

type QuizFormData = yup.InferType<typeof quizSchema>;

const CreateQuizPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Fetch programs and training content data
  const { data: programsData, isLoading: programsLoading } = useGetProgramsQuery();
  const { data: trainingContentsData, isLoading: contentLoading } = useGetTrainengContentQuery();
  
  // State for selected questions
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset
  } = useForm<QuizFormData>({
    resolver: yupResolver(quizSchema),
    defaultValues: {
      shuffleQuestions: false,
      shuffleAnswers: false,
      showResults: true,
      showCorrectAnswers: false,
      isActive: true,
      isPublished: false,
    }
  });

  // Watch programId to filter training content
  const selectedProgramId = watch("programId");
  const selectedTrainingContentId = watch("trainingContentId");
  
  // Filter training content based on selected program
  const filteredTrainingContent = trainingContentsData?.filter(
    content => content.programId === selectedProgramId
  ) || [];

  // Fetch questions for selected training content
  const { data: questionsData, isLoading: questionsLoading } = useGetQuestionsInTrainengContentQuery(
    { id: selectedTrainingContentId },
    { skip: !selectedTrainingContentId }
  );

  // Reset training content when program changes
  useEffect(() => {
    if (selectedProgramId) {
      setValue("trainingContentId", undefined as any);
      setSelectedQuestions([]);
    }
  }, [selectedProgramId, setValue]);

  // Reset selected questions when training content changes
  useEffect(() => {
    if (selectedTrainingContentId) {
      setSelectedQuestions([]);
    }
  }, [selectedTrainingContentId]);

  const [createQuiz, { isLoading }] = useCreateQuizMutation();

  // Watch form values for real-time updates
  const watchedValues = watch();

  const onSubmit: SubmitHandler<QuizFormData> = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Remove programId and selectedQuestions from data as they're not needed in the API request
      const { programId, selectedQuestions, ...quizData } = data;
      
      const finalQuizData: QuizCreateRequest = {
        ...quizData,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        // Add selected questions to the request
        questionIds: selectedQuestions,
      };

      console.log("🚀 Creating quiz with data:", finalQuizData);
      console.log("📝 Selected questions:", selectedQuestions);

      const result = await createQuiz(finalQuizData).unwrap();
      
      console.log("✅ Quiz created successfully:", result);
      
      toast.success("تم إنشاء الاختبار الإلكتروني بنجاح!");
      
      // Redirect to quizzes list
      router.push("/TrainingContentManagement/ElectronicTests");
      
    } catch (error: any) {
      console.error("❌ Error creating quiz:", error);
      
      const errorMessage = error?.data?.message || error?.message || "حدث خطأ أثناء إنشاء الاختبار";
      toast.error(`خطأ في إنشاء الاختبار: ${errorMessage}`);
      
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  // Handle question selection
  const handleQuestionToggle = (questionId: number) => {
    const newSelectedQuestions = selectedQuestions.includes(questionId)
      ? selectedQuestions.filter(id => id !== questionId)
      : [...selectedQuestions, questionId];
    
    setSelectedQuestions(newSelectedQuestions);
    setValue("selectedQuestions", newSelectedQuestions);
  };

  // Handle select all questions
  const handleSelectAll = () => {
    if (questionsData && questionsData.length > 0) {
      const allQuestionIds = questionsData.map(q => q.id);
      setSelectedQuestions(allQuestionIds);
      setValue("selectedQuestions", allQuestionIds);
    }
  };

  // Handle deselect all questions
  const handleDeselectAll = () => {
    setSelectedQuestions([]);
    setValue("selectedQuestions", []);
  };

  const formatDateForInput = (date: Date) => {
    return date.toISOString().slice(0, 16);
  };

  const getMinDateTime = () => {
    return formatDateForInput(new Date());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              العودة
            </button>
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
              <ClipboardList className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                إنشاء اختبار إلكتروني جديد
              </h1>
              <p className="text-gray-600 mt-1">قم بإنشاء اختبار إلكتروني شامل للمتدربين</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <form onSubmit={handleSubmit(onSubmit)} className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Basic Information */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">المعلومات الأساسية</h2>
                </div>

                {/* Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                    عنوان الاختبار *
                  </label>
                  <input
                    {...register("title")}
                    type="text"
                    id="title"
                    placeholder="مثال: اختبار البرمجة الأساسية"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    dir="rtl"
                  />
                  {errors.title && (
                    <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.title.message}</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                    وصف الاختبار
                  </label>
                  <textarea
                    {...register("description")}
                    id="description"
                    rows={3}
                    placeholder="وصف مختصر للاختبار..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                    dir="rtl"
                  />
                </div>

                {/* Instructions */}
                <div>
                  <label htmlFor="instructions" className="block text-sm font-semibold text-gray-700 mb-2">
                    تعليمات الاختبار
                  </label>
                  <textarea
                    {...register("instructions")}
                    id="instructions"
                    rows={4}
                    placeholder="تعليمات واضحة للمتدربين..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                    dir="rtl"
                  />
                </div>

                {/* Training Program */}
                <div>
                  <label htmlFor="programId" className="block text-sm font-semibold text-gray-700 mb-2">
                    البرنامج التدريبي *
                  </label>
                  <select
                    {...register("programId")}
                    id="programId"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    disabled={programsLoading}
                  >
                    <option value="">اختر البرنامج التدريبي</option>
                    {programsData?.map((program) => (
                      <option key={program.id} value={program.id}>
                        {program.nameAr} ({program.nameEn})
                      </option>
                    ))}
                  </select>
                  {errors.programId && (
                    <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.programId.message}</span>
                    </div>
                  )}
                </div>

                {/* Training Content */}
                <div>
                  <label htmlFor="trainingContentId" className="block text-sm font-semibold text-gray-700 mb-2">
                    المحتوى التدريبي *
                  </label>
                  <select
                    {...register("trainingContentId")}
                    id="trainingContentId"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    disabled={!selectedProgramId || contentLoading}
                  >
                    <option value="">
                      {!selectedProgramId 
                        ? "يرجى اختيار البرنامج التدريبي أولاً" 
                        : "اختر المحتوى التدريبي"
                      }
                    </option>
                    {filteredTrainingContent.map((content) => (
                      <option key={content.id} value={content.id}>
                        {content.name} ({content.code})
                      </option>
                    ))}
                  </select>
                  {errors.trainingContentId && (
                    <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.trainingContentId.message}</span>
                    </div>
                  )}
                </div>

                {/* Questions Selection */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-5 h-5 text-purple-600" />
                    <label className="block text-sm font-semibold text-gray-700">
                      اختيار الأسئلة من بنك الأسئلة *
                    </label>
                  </div>
                  
                  {!selectedTrainingContentId ? (
                    <div className="w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-xl text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                        <BookOpen className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-500">يرجى اختيار المحتوى التدريبي أولاً لعرض الأسئلة</p>
                    </div>
                  ) : questionsLoading ? (
                    <div className="w-full px-4 py-8 border border-gray-300 rounded-xl text-center">
                      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-gray-500">جاري تحميل الأسئلة...</p>
                    </div>
                  ) : questionsData && questionsData.length > 0 ? (
                    <div className="border border-gray-300 rounded-xl p-4 max-h-80 overflow-y-auto">
                      {/* Selection Controls */}
                      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-700">
                            تم اختيار {selectedQuestions.length} من {questionsData.length} سؤال
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={handleSelectAll}
                            className="flex items-center gap-1 px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                          >
                            <CheckSquare className="w-3 h-3" />
                            اختيار الكل
                          </button>
                          <button
                            type="button"
                            onClick={handleDeselectAll}
                            className="flex items-center gap-1 px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                          >
                            <CheckCircle className="w-3 h-3" />
                            إلغاء الكل
                          </button>
                        </div>
                      </div>

                      {/* Questions List */}
                      <div className="space-y-3">
                        {questionsData.map((question) => (
                          <div
                            key={question.id}
                            className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                              selectedQuestions.includes(question.id)
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                            onClick={() => handleQuestionToggle(question.id)}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 ${
                                selectedQuestions.includes(question.id)
                                  ? 'border-blue-500 bg-blue-500'
                                  : 'border-gray-300'
                              }`}>
                                {selectedQuestions.includes(question.id) && (
                                  <CheckCircle className="w-3 h-3 text-white" />
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-sm font-medium text-gray-900">
                                    {question.question}
                                  </span>
                                  <span className={`px-2 py-1 text-xs rounded-full ${
                                    question.type === 'MULTIPLE_CHOICE' 
                                      ? 'bg-green-100 text-green-700'
                                      : 'bg-purple-100 text-purple-700'
                                  }`}>
                                    {question.type === 'MULTIPLE_CHOICE' ? 'اختيار متعدد' : 'صحيح/خطأ'}
                                  </span>
                                </div>
                                <div className="text-xs text-gray-500">
                                  النقاط: {question.points || 1} | الصعوبة: {question.difficulty || 'متوسط'}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-xl text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                        <BookOpen className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-500 mb-2">لا توجد أسئلة متاحة</p>
                      <p className="text-sm text-gray-400">يرجى إضافة أسئلة للمحتوى التدريبي أولاً</p>
                    </div>
                  )}

                  {errors.selectedQuestions && (
                    <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.selectedQuestions.message}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Date and Time Settings */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">التوقيت والمدة</h2>
                </div>

                {/* Start Date */}
                <div>
                  <label htmlFor="startDate" className="block text-sm font-semibold text-gray-700 mb-2">
                    تاريخ البداية *
                  </label>
                  <input
                    {...register("startDate")}
                    type="datetime-local"
                    id="startDate"
                    min={getMinDateTime()}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                  {errors.startDate && (
                    <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.startDate.message}</span>
                    </div>
                  )}
                </div>

                {/* End Date */}
                <div>
                  <label htmlFor="endDate" className="block text-sm font-semibold text-gray-700 mb-2">
                    تاريخ النهاية *
                  </label>
                  <input
                    {...register("endDate")}
                    type="datetime-local"
                    id="endDate"
                    min={watchedValues.startDate ? formatDateForInput(new Date(watchedValues.startDate)) : getMinDateTime()}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                  {errors.endDate && (
                    <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.endDate.message}</span>
                    </div>
                  )}
                </div>

                {/* Duration */}
                <div>
                  <label htmlFor="duration" className="block text-sm font-semibold text-gray-700 mb-2">
                    مدة الاختبار (بالدقائق) *
                  </label>
                  <div className="relative">
                    <input
                      {...register("duration")}
                      type="number"
                      id="duration"
                      min="1"
                      max="480"
                      placeholder="60"
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <Clock className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  {errors.duration && (
                    <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.duration.message}</span>
                    </div>
                  )}
                </div>

                {/* Passing Score */}
                <div>
                  <label htmlFor="passingScore" className="block text-sm font-semibold text-gray-700 mb-2">
                    درجة النجاح (%)
                  </label>
                  <div className="relative">
                    <input
                      {...register("passingScore")}
                      type="number"
                      id="passingScore"
                      min="0"
                      max="100"
                      placeholder="70"
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <Target className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  {errors.passingScore && (
                    <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.passingScore.message}</span>
                    </div>
                  )}
                </div>

                {/* Max Attempts */}
                <div>
                  <label htmlFor="maxAttempts" className="block text-sm font-semibold text-gray-700 mb-2">
                    أقصى عدد محاولات
                  </label>
                  <input
                    {...register("maxAttempts")}
                    type="number"
                    id="maxAttempts"
                    min="1"
                    max="10"
                    placeholder="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                  {errors.maxAttempts && (
                    <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.maxAttempts.message}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Advanced Settings */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all duration-300 mb-6"
              >
                <Settings className="w-5 h-5" />
                <span className="font-semibold">الإعدادات المتقدمة</span>
                {showAdvanced ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>

              {showAdvanced && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-xl">
                  {/* Shuffle Questions */}
                  <div className="flex items-center justify-between">
                    <label htmlFor="shuffleQuestions" className="text-sm font-semibold text-gray-700">
                      خلط الأسئلة
                    </label>
                    <input
                      {...register("shuffleQuestions")}
                      type="checkbox"
                      id="shuffleQuestions"
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>

                  {/* Shuffle Answers */}
                  <div className="flex items-center justify-between">
                    <label htmlFor="shuffleAnswers" className="text-sm font-semibold text-gray-700">
                      خلط الإجابات
                    </label>
                    <input
                      {...register("shuffleAnswers")}
                      type="checkbox"
                      id="shuffleAnswers"
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>

                  {/* Show Results */}
                  <div className="flex items-center justify-between">
                    <label htmlFor="showResults" className="text-sm font-semibold text-gray-700">
                      عرض النتائج
                    </label>
                    <input
                      {...register("showResults")}
                      type="checkbox"
                      id="showResults"
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>

                  {/* Show Correct Answers */}
                  <div className="flex items-center justify-between">
                    <label htmlFor="showCorrectAnswers" className="text-sm font-semibold text-gray-700">
                      عرض الإجابات الصحيحة
                    </label>
                    <input
                      {...register("showCorrectAnswers")}
                      type="checkbox"
                      id="showCorrectAnswers"
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>

                  {/* Is Active */}
                  <div className="flex items-center justify-between">
                    <label htmlFor="isActive" className="text-sm font-semibold text-gray-700">
                      تفعيل الاختبار
                    </label>
                    <input
                      {...register("isActive")}
                      type="checkbox"
                      id="isActive"
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>

                  {/* Is Published */}
                  <div className="flex items-center justify-between">
                    <label htmlFor="isPublished" className="text-sm font-semibold text-gray-700">
                      نشر الاختبار
                    </label>
                    <input
                      {...register("isPublished")}
                      type="checkbox"
                      id="isPublished"
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-between pt-8 border-t border-gray-200 mt-8">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all duration-300 font-semibold"
              >
                إلغاء
              </button>
              
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => reset()}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all duration-300 font-semibold"
                >
                  إعادة تعيين
                </button>
                
                <button
                  type="submit"
                  disabled={isLoading || isSubmitting}
                  className="flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading || isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      جاري الإنشاء...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      إنشاء الاختبار
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateQuizPage;
