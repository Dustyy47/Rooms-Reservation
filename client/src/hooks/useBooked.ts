import OrdersAPI from '@/http/OrdersAPI';
import { OrderData } from '@/types/Order';
import { useEffect, useState } from 'react';

export function useBooked() {
  const [orders, setOrders] = useState<OrderData[]>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchOrders() {
      const fetchedOrders = await OrdersAPI.getMyOrders();
      setOrders(fetchedOrders || []);
    }
    fetchOrders();
  }, []);

  return {
    orders,
    isLoading
  };
}
