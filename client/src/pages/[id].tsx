import { RoomPreview } from '@/components/RoomPreview/RoomPreview';
import { Container } from '@/components/UI/Container/Container';
import { MultipleSelection } from '@/components/UI/MultipleSelection/MultipleSelection';
import { roomsHistoryLinks } from '@/constants/Links';
import { useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

export default function Room() {
  const router = useRouter();
  const room = useAppSelector((state) => state.rooms.activeRoom);
  router.query.id;

  const historyLinks = useMemo(() => {
    return [
      ...roomsHistoryLinks,
      {
        label: `${router.query.id}`,
        to: `/${router.query.id}`
      }
    ];
  }, [router.query.id]);

  return (
    <Container title={`Бронирование помещения`} links={historyLinks}>
      <>
        {room && <RoomPreview room={room} />}
        <MultipleSelection
          label='Дата'
          groups={[
            {
              data: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май'],
              name: 'Месяц'
            },
            {
              data: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
              name: 'День'
            }
          ]}
        />
      </>
    </Container>
  );
}
