import { AnyAction, ThunkMiddleware, configureStore } from '@reduxjs/toolkit';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { createWrapper } from 'next-redux-wrapper';
import { ordersReducer } from './slices/ordersSlice';
import { roomReducer } from './slices/roomsSlice';
import { usersReducer } from './slices/userSlice';

const store = configureStore({
  reducer: {
    rooms: roomReducer,
    user: usersReducer,
    orders: ordersReducer
  }
});

export const wrapper = createWrapper(() => store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type RootStore = ToolkitStore<
  RootState,
  AnyAction,
  [ThunkMiddleware<RootState, AnyAction>]
>;
