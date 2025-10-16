// Quiz Types for Electronic Tests

export interface QuizResponse {
  id: number;
  title: string;
  description?: string;
  instructions?: string;
  startDate: Date;
  endDate: Date;
  duration: number;
  passingScore?: number;
  maxAttempts?: number;
  shuffleQuestions?: boolean;
  shuffleAnswers?: boolean;
  showResults?: boolean;
  showCorrectAnswers?: boolean;
  isActive: boolean;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  trainingContentId: number;
  
  // معلومات المحتوى التدريبي
  trainingContent: {
    id: number;
    name: string;
    code: string;
    classroom: {
      id: number;
      name: string;
    };
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

// Quiz Query Parameters
export interface QuizQueryParams {
  contentId?: string;
  page?: number;
  limit?: number;
  search?: string;
  status?: 'active' | 'draft' | 'completed' | 'all';
  isPublished?: boolean;
}

// Quiz List Response
export interface QuizListResponse {
  data: QuizResponse[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Quiz Create Request
export interface QuizCreateRequest {
  title: string;
  description?: string;
  instructions?: string;
  startDate: Date;
  endDate: Date;
  duration: number;
  passingScore?: number;
  maxAttempts?: number;
  shuffleQuestions?: boolean;
  shuffleAnswers?: boolean;
  showResults?: boolean;
  showCorrectAnswers?: boolean;
  isActive: boolean;
  isPublished: boolean;
  trainingContentId: number;
  questionIds: number[];
}

// Quiz Update Request
export interface QuizUpdateRequest extends Partial<QuizCreateRequest> {
  id: number;
}

// Quiz Statistics
export interface QuizStats {
  totalQuizzes: number;
  activeQuizzes: number;
  draftQuizzes: number;
  completedQuizzes: number;
  totalQuestions: number;
  totalAttempts: number;
  averageCompletionRate: number;
}

// Quiz Attempt (for future use)
export interface QuizAttempt {
  id: number;
  quizId: number;
  traineeId: number;
  score: number;
  maxScore: number;
  percentage: number;
  isPassed: boolean;
  timeSpent: number;
  startedAt: Date;
  completedAt: Date;
  answers: QuizAnswer[];
}

// Quiz Answer (for future use)
export interface QuizAnswer {
  id: number;
  questionId: number;
  answerId: number;
  isCorrect: boolean;
  timeSpent: number;
}

// Quiz Question (for future use)
export interface QuizQuestion {
  id: number;
  quizId: number;
  question: string;
  type: 'multiple_choice' | 'true_false' | 'fill_blank' | 'essay';
  points: number;
  order: number;
  isActive: boolean;
  answers: QuizQuestionAnswer[];
}

// Quiz Question Answer (for future use)
export interface QuizQuestionAnswer {
  id: number;
  questionId: number;
  answer: string;
  isCorrect: boolean;
  order: number;
}
