import { useState, useMemo } from 'react';
import { useGetTraineePaymentsQuery } from '@/lip/features/traineePayments/traineePaymentsApi';
import { calculateTraineePaymentStats, filterTraineePayments, sortTraineePayments } from '@/utils/traineePaymentUtils';
import { TraineePaymentResponse, PaymentFilters } from '@/types/payment';

export const usePayments = () => {
  const [filters, setFilters] = useState<PaymentFilters>({
    searchTerm: '',
    statusFilter: 'all',
    sortBy: 'date'
  });

  const [isAddPaymentDialogOpen, setIsAddPaymentDialogOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<TraineePaymentResponse | null>(null);

  // Fetch data from API
  const { data: payments = [], isLoading, error, refetch } = useGetTraineePaymentsQuery();

  const filteredPayments = useMemo(() => {
    if (!payments.length) return [];
    const filtered = filterTraineePayments(payments, filters.searchTerm, filters.statusFilter);
    return sortTraineePayments(filtered, filters.sortBy);
  }, [payments, filters]);

  const stats = useMemo(() => {
    if (!payments.length) return {
      total: 0,
      paid: 0,
      remaining: 0,
      totalCount: 0,
      paidCount: 0,
      partialCount: 0,
      unpaidCount: 0
    };
    return calculateTraineePaymentStats(payments);
  }, [payments]);

  const handleFilterChange = (key: keyof PaymentFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleAddPayment = (payment: TraineePaymentResponse) => {
    setSelectedPayment(payment);
    setIsAddPaymentDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsAddPaymentDialogOpen(false);
    setSelectedPayment(null);
  };

  const handlePaymentAdded = () => {
    // Refetch data after adding payment
    refetch();
    console.log('Payment added successfully');
    handleCloseDialog();
  };

  const handleExportReport = () => {
    console.log('Exporting report...');
  };

  const handleAddPaymentFromHeader = () => {
    console.log('Adding payment from header...');
  };

  return {
    payments: filteredPayments,
    stats,
    filters,
    isAddPaymentDialogOpen,
    selectedPayment,
    isLoading,
    error,
    refetch,
    handleFilterChange,
    handleAddPayment,
    handleCloseDialog,
    handlePaymentAdded,
    handleExportReport,
    handleAddPaymentFromHeader
  };
};
