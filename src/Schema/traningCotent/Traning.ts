import * as yup from 'yup';

export const trainingContentSchema = yup.object().shape({
  code: yup.string().required('كود المادة مطلوب'),
  name: yup.string().required('اسم المادة مطلوب'),

  semester: yup.mixed<"FIRST" | "SECOND">()
    .oneOf(["FIRST", "SECOND"], 'الفصل الدراسي غير صالح')
    .required('الفصل الدراسي مطلوب'),

  year: yup.mixed<"FIRST" | "SECOND" | "THIRD" | "FOURTH">()
    .oneOf(["FIRST", "SECOND", "THIRD", "FOURTH"], 'السنة الدراسية غير صالحة')
    .required('السنة الدراسية مطلوبة'),

  programIds: yup.array()
    .of(yup.number().typeError('رقم البرنامج يجب أن يكون رقم'))
    .min(1, 'يجب اختيار برنامج واحد على الأقل'),

  instructorId: yup.string().required('رقم المحاضر مطلوب'),
  theoryAttendanceRecorderId: yup.string().required('مسجل الحضور النظري مطلوب'),
  practicalAttendanceRecorderId: yup.string().required('مسجل الحضور العملي مطلوب'),

  durationMonths: yup.number().typeError('عدد الأشهر يجب أن يكون رقم').required('عدد الأشهر مطلوب').min(1, 'يجب أن يكون على الأقل 1'),
  theorySessionsPerWeek: yup.number().typeError('عدد الحصص النظرية يجب أن يكون رقم').required().min(1),
  practicalSessionsPerWeek: yup.number().typeError('عدد الحصص العملية يجب أن يكون رقم').required().min(1),
  chaptersCount: yup.number().typeError('عدد الفصول يجب أن يكون رقم').required().min(1),

  yearWorkMarks: yup.number().typeError('درجات أعمال السنة يجب أن تكون رقم').required().min(0),
  practicalMarks: yup.number().typeError('الدرجات العملية يجب أن تكون رقم').required().min(0),
  writtenMarks: yup.number().typeError('الدرجات التحريرية يجب أن تكون رقم').required().min(0),
  attendanceMarks: yup.number().typeError('درجات الحضور يجب أن تكون رقم').required().min(0),
  quizzesMarks: yup.number().typeError('درجات الاختبارات القصيرة يجب أن تكون رقم').required().min(0),
  finalExamMarks: yup.number().typeError('درجات الامتحان النهائي يجب أن تكون رقم').required().min(0),
});
