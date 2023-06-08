import OrdersAPI, { CreateOrderDTO } from '@/http/OrdersAPI';
import { useAppSelector } from '@/store/hooks';
import { MakeOrderFormFields } from '@/types/Forms';
import { OrderMetaDetailed } from '@/types/Order';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export function useMakeOrder() {
  const formOrderMeta = useAppSelector((state) => state.orders.formOrderMeta);
  const formOrderRoom = useAppSelector((state) =>
    state.rooms.rooms.find((r) => r.id === formOrderMeta?.roomID)
  );
  const router = useRouter();
  const isActive = formOrderMeta !== null;

  function makeOrder(fields: MakeOrderFormFields) {
    const dto: CreateOrderDTO = {
      start: formOrderMeta?.time.start || '',
      end: formOrderMeta?.time.end || '',
      roomId: formOrderMeta?.roomID || ''
    };
    OrdersAPI.createOrder(dto);
    router.push('/rooms');
  }

  useEffect(() => {
    if (!isActive) {
      router.push('/rooms');
    }
  }, []);

  const details: Partial<OrderMetaDetailed> = {
    roomID: formOrderMeta?.roomID,
    time: formOrderMeta?.time,
    room: formOrderRoom
  };

  return {
    isActive,
    makeOrder,
    details
  };
}
