import UserAPI from '@/http/UserAPI';
import { usersActions } from '@/store/slices/userSlice';
import { UserLoginDTO } from '@/types/DTO';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { LoginFormFields } from './../../types/Forms';

export function useLogin() {
  const dispatch = useAppDispatch();
  const [error, setError] = useState('');
  const router = useRouter();

  async function login(dto: UserLoginDTO) {
    try {
      const res = await UserAPI.login(dto);
      const { token } = res!;
      localStorage.setItem('token', token);
      dispatch(usersActions.fetchUser());
      router.push('/rooms');
    } catch (e) {
      const error = e as Error;
      console.log(error.message);
      setError(error.message);
    }
  }

  const submit = useCallback((variants: LoginFormFields) => {
    login({
      email: variants.email,
      password: variants.password
    });
  }, []);

  return { submit, error };
}
