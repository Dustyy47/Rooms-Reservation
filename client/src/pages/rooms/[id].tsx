import { Calendar } from '@/components/UI/Calendar/Calendar';
import { Container } from '@/components/UI/Container/Container';
import { useRoomHistoryLinks } from '@/hooks/useRoomHistoryLink';
import { useAppSelector } from '@/store/hooks';

// TODO i18n

export default function Room() {
  const room = useAppSelector((state) => state.rooms.activeRoom);
  const links = useRoomHistoryLinks();

  function handlePickDate(date: Date) {
    console.log(date);
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
