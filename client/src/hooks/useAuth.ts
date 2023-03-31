import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { usersActions } from '@/store/slices/userSlice';
import { useRouter } from 'next/router';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, loadingUser } = useAppSelector((state) => state.user);
  const router = useRouter();

  function exit() {
    localStorage.removeItem('token');
    dispatch(usersActions.exit());
  }

  return { isAuth: !!user, loadingUser, exit };
};
