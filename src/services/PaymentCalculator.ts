// Open/Closed Principle - مفتوح للتوسع مغلق للتعديل
import { IPaymentCalculator, IPaymentSplit, IQuickAmount } from '@/types/payment.types';
import { AmountFormatter } from './AmountFormatter';

export class PaymentCalculator implements IPaymentCalculator {
  private amountFormatter: AmountFormatter;

  constructor(amountFormatter: AmountFormatter) {
    this.amountFormatter = amountFormatter;
  }

  calculatePaymentSplit(amount: number, paymentCount: number): IPaymentSplit | null {
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

  generateQuickAmounts(remainingAmount: number): IQuickAmount[] {
    const baseAmounts = [
      { label: '25%', value: Math.round(remainingAmount * 0.25), icon: '¼' },
      { label: '50%', value: Math.round(remainingAmount * 0.5), icon: '½' },
      { label: '75%', value: Math.round(remainingAmount * 0.75), icon: '¾' },
      { label: '100%', value: remainingAmount, icon: '💯' }
    ];

    const fixedAmounts = [
      { label: '500', value: 500, icon: '💰' },
      { label: '1000', value: 1000, icon: '💵' },
      { label: '2000', value: 2000, icon: '💸' },
      { label: '5000', value: 5000, icon: '🏦' }
    ];

    return [...baseAmounts, ...fixedAmounts];
  }

  formatAmount(amount: number, currency: string = 'EGP'): string {
    return this.amountFormatter.formatAmount(amount, currency);
  }

  calculatePaymentPercentage(paidAmount: number, totalAmount: number): number {
    if (totalAmount <= 0) return 0;
    return Math.round((paidAmount / totalAmount) * 100);
  }

  // Open/Closed Principle - يمكن إضافة استراتيجيات جديدة دون تعديل الكود
  calculateCustomSplit(amount: number, strategy: SplitStrategy): IPaymentSplit | null {
    return strategy.calculate(amount);
  }
}

// Strategy Pattern for different split strategies
export interface SplitStrategy {
  calculate(amount: number): IPaymentSplit | null;
}

export class EqualSplitStrategy implements SplitStrategy {
  constructor(private paymentCount: number) {}

  calculate(amount: number): IPaymentSplit | null {
    if (amount <= 0 || this.paymentCount <= 0) return null;
    
    const amountPerPayment = Math.floor(amount / this.paymentCount);
    const remainder = amount % this.paymentCount;
    
    const payments = Array.from({ length: this.paymentCount }, (_, index) => 
      amountPerPayment + (index < remainder ? 1 : 0)
    );
    
    return {
      amountPerPayment,
      remainder,
      payments,
      totalAmount: amount,
      paymentCount: this.paymentCount
    };
  }
}

export class PercentageSplitStrategy implements SplitStrategy {
  constructor(private percentages: number[]) {}

  calculate(amount: number): IPaymentSplit | null {
    if (amount <= 0 || this.percentages.length === 0) return null;
    
    const totalPercentage = this.percentages.reduce((sum, p) => sum + p, 0);
    if (Math.abs(totalPercentage - 100) > 0.01) return null; // يجب أن يكون مجموع النسب 100%
    
    const payments = this.percentages.map(percentage => 
      Math.round((amount * percentage) / 100)
    );
    
    return {
      amountPerPayment: 0, // لا ينطبق في هذه الاستراتيجية
      remainder: 0,
      payments,
      totalAmount: amount,
      paymentCount: this.percentages.length
    };
  }
}
