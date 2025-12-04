// Payment Deferral Request Types

export type DeferralRequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface DeferralRequest {
  // بيانات الطلب الأساسية
  id: string;
  traineeId: number;
  feeId: number;
  reason: string;
  requestedExtensionDays: number;
  requestedDeadline: Date | string | null;
  status: DeferralRequestStatus;
  
  // رد الإدارة
  reviewedBy: string | null;
  reviewedAt: Date | string | null;
  adminResponse: string | null;
  adminNotes: string | null;
  createdExceptionId: string | null;
  
  createdAt: Date | string;
  updatedAt: Date | string;
  
  // بيانات المتدرب
  trainee: {
    id: number;
    nameAr: string;
    nationalId: string;
    phone: string;
    program: {
      nameAr: string;
    };
  };
  
  // بيانات الرسم
  fee: {
    id: number;
    name: string;
    amount: number;
  };
  
  // بيانات المراجع
  reviewer: {
    id: string;
    name: string;
  } | null;
}

export interface DeferralRequestsResponse {
  data: DeferralRequest[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface DeferralRequestsQueryParams {
  page?: number;
  limit?: number;
  status?: DeferralRequestStatus | 'ALL';
  search?: string;
}

export interface UpdateDeferralRequestPayload {
  id: string;
  status: 'APPROVED' | 'REJECTED';
  adminResponse?: string;
  adminNotes?: string;
}