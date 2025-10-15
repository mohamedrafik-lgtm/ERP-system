import { useState, useCallback } from 'react';
import { TraineeAccountUI, TraineeAccountFilters } from '@/types/traineePlatform';
import { TraineeAccountMapper } from '@/mappers/TraineeAccountMapper';
import {
  useGetTraineeAccountsQuery,
  useUpdateTraineeAccountMutation,
  useDeleteTraineeAccountMutation,
  useBulkUpdateAccountsMutation,
  useBulkDeleteAccountsMutation
} from '@/lip/features/trainee-platform/traineeAccountsApi';

// Custom hook for managing trainee accounts state using RTK Query
export const useTraineeAccounts = (initialFilters: TraineeAccountFilters = {
  search: '',
  status: 'all',
  page: 1,
  limit: 10
}) => {
  const [filters, setFilters] = useState<TraineeAccountFilters>(initialFilters);
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);

  // RTK Query hooks
  const {
    data: response,
    isLoading: loading,
    error: queryError,
    refetch
  } = useGetTraineeAccountsQuery(filters);

  const [updateAccountMutation] = useUpdateTraineeAccountMutation();
  const [deleteAccountMutation] = useDeleteTraineeAccountMutation();
  const [bulkUpdateMutation] = useBulkUpdateAccountsMutation();
  const [bulkDeleteMutation] = useBulkDeleteAccountsMutation();

  // Transform data
  const accounts: TraineeAccountUI[] = response?.data 
    ? TraineeAccountMapper.toUIList(response.data) 
    : [];

  const pagination = response?.meta || null;
  const error = queryError ? 'حدث خطأ في تحميل البيانات' : null;

  // Update filters and refetch
  const updateFilters = useCallback((newFilters: Partial<TraineeAccountFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Search accounts
  const searchAccounts = useCallback((searchTerm: string) => {
    updateFilters({ search: searchTerm, page: 1 });
  }, [updateFilters]);

  // Filter by status
  const filterByStatus = useCallback((status: string) => {
    updateFilters({ status: status as any, page: 1 });
  }, [updateFilters]);

  // Change page
  const changePage = useCallback((page: number) => {
    updateFilters({ page });
  }, [updateFilters]);

  // Select account
  const selectAccount = useCallback((accountId: string) => {
    setSelectedAccounts(prev => 
      prev.includes(accountId)
        ? prev.filter(id => id !== accountId)
        : [...prev, accountId]
    );
  }, []);

  // Select all accounts
  const selectAllAccounts = useCallback(() => {
    setSelectedAccounts(prev => 
      prev.length === accounts.length
        ? []
        : accounts.map(account => account.id)
    );
  }, [accounts]);

  // Clear selection
  const clearSelection = useCallback(() => {
    setSelectedAccounts([]);
  }, []);

  // Update account
  const updateAccount = useCallback(async (accountId: string, data: any) => {
    try {
      await updateAccountMutation({ id: accountId, data }).unwrap();
    } catch (error) {
      console.error('Failed to update account:', error);
      throw error;
    }
  }, [updateAccountMutation]);

  // Delete account
  const deleteAccount = useCallback(async (accountId: string) => {
    try {
      await deleteAccountMutation(accountId).unwrap();
    } catch (error) {
      console.error('Failed to delete account:', error);
      throw error;
    }
  }, [deleteAccountMutation]);

  // Bulk operations
  const bulkUpdateAccounts = useCallback(async (data: any) => {
    try {
      await bulkUpdateMutation({ ids: selectedAccounts, data }).unwrap();
      clearSelection();
    } catch (error) {
      console.error('Failed to bulk update accounts:', error);
      throw error;
    }
  }, [bulkUpdateMutation, selectedAccounts, clearSelection]);

  const bulkDeleteAccounts = useCallback(async () => {
    try {
      await bulkDeleteMutation(selectedAccounts).unwrap();
      clearSelection();
    } catch (error) {
      console.error('Failed to bulk delete accounts:', error);
      throw error;
    }
  }, [bulkDeleteMutation, selectedAccounts, clearSelection]);

  // Fetch accounts (refetch)
  const fetchAccounts = useCallback(() => {
    refetch();
  }, [refetch]);

  return {
    accounts,
    loading,
    error,
    pagination,
    selectedAccounts,
    filters,
    fetchAccounts,
    updateFilters,
    searchAccounts,
    filterByStatus,
    changePage,
    selectAccount,
    selectAllAccounts,
    clearSelection,
    updateAccount,
    deleteAccount,
    bulkUpdateAccounts,
    bulkDeleteAccounts
  };
};
