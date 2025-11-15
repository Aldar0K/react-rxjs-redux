import { RootState } from '@/app/store';

export const selectUsersState = (state: RootState) => state.users;

export const selectUsersLoading = (state: RootState) => state.users.loading;
export const selectUsersData = (state: RootState) => state.users.data;
export const selectUsersError = (state: RootState) => state.users.error;
