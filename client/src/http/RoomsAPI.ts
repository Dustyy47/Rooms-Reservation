import { rooms } from './../constants/Rooms';
class RoomsAPI {
  fetchRooms() {
    console.log(rooms);
    return rooms;
  }
}

export default new RoomsAPI();
