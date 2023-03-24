import { LinkData } from '@/types/Link';
import Link from 'next/link';

export function HistoryPathItem({ link }: { link: LinkData }) {
  return (
    <Link className='mx-[0.41rem]' key={link.to} href={link.to}>
      {link.label}
    </Link>
  );
}
