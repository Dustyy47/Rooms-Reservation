import { navLinks } from '@/constants/Links';
import { useAuth } from '@/hooks/useAuth';
import { useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/router';
import { NavLink } from './NavLink';

export function NavBar() {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);

  function isNavLinkActive(to: string) {
    return to === router.pathname;
  }
  const { exit } = useAuth();

  if (router.pathname.includes('/auth')) return null;

  return (
    <div className='h-[100vh] w-[20%] bg-c-grey p-[0.83rem]'>
      <div className='mb-[3.95rem] flex h-[4.16rem]  items-center justify-center rounded-common bg-c-black text-white'>
        СевГУ. Творческий цех
      </div>
      <ul>
        {navLinks.map((link, index) => (
          <NavLink
            isActive={isNavLinkActive(link.to)}
            key={index}
            navLink={link}
            className='mb-[0.54rem]'
          />
        ))}
      </ul>
      <div>{user?.fullname}</div>
      <button onClick={exit}>Exit</button>
    </div>
  );
}
