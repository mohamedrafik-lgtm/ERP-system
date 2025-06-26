import { IAddTrainengContent, ISemester, Year } from '@/interface';
import * as yup from 'yup';

export const trainingContentSchema: yup.ObjectSchema<IAddTrainengContent> = yup.object({
  code: yup.string().required('كود المادة مطلوب'),
  name: yup.string().required('اسم المادة مطلوب'),
  semester: yup.mixed<ISemester>().oneOf(Object.values(ISemester)).required('الفصل الدراسي مطلوب'),
  year: yup.mixed<Year>().oneOf(Object.values(Year)).required('السنة الدراسية مطلوبة'),
  programIds: yup
    .array()
    .of(yup.number().required())
    .min(1, 'اختر برنامجًا واحدًا على الأقل')
    .required('البرامج مطلوبة'),
  instructorId: yup.string().required('رقم المحاضر مطلوب'),
  theoryAttendanceRecorderId: yup.string().required('مسجل الحضور النظري مطلوب'),
  practicalAttendanceRecorderId: yup.string().required('مسجل الحضور العملي مطلوب'),
  durationMonths: yup.number().required('عدد الأشهر مطلوب'),
  theorySessionsPerWeek: yup.number().required('عدد الحصص النظرية مطلوب'),
  practicalSessionsPerWeek: yup.number().required('عدد الحصص العملية مطلوب'),
  chaptersCount: yup.number().required('عدد الفصول مطلوب'),
  yearWorkMarks: yup.number().required('أعمال السنة مطلوبة'),
  practicalMarks: yup.number().required('الدرجات العملية مطلوبة'),
  writtenMarks: yup.number().required('الدرجات التحريرية مطلوبة'),
  attendanceMarks: yup.number().required('درجات الحضور مطلوبة'),
  quizzesMarks: yup.number().required('درجات الاختبارات القصيرة مطلوبة'),
  finalExamMarks: yup.number().required('امتحان النهائي مطلوب'),
});
