import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { usersActions } from '@/store/slices/userSlice';
import { deleteCookie } from 'cookies-next';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, loadingUser } = useAppSelector((state) => state.user);

  function exit() {
    deleteCookie('auth');
    dispatch(usersActions.exit());
  }

  return { isAuth: !!user, loadingUser, exit };
};
