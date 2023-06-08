import { RoomData } from './Room';

export type OrderStatus = 'FULFILLED' | 'REJECTED' | 'PENDING';

export interface OrderTime {
  start: string;
  end: string;
}

export interface OrderMeta {
  time: OrderTime;
  roomID: string;
}

export interface OrderMetaDetailed {
  time: OrderTime;
  roomID: string;
  room: RoomData;
}

export interface OrderData {
  id: string;
  roomId: string;
  room: RoomData;
  start: string;
  end: string;
  customerId: string;
  status: OrderStatus;
}
