import { configureStore } from '@reduxjs/toolkit'
import { loginApi } from './features/auth/login';
import authReducer from './features/auth/authSlice';
import { traineesApi } from './features/trainees/traineesApi';
import { programApi } from './features/program/program';
import addStudentApi from './features/student/student';
import { TraningContetnApi } from './features/TraningContetn/Traning';
import { UserAPI } from './features/users/user';

export const store = configureStore({
  reducer: {
    [loginApi.reducerPath]: loginApi.reducer,
    [traineesApi.reducerPath]: traineesApi.reducer,
    [programApi.reducerPath]: programApi.reducer,
    [addStudentApi.reducerPath] : addStudentApi.reducer,
    [TraningContetnApi.reducerPath]: TraningContetnApi.reducer,
    [UserAPI.reducerPath]:UserAPI.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      loginApi.middleware,
      traineesApi.middleware,
      programApi.middleware,
      addStudentApi.middleware,
      TraningContetnApi.middleware,
      UserAPI.middleware
    ),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch