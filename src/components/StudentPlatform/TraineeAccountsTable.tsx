'use client';
import React from 'react';
import { useGetTraineeAccountsQuery } from '@/lip/features/trainee-platform/traineeAccountsApi';
import { TraineeAccountFilters } from '@/interface/trainee-platform';
import { RowCardSkeleton } from '@/components/ui/Skeleton';
import TraineeAccountRow from './TraineeAccountRow';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import EmptyState from './EmptyState';
import Pagination from './Pagination';
import { useTraineeAccountActions } from '@/hooks/useTraineeAccountActions';

interface TraineeAccountsTableProps {
  filters: TraineeAccountFilters;
  onPageChange: (page: number) => void;
  onViewDetails: (accountId: string) => void;
}

const TraineeAccountsTable: React.FC<TraineeAccountsTableProps> = ({ 
  filters, 
  onPageChange, 
  onViewDetails 
}) => {
  const { data, isLoading, isFetching, error, refetch } = useGetTraineeAccountsQuery(filters);
  const {
    handleStatusToggle,
    openDeleteConfirmModal,
    closeDeleteConfirmModal,
    handleDeleteAccount,
    isConfirmModalOpen,
    accountToDelete
  } = useTraineeAccountActions();

  if (isLoading) return <RowCardSkeleton />;
  
  if (error) {
    const errorMessage = (error as any)?.status === 'FETCH_ERROR' 
      ? 'لا يمكن الاتصال بالخادم. يرجى التأكد من تشغيل الباك إند على المنفذ 4000.'
      : 'حدث خطأ أثناء تحميل حسابات المتدربين.';
    
    return (
      <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="mb-4">
          <svg className="mx-auto h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">خطأ في التحميل</h3>
        <p className="text-red-600 mb-4">{errorMessage}</p>
        <div className="text-sm text-gray-500 mb-4">
          <p>تأكد من:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>تشغيل الباك إند على http://localhost:4000</li>
            <li>الاتصال بالإنترنت</li>
            <li>صحة بيانات تسجيل الدخول</li>
          </ul>
        </div>
        <button
          onClick={() => refetch()}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          إعادة المحاولة
        </button>
      </div>
    );
  }

  if (!data || data.data.length === 0) {
    return <EmptyState onRefresh={refetch} />;
  }

  return (
    <div className="space-y-4">
      {/* Header for Desktop */}
      <div className="hidden lg:grid grid-cols-12 gap-4 bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200">
        <div className="col-span-1 text-center font-bold text-gray-700">#</div>
        <div className="col-span-3 text-center font-bold text-gray-700">المتدرب</div>
        <div className="col-span-2 text-center font-bold text-gray-700">البرنامج</div>
        <div className="col-span-2 text-center font-bold text-gray-700">الحالة</div>
        <div className="col-span-2 text-center font-bold text-gray-700">آخر تسجيل دخول</div>
        <div className="col-span-2 text-center font-bold text-gray-700">الإجراءات</div>
      </div>

      {/* Data Rows */}
      {data.data.map((account, idx) => (
        <TraineeAccountRow
          key={account.id}
          account={account}
          index={idx}
          page={filters.page!}
          limit={filters.limit!}
          onViewDetails={onViewDetails}
          onStatusToggle={handleStatusToggle}
          onDelete={openDeleteConfirmModal}
        />
      ))}

      {/* Pagination */}
      {data.meta && data.meta.totalPages > 1 && (
        <Pagination
          currentPage={data.meta.page}
          totalPages={data.meta.totalPages}
          hasNext={data.meta.hasNext}
          hasPrev={data.meta.hasPrev}
          onPageChange={onPageChange}
        />
      )}

      {/* Delete Confirmation Modal */}
      {accountToDelete && (
        <DeleteConfirmationModal
          isOpen={isConfirmModalOpen}
          onClose={closeDeleteConfirmModal}
          onConfirm={handleDeleteAccount}
          accountName={accountToDelete.trainee.nameAr}
          nationalId={accountToDelete.trainee.nationalId}
        />
      )}
    </div>
  );
};

export default TraineeAccountsTable;