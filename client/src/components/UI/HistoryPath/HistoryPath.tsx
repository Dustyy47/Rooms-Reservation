import { ArrowIcon } from '@/components/SVG/Arrow';
import { LinkData } from '@/models/Link';
import { HistoryPathItem } from './HistoryPathItem';

interface HistoryPathProps {
  links: LinkData[];
  className?: string;
}

export function HistoryPath({ links, className }: HistoryPathProps) {
  return (
    <div
      className={`flex [&_*]:fill-c-grey [&_path]:fill-c-grey  [&_svg]:w-[1rem] ${className}`}
    >
      <HistoryPathItem link={links[0]} />
      {links.slice(1).map((link, index) => (
        <>
          <ArrowIcon key={'arrow--' + index} />
          <HistoryPathItem key={'path--' + index} link={link} />
        </>
      ))}
    </div>
  );
}
