import { configureStore } from '@reduxjs/toolkit'
import { loginApi } from './features/auth/login';
import authReducer from './features/auth/authSlice';
import { traineesApi } from './features/trainees/traineesApi';
import lockersReducer from './features/Lockers/lockersSlice';
import { programApi } from './features/program/program';
import addStudentApi from './features/student/student';
import { TraningContetnApi } from './features/TraningContetn/Traning';
import { UserAPI } from './features/users/user';
import { QuestionAPI } from './features/question/question';
import { LectureAPI } from './features/Lecture/lecture';
import { MarketerAPI } from './features/Marketer/Marketer';
import { SafeAPI } from './features/Lockers/safe';
import { FeesAPI } from './features/Fees/Fees';
import { traineePaymentsApi } from './features/traineePayments/traineePaymentsApi';
import { traineeFeesApi } from './features/traineeFees/traineeFeesApi';
import { traineePaymentDetailsApi } from './features/traineePayments/traineePaymentDetailsApi';
import { commissionsApi } from './features/commissions/commissionsApi';
import { marketersApi } from './features/marketers/marketersApi';
import { traineeAccountsApi } from './features/trainee-platform/traineeAccountsApi';
import { traineeStatsApi } from './features/trainee-platform/traineeStatsApi';
import { traineeAuthApi } from './features/trainee-auth/traineeAuthApi';

export const store = configureStore({
  reducer: {
    [loginApi.reducerPath]: loginApi.reducer,
    [traineesApi.reducerPath]: traineesApi.reducer,
    [programApi.reducerPath]: programApi.reducer,
    [addStudentApi.reducerPath] : addStudentApi.reducer,
    [TraningContetnApi.reducerPath]: TraningContetnApi.reducer,
    [UserAPI.reducerPath]:UserAPI.reducer,
    [QuestionAPI.reducerPath]:QuestionAPI.reducer,
    [LectureAPI.reducerPath]:LectureAPI.reducer,
    [MarketerAPI.reducerPath]: MarketerAPI.reducer,
    [SafeAPI.reducerPath]: SafeAPI.reducer,
    [FeesAPI.reducerPath]:FeesAPI.reducer,
    [traineePaymentsApi.reducerPath]: traineePaymentsApi.reducer,
    [traineeFeesApi.reducerPath]: traineeFeesApi.reducer,
    [traineePaymentDetailsApi.reducerPath]: traineePaymentDetailsApi.reducer,
    [commissionsApi.reducerPath]: commissionsApi.reducer,
    [marketersApi.reducerPath]: marketersApi.reducer,
    [traineeAccountsApi.reducerPath]: traineeAccountsApi.reducer,
    [traineeStatsApi.reducerPath]: traineeStatsApi.reducer,
    [traineeAuthApi.reducerPath]: traineeAuthApi.reducer,
    auth: authReducer,
    lockers: lockersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      loginApi.middleware,
      traineesApi.middleware,
      programApi.middleware,
      addStudentApi.middleware,
      TraningContetnApi.middleware,
      UserAPI.middleware,
      QuestionAPI.middleware,
      MarketerAPI.middleware,
      SafeAPI.middleware,
      LectureAPI.middleware,
      FeesAPI.middleware,
      traineePaymentsApi.middleware,
      traineeFeesApi.middleware,
      traineePaymentDetailsApi.middleware,
      commissionsApi.middleware,
      marketersApi.middleware,
      traineeAccountsApi.middleware,
      traineeStatsApi.middleware,
      traineeAuthApi.middleware
    ),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch