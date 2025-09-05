"use client";

import PaymentHeader from '@/components/TraineePayments/PaymentHeader';
import PaymentStats from '@/components/TraineePayments/PaymentStats';
import PaymentFilters from '@/components/TraineePayments/PaymentFilters';
import TraineePaymentsTable from '@/components/TraineePayments/TraineePaymentsTable';
import { useGetTraineePaymentsQuery } from '@/lip/features/traineePayments/traineePaymentsApi';
import { useState, useMemo } from 'react';

export default function TraineePayments() {
  // استخدام Redux Toolkit Query لجلب البيانات
  const { 
    data: payments = [], 
    isLoading, 
    error, 
    refetch 
  } = useGetTraineePaymentsQuery();

  // إدارة الحالة المحلية
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  // حساب الإحصائيات
  const stats = useMemo(() => {
    if (!payments.length) {
      return {
        total: 0,
        paid: 0,
        remaining: 0,
        totalCount: 0
      };
    }

    const total = payments.reduce((sum, payment) => sum + payment.amount, 0);
    const paid = payments.reduce((sum, payment) => sum + payment.paidAmount, 0);
    const remaining = total - paid;

    return {
      total,
      paid,
      remaining,
      totalCount: payments.length
    };
  }, [payments]);

  // فلترة البيانات
  const filteredPayments = useMemo(() => {
    let filtered = [...payments]; // إنشاء نسخة جديدة من الـ array

    // فلترة حسب النص
    if (searchTerm) {
      filtered = filtered.filter(payment => 
        payment.trainee?.nameAr?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.fee?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // فلترة حسب الحالة
    if (statusFilter !== 'all') {
      filtered = filtered.filter(payment => {
        if (statusFilter === 'paid') return payment.status === 'PAID';
        if (statusFilter === 'partial') return payment.status === 'PARTIALLY_PAID';
        if (statusFilter === 'unpaid') return payment.status === 'PENDING';
        return true;
      });
    }

    // ترتيب البيانات
    filtered.sort((a, b) => {
      if (sortBy === 'date') return new Date(b.paidAt || 0).getTime() - new Date(a.paidAt || 0).getTime();
      if (sortBy === 'amount') return b.amount - a.amount;
      if (sortBy === 'trainee') return (a.trainee?.nameAr || '').localeCompare(b.trainee?.nameAr || '');
      return 0;
    });

    return filtered;
  }, [payments, searchTerm, statusFilter, sortBy]);

  // معالجات الأحداث
  const handleExportReport = () => {
    console.log('Export report clicked');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <PaymentHeader 
          onAddPayment={() => {}}
          onExportReport={handleExportReport}
        />

        {/* Stats Cards */}
        <PaymentStats stats={stats} />

        {/* Filters Section */}
        <PaymentFilters
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          sortBy={sortBy}
          onSearchChange={setSearchTerm}
          onStatusFilterChange={setStatusFilter}
          onSortChange={setSortBy}
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
              <p className="text-gray-600 mb-4">حدث خطأ أثناء جلب بيانات المدفوعات</p>
              <button 
                onClick={() => refetch()}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                إعادة المحاولة
              </button>
            </div>
          </div>
        ) : (
          <TraineePaymentsTable
            payments={filteredPayments}
            onAddPayment={() => {}} // لا نحتاج هذه الدالة بعد الآن
          />
        )}

      </div>
    </div>
  );
}
