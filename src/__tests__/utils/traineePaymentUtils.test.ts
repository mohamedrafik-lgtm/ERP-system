import {
  formatCurrency,
  calculateTraineePaymentStats,
  filterTraineePayments,
  sortTraineePayments,
  getRemainingAmount,
  getStatusLabel,
  formatDate,
} from '@/utils/traineePaymentUtils';
import { TraineePaymentResponse } from '@/types/payment';

const mockPayments: TraineePaymentResponse[] = [
  {
    id: 1,
    amount: 5000,
    status: 'PARTIALLY_PAID',
    paidAmount: 3000,
    paidAt: '2024-01-15T10:30:00Z',
    notes: 'دفعة جزئية للرسوم',
    fee: {
      id: 1,
      name: 'رسوم التسجيل',
      amount: 5000,
      type: 'REGISTRATION_FEE'
    },
    trainee: {
      id: 1,
      name: 'أحمد محمد علي'
    },
    safe: {
      id: '1',
      name: 'الخزينة الرئيسية'
    },
    transactions: [
      {
        id: 'TXN-001',
        amount: 3000,
        type: 'PAYMENT',
        createdAt: '2024-01-15T10:30:00Z'
      }
    ]
  },
  {
    id: 2,
    amount: 8000,
    status: 'PAID',
    paidAmount: 8000,
    paidAt: '2024-01-20T14:15:00Z',
    notes: 'دفعة كاملة للبرنامج التدريبي',
    fee: {
      id: 2,
      name: 'رسوم البرنامج التدريبي',
      amount: 8000,
      type: 'TRAINING_FEE'
    },
    trainee: {
      id: 2,
      name: 'فاطمة أحمد حسن'
    },
    safe: {
      id: '2',
      name: 'خزينة الرسوم'
    },
    transactions: [
      {
        id: 'TXN-002',
        amount: 8000,
        type: 'PAYMENT',
        createdAt: '2024-01-20T14:15:00Z'
      }
    ]
  },
  {
    id: 3,
    amount: 2000,
    status: 'PENDING',
    paidAmount: 0,
    notes: 'رسوم الشهادة - لم يتم الدفع بعد',
    fee: {
      id: 3,
      name: 'رسوم الشهادة',
      amount: 2000,
      type: 'CERTIFICATE_FEE'
    },
    trainee: {
      id: 3,
      name: 'محمد سعد الدين'
    },
    safe: {
      id: '3',
      name: 'خزينة الطوارئ'
    },
    transactions: []
  }
];

describe('traineePaymentUtils', () => {
  describe('formatCurrency', () => {
    it('should format currency correctly for Saudi Riyal', () => {
      expect(formatCurrency(1000)).toBe('١٬٠٠٠٫٠٠ ر.س');
      expect(formatCurrency(5000)).toBe('٥٬٠٠٠٫٠٠ ر.س');
      expect(formatCurrency(12345.67)).toBe('١٢٬٣٤٥٫٦٧ ر.س');
    });

    it('should handle zero amount', () => {
      expect(formatCurrency(0)).toBe('٠٫٠٠ ر.س');
    });

    it('should handle negative amounts', () => {
      expect(formatCurrency(-1000)).toBe('-١٬٠٠٠٫٠٠ ر.س');
    });
  });

  describe('calculateTraineePaymentStats', () => {
    it('should calculate stats correctly for mixed payment statuses', () => {
      const stats = calculateTraineePaymentStats(mockPayments);

      expect(stats.total).toBe(15000); // 5000 + 8000 + 2000
      expect(stats.paid).toBe(11000);  // 3000 + 8000 + 0
      expect(stats.remaining).toBe(4000); // 15000 - 11000
      expect(stats.totalCount).toBe(3);
      expect(stats.paidCount).toBe(1);    // PAID
      expect(stats.partialCount).toBe(1); // PARTIALLY_PAID
      expect(stats.unpaidCount).toBe(1);  // PENDING
    });

    it('should handle empty array', () => {
      const stats = calculateTraineePaymentStats([]);

      expect(stats.total).toBe(0);
      expect(stats.paid).toBe(0);
      expect(stats.remaining).toBe(0);
      expect(stats.totalCount).toBe(0);
      expect(stats.paidCount).toBe(0);
      expect(stats.partialCount).toBe(0);
      expect(stats.unpaidCount).toBe(0);
    });

    it('should handle all paid payments', () => {
      const allPaidPayments = mockPayments.map(p => ({
        ...p,
        status: 'PAID' as const,
        paidAmount: p.amount
      }));

      const stats = calculateTraineePaymentStats(allPaidPayments);

      expect(stats.total).toBe(15000);
      expect(stats.paid).toBe(15000);
      expect(stats.remaining).toBe(0);
      expect(stats.paidCount).toBe(3);
      expect(stats.partialCount).toBe(0);
      expect(stats.unpaidCount).toBe(0);
    });
  });

  describe('filterTraineePayments', () => {
    it('should filter by trainee name', () => {
      const filtered = filterTraineePayments(mockPayments, 'أحمد', 'all');
      expect(filtered).toHaveLength(1);
      expect(filtered[0].trainee.name).toBe('أحمد محمد علي');
    });

    it('should filter by fee name', () => {
      const filtered = filterTraineePayments(mockPayments, 'التسجيل', 'all');
      expect(filtered).toHaveLength(1);
      expect(filtered[0].fee.name).toBe('رسوم التسجيل');
    });

    it('should filter by trainee ID', () => {
      const filtered = filterTraineePayments(mockPayments, '2', 'all');
      expect(filtered).toHaveLength(1);
      expect(filtered[0].trainee.id).toBe(2);
    });

    it('should filter by status', () => {
      const filtered = filterTraineePayments(mockPayments, '', 'paid');
      expect(filtered).toHaveLength(1);
      expect(filtered[0].status).toBe('PAID');
    });

    it('should filter by partial status', () => {
      const filtered = filterTraineePayments(mockPayments, '', 'partial');
      expect(filtered).toHaveLength(1);
      expect(filtered[0].status).toBe('PARTIALLY_PAID');
    });

    it('should filter by unpaid status', () => {
      const filtered = filterTraineePayments(mockPayments, '', 'unpaid');
      expect(filtered).toHaveLength(1);
      expect(filtered[0].status).toBe('PENDING');
    });

    it('should return all payments when no filters applied', () => {
      const filtered = filterTraineePayments(mockPayments, '', 'all');
      expect(filtered).toHaveLength(3);
    });

    it('should handle case insensitive search', () => {
      const filtered = filterTraineePayments(mockPayments, 'AHMED', 'all');
      expect(filtered).toHaveLength(1);
      expect(filtered[0].trainee.name).toBe('أحمد محمد علي');
    });

    it('should return empty array when no matches found', () => {
      const filtered = filterTraineePayments(mockPayments, 'nonexistent', 'all');
      expect(filtered).toHaveLength(0);
    });
  });

  describe('sortTraineePayments', () => {
    it('should sort by date (newest first)', () => {
      const sorted = sortTraineePayments(mockPayments, 'date');
      expect(sorted[0].id).toBe(2); // Most recent date
      expect(sorted[1].id).toBe(1);
      expect(sorted[2].id).toBe(3); // No date
    });

    it('should sort by amount (highest first)', () => {
      const sorted = sortTraineePayments(mockPayments, 'amount');
      expect(sorted[0].amount).toBe(8000);
      expect(sorted[1].amount).toBe(5000);
      expect(sorted[2].amount).toBe(2000);
    });

    it('should sort by trainee name (alphabetical)', () => {
      const sorted = sortTraineePayments(mockPayments, 'trainee');
      expect(sorted[0].trainee.name).toBe('أحمد محمد علي');
      expect(sorted[1].trainee.name).toBe('فاطمة أحمد حسن');
      expect(sorted[2].trainee.name).toBe('محمد سعد الدين');
    });

    it('should handle empty array', () => {
      const sorted = sortTraineePayments([], 'date');
      expect(sorted).toHaveLength(0);
    });

    it('should handle single item', () => {
      const singlePayment = [mockPayments[0]];
      const sorted = sortTraineePayments(singlePayment, 'amount');
      expect(sorted).toHaveLength(1);
      expect(sorted[0].id).toBe(1);
    });
  });

  describe('getRemainingAmount', () => {
    it('should calculate remaining amount correctly', () => {
      expect(getRemainingAmount(mockPayments[0])).toBe(2000); // 5000 - 3000
      expect(getRemainingAmount(mockPayments[1])).toBe(0);    // 8000 - 8000
      expect(getRemainingAmount(mockPayments[2])).toBe(2000); // 2000 - 0
    });

    it('should handle fully paid payment', () => {
      const fullyPaid = { ...mockPayments[0], paidAmount: 5000 };
      expect(getRemainingAmount(fullyPaid)).toBe(0);
    });

    it('should handle unpaid payment', () => {
      const unpaid = { ...mockPayments[0], paidAmount: 0 };
      expect(getRemainingAmount(unpaid)).toBe(5000);
    });
  });

  describe('getStatusLabel', () => {
    it('should return correct Arabic labels', () => {
      expect(getStatusLabel('PAID')).toBe('مدفوع بالكامل');
      expect(getStatusLabel('PARTIALLY_PAID')).toBe('مدفوع جزئياً');
      expect(getStatusLabel('PENDING')).toBe('غير مدفوع');
    });

    it('should return original status for unknown status', () => {
      expect(getStatusLabel('UNKNOWN')).toBe('UNKNOWN');
    });

    it('should handle empty string', () => {
      expect(getStatusLabel('')).toBe('');
    });
  });

  describe('formatDate', () => {
    it('should format date correctly', () => {
      const formatted = formatDate('2024-01-15T10:30:00Z');
      expect(formatted).toContain('2024');
      expect(formatted).toContain('يناير');
      expect(formatted).toContain('15');
    });

    it('should return "لم يتم الدفع" for undefined date', () => {
      expect(formatDate(undefined)).toBe('لم يتم الدفع');
    });

    it('should return "لم يتم الدفع" for null date', () => {
      expect(formatDate(null as any)).toBe('لم يتم الدفع');
    });

    it('should return "لم يتم الدفع" for empty string', () => {
      expect(formatDate('')).toBe('لم يتم الدفع');
    });

    it('should handle invalid date string', () => {
      const formatted = formatDate('invalid-date');
      expect(formatted).toContain('Invalid Date');
    });
  });
});
