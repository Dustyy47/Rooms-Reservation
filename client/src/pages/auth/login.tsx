import { AuthForm } from '@/components/Forms/AuthForm';
import { Input } from '@/components/UI/Input/Input';
import { InputsGroup } from '@/components/UI/Input/InputsGroup';
import { isAnyFieldEmpty } from '@/helpers/formHelpers';
import { useAuthorize } from '@/hooks/api/useAuthorize';
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
