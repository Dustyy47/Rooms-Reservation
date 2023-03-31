import { handleFetchError } from '@/helpers/handleFetchError';
import { RoomData } from '@/types/Room';
import { AxiosError } from 'axios';
import { $authHost } from '.';
class RoomsAPI {
  async fetchRooms() {
    try {
      const data = await $authHost.get<RoomData[]>('/rooms');
      return data.data;
    } catch (e) {
      console.log('@ERR', (e as AxiosError).response?.data);
      return handleFetchError(e);
    }
  }
}

export default new RoomsAPI();
