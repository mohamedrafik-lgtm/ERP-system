import { MyScheduleResponse, WeekSchedule, ScheduleSlot, Classroom, Instructor, Content, DistributionRoom } from '@/types/schedule';

const mockInstructor: Instructor = {
  id: "1",
  name: "د. أحمد محمد"
};

const mockContent: Content = {
  id: 1,
  code: "CS101",
  name: "مقدمة في البرمجة",
  instructor: mockInstructor
};

const mockRoom: DistributionRoom = {
  id: "1",
  roomName: "قاعة المحاضرات",
  roomNumber: 101
};

const mockScheduleSlot: ScheduleSlot = {
  id: 1,
  content: mockContent,
  startTime: "09:00",
  endTime: "11:00",
  type: "THEORY",
  location: "المبنى الرئيسي",
  distributionRoom: mockRoom,
  isCancelledThisWeek: false
};

const mockPracticalSlot: ScheduleSlot = {
  id: 2,
  content: {
    id: 2,
    code: "CS101-LAB",
    name: "مختبر البرمجة",
    instructor: mockInstructor
  },
  startTime: "11:00",
  endTime: "13:00",
  type: "PRACTICAL",
  location: "مختبر الحاسوب",
  distributionRoom: {
    id: "2",
    roomName: "مختبر الحاسوب",
    roomNumber: 201
  },
  isCancelledThisWeek: false
};

const mockCancelledSlot: ScheduleSlot = {
  id: 3,
  content: {
    id: 3,
    code: "MATH101",
    name: "الرياضيات",
    instructor: {
      id: "2",
      name: "د. فاطمة علي"
    }
  },
  startTime: "14:00",
  endTime: "16:00",
  type: "THEORY",
  location: "المبنى الرئيسي",
  distributionRoom: mockRoom,
  isCancelledThisWeek: true,
  cancellationReason: "إجازة رسمية"
};

const mockClassroom: Classroom = {
  id: 1,
  name: "فصل البرمجة المتقدم",
  classNumber: 1,
  startDate: new Date("2024-01-15"),
  endDate: new Date("2024-06-15")
};

const mockWeekSchedule: WeekSchedule = {
  SUNDAY: [mockScheduleSlot],
  MONDAY: [mockPracticalSlot],
  TUESDAY: [mockCancelledSlot],
  WEDNESDAY: [mockScheduleSlot, mockPracticalSlot],
  THURSDAY: [mockScheduleSlot],
  FRIDAY: [],
  SATURDAY: []
};

export const mockScheduleData: MyScheduleResponse = {
  success: true,
  classroom: mockClassroom,
  schedule: mockWeekSchedule,
  message: "تم تحميل الجدول بنجاح"
};
