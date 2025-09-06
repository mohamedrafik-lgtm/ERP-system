import { PaymentValidator } from '@/services/PaymentValidator';

describe('PaymentValidator', () => {
  let validator: PaymentValidator;

  beforeEach(() => {
    validator = new PaymentValidator();
  });

  describe('validateAmount', () => {
    it('should validate positive amounts', () => {
      const result = validator.validateAmount(100, 1000);
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should reject zero amounts', () => {
      const result = validator.validateAmount(0, 1000);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('المبلغ يجب أن يكون أكبر من صفر');
    });

    it('should reject negative amounts', () => {
      const result = validator.validateAmount(-100, 1000);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('المبلغ يجب أن يكون أكبر من صفر');
    });

    it('should reject amounts exceeding maximum', () => {
      const result = validator.validateAmount(1500, 1000);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('المبلغ لا يمكن أن يتجاوز المبلغ المتبقي');
    });
  });

  describe('validatePaymentCount', () => {
    it('should validate valid payment counts', () => {
      expect(validator.validatePaymentCount(1).isValid).toBe(true);
      expect(validator.validatePaymentCount(6).isValid).toBe(true);
      expect(validator.validatePaymentCount(12).isValid).toBe(true);
    });

    it('should reject invalid payment counts', () => {
      expect(validator.validatePaymentCount(0).isValid).toBe(false);
      expect(validator.validatePaymentCount(13).isValid).toBe(false);
      expect(validator.validatePaymentCount(-1).isValid).toBe(false);
    });
  });

  describe('validateSafeId', () => {
    it('should validate non-empty safe IDs', () => {
      const result = validator.validateSafeId('safe-123');
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should reject empty safe IDs', () => {
      const result = validator.validateSafeId('');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('يجب اختيار خزنة');
    });

    it('should reject whitespace-only safe IDs', () => {
      const result = validator.validateSafeId('   ');
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('يجب اختيار خزنة');
    });
  });

  describe('validateFormData', () => {
    const validFormData = {
      amount: 500,
      safeId: 'safe-123',
      paymentCount: 3
    };

    it('should validate complete valid form data', () => {
      const result = validator.validateFormData(validFormData, 1000);
      expect(result.isValid).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should reject invalid amount', () => {
      const invalidData = { ...validFormData, amount: 0 };
      const result = validator.validateFormData(invalidData, 1000);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('المبلغ يجب أن يكون أكبر من صفر');
    });

    it('should reject invalid payment count', () => {
      const invalidData = { ...validFormData, paymentCount: 15 };
      const result = validator.validateFormData(invalidData, 1000);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('عدد الدفعات يجب أن يكون بين 1 و 12');
    });

    it('should reject invalid safe ID', () => {
      const invalidData = { ...validFormData, safeId: '' };
      const result = validator.validateFormData(invalidData, 1000);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe('يجب اختيار خزنة');
    });

    it('should reject amount exceeding maximum', () => {
      const invalidData = { ...validFormData, amount: 1500 };
      const result = validator.validateFormData(invalidData, 1000);
      expect(result.isValid).toBe(false);
      expect(result.error).toContain('المبلغ لا يمكن أن يتجاوز المبلغ المتبقي');
    });
  });
});
