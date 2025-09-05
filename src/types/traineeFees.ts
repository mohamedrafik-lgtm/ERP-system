// Interface للـ response من endpoint /api/finances/trainee-fees

// أنواع الرسوم
export enum FeeType {
  TUITION = 'TUITION',       // رسوم دراسية أساسية
  SERVICES = 'SERVICES',     // خدمات
  TRAINING = 'TRAINING',     // تدريب
  ADDITIONAL = 'ADDITIONAL', // رسوم إضافية
}

// Interface للبرنامج التدريبي
export interface TrainingProgram {
  id: number;
  nameAr: string;           // الاسم بالعربية
  nameEn: string;           // الاسم بالإنجليزية
  price: number;            // سعر البرنامج
  description?: string;     // وصف البرنامج
  createdAt: Date;          // تاريخ الإنشاء
  updatedAt: Date;          // تاريخ التحديث
}

// Interface للخزينة
export interface Safe {
  id: string;               // معرف الخزينة
  name: string;             // اسم الخزينة
  description?: string;     // وصف الخزينة
  balance: number;          // الرصيد الحالي
  currency: string;         // العملة (افتراضي: EGP)
  isActive: boolean;        // حالة الخزينة
  createdAt: Date;          // تاريخ الإنشاء
  updatedAt: Date;          // تاريخ التحديث
}

// Interface الرئيسي لرسوم المتدربين
export interface TraineeFee {
  id: number;                           // معرف الرسوم
  name: string;                         // اسم الرسوم
  amount: number;                       // قيمة الرسوم
  type: FeeType;                        // نوع الرسوم
  academicYear: string;                 // العام الدراسي
  allowMultipleApply: boolean;          // السماح بتطبيق الرسوم أكثر من مرة
  programId: number;                    // معرف البرنامج التدريبي
  safeId: string;                       // معرف الخزينة
  isApplied: boolean;                   // حالة التطبيق
  appliedAt?: Date;                     // تاريخ التطبيق (اختياري)
  appliedById?: string;                 // معرف من قام بالتطبيق (اختياري)
  createdAt: Date;                      // تاريخ الإنشاء
  updatedAt: Date;                      // تاريخ التحديث
  program: TrainingProgram;             // بيانات البرنامج التدريبي الكاملة
  safe: Safe;                          // بيانات الخزينة الكاملة
}

// Interface للـ response الكامل من الـ API
export type TraineeFeesResponse = TraineeFee[];

// Interface للاستخدام في TypeScript/JavaScript
export interface TraineeFeesApiResponse {
  data: TraineeFee[];
  success: boolean;
  message?: string;
}
