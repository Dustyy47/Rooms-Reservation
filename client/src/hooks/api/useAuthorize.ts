import { setAuthHeader } from '@/helpers/authorization';
import UserAPI from '@/http/UserAPI';
import { usersActions } from '@/store/slices/userSlice';
import { UserLoginDTO, UserRegisterDTO } from '@/types/DTO';
import { isCourse } from '@/types/User';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { LoginFormFields, RegistrationFormFields } from './../../types/Forms';

export function useAuthorize() {
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const router = useRouter();

  async function auth(
    dto: UserLoginDTO | UserRegisterDTO,
    mode: 'login' | 'register'
  ) {
    try {
      let res;
      if (mode === 'login') {
        console.log(dto)
        res = await UserAPI.login(dto as UserLoginDTO);
        const { token } = res!;
        setCookie('auth', token, { sameSite: true });
        setAuthHeader();
        dispatch(usersActions.fetchUser());
        router.push('/rooms');
      } else {
        res = await UserAPI.register(dto as UserRegisterDTO);
        router.push('/login');
      }
    } catch (e) {
      const error = e as Error;
      console.log('@AUTH ERROR', error, error.message);
      setError(error.message);
    }
  }

  const submitLogin = useCallback((variants: LoginFormFields) => {
    auth(
      {
        email: variants.email,
        password: variants.password
      },
      'login'
    );
  }, []);

  const submitRegister = useCallback((variants: RegistrationFormFields) => {
    const [course, speciality] = isCourse(variants.specialField)
      ? [variants.specialField, undefined]
      : [undefined, variants.specialField];

    auth(
      {
        fullname:
          variants.surname + ' ' + variants.name + ' ' + variants.patronymic,
        email: variants.email,
        password: variants.password,
        phone: variants.phone,
        course,
        speciality
      },
      'register'
    );
  }, []);

  return { submitLogin, submitRegister, error };
}
