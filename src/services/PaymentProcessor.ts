// Liskov Substitution Principle - يمكن استبدال implementations
import { IPaymentProcessor, AutoPaymentRequest, PaymentResult } from '@/types/payment.types';

export abstract class BasePaymentProcessor implements IPaymentProcessor {
  abstract processPayment(paymentData: AutoPaymentRequest): Promise<PaymentResult>;
  
  protected validatePaymentData(paymentData: AutoPaymentRequest): boolean {
    return !!(
      paymentData.traineeId &&
      paymentData.amount > 0 &&
      paymentData.safeId &&
      paymentData.safeId.trim() !== ''
    );
  }
}

export class ReduxPaymentProcessor extends BasePaymentProcessor {
  constructor(private autoPaymentMutation: any) {
    super();
  }

  async processPayment(paymentData: AutoPaymentRequest): Promise<PaymentResult> {
    if (!this.validatePaymentData(paymentData)) {
      return {
        success: false,
        message: 'بيانات الدفع غير صحيحة'
      };
    }

    try {
      const result = await this.autoPaymentMutation(paymentData).unwrap();
      return {
        success: result.success,
        message: result.message,
        data: result.data
      };
    } catch (error: any) {
      return {
        success: false,
        message: error?.data?.message || error?.message || 'حدث خطأ غير متوقع'
      };
    }
  }
}

export class MockPaymentProcessor extends BasePaymentProcessor {
  async processPayment(paymentData: AutoPaymentRequest): Promise<PaymentResult> {
    if (!this.validatePaymentData(paymentData)) {
      return {
        success: false,
        message: 'بيانات الدفع غير صحيحة'
      };
    }

    // محاكاة معالجة الدفع
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      message: 'تم معالجة الدفع بنجاح',
      data: {
        paymentId: `PAY_${Date.now()}`,
        ...paymentData
      }
    };
  }
}

export class ApiPaymentProcessor extends BasePaymentProcessor {
  constructor(private apiUrl: string) {
    super();
  }

  async processPayment(paymentData: AutoPaymentRequest): Promise<PaymentResult> {
    if (!this.validatePaymentData(paymentData)) {
      return {
        success: false,
        message: 'بيانات الدفع غير صحيحة'
      };
    }

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData)
      });

      const result = await response.json();
      
      return {
        success: result.success,
        message: result.message,
        data: result.data
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'حدث خطأ في الاتصال'
      };
    }
  }
}
