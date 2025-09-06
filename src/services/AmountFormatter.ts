// Single Responsibility Principle - مسؤولية واحدة: تنسيق المبالغ
import { IAmountFormatter } from '@/types/payment.types';

export class AmountFormatter implements IAmountFormatter {
  formatAmount(amount: number, currency: string = 'EGP'): string {
    return `${amount.toLocaleString()} ${currency}`;
  }

  formatCurrency(amount: number, currency: string): string {
    const currencySymbols = {
      'EGP': 'ج.م',
      'USD': '$',
      'EUR': '€',
      'SAR': 'ر.س'
    };
    
    const symbol = currencySymbols[currency as keyof typeof currencySymbols] || currency;
    return `${symbol} ${amount.toLocaleString()}`;
  }

  formatPercentage(value: number): string {
    return `${Math.round(value)}%`;
  }

  formatNumberWithCommas(number: number): string {
    return number.toLocaleString();
  }
}
