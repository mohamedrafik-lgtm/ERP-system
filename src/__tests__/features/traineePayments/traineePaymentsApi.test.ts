import { configureStore } from '@reduxjs/toolkit';
import { traineePaymentsApi } from '@/lip/features/traineePayments/traineePaymentsApi';
import { TraineePaymentResponse } from '@/types/payment';

// Mock fetch
global.fetch = jest.fn();

const mockStore = configureStore({
  reducer: {
    [traineePaymentsApi.reducerPath]: traineePaymentsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(traineePaymentsApi.middleware),
});

describe('traineePaymentsApi', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
    localStorage.clear();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getTraineePayments', () => {
    it('should fetch trainee payments successfully', async () => {
      const mockPayments: TraineePaymentResponse[] = [
        {
          id: 1,
          amount: 5000,
          status: 'PARTIALLY_PAID',
          paidAmount: 3000,
          paidAt: '2024-01-15T10:30:00Z',
          notes: 'دفعة جزئية للرسوم',
          fee: {
            id: 1,
            name: 'رسوم التسجيل',
            amount: 5000,
            type: 'REGISTRATION_FEE'
          },
          trainee: {
            id: 1,
            name: 'أحمد محمد علي'
          },
          safe: {
            id: '1',
            name: 'الخزينة الرئيسية'
          },
          transactions: [
            {
              id: 'TXN-001',
              amount: 3000,
              type: 'PAYMENT',
              createdAt: '2024-01-15T10:30:00Z'
            }
          ]
        }
      ];

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockPayments,
      });

      const result = await mockStore.dispatch(
        traineePaymentsApi.endpoints.getTraineePayments.initiate()
      );

      expect(result.data).toEqual(mockPayments);
      expect(fetch).toHaveBeenCalledWith(
        '/api/finances/trainee-payments',
        expect.objectContaining({
          method: 'GET',
          headers: expect.any(Object),
        })
      );
    });

    it('should handle fetch error', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      const result = await mockStore.dispatch(
        traineePaymentsApi.endpoints.getTraineePayments.initiate()
      );

      expect(result.error).toBeDefined();
      expect(result.data).toBeUndefined();
    });

    it('should include authorization header when token exists', async () => {
      localStorage.setItem('token', 'test-token');
      
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

      await mockStore.dispatch(
        traineePaymentsApi.endpoints.getTraineePayments.initiate()
      );

      expect(fetch).toHaveBeenCalledWith(
        '/api/finances/trainee-payments',
        expect.objectContaining({
          headers: expect.objectContaining({
            authorization: 'Bearer test-token',
          }),
        })
      );
    });
  });

  describe('addTraineePayment', () => {
    it('should add trainee payment successfully', async () => {
      const paymentData = {
        traineeId: 1,
        amount: 2000,
        safeId: '1',
        notes: 'دفعة إضافية'
      };

      const mockResponse: TraineePaymentResponse = {
        id: 2,
        amount: 2000,
        status: 'PAID',
        paidAmount: 2000,
        paidAt: '2024-01-20T10:30:00Z',
        notes: 'دفعة إضافية',
        fee: {
          id: 1,
          name: 'رسوم التسجيل',
          amount: 5000,
          type: 'REGISTRATION_FEE'
        },
        trainee: {
          id: 1,
          name: 'أحمد محمد علي'
        },
        safe: {
          id: '1',
          name: 'الخزينة الرئيسية'
        },
        transactions: [
          {
            id: 'TXN-002',
            amount: 2000,
            type: 'PAYMENT',
            createdAt: '2024-01-20T10:30:00Z'
          }
        ]
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await mockStore.dispatch(
        traineePaymentsApi.endpoints.addTraineePayment.initiate(paymentData)
      );

      expect(result.data).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith(
        '/api/finances/trainee-payments',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(paymentData),
        })
      );
    });

    it('should handle add payment error', async () => {
      const paymentData = {
        traineeId: 1,
        amount: 2000,
        safeId: '1',
        notes: 'دفعة إضافية'
      };

      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Server error'));

      const result = await mockStore.dispatch(
        traineePaymentsApi.endpoints.addTraineePayment.initiate(paymentData)
      );

      expect(result.error).toBeDefined();
      expect(result.data).toBeUndefined();
    });
  });

  describe('updateTraineePayment', () => {
    it('should update trainee payment successfully', async () => {
      const updateData = {
        id: 1,
        amount: 1000,
        safeId: '2',
        notes: 'تحديث الدفعة'
      };

      const mockResponse: TraineePaymentResponse = {
        id: 1,
        amount: 1000,
        status: 'PAID',
        paidAmount: 1000,
        paidAt: '2024-01-20T10:30:00Z',
        notes: 'تحديث الدفعة',
        fee: {
          id: 1,
          name: 'رسوم التسجيل',
          amount: 5000,
          type: 'REGISTRATION_FEE'
        },
        trainee: {
          id: 1,
          name: 'أحمد محمد علي'
        },
        safe: {
          id: '2',
          name: 'خزينة الرسوم'
        },
        transactions: [
          {
            id: 'TXN-003',
            amount: 1000,
            type: 'PAYMENT',
            createdAt: '2024-01-20T10:30:00Z'
          }
        ]
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await mockStore.dispatch(
        traineePaymentsApi.endpoints.updateTraineePayment.initiate(updateData)
      );

      expect(result.data).toEqual(mockResponse);
      expect(fetch).toHaveBeenCalledWith(
        '/api/finances/trainee-payments/1',
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify({
            amount: 1000,
            safeId: '2',
            notes: 'تحديث الدفعة'
          }),
        })
      );
    });
  });
});
