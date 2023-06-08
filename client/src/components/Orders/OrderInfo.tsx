import { getFormattedDay, getTimeForDisplay } from '@/helpers/timeHelpers';
import { OrderMetaDetailed } from '@/types/Order';
import { ReactNode } from 'react';
import { RoomImage } from '../RoomImage/RoomImage';

interface OrderInfoLineProps {
  label: string;
  content: ReactNode;
}

function InfoLine({ label, content }: OrderInfoLineProps) {
  return (
    <div className='flex'>
      <p className='mr-[1rem] min-w-[45%] font-bold '>{label}</p>
      <div> {content}</div>
    </div>
  );
}

interface OrderInfoProps {
  orderMeta: OrderMetaDetailed;
}

export function OrderInfo({ orderMeta }: OrderInfoProps) {
  return (
    <div className='flex flex-col'>
      <div className='mb-[1.25rem]'>
        <RoomImage image={orderMeta.room.image}></RoomImage>
      </div>
      <InfoLine label={'Название помещения: '} content={orderMeta.room.title} />
      <InfoLine label={'Адрес помещения: '} content={orderMeta.room.adress} />
      <InfoLine
        label={'День брони: '}
        content={getFormattedDay(new Date(orderMeta.time.start))}
      />
      <InfoLine
        label={'Начало брони: '}
        content={getTimeForDisplay(new Date(orderMeta.time.start))}
      />
      <InfoLine
        label={'Конец брони: '}
        content={getTimeForDisplay(new Date(orderMeta.time.end))}
      />
    </div>
  );
}
