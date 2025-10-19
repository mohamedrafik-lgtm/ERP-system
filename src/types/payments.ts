// Types for trainee payments system

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  PARTIALLY_PAID = 'PARTIALLY_PAID',
  CANCELLED = 'CANCELLED'
}

export enum FeeType {
  TUITION = 'TUITION',
  SERVICES = 'SERVICES',
  TRAINING = 'TRAINING',
  ADDITIONAL = 'ADDITIONAL'
}

export enum SafeCategory {
  DEBT = 'DEBT',
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
  ASSETS = 'ASSETS',
  UNSPECIFIED = 'UNSPECIFIED'
}

export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAW = 'WITHDRAW',
  TRANSFER = 'TRANSFER',
  TRANSFER_IN = 'TRANSFER_IN',
  TRANSFER_OUT = 'TRANSFER_OUT',
  FEE = 'FEE',
  PAYMENT = 'PAYMENT'
}

export interface Safe {
  id: string;
  name: string;
  description?: string;
  category: SafeCategory;
  type: SafeCategory;
  balance: number;
  currency: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TraineeFee {
  id: number;
  name: string;
  amount: number;
  type: FeeType;
  academicYear: string;
  allowMultipleApply: boolean;
  programId: number;
  safeId: string;
  isApplied: boolean;
  appliedAt?: string;
  appliedById?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  description?: string;
  reference?: string;
  sourceId?: string;
  targetId?: string;
  traineeFeeId?: number;
  traineePaymentId?: number;
  createdById?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TraineePayment {
  id: number;
  amount: number;
  status: PaymentStatus;
  feeId: number;
  traineeId: number;
  safeId: string;
  paidAmount: number;
  paidAt?: string;
  paidById?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  fee: TraineeFee;
  safe: Safe;
  transactions: Transaction[];
}

export type TraineePaymentsResponse = TraineePayment[];

// All types are already exported above
