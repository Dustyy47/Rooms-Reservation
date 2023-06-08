import { getFormattedDay, getTimeForDisplay } from '@/helpers/timeHelpers';
import { OrderData } from '@/types/Order';
import { LocationIcon } from '../SVG/Location';

interface OrdersListItemProps {
  data: OrderData;
}

export function OrdersListItem({ data }: OrdersListItemProps) {
  const wrapperStatusStyle =
    data.status === 'FULFILLED'
      ? 'bg-c-greenLight'
      : data.status === 'REJECTED'
      ? 'bg-c-red'
      : '';

  const statusText =
    data.status === 'FULFILLED'
      ? 'Бронь принята'
      : data.status === 'REJECTED'
      ? 'Бронь отклонена'
      : 'Бронь ещё не была рассмотрена';

  return (
    <div
      className={
        'flex h-[4rem] items-center justify-between rounded-common bg-c-blue p-[1rem] ' +
        wrapperStatusStyle
      }
    >
      <div className='flex items-center justify-between'>
        <div className='mr-[1rem]'>
          <LocationIcon />
        </div>
        <h4>{data.room.title}</h4>
      </div>
      <div className='flex w-[50%] items-center justify-end'>
        <span className='w-[25%]'>{getFormattedDay(new Date(data.start))}</span>
        <div className='flex w-[25%]'>
          <span>{getTimeForDisplay(new Date(data.start))} - </span>
          <span>{getTimeForDisplay(new Date(data.end))}</span>
        </div>
        <span className='w-[50%]'>{statusText}</span>
      </div>
    </div>
  );
}
