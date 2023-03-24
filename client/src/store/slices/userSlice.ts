import UserAPI from '@/http/UserAPI';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserData } from './../../types/User';
import { hydrate } from './roomsSlice';

const fetchUser = createAsyncThunk('users/getMe', async () => {
  const user = await UserAPI.fetchUser();
  return user;
});

interface UserState {
  user: UserData | null;
}

const initialState: UserState = {
  user: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(hydrate, (state, action) => {
        //state.user = action.payload.user.user;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  }
});

export const usersActions = { fetchUser, ...userSlice.actions };
export const usersReducer = userSlice.reducer;
