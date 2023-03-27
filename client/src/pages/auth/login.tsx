import { AuthForm } from '@/components/Forms/AuthForm';
import { Input } from '@/components/UI/Input/Input';
import { InputsGroup } from '@/components/UI/Input/InputsGroup';
import { useForm } from '@/hooks/useForm';

export default function Login() {
  const { change, isCorrect } = useForm(['email', 'password']);

  return (
    <AuthForm isCorrect={isCorrect()} onSubmit={() => {}} isLoginForm>
      <InputsGroup label='Почта'>
        <Input
          onChange={(v) => change('email', v)}
          placeholder='Введите почту'
        />
      </InputsGroup>
      <InputsGroup label='Пароль'>
        <Input
          onChange={(v) => change('password', v)}
          placeholder='Введите пароль'
        />
      </InputsGroup>
    </AuthForm>
  );
}
