import { configureStore } from '@reduxjs/toolkit'
import { loginApi } from './features/auth/login';
import authReducer from './features/auth/authSlice';
import { traineesApi } from './features/trainees/traineesApi';
import { programApi } from './features/program/program';

export const store = configureStore({
  reducer: {
    [loginApi.reducerPath]: loginApi.reducer,
    [traineesApi.reducerPath]: traineesApi.reducer,
    [programApi.reducerPath]: programApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      loginApi.middleware,
      traineesApi.middleware,
      programApi.middleware,
    ),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch