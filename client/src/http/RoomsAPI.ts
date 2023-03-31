import { rooms } from './../constants/Rooms';
class RoomsAPI {
  fetchRooms() {
    return rooms;
  }
}

export default new RoomsAPI();
