export interface Instructor {
  id: string;
  name: string;
}

export interface Content {
  id: number;
  code: string;
  name: string;
  instructor: Instructor;
}

export interface DistributionRoom {
  id: string;
  roomName: string;
  roomNumber: number;
}

export interface ScheduleSlot {
  id: number;
  content: Content;
  startTime: string;
  endTime: string;
  type: 'THEORY' | 'PRACTICAL';
  location?: string;
  distributionRoom?: DistributionRoom;
  isCancelledThisWeek: boolean;
  cancellationReason?: string;
}

export interface Classroom {
  id: number;
  name: string;
  classNumber: number;
  startDate: Date;
  endDate: Date;
}

export interface WeekSchedule {
  SUNDAY: ScheduleSlot[];
  MONDAY: ScheduleSlot[];
  TUESDAY: ScheduleSlot[];
  WEDNESDAY: ScheduleSlot[];
  THURSDAY: ScheduleSlot[];
  FRIDAY: ScheduleSlot[];
  SATURDAY: ScheduleSlot[];
}

export interface MyScheduleResponse {
  success: boolean;
  classroom: Classroom | null;
  schedule: WeekSchedule | null;
  message?: string;
}
