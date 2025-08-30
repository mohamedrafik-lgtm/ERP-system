import * as yup from 'yup';
import {
  Gender,
  maritalStatus,
  enrollmentType,
  programType,
  Religion,
  IEducationType,
  ITraineeStatus,
  IClassLevel,
  IStudentRequest
} from '@/interface';

export const studentSchema: yup.ObjectSchema<IStudentRequest> = yup.object({
  nameAr: yup.string().required("الاسم بالعربية مطلوب"),
  nameEn: yup.string().required("الاسم بالإنجليزية مطلوب"),
  gender: yup.mixed<Gender>().oneOf([Gender.MALE, Gender.FEMALE]).required("النوع مطلوب"),
  maritalStatus: yup
    .mixed<maritalStatus>()
    .oneOf([
      maritalStatus.SINGLE,
      maritalStatus.MARRIED,
      maritalStatus.DIVORCED,
      maritalStatus.WIDOWED
    ])
    .required("الحالة الاجتماعية مطلوبة"),
  enrollmentType: yup
    .mixed<enrollmentType>()
    .oneOf([
      enrollmentType.REGULAR,
      enrollmentType.DISTANCE,
      enrollmentType.BOTH
    ])
    .required("نوع القيد مطلوب"),
  programType: yup
    .mixed<programType>()
    .oneOf([programType.SUMMER, programType.WINTER, programType.ANNUAL])
    .required("نوع البرنامج مطلوب"),
  religion: yup.mixed<Religion>().oneOf([Religion.ISLAM, Religion.CHRISTIANITY]).required("الديانة مطلوبة"),
  educationType: yup
  .mixed<IEducationType>()
  .oneOf(Object.values(IEducationType))
  .required('نوع التعليم مطلوب'),

  traineeStatus: yup
    .mixed<ITraineeStatus>()
    .oneOf([ITraineeStatus.NEW, ITraineeStatus.CONTINUING, ITraineeStatus.GRADUATE])
    .required("حالة المتدرب مطلوبة"),
  classLevel: yup
    .mixed<IClassLevel>()
    .oneOf([
      IClassLevel.FIRST,
      IClassLevel.SECOND,
      IClassLevel.THIRD,
      IClassLevel.FOURTH
    ])
    .required("الصف الدراسي مطلوب"),

  // بقية الحقول اللي مش enums
  programId: yup.number().typeError("رقم البرنامج مطلوب").required(),
  totalGrade: yup.number().typeError("المجموع الكلي مطلوب").required(),
  gradePercentage: yup.number().typeError("النسبة المئوية مطلوبة").required(),
  nationalId: yup.string().min(14).max(14).required(),
  nationality: yup.string().required(),
  birthDate: yup.string().required(),
  idIssueDate: yup.string().required(),
  idExpiryDate: yup.string().required(),

  country: yup.string().required(),
  city: yup.string().required(),
  governorate: yup.string().required(),
  address: yup.string().required(),
  residenceAddress: yup.string().required(),

  phone: yup.string().required(),
  email: yup.string().required(),
  landline: yup.string().required(),
  whatsapp: yup.string().required(),
  facebook: yup.string().required(),

  guardianPhone: yup.string().required(),
  guardianEmail: yup.string().required(),
  guardianJob: yup.string().required(),
  guardianRelation: yup.string().required(),
  guardianNationalId: yup.string().min(14).max(14).required(),

  schoolName: yup.string().required(),
  graduationDate: yup.string().required(),


  photoUrl: yup.string().required(),

});
