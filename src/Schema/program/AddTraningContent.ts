import * as yup from "yup";

export const trainingContentSchema = yup.object({
  contentName: yup.string().required("اسم المحتوى مطلوب"),
  code: yup.string().required("كود المحتوى مطلوب"),
  semester: yup.string().oneOf(["FIRST", "SECOND"]).required("الفصل الدراسي مطلوب"),
  year: yup.string().oneOf(["FIRST", "SECOND", "THIRD", "FOURTH"]).required("السنة الدراسية مطلوبة"),
  linkedPrograms: yup.array().of(yup.string()).min(1, "اختر برنامج واحد على الأقل"),
  studyProgram: yup.string().required("البرنامج الدراسي مطلوب"),
  teacherName: yup.string().required("اسم الأستاذ مطلوب"),
  units: yup.number().min(1, "عدد الأبواب يجب أن يكون على الأقل 1").required("عدد الأبواب مطلوب"),
  theoryDuration: yup.number().min(1).required("مدة النظري مطلوبة"),
  theoryAttendance: yup.number().min(0).required("عدد حضور النظري مطلوب"),
  practicalAttendance: yup.number().min(0).required("عدد حضور العملي مطلوب"),
  yearWork: yup.number().min(0).max(100).required(),
  practical: yup.number().min(0).max(100).required(),
  written: yup.number().min(0).max(100).required(),
  platformLecture: yup.number().min(0).max(100).required(),
  platformExam: yup.number().min(0).max(100).required(),
  finalGrades: yup.number().min(0).max(100).required(),
  theoryManager: yup.string().required("اختر مسؤول الحضور النظري"),
  practicalManager: yup.string().required("اختر مسؤول الحضور العملي"),
}).test("total-marks", "مجموع الدرجات يجب أن يكون 100", (values) => {
  const total =
    (values.yearWork || 0) +
    (values.practical || 0) +
    (values.written || 0) +
    (values.platformLecture || 0) +
    (values.platformExam || 0) +
    (values.finalGrades || 0);
  return total === 100;
});
