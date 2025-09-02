"use client";

import PaymentHeader from '@/components/TraineePayments/PaymentHeader';
import PaymentStats from '@/components/TraineePayments/PaymentStats';
import PaymentFilters from '@/components/TraineePayments/PaymentFilters';
import TraineePaymentsTable from '@/components/TraineePayments/TraineePaymentsTable';
import AddPaymentDialog from '@/components/TraineePayments/AddPaymentDialog';
import { usePayments } from '@/hooks/usePayments';

export default function TraineePayments() {
  const {
    payments,
    stats,
    filters,
    isAddPaymentDialogOpen,
    selectedPayment,
    isLoading,
    error,
    handleFilterChange,
    handleAddPayment,
    handleCloseDialog,
    handlePaymentAdded,
    handleExportReport,
    handleAddPaymentFromHeader
  } = usePayments();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <PaymentHeader 
          onAddPayment={handleAddPaymentFromHeader}
          onExportReport={handleExportReport}
        />

        {/* Stats Cards */}
        <PaymentStats stats={stats} />

        {/* Filters Section */}
        <PaymentFilters
          searchTerm={filters.searchTerm}
          statusFilter={filters.statusFilter}
          sortBy={filters.sortBy}
          onSearchChange={(value) => handleFilterChange('searchTerm', value)}
          onStatusFilterChange={(value) => handleFilterChange('statusFilter', value)}
          onSortChange={(value) => handleFilterChange('sortBy', value)}
        />

        {/* Payments Table */}
        {isLoading ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <span className="mr-3 text-gray-600">جاري تحميل البيانات...</span>
            </div>
          </div>
        ) : error ? (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="text-center">
              <div className="text-red-500 text-lg font-medium mb-2">خطأ في تحميل البيانات</div>
              <p className="text-gray-600">حدث خطأ أثناء جلب بيانات المدفوعات</p>
            </div>
          </div>
        ) : (
          <TraineePaymentsTable
            payments={payments}
            onAddPayment={handleAddPayment}
          />
        )}

        {/* Add Payment Dialog */}
        {selectedPayment && (
          <AddPaymentDialog
            isOpen={isAddPaymentDialogOpen}
            onClose={handleCloseDialog}
            payment={selectedPayment}
            onPaymentAdded={handlePaymentAdded}
          />
        )}
      </div>
    </div>
  );
}
