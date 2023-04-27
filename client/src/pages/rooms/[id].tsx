import { Calendar } from '@/components/UI/Calendar/Calendar';
import { Container } from '@/components/UI/Container/Container';
import { useRoomHistoryLinks } from '@/hooks/useRoomHistoryLink';
import RoomsAPI from '@/http/RoomsAPI';
import { OrderTime } from '@/types/Order';
import { useRouter } from 'next/router';
import { useState } from 'react';

// TODO i18n

interface OrderedTimesList {
  orderedTimes: OrderTime[];
}

function getTimeFromDateString(dateString: string) {
  return dateString.split('T')[1]?.slice(0, 5);
}
export function OrderedTimesList({ orderedTimes }: OrderedTimesList) {
  function renderTime() {
    return (
      <ul>
        {orderedTimes.map((time, index) => {
          const formattedTime = {
            start: getTimeFromDateString(time.start),
            end: getTimeFromDateString(time.end)
          };
          return (
            <li key={index}>
              <span>
                {formattedTime.start} - {formattedTime.end}
              </span>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div className='max-w-[20%]'>
      <h2>Занятое время:</h2>
      {orderedTimes?.length > 0 ? (
        renderTime()
      ) : (
        <span className='text-c-grey'>
          Помещение никем не забронировано на этот день
        </span>
      )}
    </div>
  );
}

export default function Room() {
  const router = useRouter();
  const id = router.query.id as string;
  const [makedOrders, setMakedOrders] = useState<OrderTime[] | null>(null);

  const links = useRoomHistoryLinks();

  async function handlePickDate(date: Date) {
    const orders = (await RoomsAPI.getRoomOrders(id, date)) || [];
    setMakedOrders(orders);
  }

  return (
    <Container title={`Бронирование помещения`} links={links}>
      <div className='flex'>
        <div className='mr-[5rem]'>
          <Calendar onPick={handlePickDate}></Calendar>
        </div>
        {makedOrders && (
          <>
            <OrderedTimesList orderedTimes={makedOrders!}></OrderedTimesList>
          </>
        )}
      </div>
    </Container>
  );
}
