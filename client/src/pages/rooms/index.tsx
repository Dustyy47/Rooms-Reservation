import { RoomPreview } from '@/components/RoomPreview/RoomPreview';
import Button from '@/components/UI/Button/Button';
import { Container } from '@/components/UI/Container/Container';
import { roomsHistoryLinks } from '@/constants/Links';
import { setAuthHeader } from '@/helpers/authorization';
import { RootState, wrapper } from '@/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { roomsActions } from '@/store/slices/roomsSlice';
import { RoomData } from '@/types/Room';
import { AnyAction, ThunkMiddleware } from '@reduxjs/toolkit';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { GetServerSidePropsCallback } from 'next-redux-wrapper';
import { useRouter } from 'next/router';

export default function Rooms() {
  const router = useRouter();

  const rooms = useAppSelector((state) => state.rooms.rooms);
  const dispatch = useAppDispatch();

  function redirectToRoom(room: RoomData) {
    dispatch(roomsActions.setActiveRoom(room));
    router.push(`/rooms/${room._id}`);
  }

  return (
    <Container links={roomsHistoryLinks} title='Бронирование помещений'>
      {rooms.map((room) => (
        <div
          key={room._id}
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

type RootStore = ToolkitStore<
  RootState,
  AnyAction,
  [ThunkMiddleware<RootState, AnyAction>]
>;

export function getAuthSSP(cb: GetServerSidePropsCallback<RootStore, {}>) {
  return wrapper.getServerSideProps((store) => async (ctx) => {
    setAuthHeader(ctx);
    const ctxCb = await cb(store);
    const result = await ctxCb(ctx);
    return { ...result, props: {} };
  });
}

export const getServerSideProps = getAuthSSP((store) => async (ctx) => {
  console.log('@FETCH_ROOMS');
  setAuthHeader(ctx);
  await store.dispatch(roomsActions.fetchRooms());
  return { props: {} };
});

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async (ctx) => {
//     console.log('@FETCH_ROOMS');
//     setAuthHeader(ctx);
//     await store.dispatch(roomsActions.fetchRooms());
//     return { props: {} };
//   }
// );
