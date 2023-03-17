import { roomsHistoryLinks } from '@/constants/Links';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

export function useRoomHistoryLinks() {
  const router = useRouter();
  const links = useMemo(() => {
    return [
      ...roomsHistoryLinks,
      {
        label: `${router.query.id}`,
        to: `/${router.query.id}`
      }
    ];
  }, [router.query.id]);
  return links;
}
