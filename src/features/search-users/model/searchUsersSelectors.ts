import { RootState } from '@/app/store';

export const selectSearchUsersState = (state: RootState) => state.searchUsers;
export const selectSearchQuery = (state: RootState) => state.searchUsers.query;
export const selectSearchUsersLoading = (state: RootState) => state.searchUsers.loading;
export const selectSearchUsersResults = (state: RootState) => state.searchUsers.results;
export const selectSearchUsersError = (state: RootState) => state.searchUsers.error;
