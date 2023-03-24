import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { roomReducer } from './slices/roomsSlice';
import { usersReducer } from './slices/userSlice';

const store = configureStore({
  reducer: {
    rooms: roomReducer,
    user: usersReducer
  }
});

export const wrapper = createWrapper(() => store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
