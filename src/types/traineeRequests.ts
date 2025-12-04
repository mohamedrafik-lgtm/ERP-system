// Trainee Request Types

export type TraineeRequestType = 'EXAM_POSTPONE' | 'SICK_LEAVE' | 'ENROLLMENT_PROOF' | 'CERTIFICATE';
export type TraineeRequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export type ExamType = 'MIDTERM' | 'FINAL';

export interface TraineeRequest {
  // بيانات الطلب الأساسية
  id: string;
  traineeId: number;
  
  // نوع الطلب
  type: TraineeRequestType;
  
  // تفاصيل الطلب
  reason: string;
  attachmentUrl: string | null;
  attachmentCloudinaryId: string | null;
  
  // بيانات خاصة بتأجيل الاختبار
  examType: ExamType | null;
  examDate: Date | string | null;
  
  // حالة الطلب
  status: TraineeRequestStatus;
  
  // رد الإدارة
  reviewedBy: string | null;
  reviewedAt: Date | string | null;
  adminResponse: string | null;
  adminNotes: string | null;
  
  createdAt: Date | string;
  updatedAt: Date | string;
  
  // بيانات المتدرب
  trainee: {
    id: number;
    nameAr: string;
    nationalId: string;
    phone: string;
    photoUrl: string | null;
    program: {
      nameAr: string;
    };
  };
  
  // بيانات المراجع
  reviewer: {
    id: string;
    name: string;
  } | null;
}

export interface TraineeRequestsResponse {
  data: TraineeRequest[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface UpdateTraineeRequestPayload {
  id: string;
  status: 'APPROVED' | 'REJECTED';
  adminResponse?: string;
  adminNotes?: string;
}