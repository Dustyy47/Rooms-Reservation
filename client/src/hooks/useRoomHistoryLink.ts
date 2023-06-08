import { roomsHistoryLinks } from '@/constants/Links';
import { useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

export function useRoomHistoryLinks() {
  const router = useRouter();
  const activeRoom = useAppSelector((state) => state.rooms.activeRoom);
  const label = activeRoom ? activeRoom.title : router.query.id;
  const links = useMemo(() => {
    return [
      ...roomsHistoryLinks,
      {
        label: `${label}`,
        to: `/${router.query.id}`
      }
    ];
  }, [router.query.id]);
  return links;
}
