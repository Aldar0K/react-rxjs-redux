import { usersReducer } from '@/features/users';
import { searchUsersReducer } from '@/features/search-users';
import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from './rootEpic';

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
  reducer: {
    users: usersReducer,
    searchUsers: searchUsersReducer,
  },
  middleware: getDefault => getDefault().concat(epicMiddleware),
});

epicMiddleware.run(rootEpic);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
