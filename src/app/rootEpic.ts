import { combineEpics } from 'redux-observable';
import { fetchUsersEpic } from '@/features/users/usersEpic';

export const rootEpic = combineEpics(fetchUsersEpic);
