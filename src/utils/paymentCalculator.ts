export interface PaymentSplit {
  amountPerPayment: number;
  remainder: number;
  payments: number[];
  totalAmount: number;
  paymentCount: number;
}

export interface QuickAmount {
  label: string;
  value: number;
  icon: string;
}

export class PaymentCalculator {
  /**
   * حساب تقسيم المبلغ على عدد الدفعات
   */
  public static calculatePaymentSplit(amount: number, paymentCount: number): PaymentSplit | null {
    if (amount <= 0 || paymentCount <= 0) return null;
    
    const amountPerPayment = Math.floor(amount / paymentCount);
    const remainder = amount % paymentCount;
    
    const payments = Array.from({ length: paymentCount }, (_, index) => 
      amountPerPayment + (index < remainder ? 1 : 0)
    );
    
    return {
      amountPerPayment,
      remainder,
      payments,
      totalAmount: amount,
      paymentCount
    };
  }

  /**
   * إنشاء قائمة المبالغ السريعة
   */
  public static generateQuickAmounts(remainingAmount: number): QuickAmount[] {
    return [
      { label: '25%', value: Math.round(remainingAmount * 0.25), icon: '¼' },
      { label: '50%', value: Math.round(remainingAmount * 0.5), icon: '½' },
      { label: '75%', value: Math.round(remainingAmount * 0.75), icon: '¾' },
      { label: '100%', value: remainingAmount, icon: '💯' },
      { label: '500', value: 500, icon: '💰' },
      { label: '1000', value: 1000, icon: '💵' },
      { label: '2000', value: 2000, icon: '💸' },
      { label: '5000', value: 5000, icon: '🏦' }
    ];
  }

  /**
   * التحقق من صحة المبلغ
   */
  public static validateAmount(amount: number, maxAmount: number): { isValid: boolean; error?: string } {
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

  /**
   * التحقق من صحة عدد الدفعات
   */
  public static validatePaymentCount(paymentCount: number): { isValid: boolean; error?: string } {
    if (paymentCount < 1 || paymentCount > 12) {
      return { isValid: false, error: 'عدد الدفعات يجب أن يكون بين 1 و 12' };
    }
    
    return { isValid: true };
  }

  /**
   * تنسيق المبلغ للعرض
   */
  public static formatAmount(amount: number, currency: string = 'EGP'): string {
    return `${amount.toLocaleString()} ${currency}`;
  }

  /**
   * حساب نسبة الدفع
   */
  public static calculatePaymentPercentage(paidAmount: number, totalAmount: number): number {
    if (totalAmount <= 0) return 0;
    return Math.round((paidAmount / totalAmount) * 100);
  }
}
