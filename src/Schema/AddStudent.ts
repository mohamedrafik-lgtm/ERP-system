import * as yup from 'yup';
import { IStudentRequest } from '@/interface';

// Validation aligned to CreateTraineePayload (IStudentRequest)
export const studentSchema: yup.ObjectSchema<IStudentRequest> = yup.object({
  // Required basic
  nameAr: yup.string().required('الاسم بالعربية مطلوب'),
  nameEn: yup.string().required('الاسم بالإنجليزية مطلوب'),
  gender: yup.string().oneOf(['MALE', 'FEMALE']).required('النوع مطلوب'),
  maritalStatus: yup
    .string()
    .oneOf(['SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED'])
    .required('الحالة الاجتماعية مطلوبة'),
  enrollmentType: yup
    .string()
    .oneOf(['REGULAR', 'DISTANCE', 'BOTH'])
    .required('نوع القيد مطلوب'),
  programType: yup
    .string()
    .oneOf(['SUMMER', 'WINTER', 'ANNUAL'])
    .required('نوع البرنامج مطلوب'),

  educationType: yup
    .string()
    .oneOf([
      'PREPARATORY',
      'INDUSTRIAL_SECONDARY',
      'COMMERCIAL_SECONDARY',
      'AGRICULTURAL_SECONDARY',
      'AZHAR_SECONDARY',
      'GENERAL_SECONDARY',
      'UNIVERSITY',
      'INDUSTRIAL_APPRENTICESHIP',
    ])
    .required('نوع التعليم مطلوب'),

  // Optional academic/status
  traineeStatus: yup.string().oneOf(['NEW', 'CURRENT', 'GRADUATE', 'WITHDRAWN']).optional(),
  classLevel: yup.string().oneOf(['FIRST', 'SECOND', 'THIRD', 'FOURTH']).optional(),
  academicYear: yup.string().optional(),

  // Non-enum fields
  programId: yup.number().typeError('رقم البرنامج مطلوب').required(),
  totalGrade: yup.number().optional(),
  gradePercentage: yup.number().optional(),
  nationalId: yup.string().min(14).max(14).required('الرقم القومي مطلوب'),
  nationality: yup.string().required('الجنسية مطلوبة'),
  birthDate: yup.string().required('تاريخ الميلاد مطلوب'),
  idIssueDate: yup.string().required('تاريخ إصدار البطاقة مطلوب'),
  idExpiryDate: yup.string().required('تاريخ انتهاء البطاقة مطلوب'),

  country: yup.string().required('الدولة مطلوبة'),
  city: yup.string().required('المدينة مطلوبة'),
  governorate: yup.string().optional(),
  address: yup.string().required('العنوان مطلوب'),
  residenceAddress: yup.string().required('عنوان الإقامة مطلوب'),

  phone: yup.string().required('الهاتف مطلوب'),
  email: yup.string().optional(),
  landline: yup.string().optional(),
  whatsapp: yup.string().optional(),
  facebook: yup.string().optional(),

  guardianPhone: yup.string().required('هاتف ولي الأمر مطلوب'),
  guardianEmail: yup.string().optional(),
  guardianJob: yup.string().optional(),
  guardianRelation: yup.string().required('صلة القرابة مطلوبة'),
  guardianName: yup.string().required('اسم ولي الأمر مطلوب'),

  schoolName: yup.string().required('اسم المدرسة مطلوب'),
  graduationDate: yup.string().required('تاريخ التخرج مطلوب'),

  photoUrl: yup.string().optional(),
  religion: yup.string().oneOf(['ISLAM', 'CHRISTIANITY', 'JUDAISM']).optional(),
});
