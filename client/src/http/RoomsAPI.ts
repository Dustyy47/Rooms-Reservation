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

  async getRoomOrders(id: string, date: Date) {
    try {
      const path =
        '/rooms/' + id + '/orders/' + date.toISOString().split('T')[0];
      const data = await $authHost.get(path);
      return data;
    } catch (e) {
      console.log(e);
    }
  }
}

export default new RoomsAPI();
