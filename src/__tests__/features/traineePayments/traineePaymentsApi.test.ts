import { configureStore } from '@reduxjs/toolkit';
import { traineePaymentsApi } from '@/lip/features/traineePayments/traineePaymentsApi';
import { TraineePaymentResponse } from '@/types/payment';

// Mock fetch
global.fetch = jest.fn();

const mockTraineePayments: TraineePaymentResponse[] = [
  {
    id: 1,
    amount: 2500,
    status: 'PAID',
    paidAmount: 2500,
    paidAt: '2024-01-15T10:30:00Z',
    notes: 'دفعة كاملة',
    fee: {
      id: 1,
      name: 'رسوم البرمجة المتقدمة',
      amount: 2500,
      type: 'TRAINING'
    },
    trainee: {
      id: 1,
      name: 'أحمد محمد'
    },
    safe: {
      id: '1',
      name: 'الخزينة الرئيسية'
    },
    transactions: [
      {
        id: '1',
        amount: 2500,
        type: 'PAYMENT',
        createdAt: '2024-01-15T10:30:00Z'
      }
    ]
  }
];

describe('TraineePayments API', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        [traineePaymentsApi.reducerPath]: traineePaymentsApi.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(traineePaymentsApi.middleware),
    });
    
    (fetch as jest.Mock).mockClear();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getTraineePayments', () => {
    it('should fetch trainee payments successfully', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockTraineePayments,
      });

      const result = await store.dispatch(
        traineePaymentsApi.endpoints.getTraineePayments.initiate()
      );

      expect(result.isSuccess).toBe(true);
      expect(result.data).toEqual(mockTraineePayments);
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:4000/api/finances/trainee-fees',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      );
    });

    it('should handle fetch error', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      const result = await store.dispatch(
        traineePaymentsApi.endpoints.getTraineePayments.initiate()
      );

      expect(result.isError).toBe(true);
      expect(result.error).toBeDefined();
    });

    it('should include authorization header when token is available', async () => {
      // Mock cookies
      const mockCookies = {
        get: jest.fn().mockReturnValue('mock-token'),
      };
      
      // Mock js-cookie
      jest.doMock('js-cookie', () => mockCookies);

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockTraineePayments,
      });

      await store.dispatch(
        traineePaymentsApi.endpoints.getTraineePayments.initiate()
      );

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:4000/api/finances/trainee-fees',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Authorization': 'Bearer mock-token',
          }),
        })
      );
    });
  });

  describe('addTraineePayment', () => {
    it('should add trainee payment successfully', async () => {
      const newPayment = {
        traineeId: 1,
        amount: 1000,
        safeId: '1',
        notes: 'دفعة جديدة'
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ ...mockTraineePayments[0], id: 2, ...newPayment }),
      });

      const result = await store.dispatch(
        traineePaymentsApi.endpoints.addTraineePayment.initiate(newPayment)
      );

      expect(result.isSuccess).toBe(true);
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:4000/api/finances/trainee-fees',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(newPayment),
        })
      );
    });

    it('should handle add payment error', async () => {
      const newPayment = {
        traineeId: 1,
        amount: 1000,
        safeId: '1',
        notes: 'دفعة جديدة'
      };

      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Server error'));

      const result = await store.dispatch(
        traineePaymentsApi.endpoints.addTraineePayment.initiate(newPayment)
      );

      expect(result.isError).toBe(true);
      expect(result.error).toBeDefined();
    });
  });

  describe('updateTraineePayment', () => {
    it('should update trainee payment successfully', async () => {
      const updateData = {
        id: 1,
        amount: 2000,
        safeId: '2',
        notes: 'تحديث الدفعة'
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ ...mockTraineePayments[0], ...updateData }),
      });

      const result = await store.dispatch(
        traineePaymentsApi.endpoints.updateTraineePayment.initiate(updateData)
      );

      expect(result.isSuccess).toBe(true);
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:4000/api/finances/trainee-fees/1',
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify({
            amount: updateData.amount,
            safeId: updateData.safeId,
            notes: updateData.notes
          }),
        })
      );
    });
  });

  describe('deleteTraineePayment', () => {
    it('should delete trainee payment successfully', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });

      const result = await store.dispatch(
        traineePaymentsApi.endpoints.deleteTraineePayment.initiate(1)
      );

      expect(result.isSuccess).toBe(true);
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:4000/api/finances/trainee-fees/1',
        expect.objectContaining({
          method: 'DELETE',
        })
      );
    });
  });

  describe('API Configuration', () => {
    it('should have correct base URL', () => {
      expect(traineePaymentsApi.reducerPath).toBe('traineePaymentsApi');
    });

    it('should have correct tag types', () => {
      expect(traineePaymentsApi.endpoints.getTraineePayments.providesTags).toEqual(['TraineePayment']);
      expect(traineePaymentsApi.endpoints.addTraineePayment.invalidatesTags).toEqual(['TraineePayment']);
      expect(traineePaymentsApi.endpoints.updateTraineePayment.invalidatesTags).toEqual(['TraineePayment']);
      expect(traineePaymentsApi.endpoints.deleteTraineePayment.invalidatesTags).toEqual(['TraineePayment']);
    });
  });
});