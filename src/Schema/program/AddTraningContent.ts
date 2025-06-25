import * as yup from 'yup';
import { Semester, Year, ITrainingContentRequest } from '@/interface';

const schema = yup.object({
  code: yup.string().required(),
  name: yup.string().required(),
  semester: yup.mixed<Semester>().required(),
  year: yup.mixed<Year>().required(),
  programIds: yup.array(yup.number().required()).optional(),
  instructorId: yup.string().required(),
  theoryAttendanceRecorderId: yup.string().optional(),
  practicalAttendanceRecorderId: yup.string().optional(),
  durationMonths: yup.number().required(),
  theorySessionsPerWeek: yup.number().required(),
  practicalSessionsPerWeek: yup.number().required(),
  chaptersCount: yup.number().required(),
  yearWorkMarks: yup.number().required(),
  practicalMarks: yup.number().required(),
  writtenMarks: yup.number().required(),
  attendanceMarks: yup.number().required(),
  quizzesMarks: yup.number().required(),
  finalExamMarks: yup.number().required()
});

export const trainingContentSchema: yup.ObjectSchema<ITrainingContentRequest> = schema;
