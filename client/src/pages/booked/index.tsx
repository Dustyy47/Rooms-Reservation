import { Container } from '@/components/UI/Container/Container';
import { routes } from '@/constants/Links';

const historyLinks = [
  {
    to: routes.booked,
    label: 'Забронированные помещения'
  }
];

export default function Booked() {
  return (
    <Container links={historyLinks} title='Забронированные помещения'>
      <p>asdasdasdasd</p>
    </Container>
  );
}
