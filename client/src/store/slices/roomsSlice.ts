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

const fetchActiveRoom = createAsyncThunk(
  'rooms/getActive',
  async (id: string) => {
    try {
      const room = await RoomsAPI.getRoom(id);
      return room;
    } catch (e) {
      return undefined;
    }
  }
);

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
  activeRoomLoading: Status;
}

const initialState: RoomsState = {
  roomsStatus: Status.pending,
  rooms: [],
  activeRoom: null,
  activeRoomLoading: Status.pending
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
        state.activeRoomLoading = action.payload.rooms.activeRoomLoading;
      })
      .addCase(fetchRooms.pending, (state) => {
        state.roomsStatus = Status.pending;
      })
      .addCase(fetchRooms.rejected, (state) => {
        state.roomsStatus = Status.rejected;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.roomsStatus = Status.fulfiled;
        state.activeRoomLoading = Status.fulfiled;
        state.rooms = action.payload;
      })
      .addCase(fetchActiveRoom.fulfilled, (state, action) => {
        state.activeRoom = action.payload as RoomData;
        state.activeRoomLoading = Status.fulfiled;
      })
      .addCase(fetchActiveRoom.pending, (state) => {
        state.activeRoomLoading = Status.pending;
      });
  }
});

export const roomsActions = {
  fetchRooms,
  fetchOrders,
  fetchActiveRoom,
  ...roomsSlice.actions
};
export const roomReducer = roomsSlice.reducer;
