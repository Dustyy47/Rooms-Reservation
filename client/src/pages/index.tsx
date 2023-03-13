import { Room } from '@/components/Room/Room';
import Button from '@/components/UI/Button/Button';
import { Container } from '@/components/UI/Container/Container';
import { RoomData } from '@/models/Room';
import img from '/assets/glass_room.jpg';

const mocks: RoomData[] = [
  {
    imageHref: img.src,
    name: 'Зеркальный зал',
    adress: 'Гоголя, 14',
    description:
      'В центре небольшой комнаты стоит письменный стол, покрытый зеленым сукном. На нем стопка книг, листы, исписанные стремительным почерком поэта. '
  },
  {
    imageHref: img.src,
    name: 'Зеркальный зал',
    adress: 'Гоголя, 14',
    description:
      'В центре небольшой комнаты стоит письменный стол, покрытый зеленым сукном. На нем стопка книг, листы, исписанные стремительным почерком поэта. '
  },
  {
    imageHref: img.src,
    name: 'Зеркальный зал',
    adress: 'Гоголя, 14',
    description:
      'В центре небольшой комнаты стоит письменный стол, покрытый зеленым сукном. На нем стопка книг, листы, исписанные стремительным почерком поэта. '
  },
  {
    imageHref: img.src,
    name: 'Зеркальный зал',
    adress: 'Гоголя, 14',
    description:
      'В центре небольшой комнаты стоит письменный стол, покрытый зеленым сукном. На нем стопка книг, листы, исписанные стремительным почерком поэта. '
  }
];

export default function Rooms() {
  return (
    <Container title='Бронирование помещений'>
      {mocks?.map((mock, index) => (
        <div
          key={index}
          className='mb-[6.04rem] flex max-w-[48.9rem] flex-col items-end'
        >
          <Room room={mock} className='mb-[1.6rem] w-full' />
          <Button className=''>Посмотреть</Button>
        </div>
      ))}
    </Container>
  );
}
