// This file is now deprecated - use RTK Query hooks directly
// Keeping for backward compatibility but recommend using RTK Query hooks

import { 
  useGetTraineeAccountsQuery,
  useGetTraineeAccountByIdQuery,
  useUpdateTraineeAccountMutation,
  useCreateTraineeAccountMutation,
  useDeleteTraineeAccountMutation,
  useBulkUpdateAccountsMutation,
  useBulkDeleteAccountsMutation
} from '@/lip/features/trainee-platform/traineeAccountsApi';

// Re-export RTK Query hooks for backward compatibility
export {
  useGetTraineeAccountsQuery,
  useGetTraineeAccountByIdQuery,
  useUpdateTraineeAccountMutation,
  useCreateTraineeAccountMutation,
  useDeleteTraineeAccountMutation,
  useBulkUpdateAccountsMutation,
  useBulkDeleteAccountsMutation
};

// Legacy service class - deprecated, use RTK Query hooks instead
export class TraineePlatformService {
  // This class is deprecated - use RTK Query hooks directly
  static getDeprecationWarning() {
    console.warn('TraineePlatformService is deprecated. Use RTK Query hooks instead.');
  }
}

export class TraineePlatformServiceFactory {
  static create() {
    TraineePlatformService.getDeprecationWarning();
    return new TraineePlatformService();
  }
}
