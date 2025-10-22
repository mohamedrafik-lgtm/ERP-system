'use client';
import React, { useState } from 'react';
import { useGetTraineeAccountStatsQuery } from '@/lip/features/trainee-platform/traineeAccountsApi';
import TraineeAccountsTable from '@/components/StudentPlatform/TraineeAccountsTable';
import TraineeAccountsFilters from '@/components/StudentPlatform/TraineeAccountsFilters';
import TraineeAccountDetails from '@/components/StudentPlatform/TraineeAccountDetails';
import AccountStats from '@/components/StudentPlatform/AccountStats';
import { TraineeAccountFilters } from '@/interface/trainee-platform';

const AccountManagementPage = () => {
  const [filters, setFilters] = useState<TraineeAccountFilters>({
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const { data: stats, isLoading: isLoadingStats, error: statsError, refetch: refetchStats } = useGetTraineeAccountStatsQuery();

  const handleFilterChange = (newFilters: Partial<TraineeAccountFilters>) => {
    setFilters((prev: TraineeAccountFilters) => ({ ...prev, ...newFilters, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev: TraineeAccountFilters) => ({ ...prev, page }));
  };

  const handleViewDetails = (accountId: string) => {
    setSelectedAccountId(accountId);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedAccountId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header with Stats */}
        <AccountStats 
          stats={stats} 
          isLoading={isLoadingStats} 
          error={statsError} 
          onRefresh={refetchStats} 
        />

        {/* Filters Section */}
        <TraineeAccountsFilters filters={filters} onFilterChange={handleFilterChange} />

        {/* Trainee Accounts Table */}
        <TraineeAccountsTable 
          filters={filters} 
          onPageChange={handlePageChange} 
          onViewDetails={handleViewDetails} 
        />

        {/* Trainee Account Details Modal */}
        {selectedAccountId && (
          <TraineeAccountDetails
            accountId={selectedAccountId}
            isOpen={isDetailsModalOpen}
            onClose={handleCloseDetailsModal}
          />
        )}
      </div>
    </div>
  );
};

export default AccountManagementPage;
