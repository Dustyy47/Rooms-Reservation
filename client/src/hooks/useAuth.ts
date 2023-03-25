import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { usersActions } from '@/store/slices/userSlice';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const router = useRouter();

  useEffect(() => {
    dispatch(usersActions.fetchUser());
  }, []);

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    } else {
      router.push('/rooms/');
    }
  }, [user]);

  return { isAuth: !!user };
};
