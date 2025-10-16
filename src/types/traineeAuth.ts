// ============================================
// Trainee Authentication Types
// ============================================

// ============================================
// Step 1: Verify Trainee
// ============================================

// Request DTO
export interface VerifyTraineeRequest {
  nationalId: string;
  birthDate: string; // YYYY-MM-DD format
}

// Success Response
export interface VerifyTraineeResponse {
  traineeId: number;
  nationalId: string;
  name: string;
  hasAccount: boolean;
  phoneHint: string | null;
}

// Error Response
export interface VerifyTraineeError {
  statusCode: number;
  message: string;
  error: string;
}

// UI-friendly format
export interface VerifyTraineeUI {
  traineeId: number;
  nationalId: string;
  name: string;
  hasAccount: boolean;
  phoneHint: string | null;
}

// ============================================
// Step 2: Verify Phone
// ============================================

// Request DTO
export interface VerifyPhoneRequest {
  nationalId: string;
  phone: string;
}

// Success Response
export interface VerifyPhoneResponse {
  success: boolean;
  message: string;
}

// Error Response
export interface VerifyPhoneError {
  statusCode: number;
  message: string;
  error: string;
}

// ============================================
// Step 3: Create Password
// ============================================

// Request DTO
export interface CreatePasswordRequest {
  nationalId: string;
  birthDate: string; // YYYY-MM-DD format
  password: string; // min 6 chars, must contain letters and numbers
}

// Success Response
export interface CreatePasswordResponse {
  success: boolean;
  message: string;
}

// ============================================
// Step 4: Trainee Login
// ============================================

// Request DTO
export interface TraineeLoginRequest {
  nationalId: string;
  password: string;
}

// Success Response
export interface TraineeLoginResponse {
  access_token: string;           // JWT token للمصادقة
  trainee: {                     // بيانات المتدرب الكاملة
    id: number;
    nameAr: string;
    nameEn?: string;
    nationalId: string;
    birthDate: Date;
    phone?: string;
    email?: string;
    address?: string;
    photoUrl?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    
    // معلومات البرنامج
    program: {
      id: number;
      nameAr: string;
      nameEn: string;
      code: string;
      duration: number;
      description?: string;
    };
    
    // سجلات الحضور (آخر 10)
    attendanceRecords: {
      id: number;
      status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';
      createdAt: Date;
      session: {
        id: number;
        title: string;
        startTime: Date;
        endTime: Date;
        content: {
          id: number;
          name: string;
          code: string;
        };
      };
    }[];
    
    // المدفوعات والرسوم
    traineePayments: {
      id: number;
      amount: number;
      paymentDate: Date;
      status: 'PENDING' | 'PAID' | 'OVERDUE';
      fee: {
        id: number;
        name: string;
        amount: number;
        dueDate: Date;
      };
    }[];
    
    // المستندات
    documents: {
      id: number;
      documentType: string;
      fileName: string;
      fileUrl: string;
      isVerified: boolean;
      uploadedAt: Date;
    }[];
  };
  sessionToken?: string;          // Session token للتتبع (اختياري)
}

// Error Response
export interface TraineeLoginError {
  statusCode: number;
  message: string;
  error: string;
}

// Error Response
export interface CreatePasswordError {
  statusCode: number;
  message: string;
  error: string;
}

