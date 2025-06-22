import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginResponse } from './login';
import { RootState } from '../../store';
import Cookies from 'js-cookie';

// تعريف واجهة حالة المستخدم
interface AuthState {
  user: LoginResponse['user'] | null;
  token: string | null;
  isAuthenticated: boolean;
}

// قراءة بيانات المصادقة من الكوكيز
const getInitialAuthState = (): AuthState => {
  if (typeof window !== 'undefined') {
    try {
      // التحقق من وجود التوكن باسم access_token أو auth_token
      const token = Cookies.get('access_token') || Cookies.get('auth_token');
      const userStr = Cookies.get('user_data');
      
      if (token && userStr) {
        const user = JSON.parse(userStr);
        return {
          user,
          token,
          isAuthenticated: true
        };
      }
    } catch (error) {
      console.error('Failed to read auth data from cookies', error);
    }
  }

  // حالة افتراضية إذا لم تكن هناك بيانات مصادقة مخزنة
  return {
    user: null,
    token: null,
    isAuthenticated: false
  };
};

// إنشاء slice للتحكم بحالة المستخدم
export const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialAuthState(),
  reducers: {
    setCredentials: (state, action: PayloadAction<LoginResponse>) => {
      const { user, access_token } = action.payload;
      state.user = user;
      state.token = access_token;
      state.isAuthenticated = true;
      
      // حفظ بيانات المصادقة في الكوكيز (إذا لم يتم حفظها من الخادم)
      try {
        if (typeof window !== 'undefined') {
          // تحقق مما إذا كانت الكوكيز موجودة بالفعل
          if (!Cookies.get('access_token')) {
            Cookies.set('access_token', access_token, { expires: 7, path: '/' });
          }
          if (!Cookies.get('auth_token')) {
            Cookies.set('auth_token', access_token, { expires: 7, path: '/' });
          }
          if (!Cookies.get('user_data')) {
            Cookies.set('user_data', JSON.stringify(user), { expires: 7, path: '/' });
          }
        }
      } catch (error) {
        console.error('Failed to save token to cookies', error);
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      
      // حذف بيانات المصادقة من الكوكيز
      try {
        if (typeof window !== 'undefined') {
          Cookies.remove('access_token', { path: '/' });
          Cookies.remove('auth_token', { path: '/' });
          Cookies.remove('user_data', { path: '/' });
        }
      } catch (error) {
        console.error('Failed to clear auth data from cookies', error);
      }
    },
    // فحص حالة المصادقة من الكوكيز
    checkAuthState: (state) => {
      if (typeof window !== 'undefined') {
        try {
          // التحقق من وجود التوكن باسم access_token أو auth_token
          const token = Cookies.get('access_token') || Cookies.get('auth_token');
          const userStr = Cookies.get('user_data');
          
          if (token && userStr) {
            const user = JSON.parse(userStr);
            state.user = user;
            state.token = token;
            state.isAuthenticated = true;
          } else {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
          }
        } catch (error) {
          console.error('Failed to check auth state from cookies', error);
          state.isAuthenticated = false;
        }
      }
    }
  },
});

// تصدير الإجراءات
export const { setCredentials, logout, checkAuthState } = authSlice.actions;

// تصدير selectors للوصول إلى حالة المستخدم
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectToken = (state: RootState) => state.auth.token;

export default authSlice.reducer; 