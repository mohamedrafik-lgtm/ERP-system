"use client";
import React, { useState, useEffect } from 'react';
import { PlusIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { useTraineeAccounts } from '@/hooks/useTraineeAccounts';
import { AccountStats, AccountFilters, AccountTable, EmptyState, NoResultsState } from '@/components/traineePlatform';

// Main component following SOLID principles
export default function AccountManagement() {
  const {
    accounts,
    loading,
    error,
    pagination,
    selectedAccounts,
    searchAccounts,
    filterByStatus,
    selectAccount,
    selectAllAccounts,
    clearSelection,
    updateAccount,
    deleteAccount,
    bulkDeleteAccounts
  } = useTraineeAccounts();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Calculate stats from accounts data
  const stats = {
    totalAccounts: pagination?.total || 0,
    activeAccounts: accounts.filter(account => account.status === 'active').length,
    inactiveAccounts: accounts.filter(account => account.status === 'inactive').length,
    averageProgress: 75 // This would come from API in real implementation
  };

  // Handle search with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchAccounts(searchTerm);
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, searchAccounts]);

  // Handle status filter
  const handleStatusChange = (status: string) => {
    setFilterStatus(status);
    filterByStatus(status);
  };

  // Handle account actions
  const handleViewAccount = (accountId: string) => {
    console.log('View account:', accountId);
    // Implement view logic
  };

  const handleEditAccount = (accountId: string) => {
    console.log('Edit account:', accountId);
    // Implement edit logic
  };

  const handleDeleteAccount = async (accountId: string) => {
    if (confirm('هل أنت متأكد من حذف هذا الحساب؟')) {
      await deleteAccount(accountId);
    }
  };

  const handleBulkDelete = async () => {
    if (confirm(`هل أنت متأكد من حذف ${selectedAccounts.length} حساب؟`)) {
      await bulkDeleteAccounts();
    }
  };

  // Handle add new account
  const handleAddNew = () => {
    console.log('Add new account');
    // Implement add new account logic
  };

  // Handle clear search
  const handleClearSearch = () => {
    setSearchTerm('');
    searchAccounts('');
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">⚠️</div>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">إدارة حسابات المتدربين</h1>
              <p className="text-gray-600 mt-2">
                إدارة وإشراف على حسابات المتدربين في المنصة
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <PlusIcon className="w-5 h-5" />
                <span>إضافة متدرب</span>
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                <ArrowDownTrayIcon className="w-5 h-5" />
                <span>تصدير البيانات</span>
              </button>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <AccountStats
          totalAccounts={stats.totalAccounts}
          activeAccounts={stats.activeAccounts}
          inactiveAccounts={stats.inactiveAccounts}
          averageProgress={stats.averageProgress}
        />

        {/* Filters */}
        <AccountFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterStatus={filterStatus}
          onStatusChange={handleStatusChange}
          selectedCount={selectedAccounts.length}
          onBulkDelete={handleBulkDelete}
        />

        {/* Content */}
        {accounts.length === 0 ? (
          // Check if it's a search result or truly empty
          searchTerm || filterStatus !== 'all' ? (
            <NoResultsState
              onClearSearch={handleClearSearch}
              searchTerm={searchTerm}
              title={searchTerm ? `لا توجد نتائج لـ "${searchTerm}"` : "لا توجد نتائج"}
              description={searchTerm 
                ? "لم يتم العثور على أي حسابات تطابق معايير البحث. جرب تغيير كلمات البحث أو المعايير."
                : "لم يتم العثور على أي حسابات تطابق المعايير المحددة."
              }
            />
          ) : (
            <EmptyState
              onAddNew={handleAddNew}
              title="لا توجد حسابات متدربين"
              description="لم يتم العثور على أي حسابات متدربين. يمكنك إضافة حساب جديد أو تعديل معايير البحث."
              actionText="إضافة حساب جديد"
            />
          )
        ) : (
          <>
            {/* Table */}
            <AccountTable
              accounts={accounts}
              selectedAccounts={selectedAccounts}
              onSelectAccount={selectAccount}
              onSelectAll={selectAllAccounts}
              onViewAccount={handleViewAccount}
              onEditAccount={handleEditAccount}
              onDeleteAccount={handleDeleteAccount}
            />

            {/* Pagination Info */}
            <div className="mt-6 text-center text-sm text-gray-500">
              عرض {accounts.length} من أصل {stats.totalAccounts} حساب
              {pagination && (
                <span className="mr-4">
                  - الصفحة {pagination.page} من {pagination.totalPages}
                </span>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
