import UserAPI from '@/http/UserAPI';
import { usersActions } from '@/store/slices/userSlice';
import { UserRegisterDTO } from '@/types/DTO';
import { RegistrationFormFields } from '@/types/Forms';
import { isCourse } from '@/types/User';
import { useCallback, useState } from 'react';
import { useAppDispatch } from '../../store/hooks';

export function useRegister() {
  const dispatch = useAppDispatch();
  const [error, setError] = useState('');

  async function register(dto: UserRegisterDTO) {
    try {
      const res = await UserAPI.register(dto);
      const { token } = res!;
      localStorage.setItem('token', token);
      dispatch(usersActions.fetchUser());
    } catch (e) {
      const error = e as Error;
      console.log(error.message);
      setError(error.message);
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
