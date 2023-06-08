import { OrdersListItem } from '@/components/Orders/OrdersListItem';
import { Container } from '@/components/UI/Container/Container';
import { routes } from '@/constants/Links';
import { useBooked } from '@/hooks/useBooked';

const historyLinks = [
  {
    to: routes.booked,
    label: 'Забронированные помещения'
  }
];

export default function Booked() {
  const { isLoading, orders } = useBooked();

  return (
    <Container links={historyLinks} title='Забронированные помещения'>
      {isLoading
        ? 'Загрузка...'
        : orders?.map((order) => (
            <div key={order.id} className='mb-[1rem]  w-[85%] '>
              <OrdersListItem data={order}></OrdersListItem>
            </div>
          ))}
    </Container>
  );
}
