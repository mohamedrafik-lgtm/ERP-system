import { TraineePaymentResponse, PaymentStats } from '@/types/payment';

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('ar-EG', {
    style: 'currency',
    currency: 'EGP'
  }).format(amount);
};

export const calculateTraineePaymentStats = (payments: TraineePaymentResponse[]): PaymentStats => {
  const total = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const paid = payments.reduce((sum, payment) => sum + payment.paidAmount, 0);
  const remaining = total - paid;
  const paidCount = payments.filter(p => p.status === 'PAID').length;
  const partialCount = payments.filter(p => p.status === 'PARTIALLY_PAID').length;
  const unpaidCount = payments.filter(p => p.status === 'PENDING').length;

  return {
    total,
    paid,
    remaining,
    paidCount,
    partialCount,
    unpaidCount,
    totalCount: payments.length
  };
};

export const filterTraineePayments = (
  payments: TraineePaymentResponse[],
  searchTerm: string,
  statusFilter: string
): TraineePaymentResponse[] => {
  let filtered = payments;

  // Filter by search term
  if (searchTerm) {
    filtered = filtered.filter(payment => 
      payment.trainee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.fee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.trainee.id.toString().includes(searchTerm.toLowerCase())
    );
  }

  // Filter by status
  if (statusFilter !== 'all') {
    const statusMap: { [key: string]: string } = {
      'paid': 'PAID',
      'partial': 'PARTIALLY_PAID',
      'unpaid': 'PENDING'
    };
    
    if (statusMap[statusFilter]) {
      filtered = filtered.filter(payment => payment.status === statusMap[statusFilter]);
    }
  }

  return filtered;
};

export const sortTraineePayments = (payments: TraineePaymentResponse[], sortBy: string): TraineePaymentResponse[] => {
  const sorted = [...payments];
  
  sorted.sort((a, b) => {
    switch (sortBy) {
      case 'date':
        const dateA = a.paidAt ? new Date(a.paidAt).getTime() : 0;
        const dateB = b.paidAt ? new Date(b.paidAt).getTime() : 0;
        return dateB - dateA;
      case 'amount':
        return b.amount - a.amount;
      case 'trainee':
        return a.trainee.name.localeCompare(b.trainee.name);
      default:
        return 0;
    }
  });

  return sorted;
};

export const getRemainingAmount = (payment: TraineePaymentResponse): number => {
  return payment.amount - payment.paidAmount;
};

export const getStatusLabel = (status: string): string => {
  const statusMap: { [key: string]: string } = {
    'PAID': 'مدفوع بالكامل',
    'PARTIALLY_PAID': 'مدفوع جزئياً',
    'PENDING': 'غير مدفوع'
  };
  
  return statusMap[status] || status;
};

export const formatDate = (dateString?: string): string => {
  if (!dateString) return 'لم يتم الدفع';
  
  return new Intl.DateTimeFormat('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(dateString));
};
