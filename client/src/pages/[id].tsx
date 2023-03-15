import { Container } from '@/components/UI/Container/Container';
import { roomsHistoryLinks } from '@/constants/Links';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

export default function Room() {
  const router = useRouter();
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
    <Container title={`${router.query.id}`} links={historyLinks}>
      <div></div>
    </Container>
  );
}
