import { Calendar } from '@/components/UI/Calendar/Calendar';
import { Container } from '@/components/UI/Container/Container';
import { useRoomHistoryLinks } from '@/hooks/useRoomHistoryLink';
import RoomsAPI from '@/http/RoomsAPI';
import { useRouter } from 'next/router';

// TODO i18n

export default function Room() {
  const router = useRouter();
  const id = router.query.id as string;

  const links = useRoomHistoryLinks();

  async function handlePickDate(date: Date) {
    const data = await RoomsAPI.getRoomOrders(id, date);
    console.log(data);
  }

  return (
    <Container title={`Бронирование помещения`} links={links}>
      <>
        {/* {room && <RoomPreview room={room} />} */}
        <Calendar onPick={handlePickDate}></Calendar>
      </>
    </Container>
  );
}
