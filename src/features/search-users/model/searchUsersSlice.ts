import { User } from '@/entities/users';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchUsersState {
  query: string;
  loading: boolean;
  results: User[];
  error: string | null;
}

const initialState: SearchUsersState = {
  query: '',
  loading: false,
  results: [],
  error: null,
};

const searchUsersSlice = createSlice({
  name: 'searchUsers',
  initialState,
  reducers: {
    searchUsers: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
      state.error = null;
      const trimmed = action.payload.trim();
      state.loading = Boolean(trimmed);
      if (!trimmed) {
        state.results = [];
      }
    },
    searchUsersSuccess: (state, action: PayloadAction<User[]>) => {
      state.loading = false;
      state.results = action.payload;
      state.error = null;
    },
    searchUsersError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetSearch: () => ({ ...initialState }),
  },
});

export const { actions: searchUsersActions } = searchUsersSlice;
export const { reducer: searchUsersReducer } = searchUsersSlice;
