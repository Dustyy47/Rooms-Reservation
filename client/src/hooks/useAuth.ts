import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { usersActions } from '@/store/slices/userSlice';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, loadingUser } = useAppSelector((state) => state.user);
  const router = useRouter();

  function exit() {
    deleteCookie('auth');
    dispatch(usersActions.exit());
    router.push('/auth/login');
  }

  return { isAuth: !!user, loadingUser, exit };
};
