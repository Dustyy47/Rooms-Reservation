import { navLinks } from '@/constants/Links';
import { useAuth } from '@/hooks/useAuth';
import { useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/router';
import { NavLink } from './NavLink';

export function NavBar() {
  const router = useRouter();
  const user = useAppSelector((state) => state.user.user);

  function isNavLinkActive(to: string) {
    return to === router.pathname;
  }
  const { exit } = useAuth();

  if (router.pathname.includes('/auth')) return null;

  return (
    <div className='flex h-[100vh] w-[20%] flex-col justify-between bg-c-grey p-[0.83rem]'>
      <div>
        <div className='mb-[2.5rem] flex h-[4.16rem]  items-center justify-center rounded-common bg-c-black text-white'>
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
      </div>
      <div className='justify-self flex h-[10rem] flex-col justify-between  rounded-common bg-c-blueGrey p-[0.83rem]'>
        <div className='flex flex-col'>
          <span>Вы вошли как:</span>
          <span className='font-bold'>{user?.fullname}</span>
        </div>
        <button
          className='w-fit rounded-[0.2rem] border-[1px] border-c-red px-[.5rem] py-[0.33rem] text-c-red text-opacity-100 hover:bg-c-redContrast hover:text-white'
          onClick={exit}
        >
          Выйти
        </button>
      </div>
    </div>
  );
}
