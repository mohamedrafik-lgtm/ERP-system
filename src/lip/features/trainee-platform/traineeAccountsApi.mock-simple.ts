// Simple Mock API for testing without backend
// To use this, temporarily replace the import in your components

export const mockAccountStats = {
  totalAccounts: 1247,
  activeAccounts: 892,
  inactiveAccounts: 355,
  averageAccountAgeInDays: 145,
};

// Mock hook
export const useGetTraineeAccountStatsQuery = () => ({
  data: mockAccountStats,
  isLoading: false,
  error: null,
  refetch: () => Promise.resolve({ data: mockAccountStats }),
});

// You can also export other hooks as needed
export const useGetTraineeAccountsQuery = (filters: any) => ({
  data: {
    data: [],
    meta: {
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 0,
      hasNext: false,
      hasPrev: false,
    },
  },
  isLoading: false,
  isFetching: false,
  error: null,
  refetch: () => Promise.resolve(),
});

export const useGetTraineeAccountByIdQuery = (id: string) => ({
  data: null,
  isLoading: false,
  error: null,
});

export const useUpdateTraineeAccountStatusMutation = () => [
  async (data: any) => ({ unwrap: async () => ({}) }),
  { isLoading: false },
];

export const useResetTraineeAccountPasswordMutation = () => [
  async (id: string) => ({ unwrap: async () => ({ message: 'Success' }) }),
  { isLoading: false },
];

export const useDeleteTraineeAccountMutation = () => [
  async (id: string) => ({ unwrap: async () => ({ message: 'Success' }) }),
  { isLoading: false },
];

export const useGetPlatformStatsQuery = (filters?: any) => ({
  data: null,
  isLoading: false,
  error: { status: 'FETCH_ERROR', message: 'Backend not running' },
  refetch: () => Promise.resolve(),
});

