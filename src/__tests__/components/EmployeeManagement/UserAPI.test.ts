import { configureStore } from '@reduxjs/toolkit';
import { UserAPI } from '@/lip/features/users/user';

// Mock fetch
global.fetch = jest.fn();

describe('UserAPI', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        [UserAPI.reducerPath]: UserAPI.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(UserAPI.middleware),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getUsers endpoint', () => {
    it('should fetch users successfully', async () => {
      const mockUsers = [
        {
          id: '1',
          name: 'أحمد محمد',
          email: 'ahmed@example.com',
          phone: '+201234567890',
          accountType: 'STAFF',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-01'
        }
      ];

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockUsers,
      });

      const result = await store.dispatch(UserAPI.endpoints.getUsers.initiate());

      expect(result.data).toEqual(mockUsers);
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:4000/api/users',
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

      const result = await store.dispatch(UserAPI.endpoints.getUsers.initiate());

      expect(result.error).toBeDefined();
    });
  });

  describe('createUser endpoint', () => {
    it('should create user successfully', async () => {
      const newUser = {
        name: 'أحمد محمد',
        email: 'ahmed@example.com',
        phone: '+201234567890',
        password: 'password123',
        accountType: 'STAFF'
      };

      const createdUser = {
        id: '1',
        ...newUser,
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => createdUser,
      });

      const result = await store.dispatch(UserAPI.endpoints.createUser.initiate(newUser));

      expect(result.data).toEqual(createdUser);
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:4000/api/users',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(newUser),
          headers: expect.objectContaining({
            'Content-Type': 'application/json'
          })
        })
      );
    });
  });

  describe('patchUser endpoint', () => {
    it('should update user successfully', async () => {
      const updateData = {
        name: 'أحمد محمد محدث',
        email: 'ahmed.updated@example.com'
      };

      const updatedUser = {
        id: '1',
        ...updateData,
        phone: '+201234567890',
        accountType: 'STAFF',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-02'
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => updatedUser,
      });

      const result = await store.dispatch(
        UserAPI.endpoints.patchUser.initiate({ id: '1', data: updateData })
      );

      expect(result.data).toEqual(updatedUser);
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:4000/api/users/1',
        expect.objectContaining({
          method: 'PATCH',
          body: JSON.stringify(updateData),
          headers: expect.objectContaining({
            'Content-Type': 'application/json'
          })
        })
      );
    });
  });

  describe('deleteUser endpoint', () => {
    it('should delete user successfully', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 204,
      });

      const result = await store.dispatch(UserAPI.endpoints.deleteUser.initiate('1'));

      expect(result.data).toBeUndefined();
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:4000/api/users/1',
        expect.objectContaining({
          method: 'DELETE',
          headers: expect.objectContaining({
            'Content-Type': 'application/json'
          })
        })
      );
    });
  });

  describe('getUserById endpoint', () => {
    it('should fetch user by ID successfully', async () => {
      const user = {
        id: '1',
        name: 'أحمد محمد',
        email: 'ahmed@example.com',
        phone: '+201234567890',
        accountType: 'STAFF',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => user,
      });

      const result = await store.dispatch(UserAPI.endpoints.getUserById.initiate('1'));

      expect(result.data).toEqual(user);
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:4000/api/users/1',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Authorization': expect.any(String)
          })
        })
      );
    });
  });

  describe('loginUser endpoint', () => {
    it('should login user successfully', async () => {
      const loginData = {
        email: 'ahmed@example.com',
        password: 'password123'
      };

      const loginResponse = {
        access_token: 'jwt-token',
        user: {
          id: '1',
          name: 'أحمد محمد',
          email: 'ahmed@example.com',
          accountType: 'STAFF'
        }
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => loginResponse,
      });

      const result = await store.dispatch(UserAPI.endpoints.loginUser.initiate(loginData));

      expect(result.data).toEqual(loginResponse);
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:4000/api/auth/login',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(loginData),
          headers: expect.objectContaining({
            'Content-Type': 'application/json'
          })
        })
      );
    });
  });

  describe('getUsersByAccountType endpoint', () => {
    it('should fetch users by account type successfully', async () => {
      const staffUsers = [
        {
          id: '1',
          name: 'أحمد محمد',
          email: 'ahmed@example.com',
          phone: '+201234567890',
          accountType: 'STAFF',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-01'
        }
      ];

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => staffUsers,
      });

      const result = await store.dispatch(
        UserAPI.endpoints.getUsersByAccountType.initiate('STAFF')
      );

      expect(result.data).toEqual(staffUsers);
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:4000/api/users?accountType=STAFF',
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
    it('should have correct base URL', () => {
      expect(UserAPI.reducerPath).toBe('userApi');
    });

    it('should have correct tag types', () => {
      expect(UserAPI.tagTypes).toEqual(['User']);
    });
  });
});
