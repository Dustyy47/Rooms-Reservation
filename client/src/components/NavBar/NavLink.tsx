import { NavLinkData } from '@/types/Link';
import Link from 'next/link';

interface NavLinkProps {
  navLink: NavLinkData;
  isActive: boolean;
  className?: string;
}

// Provide an icon as children
export function NavLink({ navLink, className, isActive }: NavLinkProps) {
  const { label, icon } = navLink;
  const activeClassName = isActive
    ? 'bg-c-blueGrey [&_path]:fill-black font-bold'
    : '[&_path]:fill-c-greyLight';
  return (
    <Link href={navLink.to}>
      <div
        className={` flex cursor-pointer items-center rounded-common py-[0.625rem] px-[0.83rem]    ${className} ${activeClassName}`}
      >
        <div className='mr-[0.2rem] h-[1.25rem] w-[1.25rem] [&_svg]:h-full [&_svg]:w-full'>
          {icon}
        </div>
        {label}
      </div>
    </Link>
  );
}
