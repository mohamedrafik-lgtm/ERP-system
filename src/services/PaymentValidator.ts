// Single Responsibility Principle - مسؤولية واحدة: التحقق من صحة بيانات الدفع
import { IPaymentValidator, ValidationResult } from '@/types/payment.types';

export class PaymentValidator implements IPaymentValidator {
  validateAmount(amount: number, maxAmount: number): ValidationResult {
    if (amount <= 0) {
      return { isValid: false, error: 'المبلغ يجب أن يكون أكبر من صفر' };
    }
    
    if (amount > maxAmount) {
      return { 
        isValid: false, 
        error: `المبلغ لا يمكن أن يتجاوز المبلغ المتبقي (${maxAmount.toLocaleString()} جنيه)` 
      };
    }
    
    return { isValid: true };
  }

  validatePaymentCount(paymentCount: number): ValidationResult {
    if (paymentCount < 1 || paymentCount > 12) {
      return { isValid: false, error: 'عدد الدفعات يجب أن يكون بين 1 و 12' };
    }
    
    return { isValid: true };
  }

  validateSafeId(safeId: string): ValidationResult {
    if (!safeId || safeId.trim() === '') {
      return { isValid: false, error: 'يجب اختيار خزنة' };
    }
    
    return { isValid: true };
  }

  validateFormData(formData: {
    amount: number;
    safeId: string;
    paymentCount: number;
  }, maxAmount: number): ValidationResult {
    const amountValidation = this.validateAmount(formData.amount, maxAmount);
    if (!amountValidation.isValid) return amountValidation;

    const paymentCountValidation = this.validatePaymentCount(formData.paymentCount);
    if (!paymentCountValidation.isValid) return paymentCountValidation;

    const safeIdValidation = this.validateSafeId(formData.safeId);
    if (!safeIdValidation.isValid) return safeIdValidation;

    return { isValid: true };
  }
}
