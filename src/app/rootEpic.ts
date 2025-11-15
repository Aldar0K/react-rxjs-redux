import { fetchUsersEpic } from '@/features/users';
import { searchUsersEpic } from '@/features/search-users';
import { combineEpics } from 'redux-observable';

export const rootEpic = combineEpics(fetchUsersEpic, searchUsersEpic);
