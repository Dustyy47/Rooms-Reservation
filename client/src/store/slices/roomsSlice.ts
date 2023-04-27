import RoomsAPI from '@/http/RoomsAPI';
import { Status } from '@/types/HTTP';
import { OrderTime } from '@/types/Order';
import {
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { RoomData } from '../../types/Room';
import { RootState } from './../index';

export const hydrate = createAction<RootState>(HYDRATE);

const fetchRooms = createAsyncThunk('rooms/get', async () => {
  try {
    const rooms = await RoomsAPI.fetchRooms();
    return rooms!;
  } catch (e) {
    return [];
  }
});

const fetchOrders = createAsyncThunk<
  OrderTime[] | undefined,
  { roomId: string; date: Date }
>('rooms/getOrders', async (props) => {
  try {
    const { roomId, date } = props;
    const orders = await RoomsAPI.getRoomOrders(roomId, date);
    return orders;
  } catch (e) {
    return undefined;
  }
});

interface RoomsState {
  roomsStatus: Status;
  rooms: RoomData[];
  activeRoom: RoomData | null;
}

const initialState: RoomsState = {
  roomsStatus: Status.pending,
  rooms: [],
  activeRoom: null
};

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setActiveRoom(state, action: PayloadAction<RoomData>) {
      state.activeRoom = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(hydrate, (state, action) => {
        state.rooms = action.payload.rooms.rooms;
        state.activeRoom = action.payload.rooms.activeRoom;
      })
      .addCase(fetchRooms.pending, (state) => {
        state.roomsStatus = Status.pending;
      })
      .addCase(fetchRooms.rejected, (state) => {
        state.roomsStatus = Status.rejected;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.roomsStatus = Status.fulfiled;
        state.rooms = action.payload;
      });
  }
});

export const roomsActions = { fetchRooms, fetchOrders, ...roomsSlice.actions };
export const roomReducer = roomsSlice.reducer;
