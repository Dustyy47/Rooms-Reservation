import { Calendar } from '@/components/UI/Calendar/Calendar';
import { Container } from '@/components/UI/Container/Container';
import { orderedDates } from '@/constants/Rooms';
import { useDatePicker } from '@/hooks/useDatePicker';
import { useRoomHistoryLinks } from '@/hooks/useRoomHistoryLink';
import { useAppSelector } from '@/store/hooks';

// TODO i18n

export default function Room() {
  const room = useAppSelector((state) => state.rooms.activeRoom);
  const { datesSelections, handlePickDate } = useDatePicker(orderedDates);
  const links = useRoomHistoryLinks();

  return (
    <Container title={`Бронирование помещения`} links={links}>
      <>
        {/* {room && <RoomPreview room={room} />} */}
        <Calendar></Calendar>
        {/* <MultipleSelection
          onPick={handlePickDate}
          label='Дата'
          groups={datesSelections}
        /> */}
      </>
    </Container>
  );
}
