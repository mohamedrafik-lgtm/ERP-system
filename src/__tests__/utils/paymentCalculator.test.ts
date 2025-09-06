import { PaymentCalculator } from '@/services/PaymentCalculator';
import { AmountFormatter } from '@/services/AmountFormatter';
import { EqualSplitStrategy, PercentageSplitStrategy } from '@/services/PaymentCalculator';

describe('PaymentCalculator', () => {
  let calculator: PaymentCalculator;
  let mockFormatter: jest.Mocked<AmountFormatter>;

  beforeEach(() => {
    mockFormatter = {
      formatAmount: jest.fn(),
      formatCurrency: jest.fn(),
      formatPercentage: jest.fn(),
      formatNumberWithCommas: jest.fn(),
    } as any;

    calculator = new PaymentCalculator(mockFormatter);
  });

  describe('calculatePaymentSplit', () => {
    it('should calculate equal payment split correctly', () => {
      const result = calculator.calculatePaymentSplit(1000, 3);
      
      expect(result).toEqual({
        amountPerPayment: 333,
        remainder: 1,
        payments: [334, 333, 333],
        totalAmount: 1000,
        paymentCount: 3
      });
    });

    it('should handle exact division', () => {
      const result = calculator.calculatePaymentSplit(1000, 4);
      
      expect(result).toEqual({
        amountPerPayment: 250,
        remainder: 0,
        payments: [250, 250, 250, 250],
        totalAmount: 1000,
        paymentCount: 4
      });
    });

    it('should return null for invalid inputs', () => {
      expect(calculator.calculatePaymentSplit(0, 3)).toBeNull();
      expect(calculator.calculatePaymentSplit(1000, 0)).toBeNull();
      expect(calculator.calculatePaymentSplit(-100, 3)).toBeNull();
    });
  });

  describe('generateQuickAmounts', () => {
    it('should generate correct quick amounts', () => {
      const amounts = calculator.generateQuickAmounts(1000);
      
      expect(amounts).toHaveLength(8);
      expect(amounts[0]).toEqual({ label: '25%', value: 250, icon: '¼' });
      expect(amounts[1]).toEqual({ label: '50%', value: 500, icon: '½' });
      expect(amounts[2]).toEqual({ label: '75%', value: 750, icon: '¾' });
      expect(amounts[3]).toEqual({ label: '100%', value: 1000, icon: '💯' });
    });

    it('should include fixed amounts', () => {
      const amounts = calculator.generateQuickAmounts(1000);
      
      expect(amounts).toContainEqual({ label: '500', value: 500, icon: '💰' });
      expect(amounts).toContainEqual({ label: '1000', value: 1000, icon: '💵' });
      expect(amounts).toContainEqual({ label: '2000', value: 2000, icon: '💸' });
      expect(amounts).toContainEqual({ label: '5000', value: 5000, icon: '🏦' });
    });
  });

  describe('calculatePaymentPercentage', () => {
    it('should calculate percentage correctly', () => {
      expect(calculator.calculatePaymentPercentage(250, 1000)).toBe(25);
      expect(calculator.calculatePaymentPercentage(500, 1000)).toBe(50);
      expect(calculator.calculatePaymentPercentage(750, 1000)).toBe(75);
      expect(calculator.calculatePaymentPercentage(1000, 1000)).toBe(100);
    });

    it('should handle zero total amount', () => {
      expect(calculator.calculatePaymentPercentage(100, 0)).toBe(0);
    });
  });

  describe('formatAmount', () => {
    it('should delegate to formatter', () => {
      mockFormatter.formatAmount.mockReturnValue('1,000 EGP');
      
      const result = calculator.formatAmount(1000, 'EGP');
      
      expect(mockFormatter.formatAmount).toHaveBeenCalledWith(1000, 'EGP');
      expect(result).toBe('1,000 EGP');
    });
  });
});

describe('EqualSplitStrategy', () => {
  it('should split amount equally', () => {
    const strategy = new EqualSplitStrategy(3);
    const result = strategy.calculate(1000);
    
    expect(result).toEqual({
      amountPerPayment: 333,
      remainder: 1,
      payments: [334, 333, 333],
      totalAmount: 1000,
      paymentCount: 3
    });
  });
});

describe('PercentageSplitStrategy', () => {
  it('should split amount by percentages', () => {
    const strategy = new PercentageSplitStrategy([50, 30, 20]);
    const result = strategy.calculate(1000);
    
    expect(result).toEqual({
      amountPerPayment: 0,
      remainder: 0,
      payments: [500, 300, 200],
      totalAmount: 1000,
      paymentCount: 3
    });
  });

  it('should return null for invalid percentages', () => {
    const strategy = new PercentageSplitStrategy([50, 30]); // Total = 80%
    const result = strategy.calculate(1000);
    
    expect(result).toBeNull();
  });
});
