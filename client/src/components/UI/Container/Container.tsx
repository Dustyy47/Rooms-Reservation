import { LinkData } from '@/types/Link';
import { HistoryPath } from '../HistoryPath/HistoryPath';

interface ContainerProps {
  title: string;
  children: React.ReactNode;
  links: LinkData[];
}

export function Container({ title, children, links }: ContainerProps) {
  return (
    <div className='h-screen w-full overflow-auto p-[2.08rem]'>
      <h1 className='mb-[0.8rem]'>{title}</h1>
      <HistoryPath className='mb-[1.25rem]' links={links} />
      {children}
    </div>
  );
}
