// Enums
export enum AttendanceStatus {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  LATE = 'LATE',
  EXCUSED = 'EXCUSED'
}

export enum DayOfWeek {
  SUNDAY = 'SUNDAY',
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY'
}

export enum SessionType {
  THEORY = 'THEORY',
  PRACTICAL = 'PRACTICAL'
}

// Interfaces
export interface TrainingProgram {
  id: number;
  nameAr: string;
  nameEn: string;
  price: number;
  description?: string;
  numberOfClassrooms: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Classroom {
  id: number;
  name: string;
  classNumber: number;
  startDate: Date;
  endDate: Date;
}

export interface Trainee {
  id: number;
  nameAr: string;
  nameEn: string;
  nationalId: string;
  photoUrl?: string;
  program: TrainingProgram;
  classroom: Classroom;
}

export interface AttendanceStats {
  total: number;
  present: number;
  absent: number;
  late: number;
  excused: number;
  attendanceRate: number;
}

export interface SessionRecord {
  id: string;
  sessionId: number;
  date: Date;
  dayOfWeek: DayOfWeek;
  sessionType: SessionType;
  status: AttendanceStatus;
  isCancelled: boolean;
  notes?: string;
  createdAt: Date;
}

export interface Content {
  id: number;
  nameAr: string;
  nameEn: string;
}

export interface ContentGroup {
  content: Content;
  sessions: SessionRecord[];
  stats: AttendanceStats;
}

export interface AttendanceRecordsResponse {
  trainee: Trainee;
  stats: AttendanceStats;
  contentGroups: ContentGroup[];
}
