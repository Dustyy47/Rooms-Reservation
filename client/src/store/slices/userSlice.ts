import UserAPI from '@/http/UserAPI';
import { Status } from '@/types/HTTP';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserData } from './../../types/User';

const fetchUser = createAsyncThunk('users/getMe', async () => {
  const user = await UserAPI.fetchUser();
  return user;
});

interface UserState {
  user: UserData | null;
  loadingUser: Status;
}

const initialState: UserState = {
  user: null,
  loadingUser: Status.pending
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    exit(state) {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload || null;
        state.loadingUser = Status.fulfiled;
      })
      .addCase(fetchUser.pending, (state) => {
        state.loadingUser = Status.pending;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loadingUser = Status.rejected;
      });
  }
});

export const usersActions = { fetchUser, ...userSlice.actions };
export const usersReducer = userSlice.reducer;
