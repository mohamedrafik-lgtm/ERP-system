// Attendance Status Types
export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';
export type SessionType = 'THEORY' | 'PRACTICAL';

// Attendance Record
export interface AttendanceRecord {
  id: string;
  sessionId: number;
  traineeId: number;
  status: AttendanceStatus;
  notes: string | null;
  recordedBy: string;
  updatedBy: string | null;
  recordedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  
  session: {
    id: number;
    date: Date;
    startTime: string;
    endTime: string;
    isCancelled: boolean;
    scheduleSlot: {
      id: number;
      type: SessionType;
      content: {
        id: number;
        name: string;
        code: string | null;
      };
      classroom: {
        id: number;
        name: string;
        classNumber: string | null;
      } | null;
    };
  };
  
  recordedByUser: {
    id: string;
    name: string;
  } | null;
}

// Attendance Stats
export interface AttendanceStats {
  total: number;
  present: number;
  absent: number;
  late: number;
  excused: number;
}

// Content Attendance
export interface ContentAttendance {
  content: {
    id: number;
    name: string;
    code: string | null;
  };
  classroom: {
    id: number;
    name: string;
    classNumber: string | null;
  } | null;
  stats: AttendanceStats;
  records: AttendanceRecord[];
}

// Trainee Attendance Details Response
export interface TraineeAttendanceDetailsResponse {
  trainee: {
    id: number;
    nameAr: string;
    nameEn: string | null;
    nationalId: string;
    email: string | null;
    phone: string;
    photoUrl: string | null;
    program: {
      id: number;
      nameAr: string;
    };
  };
  
  stats: AttendanceStats;
  byContent: ContentAttendance[];
  allRecords: AttendanceRecord[];
}
