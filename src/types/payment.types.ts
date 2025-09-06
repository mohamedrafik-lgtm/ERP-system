// Interface Segregation Principle - تقسيم interfaces كبيرة إلى أصغر

export interface IPaymentSplit {
  amountPerPayment: number;
  remainder: number;
  payments: number[];
  totalAmount: number;
  paymentCount: number;
}

export interface IQuickAmount {
  label: string;
  value: number;
  icon: string;
}

export interface IPaymentValidator {
  validateAmount(amount: number, maxAmount: number): ValidationResult;
  validatePaymentCount(paymentCount: number): ValidationResult;
}

export interface IPaymentCalculator {
  calculatePaymentSplit(amount: number, paymentCount: number): IPaymentSplit | null;
  generateQuickAmounts(remainingAmount: number): IQuickAmount[];
  formatAmount(amount: number, currency?: string): string;
  calculatePaymentPercentage(paidAmount: number, totalAmount: number): number;
}

export interface IAmountFormatter {
  formatAmount(amount: number, currency?: string): string;
  formatCurrency(amount: number, currency: string): string;
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

// Liskov Substitution Principle - يمكن استبدال implementations
export interface IPaymentProcessor {
  processPayment(paymentData: AutoPaymentRequest): Promise<PaymentResult>;
}

export interface PaymentResult {
  success: boolean;
  message: string;
  data?: any;
}

export interface AutoPaymentRequest {
  traineeId: number;
  amount: number;
  safeId: string;
  notes: string;
}
