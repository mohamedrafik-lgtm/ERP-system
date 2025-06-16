import * as yup from "yup";
import { IFormValues } from "@/interface";

export const studentFormSchema: yup.ObjectSchema<IFormValues> = yup.object({
  nameArabic: yup.string().required("الاسم بالعربية مطلوب"),
  nameEnglish: yup.string().required("الاسم بالإنجليزية مطلوب"),
  admissionSystem: yup.string().required("نظام القبول مطلوب"),
  maritalState: yup.string().required("الحالة الاجتماعية مطلوبة"),
  marketer: yup.string().required("اسم المسوق مطلوب"),
  nationalId: yup
    .string()
    .required("الرقم القومي مطلوب")
    .matches(/^\d{14}$/, "يجب أن يكون الرقم القومي مكونًا من 14 رقمًا"),
    releaseDate: yup.string().required("تاريخ الإصدار مطلوب"),
    expirationDate: yup.string().required("تاريخ الانتهاء مطلوب"),
    programType: yup.string().required("نوع البرنامج مطلوب"),
  gender: yup.string().required("النوع مطلوب"),
  nationality: yup.string().required("الجنسية مطلوبة"),
  dateOfBirth: yup.string().required("تاريخ الميلاد مطلوب"),
  DateOfObtainingTheQualification: yup.string().required("تاريخ الحصول على المؤهل مطلوب"),
  placeOfBirth: yup.string().required("مكان الميلاد مطلوب"),
  religion: yup.string().required("الديانة مطلوبة"),
  program: yup.string().required("البرنامج مطلوب"),

  The_state: yup.string().required("الدولة مطلوبة"),
  Governorate: yup.string().required("المحافظة مطلوبة"),
  city: yup.string().required("المدينة مطلوبة"),
  address: yup.string().required("العنوان مطلوب"),
  mobileNumber: yup
    .string()
    .required("رقم الجوال مطلوب")
    .matches(/^01[0125][0-9]{8}$/, "رقم الجوال غير صالح"),
  email: yup.string().required("البريد الإلكتروني مطلوب").email("صيغة البريد الإلكتروني غير صحيحة"),
  ParentMobile: yup
    .string()
    .required("رقم ولي الأمر مطلوب")
    .matches(/^01[0125][0-9]{8}$/, "رقم ولي الأمر غير صالح"),
    ParentEmail: yup.string().email("صيغة البريد الإلكتروني لولي الأمر غير صحيحة").required("بريد ولي الأمر مطلوب"),
    GuardianJob: yup.string().required("وظيفة ولي الأمر مطلوبة"),
    RelationshipWithTheGuardian: yup.string().required("العلاقة مع ولي الأمر مطلوبة"),
  NationalIDOfTheGuardian: yup
    .string()
    .required("رقم قومي ولي الأمر مطلوب")
    .matches(/^\d{14}$/, "يجب أن يكون الرقم مكونًا من 14 رقمًا"),
  Landline: yup.string().nullable(),
  whatsapp: yup.string().nullable(),
  facebook: yup.string().nullable(),

  TypeOfEducation: yup.string().required("نوع التعليم مطلوب"),
  School_Center_Name: yup.string().required("اسم المدرسة/المركز مطلوب"),
  HighSchoolTotal: yup.string().required("مجموع الثانوية مطلوب"),
  HighSchoolPercentage: yup.string().required("نسبة الثانوية مطلوبة"),

  SportsActivity: yup.string().nullable(),
  CulturalAndArtisticActivity: yup.string().nullable(),
  ScientificActivity: yup.string().nullable(),
  comments: yup.string().nullable(),
});
