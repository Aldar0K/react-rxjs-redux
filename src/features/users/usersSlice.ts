import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: number;
  firstName: string;
}

interface UsersState {
  loading: boolean;
  data: User[];
  error: string | null;
}

const initialState: UsersState = {
  loading: false,
  data: [],
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchUsers: state => {
      state.loading = true;
      state.error = null;
    },
    fetchUsersSuccess: (state, action: PayloadAction<User[]>) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchUsersError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { actions: usersActions } = usersSlice;
export const { reducer: usersReducer } = usersSlice;
