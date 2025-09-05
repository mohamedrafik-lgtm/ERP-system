// Types for Trainee Payment Details Page based on the API response

// أنواع الرسوم
export enum FeeType {
  TUITION = 'TUITION',       // رسوم دراسية أساسية
  SERVICES = 'SERVICES',     // خدمات
  TRAINING = 'TRAINING',     // تدريب
  ADDITIONAL = 'ADDITIONAL', // رسوم إضافية
}

// حالة الدفع
export enum PaymentStatus {
  PENDING = 'PENDING',           // قيد الانتظار
  PAID = 'PAID',                 // مدفوع
  PARTIALLY_PAID = 'PARTIALLY_PAID', // مدفوع جزئياً
  CANCELLED = 'CANCELLED',       // ملغي
}

// نوع التحويل المالي
export enum TransactionType {
  DEPOSIT = 'DEPOSIT',     // إيداع
  WITHDRAW = 'WITHDRAW',   // سحب
  TRANSFER = 'TRANSFER',   // تحويل بين حسابين
  FEE = 'FEE',             // رسوم متدربين
  PAYMENT = 'PAYMENT',     // دفع رسوم
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

// Interface للتحويل المالي
export interface Transaction {
  id: string;                    // معرف التحويل
  amount: number;                // قيمة التحويل
  type: TransactionType;         // نوع التحويل
  description?: string;          // وصف التحويل
  reference?: string;            // رقم مرجعي
  sourceId?: string;             // الحساب المصدر
  targetId?: string;             // الحساب الهدف
  traineeFeeId?: number;         // معرف رسوم المتدرب
  traineePaymentId?: number;     // معرف دفع المتدرب
  createdById?: string;          // المستخدم الذي أنشأ التحويل
  createdAt: Date;               // تاريخ الإنشاء
  updatedAt: Date;               // تاريخ التحديث
}

// Interface للرسوم
export interface TraineeFee {
  id: number;                    // معرف الرسوم
  name: string;                  // اسم الرسوم
  amount: number;                // قيمة الرسوم
  type: FeeType;                 // نوع الرسوم
  academicYear: string;          // العام الدراسي
  allowMultipleApply: boolean;   // السماح بتطبيق الرسوم أكثر من مرة
  programId: number;             // معرف البرنامج التدريبي
  safeId: string;                // معرف الخزينة
  isApplied: boolean;            // حالة التطبيق
  appliedAt?: Date;              // تاريخ التطبيق
  appliedById?: string;          // معرف من قام بالتطبيق
  createdAt: Date;               // تاريخ الإنشاء
  updatedAt: Date;               // تاريخ التحديث
}

// Interface الرئيسي لمدفوعات المتدرب
export interface TraineePayment {
  id: number;                    // معرف الدفع
  amount: number;                // المبلغ المطلوب دفعه
  status: PaymentStatus;         // حالة الدفع
  feeId: number;                 // معرف الرسوم
  traineeId: number;             // معرف المتدرب
  safeId: string;                // معرف الخزينة
  paidAmount: number;            // المبلغ المدفوع فعلياً
  paidAt?: Date;                 // تاريخ الدفع
  paidById?: string;             // معرف من سجل الدفع
  notes?: string;                // ملاحظات
  createdAt: Date;               // تاريخ الإنشاء
  updatedAt: Date;               // تاريخ التحديث
  fee: TraineeFee;              // بيانات الرسوم الكاملة
  safe: Safe;                   // بيانات الخزينة الكاملة
  transactions: Transaction[];   // التحويلات المالية المرتبطة
}

// Interface للـ response الكامل من الـ API
export type TraineePaymentsResponse = TraineePayment[];

// Interface للاستخدام في TypeScript/JavaScript
export interface TraineePaymentsApiResponse {
  data: TraineePayment[];
  success: boolean;
  message?: string;
}

// Interface للاستخدام في صفحة تفاصيل المدفوعات
export interface TraineePaymentDetailsResponse {
  trainee: {
    id: string;
    name: string;
    phone: string;
    profileImage?: string;
  };
  academicInfo: {
    program: string;
    registrationType: string;
    academicYear: string;
  };
  financialSummary: {
    totalFees: number;
    paidAmount: number;
    remainingAmount: number;
    paymentPercentage: number;
  };
  payments: TraineePayment[];
}

export interface SmartPaymentRequest {
  traineeId: string;
  amount: number;
  paymentMethod: 'CASH' | 'BANK_TRANSFER' | 'CREDIT_CARD';
  treasuryId: string;
  notes?: string;
}

export interface SmartPaymentResponse {
  success: boolean;
  message: string;
  paymentId?: string;
  distributedPayments: {
    feeId: string;
    amount: number;
    priority: number;
  }[];
}
