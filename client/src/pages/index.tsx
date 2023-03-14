import { Room } from '@/components/Room/Room';
import Button from '@/components/UI/Button/Button';
import { Container } from '@/components/UI/Container/Container';
import { rooms } from '@/mock/Rooms';

export default function Rooms() {
  return (
    <Container title='Бронирование помещений'>
      {rooms?.map((room, index) => (
        <div
          key={index}
          className='flex max-w-[48.9rem]  flex-col items-end tablet:flex-col-reverse [&+&]:mt-[6.04rem]'
        >
          <Room room={room} className='mb-[1.6rem] w-full' />
          <Button className=''>Посмотреть</Button>
        </div>
      ))}
    </Container>
  );
}
