import { MakeOrderForm } from '@/components/Forms/MakeOrderForm';
import { OrderedTimesList } from '@/components/Orders/OrderedTimesList';
import Button from '@/components/UI/Button/Button';
import { Calendar } from '@/components/UI/Calendar/Calendar';
import { Container } from '@/components/UI/Container/Container';
import { Modal } from '@/components/UI/Modal/Modal';
import { TimePicker } from '@/components/UI/TimePicker/TimePicker';
import { useRoomHistoryLinks } from '@/hooks/useRoomHistoryLink';
import { useTimeIntervalPicker } from '@/hooks/useTimeIntervalPicker';
import RoomsAPI from '@/http/RoomsAPI';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ordersActions } from '@/store/slices/ordersSlice';
import { roomsActions } from '@/store/slices/roomsSlice';
import { Status } from '@/types/HTTP';
import { OrderTime } from '@/types/Order';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// TODO i18n

type EndTimePickMeta = {
  minHourFromOrdered: null | number;
  minMinuteFromOrdered: null | number;
};

export default function Room() {
  const router = useRouter();
  const id = router.query.id as string;
  const [pickedDate, setPickedDate] = useState<Date>();
  const [makedOrders, setMakedOrders] = useState<OrderTime[] | null>(null);
  const [isModalActive, setModalActive] = useState<boolean>(false);
  const { activeRoom, activeRoomLoading } = useAppSelector(
    (state) => state.rooms
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Пользователь перешёл не с общей страницы, а по URL
    if (!activeRoom) {
      dispatch(roomsActions.fetchActiveRoom(id));
    }
  }, []);

  const links = useRoomHistoryLinks();

  const {
    reset,
    states,
    freeEndHours,
    freeStartHours,
    getFreeEndMinutes,
    getFreeStartMinutes,
    getISOInterval
  } = useTimeIntervalPicker(makedOrders);

  async function handlePickDate(date: Date) {
    reset();
    const orders = (await RoomsAPI.getRoomOrders(id, date)) || [];

    orders.sort((order1, order2) => {
      const date1 = new Date(order1.start);
      const date2 = new Date(order2.start);
      return date1 > date2 ? 1 : -1;
    });
    setPickedDate(date);
    setMakedOrders(orders);
  }

  function handleSubmit() {
    if (!pickedDate) return;
    const ISOinterval = getISOInterval(pickedDate);
    if (!ISOinterval) return;
    dispatch(
      ordersActions.setupOrderForm({
        time: ISOinterval,
        roomID: id
      })
    );
    router.push('/orders/makeOrder');
  }

  if (activeRoomLoading === Status.pending) return 'loading...';

  return (
    <Container title={`Бронирование помещения`} links={links}>
      <Modal isActive={isModalActive} setActive={setModalActive}>
        <>{activeRoom && <MakeOrderForm room={activeRoom} />}</>
      </Modal>
      <div className='flex'>
        <div className='mr-[5rem]'>
          <Calendar onPick={handlePickDate}></Calendar>
        </div>
        {makedOrders && (
          <>
            <OrderedTimesList orderedTimes={makedOrders!}></OrderedTimesList>
            <div>
              <div className='mb-[0.5rem]'>
                <TimePicker
                  label='Начало аренды'
                  hours={freeStartHours}
                  getMinutes={(hour) => getFreeStartMinutes(makedOrders, hour)}
                  pickedHour={states.start.hour}
                  pickedMinute={states.start.minute}
                  setPickedHour={states.start.setHour}
                  setPickedMinute={states.start.setMinute}
                  isDisabledHours={false}
                />
              </div>
              <div className='mb-[2rem]'>
                <TimePicker
                  label='Конец аренды'
                  hours={freeEndHours}
                  getMinutes={(hour) => getFreeEndMinutes(hour)}
                  pickedHour={states.end.hour}
                  pickedMinute={states.end.minute}
                  setPickedHour={states.end.setHour}
                  setPickedMinute={states.end.setMinute}
                  isDisabledHours={states.start.minute === null}
                />
              </div>
              {typeof states.end.minute === 'number' && (
                <Button onClick={handleSubmit}>Заполнить анкету</Button>
              )}
            </div>
          </>
        )}
      </div>
    </Container>
  );
}
