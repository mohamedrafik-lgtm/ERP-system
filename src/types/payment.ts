export interface TraineePaymentResponse {
  id: number; // معرف الدفعة
  amount: number; // المبلغ المطلوب
  status: 'PENDING' | 'PARTIALLY_PAID' | 'PAID'; // حالة الدفع
  paidAmount: number; // المبلغ المدفوع فعليًا
  paidAt?: string; // تاريخ الدفع (اختياري)
  notes?: string; // ملاحظات إضافية (اختياري)
  fee: FeeDetails; // تفاصيل الرسوم المرتبطة بالدفعة
  trainee: TraineeDetails; // تفاصيل المتدرب المرتبط بالدفعة
  safe: SafeDetails; // تفاصيل الخزينة المرتبطة بالدفع
  transactions: TransactionDetails[]; // قائمة المعاملات المرتبطة بالدفعة
}

export interface FeeDetails {
  id: number; // معرف الرسوم
  name: string; // اسم الرسوم
  amount: number; // قيمة الرسوم
  type: string; // نوع الرسوم
}

export interface TraineeDetails {
  id: number; // معرف المتدرب
  nameAr: string; 
  phone: string;
}

export interface SafeDetails {
  id: string; // معرف الخزينة
  name: string; // اسم الخزينة
}

export interface TransactionDetails {
  id: string; // معرف المعاملة
  amount: number; // قيمة المعاملة
  type: string; // نوع المعاملة
  createdAt: string; // تاريخ إنشاء المعاملة
}

// Legacy interface for backward compatibility
export interface Payment {
  id: number;
  procedure: string;
  trainee: string;
  fees: number;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  status: 'paid' | 'partial' | 'unpaid';
  date: string;
  traineeId: string;
}

export interface PaymentStats {
  total: number;
  paid: number;
  remaining: number;
  totalCount: number;
  paidCount: number;
  partialCount: number;
  unpaidCount: number;
}

export interface PaymentFilters {
  searchTerm: string;
  statusFilter: string;
  sortBy: string;
}

export interface Treasury {
  id: string;
  name: string;
  balance: number;
}

export interface PaymentFormData {
  amount: number;
  treasury: string;
  notes?: string;
}
