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

// Error Response
export interface CreatePasswordError {
  statusCode: number;
  message: string;
  error: string;
}

