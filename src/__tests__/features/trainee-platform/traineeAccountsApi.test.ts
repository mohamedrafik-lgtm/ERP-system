import { configureStore } from '@reduxjs/toolkit';
import { traineeAccountsApi } from '@/lip/features/trainee-platform/traineeAccountsApi';

// Mock fetch
global.fetch = jest.fn();

describe('TraineeAccountsApi', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        [traineeAccountsApi.reducerPath]: traineeAccountsApi.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(traineeAccountsApi.middleware),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getTraineeAccounts endpoint', () => {
    it('should fetch trainee accounts with default parameters', async () => {
      const mockResponse = {
        data: [
          {
            id: '1',
            nationalId: '12345678901234',
            birthDate: '1990-01-01',
            password: null,
            isActive: true,
            lastLoginAt: '2024-01-15T10:30:00Z',
            resetCode: null,
            resetCodeExpiresAt: null,
            resetCodeGeneratedAt: null,
            traineeId: 1,
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-15T10:30:00Z',
            trainee: {
              id: 1,
              nameAr: 'أحمد محمد',
              nameEn: 'Ahmed Mohamed',
              nationalId: '12345678901234',
              email: 'ahmed@example.com',
              phone: '+201234567890',
              photoUrl: null,
              traineeStatus: 'CURRENT',
              classLevel: 'FIRST',
              academicYear: '2024',
              program: {
                id: 1,
                nameAr: 'الذكاء الاصطناعي',
                nameEn: 'Artificial Intelligence'
              }
            }
          }
        ],
        meta: {
          total: 1,
          page: 1,
          limit: 10,
          totalPages: 1,
          hasNext: false,
          hasPrev: false
        }
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await store.dispatch(traineeAccountsApi.endpoints.getTraineeAccounts.initiate({}));

      expect(result.data).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:4000/api/trainee-platform/accounts',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Authorization': expect.any(String)
          })
        })
      );
    });

    it('should fetch trainee accounts with filters', async () => {
      const filters = {
        search: 'أحمد',
        isActive: true,
        programId: 1,
        page: 2,
        limit: 20,
        sortBy: 'trainee.nameAr',
        sortOrder: 'asc' as const
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: [], meta: { total: 0, page: 2, limit: 20, totalPages: 0, hasNext: false, hasPrev: true } }),
      });

      const result = await store.dispatch(traineeAccountsApi.endpoints.getTraineeAccounts.initiate(filters));

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:4000/api/trainee-platform/accounts?search=%D8%A3%D8%AD%D9%85%D8%AF&isActive=true&programId=1&page=2&limit=20&sortBy=trainee.nameAr&sortOrder=asc',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Authorization': expect.any(String)
          })
        })
      );
    });

    it('should handle fetch error', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      const result = await store.dispatch(traineeAccountsApi.endpoints.getTraineeAccounts.initiate({}));

      expect(result.error).toBeDefined();
    });
  });

  describe('getTraineeAccountById endpoint', () => {
    it('should fetch single trainee account by ID', async () => {
      const mockAccount = {
        id: '1',
        nationalId: '12345678901234',
        birthDate: '1990-01-01',
        password: null,
        isActive: true,
        lastLoginAt: '2024-01-15T10:30:00Z',
        resetCode: null,
        resetCodeExpiresAt: null,
        resetCodeGeneratedAt: null,
        traineeId: 1,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-15T10:30:00Z',
        trainee: {
          id: 1,
          nameAr: 'أحمد محمد',
          nameEn: 'Ahmed Mohamed',
          nationalId: '12345678901234',
          email: 'ahmed@example.com',
          phone: '+201234567890',
          photoUrl: null,
          traineeStatus: 'CURRENT',
          classLevel: 'FIRST',
          academicYear: '2024',
          program: {
            id: 1,
            nameAr: 'الذكاء الاصطناعي',
            nameEn: 'Artificial Intelligence'
          }
        }
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockAccount,
      });

      const result = await store.dispatch(traineeAccountsApi.endpoints.getTraineeAccountById.initiate('1'));

      expect(result.data).toEqual(mockAccount);
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:4000/api/trainee-platform/accounts/1',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Authorization': expect.any(String)
          })
        })
      );
    });
  });

  describe('updateTraineeAccountStatus endpoint', () => {
    it('should update trainee account status', async () => {
      const mockAccount = {
        id: '1',
        nationalId: '12345678901234',
        birthDate: '1990-01-01',
        password: null,
        isActive: false,
        lastLoginAt: '2024-01-15T10:30:00Z',
        resetCode: null,
        resetCodeExpiresAt: null,
        resetCodeGeneratedAt: null,
        traineeId: 1,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-15T10:30:00Z',
        trainee: {
          id: 1,
          nameAr: 'أحمد محمد',
          nameEn: 'Ahmed Mohamed',
          nationalId: '12345678901234',
          email: 'ahmed@example.com',
          phone: '+201234567890',
          photoUrl: null,
          traineeStatus: 'CURRENT',
          classLevel: 'FIRST',
          academicYear: '2024',
          program: {
            id: 1,
            nameAr: 'الذكاء الاصطناعي',
            nameEn: 'Artificial Intelligence'
          }
        }
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockAccount,
      });

      const result = await store.dispatch(traineeAccountsApi.endpoints.updateTraineeAccountStatus.initiate({
        id: '1',
        isActive: false
      }));

      expect(result.data).toEqual(mockAccount);
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:4000/api/trainee-platform/accounts/1/status',
        expect.objectContaining({
          method: 'PATCH',
          body: JSON.stringify({ isActive: false }),
          headers: expect.objectContaining({
            'Content-Type': 'application/json'
          })
        })
      );
    });
  });

  describe('resetTraineeAccountPassword endpoint', () => {
    it('should reset trainee account password', async () => {
      const mockResponse = { message: 'Password reset email sent' };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await store.dispatch(traineeAccountsApi.endpoints.resetTraineeAccountPassword.initiate('1'));

      expect(result.data).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:4000/api/trainee-platform/accounts/1/reset-password',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json'
          })
        })
      );
    });
  });

  describe('deleteTraineeAccount endpoint', () => {
    it('should delete trainee account', async () => {
      const mockResponse = { message: 'Account deleted successfully' };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await store.dispatch(traineeAccountsApi.endpoints.deleteTraineeAccount.initiate('1'));

      expect(result.data).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:4000/api/trainee-platform/accounts/1',
        expect.objectContaining({
          method: 'DELETE',
          headers: expect.objectContaining({
            'Content-Type': 'application/json'
          })
        })
      );
    });
  });

  describe('getTraineeAccountStats endpoint', () => {
    it('should fetch trainee account statistics', async () => {
      const mockStats = {
        total: 100,
        active: 80,
        inactive: 20,
        byProgram: [
          { programId: 1, programName: 'الذكاء الاصطناعي', count: 50 },
          { programId: 2, programName: 'تطوير الويب', count: 30 },
          { programId: 3, programName: 'علوم البيانات', count: 20 }
        ]
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockStats,
      });

      const result = await store.dispatch(traineeAccountsApi.endpoints.getTraineeAccountStats.initiate());

      expect(result.data).toEqual(mockStats);
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:4000/api/trainee-platform/accounts/stats',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Authorization': expect.any(String)
          })
        })
      );
    });
  });

  describe('API configuration', () => {
    it('should have correct reducer path', () => {
      expect(traineeAccountsApi.reducerPath).toBe('traineeAccountsApi');
    });

    it('should have correct tag types', () => {
      expect(traineeAccountsApi.tagTypes).toEqual(['TraineeAccount']);
    });
  });

  describe('Query parameter handling', () => {
    it('should handle empty query parameters', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: [], meta: { total: 0, page: 1, limit: 10, totalPages: 0, hasNext: false, hasPrev: false } }),
      });

      await store.dispatch(traineeAccountsApi.endpoints.getTraineeAccounts.initiate({}));

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:4000/api/trainee-platform/accounts',
        expect.objectContaining({
          method: 'GET'
        })
      );
    });

    it('should handle undefined filter values', async () => {
      const filters = {
        search: undefined,
        isActive: undefined,
        programId: undefined,
        page: 1,
        limit: 10,
        sortBy: 'createdAt',
        sortOrder: 'desc' as const
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ data: [], meta: { total: 0, page: 1, limit: 10, totalPages: 0, hasNext: false, hasPrev: false } }),
      });

      await store.dispatch(traineeAccountsApi.endpoints.getTraineeAccounts.initiate(filters));

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:4000/api/trainee-platform/accounts?page=1&limit=10&sortBy=createdAt&sortOrder=desc',
        expect.objectContaining({
          method: 'GET'
        })
      );
    });
  });
});
