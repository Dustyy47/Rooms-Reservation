import { handleFetchError } from '@/helpers/handleFetchError';
import { OrderTime } from '@/types/Order';
import { RoomData } from '@/types/Room';
import { AxiosError } from 'axios';
import { $authHost } from '.';
class RoomsAPI {
  async fetchRooms() {
    try {
      const data = await $authHost.get<RoomData[]>('/rooms');
      console.log(data.data);
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
      const orders = await $authHost.get<OrderTime[]>(path, {
        params: { limit: '5' }
      });
      return orders.data;
    } catch (e) {}
  }

  async getRoom(id: string) {
    try {
      const room = await $authHost.get<RoomData>(`/rooms/${id}`);
      return room.data;
    } catch (e) {
      return handleFetchError(e);
    }
  }
}

export default new RoomsAPI();
