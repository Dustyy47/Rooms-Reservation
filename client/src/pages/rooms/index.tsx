import { RoomPreview } from '@/components/RoomPreview/RoomPreview';
import Button from '@/components/UI/Button/Button';
import { Container } from '@/components/UI/Container/Container';
import { roomsHistoryLinks } from '@/constants/Links';
import { setAuthHeader } from '@/helpers/authorization';
import { getAuthSSP } from '@/helpers/getAuthSSP';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { roomsActions } from '@/store/slices/roomsSlice';
import { RoomData } from '@/types/Room';
import { useRouter } from 'next/router';

export default function Rooms() {
  const router = useRouter();

  const rooms = useAppSelector((state) => state.rooms.rooms);
  const dispatch = useAppDispatch();

  function redirectToRoom(room: RoomData) {
    dispatch(roomsActions.setActiveRoom(room));
    router.push(`/rooms/${room.id}`);
  }

  return (
    <Container links={roomsHistoryLinks} title='Бронирование помещений'>
      {rooms.map((room) => (
        <div
          key={room.id}
          className='flex max-w-[48.9rem]  flex-col items-end tablet:flex-col-reverse [&+&]:mt-[6.04rem]'
        >
          <RoomPreview room={room} className='mb-[1.6rem] w-full' />
          <Button className='' onClick={() => redirectToRoom(room)}>
            Посмотреть
          </Button>
        </div>
      ))}
    </Container>
  );
}

export const getServerSideProps = getAuthSSP((store) => async (ctx) => {
  setAuthHeader(ctx);
  await store.dispatch(roomsActions.fetchRooms());
  return { props: {} };
});
