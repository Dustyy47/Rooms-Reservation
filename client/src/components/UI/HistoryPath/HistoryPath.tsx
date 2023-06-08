import { ArrowIcon } from '@/components/SVG/Arrow';
import { LinkData } from '@/types/Link';
import { HistoryPathItem } from './HistoryPathItem';

interface HistoryPathProps {
  links: LinkData[] | null;
  className?: string;
}

export function HistoryPath({ links, className }: HistoryPathProps) {
  if (links === null) return null;
  return (
    <div
      className={`flex [&_*]:fill-c-grey [&_path]:fill-c-grey  [&_svg]:w-[1rem] ${className}`}
    >
      <HistoryPathItem link={links[0]} />
      {links.slice(1).map((link, index) => (
        <div key={index} className='flex items-center'>
          <ArrowIcon />
          <HistoryPathItem link={link} />
        </div>
      ))}
    </div>
  );
}
