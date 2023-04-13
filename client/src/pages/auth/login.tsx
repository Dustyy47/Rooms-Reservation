import { AuthForm } from '@/components/Forms/AuthForm';
import { Input } from '@/components/UI/Input/Input';
import { InputsGroup } from '@/components/UI/Input/InputsGroup';
import { isAnyFieldEmpty } from '@/helpers/formHelpers';
import { getAuthSSP } from '@/helpers/getAuthSSP';
import { useAuthorize } from '@/hooks/api/useAuthorize';
import { roomsActions } from '@/store/slices/roomsSlice';
import { LoginFormFields } from '@/types/Forms';
import { useForm } from 'react-hook-form';

export default function Login() {
  const {
    formState: { errors, isValid },
    register,
    handleSubmit
  } = useForm<LoginFormFields>({ mode: 'onTouched' });

  const renderFormErrors = () => (
    <>
      {isAnyFieldEmpty<LoginFormFields>(errors) &&
        'Все поля должны быть заполнены!'}
    </>
  );

  const { submitLogin: submit } = useAuthorize();

  return (
    <AuthForm
      isValid={isValid}
      onSubmit={handleSubmit(submit)}
      classNames={{ form: 'w-[22%]' }}
      isLoginForm
      errorsFallback={renderFormErrors()}
    >
      <InputsGroup label='Почта'>
        <Input
          {...register('email', { required: true })}
          placeholder='Введите почту'
        />
      </InputsGroup>
      <InputsGroup label='Пароль'>
        <Input
          {...register('password', { required: true })}
          placeholder='Введите пароль'
        />
      </InputsGroup>
      {}
    </AuthForm>
  );
}

export const getServerSideProps = getAuthSSP((store) => async (ctx) => {
  await store.dispatch(roomsActions.fetchRooms());
  return { props: {} };
});
