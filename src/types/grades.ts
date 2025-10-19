// Interfaces for grades system

export interface Program {
  id: number;
  nameAr: string;
  nameEn: string;
}

export interface Trainee {
  id: number;
  nameAr: string;
  nameEn: string;
  nationalId: string;
  program: Program;
}

export interface Classroom {
  id: number;
  name: string;
}

export interface TrainingContent {
  id: number;
  code: string;
  name: string;
  yearWorkMarks: number;
  practicalMarks: number;
  writtenMarks: number;
  attendanceMarks: number;
  quizzesMarks: number;
  finalExamMarks: number;
}

export interface GradeDetails {
  yearWorkMarks: number;
  practicalMarks: number;
  writtenMarks: number;
  attendanceMarks: number;
  quizzesMarks: number;
  finalExamMarks: number;
  totalMarks: number;
}

export interface MaxMarks {
  yearWorkMarks: number;
  practicalMarks: number;
  writtenMarks: number;
  attendanceMarks: number;
  quizzesMarks: number;
  finalExamMarks: number;
  total: number;
}

export interface ContentGrade {
  content: TrainingContent;
  grades: GradeDetails;
  maxMarks: MaxMarks;
  percentage: number;
}

export interface ClassroomStats {
  totalEarned: number;
  totalMax: number;
  contentCount: number;
  percentage: number;
}

export interface ClassroomGroup {
  classroom: Classroom;
  contents: ContentGrade[];
  stats: ClassroomStats;
}

export interface OverallStats {
  totalEarned: number;
  totalMax: number;
  percentage: number;
  totalContents: number;
}

export interface MyGradesResponse {
  trainee: Trainee;
  overallStats: OverallStats;
  classrooms: ClassroomGroup[];
}

// Export
export {
  MyGradesResponse,
  Trainee,
  Program,
  Classroom,
  TrainingContent,
  GradeDetails,
  MaxMarks,
  ContentGrade,
  ClassroomStats,
  ClassroomGroup,
  OverallStats
};
