// Types for quizzes system

export interface Classroom {
  id: number;
  name: string;
}

export interface TrainingContent {
  id: number;
  name: string;
  code: string;
  classroom: Classroom;
}

export interface QuizResult {
  id: string;
  score: number;
  percentage: number;
  passed: boolean;
  submittedAt: string;
}

export interface QuizCount {
  questions: number;
}

export type QuizStatus = 'upcoming' | 'available' | 'completed' | 'ended';

export interface AvailableQuiz {
  id: number;
  title: string;
  description?: string;
  instructions?: string;
  startDate: string;
  endDate: string;
  duration: number;
  passingScore: number;
  maxAttempts: number;
  shuffleQuestions: boolean;
  shuffleAnswers: boolean;
  showResults: boolean;
  showCorrectAnswers: boolean;
  isActive: boolean;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  trainingContent: TrainingContent;
  _count: QuizCount;
  isCompleted: boolean;
  hasInProgress: boolean;
  result: QuizResult | null;
  status: QuizStatus;
  canAttempt: boolean;
}

export type AvailableQuizzesResponse = AvailableQuiz[];

// Export
export {
  AvailableQuizzesResponse,
  AvailableQuiz,
  TrainingContent,
  Classroom,
  QuizResult,
  QuizCount,
  QuizStatus
};
