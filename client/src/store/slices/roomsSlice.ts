import RoomsAPI from '@/http/RoomsAPI';
import { Status } from '@/models/HTTP';
import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { RoomData } from './../../models/Room';
import { RootState } from './../index';

export const hydrate = createAction<RootState>(HYDRATE);

const fetchRooms = createAsyncThunk('rooms/get', () => {
  const rooms = RoomsAPI.fetchRooms();
  return rooms;
});

interface RoomsState {
  roomsStatus: Status;
  rooms: RoomData[];
  currentRoom: RoomData | null;
}

const initialState: RoomsState = {
  roomsStatus: Status.pending,
  rooms: [],
  currentRoom: null
};

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setRooms(state) {
      state.rooms = [
        {
          adress: 'test',
          description: 'test',
          imageHref: '/test',
          name: 'test',
          id: 1
        }
      ];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(hydrate, (state, action) => {
        state.rooms = action.payload.rooms.rooms;
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

export const roomsActions = { fetchRooms, ...roomsSlice.actions };
export const roomReducer = roomsSlice.reducer;
