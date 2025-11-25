"use client";

import React, { useState } from 'react';
import { 
  DistributionHeader,
  DistributionFilters,
  DistributionCard,
  CreateDistributionModal,
  DeleteConfirmationDialog,
  LoadingState,
  ErrorState,
  EmptyState,
  useDistributionData
} from '@/components/DistributionStatistics';
import { DistributionType, Distribution } from './types';
import { useDeleteDistributionMutation } from '@/lip/features/distribution/distributionApi';
import toast from 'react-hot-toast';

  const DistributionStatisticsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<DistributionType>('ALL');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [distributionToDelete, setDistributionToDelete] = useState<Distribution | null>(null);

  const {
    distributions,
    isLoading,
    error,
    refetch,
    expandedDistributions,
    toggleDistribution
  } = useDistributionData(searchTerm, typeFilter);

  const [deleteDistribution, { isLoading: isDeleting }] = useDeleteDistributionMutation();

  const handleCreateSuccess = () => {
    refetch();
  };

  const handleCreateClick = () => {
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
  };

  const handleRefreshClick = () => {
    refetch();
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleTypeFilterChange = (value: DistributionType) => {
    setTypeFilter(value);
  };

  const handleDeleteClick = (distribution: Distribution) => {
    setDistributionToDelete(distribution);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!distributionToDelete) return;

    try {
      await deleteDistribution(distributionToDelete.id).unwrap();
      toast.success('تم حذف التوزيع بنجاح');
      setShowDeleteDialog(false);
      setDistributionToDelete(null);
      refetch();
    } catch (error) {
      toast.error('فشل في حذف التوزيع');
      console.error('Error deleting distribution:', error);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteDialog(false);
    setDistributionToDelete(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <DistributionHeader
          onCreateClick={handleCreateClick}
          onRefreshClick={handleRefreshClick}
        />

        {/* Filters */}
        <DistributionFilters
          searchTerm={searchTerm}
          typeFilter={typeFilter}
          onSearchChange={handleSearchChange}
          onTypeFilterChange={handleTypeFilterChange}
        />

        {/* Content */}
        {isLoading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState onRetry={refetch} />
        ) : distributions.length === 0 ? (
          <EmptyState onCreateClick={handleCreateClick} />
        ) : (
          <div className="space-y-4">
            {distributions.map((distribution) => (
              <DistributionCard
                key={distribution.id}
                distribution={distribution}
                isExpanded={expandedDistributions.has(distribution.id)}
                onToggle={() => toggleDistribution(distribution.id)}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        )}

        {/* Create Distribution Modal */}
        <CreateDistributionModal
          isOpen={showCreateModal}
          onClose={handleCloseModal}
          onSuccess={handleCreateSuccess}
        />

        {/* Delete Confirmation Dialog */}
        <DeleteConfirmationDialog
          isOpen={showDeleteDialog}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          isLoading={isDeleting}
          distributionName={distributionToDelete ? `${distributionToDelete.program.nameAr} - ${distributionToDelete.type === 'THEORY' ? 'نظري' : 'عملي'}` : ''}
        />
      </div>
    </div>
  );
};

export default DistributionStatisticsPage;