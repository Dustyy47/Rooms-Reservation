import { handleFetchError } from '@/helpers/handleFetchError';
import { OrderData } from '@/types/Order';
import { AxiosError } from 'axios';
import { $authHost } from '.';

export interface CreateOrderDTO {
  start: string;
  end: string;
  roomId: string;
}

class OrdersAPI {
  async createOrder(dto: CreateOrderDTO) {
    try {
      const data = await $authHost.post('/orders', dto);
      return data.data;
    } catch (e) {
      console.log('@ERR', (e as AxiosError).response?.data);
      return handleFetchError(e);
    }
  }

  async getMyOrders() {
    try {
      const data = await $authHost.get<OrderData[]>('/orders/me');
      console.log(data.data);
      return data.data;
    } catch (e) {
      console.log('@ERR', (e as AxiosError).response?.data);
      return handleFetchError(e);
    }
  }
}

export default new OrdersAPI();
