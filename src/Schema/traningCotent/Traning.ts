import * as yup from 'yup';
import { Semester, Year, ITrainingContentRequest } from '@/interface';
import { ObjectSchema } from 'yup';

export const trainingContentSchema: ObjectSchema<ITrainingContentRequest> = yup.object({
  code: yup.string().required('كود المحتوى مطلوب'),
  name: yup.string().required('اسم المحتوى التدريبي مطلوب'),

  semester: yup
    .mixed<Semester>()
    .oneOf(Object.values(Semester) as Semester[], 'الفصل الدراسي غير صالح')
    .required('الفصل الدراسي مطلوب'),

  year: yup
    .mixed<Year>()
    .oneOf(Object.values(Year) as Year[], 'السنة الدراسية غير صالحة')
    .required('السنة الدراسية مطلوبة'),

  programIds: yup
    .array()
    .of(yup.number().required('يجب تحديد البرنامج'))
    .min(1, 'اختر برنامجًا تدريبيًا واحدًا على الأقل')
    .optional(),

  instructorId: yup.string().required('المحاضر مطلوب'),
  theoryAttendanceRecorderId: yup.string().optional(),
  practicalAttendanceRecorderId: yup.string().optional(),

  durationMonths: yup.number().min(1).required('مدة البرنامج مطلوبة'),
  theorySessionsPerWeek: yup.number().min(0).required('عدد محاضرات النظري مطلوب'),
  practicalSessionsPerWeek: yup.number().min(0).required('عدد محاضرات العملي مطلوب'),
  chaptersCount: yup.number().min(1).required('عدد الفصول مطلوب'),

  yearWorkMarks: yup.number().min(0).max(100).required('درجات أعمال السنة مطلوبة'),
  practicalMarks: yup.number().min(0).max(100).required('درجات العملي مطلوبة'),
  writtenMarks: yup.number().min(0).max(100).required('درجات التحريري مطلوبة'),
  attendanceMarks: yup.number().min(0).max(100).required('درجات الحضور مطلوبة'),
  quizzesMarks: yup.number().min(0).max(100).required('درجات الاختبارات القصيرة مطلوبة'),
  finalExamMarks: yup.number().min(0).max(100).required('درجات الامتحان النهائي مطلوبة'),
});
