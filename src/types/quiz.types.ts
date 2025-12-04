// Quiz Types - أنواع الاختبارات المصغرة

export interface Quiz {
  // معلومات الاختبار الأساسية
  id: number;
  title: string;
  description: string | null;
  duration: number;              // بالدقائق
  passingScore: number;          // النسبة المئوية للنجاح
  startDate: Date;
  endDate: Date;
  isPublished: boolean;
  isActive: boolean;
  shuffleQuestions: boolean;
  shuffleAnswers: boolean;
  showResults: boolean;
  showCorrectAnswers: boolean;
  allowReview: boolean;
  trainingContentId: number;
  createdAt: Date;
  updatedAt: Date;

  // المحتوى التدريبي المرتبط
  trainingContent: {
    id: number;
    name: string;
    code: string;
    
    // الفصل الدراسي
    classroom: {
      id: number;
      name: string;
    };
    
    // البرنامج التدريبي
    program: {
      id: number;
      nameAr: string;
      nameEn: string;
    };
  };

  // إحصائيات
  _count: {
    questions: number;    // عدد الأسئلة
    attempts: number;     // عدد المحاولات
  };
}

export interface QuizzesResponse {
  data: Quiz[];
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface QuizFilters {
  search?: string;
  isPublished?: boolean;
  isActive?: boolean;
  programId?: number;
  trainingContentId?: number;
  page?: number;
  limit?: number;
}

export interface QuizStats {
  totalQuizzes: number;
  publishedQuizzes: number;
  activeQuizzes: number;
  totalQuestions: number;
  totalAttempts: number;
}

export interface QuizQuestion {
  questionId: number;
  order?: number;
  points?: number;
}

export interface CreateQuizRequest {
  // ✅ حقول إجبارية (Required)
  trainingContentId: number;      // معرف المحتوى التدريبي
  title: string;                  // عنوان الاختبار
  startDate: string;              // تاريخ البداية (ISO 8601 format)
  endDate: string;                // تاريخ النهاية (ISO 8601 format)
  duration: number;               // مدة الاختبار بالدقائق (min: 1)
  questions: QuizQuestion[];      // قائمة الأسئلة

  // ⚪ حقول اختيارية (Optional)
  description?: string;           // وصف الاختبار
  instructions?: string;          // تعليمات الاختبار
  passingScore?: number;          // درجة النجاح % (0-100)
  maxAttempts?: number;           // عدد المحاولات المسموح بها (min: 1)
  shuffleQuestions?: boolean;     // خلط ترتيب الأسئلة
  shuffleAnswers?: boolean;       // خلط ترتيب الإجابات
  showResults?: boolean;          // عرض النتائج للمتدرب
  showCorrectAnswers?: boolean;   // عرض الإجابات الصحيحة
  isActive?: boolean;             // هل الاختبار نشط
  isPublished?: boolean;          // هل تم نشر الاختبار
}

export interface UpdateQuizRequest extends Partial<CreateQuizRequest> {
  id: number;
}

// For fetching training contents
export interface TrainingContent {
  id: number;
  name: string;
  code: string;
}

// For fetching questions from question bank
export interface QuestionBankItem {
  id: number;
  questionText: string;
  type: string;
  difficulty?: string;
}
