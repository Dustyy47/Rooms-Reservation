import UserAPI from '@/http/UserAPI';
import { usersActions } from '@/store/slices/userSlice';
import { RegistrationFormFields } from '@/types/Forms';
import { isCourse } from '@/types/User';
import { useCallback, useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { UserAuthDTO } from './../../types/User';

export function useRegister() {
  const dispatch = useAppDispatch();
  const [error, setError] = useState('');

  async function register(dto: UserAuthDTO) {
    try {
      const res = await UserAPI.register(dto);
      const { token } = res!;
      localStorage.setItem('token', token);
      dispatch(usersActions.fetchUser());
    } catch (e) {
      setError(e as string);
    }
  }

  const submit = useCallback((variants: RegistrationFormFields) => {
    const [course, speciality] = isCourse(variants.specialField)
      ? [variants.specialField, undefined]
      : [undefined, variants.specialField];

    register({
      fullname:
        variants.surname + ' ' + variants.name + ' ' + variants.patronymic,
      email: variants.email,
      password: variants.password,
      phone: variants.phone,
      course,
      speciality
    });
  }, []);

  return { submit, error };
}
