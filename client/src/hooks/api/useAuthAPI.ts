import UserAPI from '@/http/UserAPI';
import { usersActions } from '@/store/slices/userSlice';
import { useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { UserAuthData } from './../../types/User';

export function useAuthAPI() {
  const dispatch = useAppDispatch();
  const [error, setError] = useState('');

  //TODO Add Admin redirect
  return {
    async register(form: UserAuthData) {
      try {
        console.log('@', form);
        const res = await UserAPI.register(form);
        const { data, token } = res!;
        localStorage.setItem('token', token);
        dispatch(usersActions.fetchUser());
      } catch (e) {
        setError(e as string);
      }
    },
    error
  };
}
